import React, { useState, useEffect } from 'react';
import './PagesStyles.css';

function Webinars() {
  const [webinars, setWebinars] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Mock fetch webinars data
    setTimeout(() => {
      setWebinars([
        {
          id: 1,
          title: "Modern Web Development",
          date: "May 15, 2025",
          time: "10:00 AM - 12:00 PM",
          organizer: "Tech Solutions Inc.",
          category: "Technology",
          image: "/api/placeholder/300/200"
        },
        {
          id: 2,
          title: "Data Science for Beginners",
          date: "May 20, 2025",
          time: "2:00 PM - 4:00 PM",
          organizer: "DataMinds Academy",
          category: "Education",
          image: "/api/placeholder/300/200"
        },
        {
          id: 3,
          title: "Digital Marketing Strategies",
          date: "May 25, 2025",
          time: "11:00 AM - 1:00 PM",
          organizer: "Marketing Pro",
          category: "Business",
          image: "/api/placeholder/300/200"
        }
      ]);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Webinars</h1>
        <p>Find and join online webinars on various topics</p>
      </div>
      
      <div className="filters">
        <select className="filter-select">
          <option>All Categories</option>
          <option>Technology</option>
          <option>Business</option>
          <option>Education</option>
          <option>Health</option>
        </select>
        
        <select className="filter-select">
          <option>All Dates</option>
          <option>Today</option>
          <option>Tomorrow</option>
          <option>This Weekend</option>
          <option>This Month</option>
        </select>
        
        <select className="filter-select">
          <option>Price - Any</option>
          <option>Free</option>
          <option>Paid</option>
        </select>
        
        <button className="filter-button">Apply Filters</button>
      </div>
      
      <div className="events-grid">
        {loading ? (
          <div className="loading">Loading webinars...</div>
        ) : (
          webinars.map(webinar => (
            <div className="event-card" key={webinar.id}>
              <div className="event-image">
                <img src={webinar.image} alt={webinar.title} />
              </div>
              <div className="event-details">
                <h3>{webinar.title}</h3>
                <div className="event-info">
                  <p><span>Date:</span> {webinar.date}</p>
                  <p><span>Time:</span> {webinar.time}</p>
                  <p><span>Organizer:</span> {webinar.organizer}</p>
                  <p><span>Category:</span> {webinar.category}</p>
                </div>
                <button className="register-button">Register Now</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Webinars;