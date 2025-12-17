import express from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/user.model.js'
import { generateToken } from '../utils/utils.js'
import cloudinary from '../lib/cloudinary.js'

const router = express.Router()

export const signUp = async (req, res) => {
  const { email, fullName, password } = req.body
  try {
    //validate input
    if (!email || !fullName || !password) {
      return res.status(400).send('Please fill in all required fields')
    }

    //check user password
    if (password.length < 6) {
      return res.status(400).send('Password must be at least 6 characters long')
    }
    //User existence check

    const user = await User.findOne({ email })
    if (user) {
      return res.status(400).send('User with this email already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    //Create new user
    const newUser = new User({
      fullName: fullName,
      email: email,
      password: hashPassword,
    })

    if (newUser) {
      //generate jwt token
      generateToken(newUser._id, res)
      await newUser.save()
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePicture: newUser.profilePicture,
        password: newUser.password,
      })
    } else {
      res.status(400).send(error.message)
      throw new Error('Invalid user data')
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error')
  }

  res.send('Signup route')
}

export const logIn = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).send('User with this email does not exist')
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).send('Invalid credentials')
    }

    generateToken(user._id, res)

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePicture: user.profilePicture,
    })
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error')
  }
}

export const logOut = (req, res) => {
  try {
    res.cookie('token', '', { maxAge: 0 })
    res.status(200).send('Logged out successfully')
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error')
  }
}

export const updateProfile = async (req, res) => {
  try {
    const { profilePicture } = req.body
    const userId = req.user._id

    if (!profilePicture) {
      return res.status(400).send('Profile picture is required')
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePicture)
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePicture: uploadResponse.secure_url },
      { new: true }
    )
    res.status(200).json(updatedUser)
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error')
  }
}

export const checkAuthStatus = (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    res.status(200).json(req.user);
  } catch (error) {
    console.error('Error in checkAuth controller:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

