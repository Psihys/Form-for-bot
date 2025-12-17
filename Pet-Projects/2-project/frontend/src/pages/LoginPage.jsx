import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore.js'
import { MdEmail } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'
import { LuEyeClosed } from 'react-icons/lu'
import { RxEyeOpen } from 'react-icons/rx'
import { Loader } from 'lucide-react'

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { login, isLoggingIn } = useAuthStore()

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      alert('Please fill in all fields')
      return false
    }
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const success = validateForm()
    if (success) {
      login(formData)
    }
  }

  return (
    <div className='signup-container'>
      <h1 className='signup-title'>Login</h1>

      <form onSubmit={handleSubmit} className='signup-form'>
        <label className='signup-label'>
          <MdEmail className='signup-icon' /> Email
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
        <div className='password-wrapper'>
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
            className='password-toggle'
            onClick={() => setShowPassword((p) => !p)}
          >
            {showPassword ? <RxEyeOpen /> : <LuEyeClosed />}
          </button>
        </div>

        <button className='signup-button' type='submit' disabled={isLoggingIn}>
          {isLoggingIn ? <Loader className='signup-loader' /> : 'Login'}
        </button>
      </form>

      <p className='signup-footer'>
        Don't have an account?{' '}
        <a className='signup-link' href='/signup'>
          Sign Up
        </a>
      </p>
    </div>
  )
}

export default LoginPage
