import React from 'react';

const NoChatSelected = () => {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '18px',
        color: '#666'
      }}
    >
      Please select a user to start chatting
    </div>
  );
};

export default NoChatSelected;
