import React, { useState, useEffect, useRef } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from "firebase/firestore";
import Message from "./Message"; 
import RoomInput from "./RoomInput"; // Import RoomInput
import "../styles/Chat.css";

export const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [room, setRoom] = useState(null); // Store current room
  const messagesRef = room ? collection(db, "rooms", room, "messages") : null;
  const scrollRef = useRef();

  const handleJoinRoom = (roomName) => {
    setRoom(roomName); // Set the current room
    // Clear messages when switching rooms
    setMessages([]);
  };

  useEffect(() => {
    if (messagesRef) {
      const q = query(messagesRef, orderBy("createdAt"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedMessages = [];
        snapshot.forEach((doc) => {
          fetchedMessages.push({ ...doc.data(), id: doc.id });
        });
        setMessages(fetchedMessages);
      });

      return () => unsubscribe();
    }
  }, [messagesRef]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newMessage === "") return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
    });

    setNewMessage("");
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="chat-app">
      {!room ? (
        <RoomInput onJoinRoom={handleJoinRoom} /> // Show RoomInput when no room is selected
      ) : (
        <>
          <div className="header">
            <h1>Welcome to: {room.toUpperCase()}</h1>
          </div>
          <div className="messages-wrapper">
            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
            <span ref={scrollRef}></span>
          </div>
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
        </>
      )}
    </div>
  );
};
