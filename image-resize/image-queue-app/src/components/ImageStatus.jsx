// src/components/ImageStatus.jsx
import React, { useEffect, useState } from 'react';
import socket from '../services/socket';

const ImageStatus = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    socket.on('image-events', (event) => {
      setEvents((prev) => [event, ...prev]);
    });

    return () => {
      socket.off('image-events');
    };
  }, []);

  return (
    <div>
      <h2>Image Events</h2>
      {events.map((event, index) => (
        <div key={index}>
          <strong>{event.event.toUpperCase()}</strong> — {event.filename}
        </div>
      ))}
    </div>
  );
};

export default ImageStatus;
