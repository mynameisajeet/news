import React, { useState } from 'react';

const RoomInput = ({ onJoinRoom }) => {
  const [roomName, setRoomName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (roomName.trim()) {
      onJoinRoom(roomName); // Call the function passed as prop
      setRoomName(''); // Clear input field
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        placeholder="Enter room name"
      />
      <button type="submit">Join Room</button>
    </form>
  );
};

export default RoomInput;
