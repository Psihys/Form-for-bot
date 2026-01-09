import cloudinary from '../lib/cloudinary.js'
import Message from '../models/message.model.js'
import User from '../models/user.model.js'
import { Readable } from 'stream'
export const getAllUseres = async (req, res) => {
  try {
    const loggedInUserId = req.user._id
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select('-password')
    res.status(200).json(filteredUsers)
  } catch (error) {
    console.log('Error in getAllUsers controller', error.message)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params
    const senderId = req.user._id

    const messages = await Message.find({
      $or: [
        { senderID: senderId, receiverId: userToChatId },
        { senderID: userToChatId, receiverId: senderId },
      ],
    }).sort({ createdAt: 1 }) // сортировка по времени

    res.status(200).json(messages)
  } catch (error) {
    console.log('Error in getMessages controller', error.message)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const sendMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params
    const senderId = req.user._id
    const text = req.body.text || ''
    let imageUrl = ''

    // Если есть файл
    if (req.file) {
      const stream = Readable.from(req.file.buffer)
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: 'image' },
          (error, result) => {
            if (error) reject(error)
            else resolve(result)
          }
        )
        stream.pipe(uploadStream)
      })
      imageUrl = result.secure_url
    }

    if (!text && !imageUrl) {
      return res.status(400).json({ error: 'Message cannot be empty' })
    }

    const newMessage = new Message({
      senderID: senderId,
      receiverId,
      text,
      images: imageUrl,
    })

    const savedMessage = await newMessage.save()
    res.status(201).json(savedMessage)
  } catch (error) {
    console.error('Error in sendMessage controller:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
