import React from "react";
import "./EventDetail.css";
import { FaCalendarAlt, FaClock, FaUsers, FaLanguage, FaMapMarkerAlt, FaCreditCard, FaThumbsUp } from "react-icons/fa";

function EventDetail({ event }) {
  if (!event) return null;

  return (
    <div className="event-detail-container">
      <h2 className="event-title">{event.title}</h2>

      <div className="event-main">
        {/* Left Section */}
        <div className="event-left">
          <img
            src={event.image}
            alt={event.title}
            className="event-banner"
          />

          <div className="event-about">
            <h3>About The Event</h3>
            <p>~ {event.organizer}</p>
            <p>~ {event.date}</p>
            <p>~ Join us for a deep dive into {event.category} related topics.</p>
            <div className="interested">
              <FaThumbsUp /> 60 Are Interested <button className="btn-interest">I'm Interested</button>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="event-info-card">
          <p><FaCalendarAlt /> {event.date}</p>
          <p><FaClock /> {event.time}</p>
          <p><FaUsers /> Age Limit - 16+</p>
          <p><FaLanguage /> Hinglish</p>
          <p><FaCreditCard /> Mode - Online</p>
          <p><FaMapMarkerAlt /> Location: Virtual</p>
          <hr />
          <div className="price-section">
            {/* <h4>₹1000</h4> */}
            <strong>Available : Join Fast</strong><br></br>
            <button className="btn-book">JOIN</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetail;
