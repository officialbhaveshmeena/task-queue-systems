// src/components/ImageStatus.jsx
import React, { useEffect, useState } from "react";
import socket from "../services/socket";
import "./ImageStatus.css";
const ImageStatus = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    socket.on("image-events", (event) => {
      setEvents((prev) => {
        let ind = prev.findIndex(({ id }) => id == event.id);
		 console.log("ind ",prev,event,ind)
        if (ind != -1) {
          prev[ind] = event;
          return [...prev];
        } else {
          return [event, ...prev];
        }
      });
    });

    return () => {
      socket.off("image-events");
    };
  }, []);

  return (
    <div>
      <h2 className="image__info">Image Events</h2>
      <div className="card2__wrapper">
        {events.map((event, index) => (
          <div key={index} className="card_v2_wrapper">
            <div className="two_image_wrapper">
              {event.event == "completed" && event.resizedPath ? (
                <img src={`${event.resizedPath}`} alt="Resized" />
              ) : (
                <img src={`${event.filename}`} alt="Original" />
              )}

              {/* {event.event === "completed" && event.resizedPath && (
                <img src={`${event.resizedPath}`} alt="Resized" />
              )} */}
              <strong className="text-status">
                {event.event.toUpperCase() == "COMPLETED"
                  ? "COMPLETED"
                  : "STARTED"}
              </strong>
              <p className="description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Corporis harum est magni facilis cupiditate ipsam illum dolores
                omnis atque voluptates?
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageStatus;
