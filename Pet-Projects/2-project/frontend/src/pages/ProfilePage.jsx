import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'


const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore()
  const [selectedImage,setSelectedImage] = useState(null)
  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = async () => {
      const base64Image = reader.result
      setSelectedImage(base64Image)
      await updateProfile({ profilePicture: base64Image })
    }
  }

  return (
    <div className='profile-container'>
      <div className='profile-info'>
        <h1>Profile Page</h1>
        <p>Your profile information</p>

        <div className='profile-image'>
          <img src={selectedImage || authUser?.profilePicture || '/avatar.png'} alt='avatar' />
          <input
            type='file'
            onChange={(e) => handleImageUpload(e)}
            accept='image/*'
            disabled={isUpdatingProfile}
          />
        </div>

        <form action='' className='profile-user__form'>
          <label htmlFor='username'>Username</label>
          <input type='text' value={authUser?.fullName} disabled={true} />

          <label htmlFor='email'>Email</label>
          <input type='email' value={authUser?.email} disabled={true} />
        </form>
      </div>

      <div className='profile-additional__info'>
        <h2>Additional Information</h2>
        <div className='additional__info-content'>
          <p>
            Activity Status:
            {authUser ? <span>Online</span> : <span>Offline</span>}
          </p>
          <p>
            Registration Date:
            <span>{new Date(authUser?.createdAt).toLocaleDateString()}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
