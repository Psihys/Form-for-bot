import { create } from 'zustand'
import { axiosInstance } from '../utils/axios'

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessageLoading: false,

  getUsers: async () => {
    set({ isUserLoading: true })
    try {
      const res = await axiosInstance.get('/message/users')
      set({ users: res.data })
    } catch (error) {
      console.log(error)
      alert(error.response?.data?.error || 'Failed to fetch users')
    } finally {
      set({ isUserLoading: false })
    }
  },

  getMessages: async (userId) => {
    set({ isMessageLoading: true })
    try {
      const res = await axiosInstance.get(`/message/${userId}`)
      set({ messages: res.data })
    } catch (error) {
      console.log(error)
      alert(error.response?.data?.error || 'Failed to fetch messages')
    } finally {
      set({ isMessageLoading: false })
    }
  },

  setSelectedUser: (user) => set({ selectedUser: user }),

  sendMessage: async (messageData) => {
   const { selectedUser, messages } = get()
   try{
    const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData)
    set({ messages: [...messages, res.data] })
   } catch (error) {
    console.log(error)
    alert(error.response?.data?.error || 'Failed to send message')
   } finally {
    set({ isMessageLoading: false })
   }
  },
}))
