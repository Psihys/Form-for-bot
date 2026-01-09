import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import './styles/sidebar.css'
import { useAuthStore } from '../store/useAuthStore'

const Sidebar = () => {
  const { users, getUsers, selectedUser, isUserLoading, setSelectedUser } =
    useChatStore()
  const { onlineUsers } = useAuthStore()
  useEffect(() => {
    getUsers()
  }, [getUsers])

  if (isUserLoading) return <p className='loading'>Loading users...</p>
  console.log(onlineUsers)

  const handleSelectUser = (user) => {
    setSelectedUser(user)
  }

  return (
    <aside className='sidebar'>
      <h3>Users Online: {onlineUsers.length} </h3>
      {isUserLoading ? (
        <p className='loading'>Loading users...</p>
      ) : (
        <ul className='user-list'>
          {users.map((user) => (
            <li
              key={user.id}
              className={`user-item ${
                selectedUser?.id === user.id ? 'selected' : ''
              }`}
              onClick={() => handleSelectUser(user)}
            >
              <img
                src={user.profilePicture || '/avatar.png'}
                alt={user.fullName}
                className='user-avatar'
              />
              <div className='user-info'>
                <span className='user-name'>{user.fullName}</span>
                <span
                  className={`user-status ${
                    user.isOnline ? 'online' : 'offline'
                  }`}
                >
                  {user.isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </aside>
  )
}

export default Sidebar
