import React from "react";
import "./EventDetail.css";
import { FaCalendarAlt, FaClock, FaUsers, FaLanguage, FaMapMarkerAlt, FaCreditCard, FaThumbsUp } from "react-icons/fa";

function EventDetail() {
  return (
    <div className="event-detail-container">
      <h2 className="event-title">Python Webinar</h2>

      <div className="event-main">
        {/* Left Section */}
        <div className="event-left">
          <img
            src="/images/coding-class-banner.jpg"
            alt="Coding Classes"
            className="event-banner"
          />

          <div className="event-about">
            <h3>About The Event</h3>
            <p>~ P. A.</p>
            <p>~ 02/11/2027</p>
            <p>~ Discover the power of AI and ML in shaping the future through this insightful webinar.</p>
            <div className="interested">
              <FaThumbsUp /> 60 Are Interested <button className="btn-interest">I'm Interested</button>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="event-info-card">
          <p><FaCalendarAlt /> 02/Nov/2025 - 04/Nov/2025</p>
          <p><FaClock /> 7pm - 9pm</p>
          <p><FaClock /> 2 hour</p>
          <p><FaUsers /> Age Limit - 16+</p>
          <p><FaLanguage /> Hinglish</p>
          <p><FaCreditCard /> Mode - Hybrid / Online</p>
          <p><FaMapMarkerAlt /> Pune</p>
          <hr />
          <div className="price-section">
            <h4>₹1000</h4>
            <p>Available</p>
            <button className="btn-book">+ BOOK</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetail;
