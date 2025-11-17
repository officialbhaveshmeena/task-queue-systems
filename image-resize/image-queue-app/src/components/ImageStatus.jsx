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

          <div>
                <img
                  src={`${event.filename}`}
                  alt="Original"
                  style={{ maxWidth: '200px', marginTop: '8px' }}
                />
              </div>
          {event.event === 'completed' && event.resizedPath && (
              <div>
                <img
                  src={`${event.resizedPath}`}
                  alt="Resized"
                  style={{ maxWidth: '200px', marginTop: '8px' }}
                />
              </div>
            )}
        </div>
      ))}
    </div>
  );
};

export default ImageStatus;
