import React, { useState, useEffect } from 'react';
import './PagesStyles.css';

function Meetups() {
  const [meetups, setMeetups] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Mock fetch meetups data
    setTimeout(() => {
      setMeetups([
        {
          id: 1,
          title: "Pune JavaScript Developers",
          date: "April 20, 2025",
          time: "6:00 PM - 8:00 PM",
          location: "Workspaces Co., Koregaon Park",
          organizer: "Pune JS Community",
          category: "Technology",
          image: "/api/placeholder/300/200"
        },
        {
          id: 2,
          title: "Book Lovers Club Meetup",
          date: "April 25, 2025",
          time: "5:00 PM - 7:00 PM",
          location: "Cafe Reading Room, Aundh",
          organizer: "Pune Readers Circle",
          category: "Books & Literature",
          image: "/api/placeholder/300/200"
        },
        {
          id: 3,
          title: "Entrepreneurship Networking Event",
          date: "May 2, 2025",
          time: "7:00 PM - 9:00 PM",
          location: "Business Hub, Viman Nagar",
          organizer: "Startup Catalysts",
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
        <h1>Meetups</h1>
        <p>Connect with like-minded people at local meetups</p>
      </div>
      
      <div className="filters">
        <select className="filter-select">
          <option>All Categories</option>
          <option>Technology</option>
          <option>Books & Literature</option>
          <option>Business</option>
          <option>Fitness</option>
          <option>Arts & Crafts</option>
        </select>
        
        <select className="filter-select">
          <option>All Areas</option>
          <option>Koregaon Park</option>
          <option>Aundh</option>
          <option>Viman Nagar</option>
          <option>Kharadi</option>
          <option>Hinjewadi</option>
        </select>
        
        <select className="filter-select">
          <option>All Days</option>
          <option>Today</option>
          <option>Tomorrow</option>
          <option>This Weekend</option>
          <option>Next Week</option>
        </select>
        
        <button className="filter-button">Apply Filters</button>
      </div>
      
      <div className="events-grid">
        {loading ? (
          <div className="loading">Loading meetups...</div>
        ) : (
          meetups.map(meetup => (
            <div className="event-card" key={meetup.id}>
              <div className="event-image">
                <img src={meetup.image} alt={meetup.title} />
              </div>
              <div className="event-details">
                <h3>{meetup.title}</h3>
                <div className="event-info">
                  <p><span>Date:</span> {meetup.date}</p>
                  <p><span>Time:</span> {meetup.time}</p>
                  <p><span>Location:</span> {meetup.location}</p>
                  <p><span>Organizer:</span> {meetup.organizer}</p>
                  <p><span>Category:</span> {meetup.category}</p>
                </div>
                <button className="register-button">Join Now</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Meetups;