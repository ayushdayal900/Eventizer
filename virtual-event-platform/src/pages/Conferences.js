import React, { useState, useEffect } from 'react';
import './PagesStyles.css';
import EventDetail from './EventDetail';

function Conferences() {
  const [conferences, setConferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registeredEvents, setRegisteredEvents] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setConferences([
        {
          id: 1,
          title: "Annual Tech Summit 2025",
          date: "June 10-12, 2025",
          location: "Hyderabad International Convention Center",
          organizer: "TechLeaders Association",
          category: "Technology",
          image: "https://img.freepik.com/free-vector/technology-conference-bannertemplate_1361-2226.jpg"
        },
        {
          id: 2,
          title: "Healthcare Innovation Conference",
          date: "June 18-20, 2025",
          location: "Taj Conference Center, Mumbai",
          organizer: "Health Innovations India",
          category: "Healthcare",
          image: "https://img.freepik.com/free-psd/gradient-medical-care-facebook-template_23-2150514853.jpg"
        },
        {
          id: 3,
          title: "Financial Markets Summit",
          date: "July 5-7, 2025",
          location: "The Grand Ballroom, New Delhi, India",
          organizer: "Financial Today Group",
          category: "Finance",
          image: "https://img.freepik.com/free-vector/financial-business-world-successful-management-concept_1284-5601.jpg"
        },
        {
          id: 4,
          title: "Future Economics Conference",
          date: "July 5-7, 2025",
          location: "The Grand Ballroom, New Delhi, India",
          organizer: "Financial Today Group",
          category: "Finance",
          image: "https://img.freepik.com/premium-psd/elegant-black-gold-theme-digital-marketing-live-webinar-social-media-post-template_236275-328.jpg"
        }
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const handleRegister = (id) => {
    if (!registeredEvents.includes(id)) {
      setRegisteredEvents(prev => [...prev, id]);
    }
  };

  const handleImageClick = (conference) => {
    if (registeredEvents.includes(conference.id)) {
      setSelectedEvent(conference);
    }
  };

  if (selectedEvent) {
    return (
      <div className="page-container">
        <EventDetail event={selectedEvent} />
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Conferences</h1>
        <p>Discover upcoming conferences and industry events</p>
      </div>

      <div className="events-grid">
        {loading ? (
          <div className="loading">Loading conferences...</div>
        ) : (
          conferences.map(conference => (
            <div className="event-card" key={conference.id}>
              <div className="event-image">
                <img
                  src={conference.image}
                  alt={conference.title}
                  onClick={() => handleImageClick(conference)}
                  style={{ cursor: registeredEvents.includes(conference.id) ? 'pointer' : 'default' }}
                />
              </div>
              <div className="event-details">
                <h3>{conference.title}</h3>
                <div className="event-info">
                  <p><span>Date:</span> {conference.date}</p>
                  <p><span>Location:</span> {conference.location}</p>
                  <p><span>Organizer:</span> {conference.organizer}</p>
                  <p><span>Category:</span> {conference.category}</p>
                </div>
                {registeredEvents.includes(conference.id) ? (
                  <div className="register-button done">Done</div>
                ) : (
                  <button
                    className="register-button"
                    onClick={() => handleRegister(conference.id)}
                  >
                    Register Now
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Conferences;
