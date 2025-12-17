import { create } from 'zustand'
import { axiosInstance } from '../utils/axios'

export const useAuthStore = create((set) => ({
  authUser: null,
  isSignUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  onlineUsers: [],

  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get('/auth/check')
      set({ authUser: response.data })
    } catch (error) {
      set({ authUser: null })
      console.log(error)
    } finally {
      set({ isCheckingAuth: false })
    }
  },

  sigingup: async (data) => {
    set({ isSignUp: true })
    try {
      const res = await axiosInstance.post('/auth/signup', data)
      set({ authUser: res.data })
    } catch (error) {
      console.log(error)
      alert(error.response.data.error)
    } finally {
      set({ isSignUp: false })
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post('/auth/logout')
      set({ authUser: null })
      window.location.reload()
    } catch (error) {
      console.log(error)
      alert(error.response.data.error)
    }
  },

  login: async (data) =>{
    set({ isLoggingIn: true })
    try {
        const res = await axiosInstance.post('/auth/login', data)
        set({ authUser: res.data })
        alert('Login successful')
    } catch (error) {
        console.log(error)
        alert(error.response.data.error)
    } finally {
        set({ isLoggingIn: false })
    }
  },

  updateProfile: async(data) =>{
    set({ isUpdatingProfile: true })
    try {
        const res = await axiosInstance.put('/auth/update-profile', data)
        set({ authUser: res.data })
        alert('Profile updated successfully')
    } catch (error) {
        console.log(error)
        alert(error.response.data.error)
    } finally {
        set({ isUpdatingProfile: false })
    }
  }
}))
