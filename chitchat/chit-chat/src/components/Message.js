import React from "react";
import { auth } from "../firebase"; 

const Message = ({ message }) => {
  const isCurrentUser = message.user === auth.currentUser.displayName;

  return (
    <div className={`message-container ${isCurrentUser ? 'current-user' : 'other-user'}`}>
      <div className={`message ${isCurrentUser ? 'current-user' : ''}`}>
        <span className="user">{message.user}:</span> {message.text}
      </div>
    </div>
  );
};

export default Message;
