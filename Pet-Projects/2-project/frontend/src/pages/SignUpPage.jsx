import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { IoMdPerson } from 'react-icons/io'
import { MdEmail } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'
import { LuEyeClosed } from 'react-icons/lu'
import { RxEyeOpen } from 'react-icons/rx'
import { Loader } from 'lucide-react'

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  })

  const { sigingup, isSigingUp } = useAuthStore()

  const validateForm = () => {
    if (!formData.fullName || !formData.email || !formData.password) {
      alert('Please fill in all fields')
      return false
    }
    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters')
      return false
    }
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const success = validateForm()

    if (success) {
      sigingup(formData)
    }
  }

  return (
    <div className='signup-container'>
      <h1 className='signup-title'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='signup-form'>
        <label className='signup-label'>
          <IoMdPerson className='signup-icon' />
          Full Name
        </label>
        <input
          className='signup-input'
          type='text'
          placeholder='Full Name'
          value={formData.fullName}
          onChange={(e) =>
            setFormData({ ...formData, fullName: e.target.value })
          }
        />

        <label className='signup-label'>
          <MdEmail className='signup-icon' />
          Email
        </label>
        <input
          className='signup-input'
          type='email'
          placeholder='Email'
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <label className='signup-label'>
          <RiLockPasswordFill className='signup-icon' /> Password
        </label>
        <div>
          <input
            className='signup-input'
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <button
            type='button'
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <RxEyeOpen /> : <LuEyeClosed />}
          </button>
        </div>

        <button className='signup-button' type='submit' disabled={isSigingUp}>
          {isSigingUp ? <Loader className='signup-loader' /> : 'Sign Up'}
        </button>
      </form>
      <p className='signup-footer'>
        Already have an account?{' '}
        <a className='signup-link' href='/login'>
          Login
        </a>
      </p>
    </div>
  )
}

export default SignUpPage
