import React from 'react';
import { useChatStore } from '../store/useChatStore';
import Sidebar from '../components/Sidebar';
import NoChatSelected from '../components/NoChatSelected';
import ChatContainer from '../components/ChatContainer';

import './styles/homePage.css';

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="home-page">
      <div className="chat-wrapper">
        {/* Левая панель — список пользователей */}
        <Sidebar />

        {/* Правая панель — чат */}
        <div className="chat-content">
          {selectedUser ? <ChatContainer /> : <NoChatSelected />}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
