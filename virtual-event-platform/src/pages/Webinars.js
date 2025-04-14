import React, { useState, useEffect } from 'react';
import './PagesStyles.css';
import EventDetail from './EventDetail';

function Webinars() {
  const [webinars, setWebinars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [registeredWebinars, setRegisteredWebinars] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setWebinars([
        {
          id: 1,
          title: "Modern Web Development",
          date: "May 15, 2025",
          time: "10:00 AM - 12:00 PM",
          organizer: "Tech Solutions Inc.",
          category: "Technology",
          image: "https://img.freepik.com/free-vector/advertising-agency-webinar-template_23-2150034479.jpg"
        },
        {
          id: 2,
          title: "Data Science for Beginners",
          date: "May 20, 2025",
          time: "2:00 PM - 4:00 PM",
          organizer: "DataMinds Academy",
          category: "Education",
          image: "https://img.freepik.com/free-vector/data-analysis-template-design_23-2150713832.jpg"
        },
        {
          id: 3,
          title: "Digital Marketing Strategies",
          date: "May 25, 2025",
          time: "11:00 AM - 1:00 PM",
          organizer: "Marketing Pro",
          category: "Business",
          image: "https://img.freepik.com/free-vector/webinar-banner-invitation_52683-50986.jpg"
        },
        {
          id: 4,
          title: "Language Learnings",
          date: "May 27, 2025",
          time: "11:00 AM - 1:00 PM",
          organizer: "Languages Pro",
          category: "Education",
          image: "https://img.freepik.com/free-psd/flat-design-language-learning-facebook-template_23-2150550297.jpg"
        }
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const handleRegisterClick = (id) => {
    setRegisteredWebinars(prev => ({
      ...prev,
      [id]: true
    }));
  };

  const handleImageClick = (webinar) => {
    if (registeredWebinars[webinar.id]) {
      setSelectedEvent(webinar);
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
        <h1>Webinars</h1>
        <p>Find and join online webinars on various topics</p>
      </div>

      <div className="filters">
        {/* Add your filters here if needed */}
      </div>

      <div className="events-grid">
        {loading ? (
          <div className="loading">Loading webinars...</div>
        ) : (
          webinars.map(webinar => (
            <div className="event-card" key={webinar.id}>
              <div className="event-image">
                <img
                  src={webinar.image}
                  alt={webinar.title}
                  onClick={() => handleImageClick(webinar)}
                  style={{ cursor: registeredWebinars[webinar.id] ? 'pointer' : 'default' }}
                />
              </div>
              <div className="event-details">
                <h3>{webinar.title}</h3>
                <div className="event-info">
                  <p><span>Date:</span> {webinar.date}</p>
                  <p><span>Time:</span> {webinar.time}</p>
                  <p><span>Organizer:</span> {webinar.organizer}</p>
                  <p><span>Category:</span> {webinar.category}</p>
                </div>
                {registeredWebinars[webinar.id] ? (
                  <div className="register-button done">done</div>
                ) : (
                  <button
                    className="register-button"
                    onClick={() => handleRegisterClick(webinar.id)}
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

export default Webinars;
