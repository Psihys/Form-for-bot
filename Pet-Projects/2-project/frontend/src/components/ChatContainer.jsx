import React, { useState, useEffect, useRef } from 'react';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import './styles/chatContainer.css';
import  Loader  from './Loader.jsx';

const ChatContainer = () => {
  const { selectedUser, messages, isMessageLoading, getMessages, sendMessage } = useChatStore();
  const { authUser } = useAuthStore();
  const [newMessage, setNewMessage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const messagesEndRef = useRef(null);

  // Загружаем сообщения при выборе пользователя
  useEffect(() => {
    if (selectedUser) getMessages(selectedUser._id);
  }, [selectedUser, getMessages]);

  // Автопрокрутка к последнему сообщению
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!selectedUser) return <div className="no-chat">Select a user to start chat</div>;

  const handleSend = async () => {
    if (!newMessage.trim() && !imageFile) return;

    const formData = new FormData();
    if (newMessage.trim()) formData.append('text', newMessage);
    if (imageFile) formData.append('image', imageFile);

    await sendMessage(formData);

    setNewMessage('');
    setImageFile(null);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <img
          src={selectedUser.profilePicture || '/avatar.png'}
          alt={selectedUser.fullName}
          className="chat-user-avatar"
        />
        <h3>{selectedUser.fullName}</h3>
      </div>

      <div className="chat-messages">
        {isMessageLoading ? (
          <Loader className="loader" />
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-message ${
                msg.senderID === authUser?._id ? 'my-message' : 'user-message'
              }`}
            >
              {msg.text && <p>{msg.text}</p>}
              {msg.images && <img src={msg.images} alt="sent" className="chat-image" />}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatContainer;
