import React, { useState, useEffect } from 'react';
import './PagesStyles.css';
import EventDetail from './EventDetail'; // adjust path if needed

function Conferences() {
  const [conferences, setConferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

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
        }
      ]);
      setLoading(false);
    }, 800);
  }, []);


  
  return (
    <div className="page-container">
      {!selectedEvent ? (
        <>
          <div className="page-header">
            <h1>Conferences</h1>
            <p>Discover upcoming conferences and industry events</p>
          </div>

          <div className="filters">
            <select className="filter-select">
              <option>All Categories</option>
              <option>Technology</option>
              <option>Healthcare</option>
              <option>Finance</option>
              <option>Education</option>
            </select>

            <select className="filter-select">
              <option>All Locations</option>
              <option>Delhi</option>
              <option>Mumbai</option>
              <option>Bangalore</option>
              <option>Hyderabad</option>
              <option>Chennai</option>
            </select>

            <select className="filter-select">
              <option>All Dates</option>
              <option>This Month</option>
              <option>Next Month</option>
              <option>Next 3 Months</option>
            </select>

            <button className="filter-button">Apply Filters</button>
          </div>

          <div className="events-grid">
            {loading ? (
              <div className="loading">Loading conferences...</div>
            ) : (
              conferences.map(conference => (
                <div className="event-card" key={conference.id}>
                  <div className="event-image" onClick={() => setSelectedEvent(conference)}>
                    <img src={conference.image} alt={conference.title} />
                  </div>
                  <div className="event-details">
                    <h3>{conference.title}</h3>
                    <div className="event-info">
                      <p><span>Date:</span> {conference.date}</p>
                      <p><span>Location:</span> {conference.location}</p>
                      <p><span>Organizer:</span> {conference.organizer}</p>
                      <p><span>Category:</span> {conference.category}</p>
                    </div>
                    <button className="register-button">Register Now</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      ) : (
        <>
          <button className="back-button" onClick={() => setSelectedEvent(null)}>← Back to Conferences</button>
          <EventDetail event={selectedEvent} />
        </>
      )}
    </div>
  );
}

export default Conferences;
