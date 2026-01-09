import express from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

import User from '../models/user.model.js'
import redis from '../lib/redis.js'

dotenv.config() // Загружаем переменные окружения из .env файла

// Функция генерации JWT токенов
const generateToken = (userId) => {
  // Access token — короткоживущий токен для авторизации запросов
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_JWT_SECRET, {
    expiresIn: '15min', // истекает через 15 минут
  })

  // Refresh token — долговременный токен для получения нового access token
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_JWT_SECRET, {
    expiresIn: '7d', // истекает через 7 дней
  })

  return { accessToken, refreshToken }
}

// Сохраняем refresh token в Redis с привязкой к пользователю
const storeRefreshToken = async (userId, refreshToken) => {
  await redis.set(
    `refresh_token:${userId}`, // ключ для Redis
    refreshToken, // значение — сам токен
    'EX', // установка времени жизни
    7 * 24 * 60 * 60 // 7 дней в секундах
  )
}

// Устанавливаем access и refresh токены в HTTP cookies
const setCookies = (res, accessToken, refreshToken) => {
  // accessToken cookie — короткоживущая
  res.cookie('accessToken', accessToken, {
    httpOnly: true, // недоступно из JS, защищает от XSS
    secure: process.env.NODE_ENV === 'production', // https только в продакшн
    sameSite: 'Strict', // защита от CSRF
    maxAge: 15 * 60 * 1000, // 15 минут
  })

  // refreshToken cookie — долгоживущая
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дней
  })
}

// Регистрация нового пользователя
export const signup = async (req, res) => {
  const { username, email, password } = req.body
  try {
    // Проверяем, существует ли пользователь с таким email
    const userExist = await User.findOne({ email })
    if (userExist) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // Создаём нового пользователя (пароль автоматически хешируется в модели)
    const user = await User.create({ username, email, password })

    // Генерируем токены
    const { accessToken, refreshToken } = generateToken(user._id)

    // Сохраняем refresh token в Redis
    await storeRefreshToken(user._id, refreshToken)

    // Устанавливаем токены в cookies
    setCookies(res, accessToken, refreshToken)

    // Отправляем ответ клиенту
    res.status(201).json({
      message: 'User created successfully',
      user: {
        _id: user._id,
        name: user.username,
        email: user.email,
        role: user.roles,
      },
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error' })
  }
}

// Логин пользователя
export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    // Ищем пользователя по email
    const user = await User.findOne({ email })

    // Если пользователь не найден или пароль не совпадает — 401
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // Генерация новых токенов
    const { accessToken, refreshToken } = generateToken(user._id)

    // Сохраняем refresh token в Redis
    await storeRefreshToken(user._id, refreshToken)

    // Устанавливаем токены в cookies
    setCookies(res, accessToken, refreshToken)

    // Отправляем данные пользователя обратно клиенту
    res.status(200).json({
      message: 'User logged in successfully',
      user: {
        _id: user._id,
        name: user.username,
        email: user.email,
        role: user.roles,
      },
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error' })
  }
}

// Логаут пользователя
export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken
    if (refreshToken) {
      // Декодируем refresh token
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET)

      // Удаляем refresh token из Redis
      await redis.del(`refresh_token:${decoded.userId}`)
    }

    // Очищаем cookies
    res.clearCookie('accessToken')
    res.clearCookie('refreshToken')

    res.status(200).json({ message: 'Logged out successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error' })
  }
}

// Обновление access token по refresh token
export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) {
      return res.status(401).json({ message: 'No refresh token provided' })
    }

    // Проверяем refresh token и декодируем
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET)

    // Проверяем, совпадает ли токен с тем, что в Redis
    const storedToken = await redis.get(`refresh_token:${decoded.userId}`)
    if (storedToken !== refreshToken) {
      return res.status(401).json({ message: 'Invalid refresh token' })
    }

    // Генерируем новый access token
    const accessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.ACCESS_JWT_SECRET,
      { expiresIn: '15min' }
    )

    // Устанавливаем новый access token в cookies
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 15 * 60 * 1000, // 15 минут
    })

    // Отправляем новый access token клиенту
    res.status(200).json({ accessToken })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const getProfile = async (req, res) => {
  const userId = req.user.userId
  try {
    const user = await User.findById(userId).select('-password')
    res.status(200).json({ user })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error' })
  }
}
