import React, { useState } from "react";
import "../styles/SendMessage.css"; // Create a CSS file for styles

const SendMessage = ({ handleNewMessage, scroll }) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage === "") return;

    // Call the handleNewMessage function passed from Chat.js
    await handleNewMessage(newMessage);

    setNewMessage("");
    scroll.current.scrollIntoView({ behavior: "smooth" }); // Scroll to the latest message
  };

  return (
    <form onSubmit={handleSubmit} className="new-message-form">
      <input
        type="text"
        value={newMessage}
        onChange={(event) => setNewMessage(event.target.value)}
        className="new-message-input"
        placeholder="Type your message here..."
      />
      <button type="submit" className="send-button">
        Send
      </button>
    </form>
  );
};

export default SendMessage;
