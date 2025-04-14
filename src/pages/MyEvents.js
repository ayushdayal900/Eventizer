import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PagesStyles.css';

function MyEvents() {
  const [activeTab, setActiveTab] = useState('registered');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Mock fetch events data based on the active tab
    setLoading(true);
    setTimeout(() => {
      if (activeTab === 'registered') {
        setEvents([
          {
            id: 1,
            title: "Modern Web Development",
            date: "May 15, 2025",
            time: "10:00 AM - 12:00 PM",
            organizer: "Tech Solutions Inc.",
            status: "Upcoming",
            ticketId: "WEB-12345",
            image: "/api/placeholder/300/200"
          },
          {
            id: 2,
            title: "Data Science for Beginners",
            date: "May 20, 2025",
            time: "2:00 PM - 4:00 PM",
            organizer: "DataMinds Academy",
            status: "Upcoming",
            ticketId: "DATA-67890",
            image: "/api/placeholder/300/200"
          }
        ]);
      } else if (activeTab === 'created') {
        setEvents([
          {
            id: 3,
            title: "Digital Marketing Workshop",
            date: "June 10, 2025",
            time: "11:00 AM - 2:00 PM",
            status: "Active",
            registrations: 45,
            image: "/api/placeholder/300/200"
          }
        ]);
      } else if (activeTab === 'past') {
        setEvents([
          {
            id: 4,
            title: "AI Conference 2024",
            date: "March 10, 2025",
            time: "9:00 AM - 5:00 PM",
            organizer: "AI Research Group",
            status: "Attended",
            ticketId: "AI-54321",
            image: "/api/placeholder/300/200"
          }
        ]);
      }
      setLoading(false);
    }, 800);
  }, [activeTab]);

  const renderRegisteredEvents = () => (
    <div className="registered-events">
      {events.map(event => (
        <div className="event-card horizontal" key={event.id}>
          <div className="event-image">
            <img src={event.image} alt={event.title} />
          </div>
          <div className="event-details">
            <h3>{event.title}</h3>
            <div className="event-info">
              <p><span>Date:</span> {event.date}</p>
              <p><span>Time:</span> {event.time}</p>
              <p><span>Organizer:</span> {event.organizer}</p>
              <p><span>Ticket ID:</span> {event.ticketId}</p>
              <p><span>Status:</span> <span className="status-badge">{event.status}</span></p>
            </div>
            <div className="event-actions">
              <button className="action-button">Download Ticket</button>
              <button className="action-button">Add to Calendar</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCreatedEvents = () => (
    <div className="created-events">
      {events.map(event => (
        <div className="event-card horizontal" key={event.id}>
          <div className="event-image">
            <img src={event.image} alt={event.title} />
          </div>
          <div className="event-details">
            <h3>{event.title}</h3>
            <div className="event-info">
              <p><span>Date:</span> {event.date}</p>
              <p><span>Time:</span> {event.time}</p>
              <p><span>Status:</span> <span className="status-badge">{event.status}</span></p>
              <p><span>Registrations:</span> {event.registrations}</p>
            </div>
            <div className="event-actions">
              <button className="action-button">Manage Event</button>
              <button className="action-button">View Registrations</button>
            </div>
          </div>
        </div>
      ))}
      
      <div className="create-new">
        <Link to="/create-event" className="create-event-button">Create New Event</Link>
      </div>
    </div>
  );

  const renderPastEvents = () => (
    <div className="past-events">
      {events.map(event => (
        <div className="event-card horizontal" key={event.id}>
          <div className="event-image">
            <img src={event.image} alt={event.title} />
          </div>
          <div className="event-details">
            <h3>{event.title}</h3>
            <div className="event-info">
              <p><span>Date:</span> {event.date}</p>
              <p><span>Time:</span> {event.time}</p>
              <p><span>Organizer:</span> {event.organizer}</p>
              <p><span>Status:</span> <span className="status-badge">{event.status}</span></p>
            </div>
            <div className="event-actions">
              <button className="action-button">View Certificate</button>
              <button className="action-button">Event Feedback</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>My Events</h1>
        <p>Manage your events and registrations</p>
      </div>
      
      <div className="tabs">
        <div 
          className={`tab ${activeTab === 'registered' ? 'active' : ''}`}
          onClick={() => setActiveTab('registered')}
        >
          Registered Events
        </div>
        <div 
          className={`tab ${activeTab === 'created' ? 'active' : ''}`}
          onClick={() => setActiveTab('created')}
        >
          Created Events
        </div>
        <div 
          className={`tab ${activeTab === 'past' ? 'active' : ''}`}
          onClick={() => setActiveTab('past')}
        >
          Past Events
        </div>
      </div>
      
      <div className="tab-content">
        {loading ? (
          <div className="loading">Loading events...</div>
        ) : events.length === 0 ? (
          <div className="no-events">
            <p>You don't have any {activeTab} events.</p>
            {activeTab === 'created' && (
              <Link to="/create-event" className="create-event-button">Create Your First Event</Link>
            )}
            {activeTab === 'registered' && (
              <Link to="/" className="create-event-button">Browse Events</Link>
            )}
          </div>
        ) : (
          <>
            {activeTab === 'registered' && renderRegisteredEvents()}
            {activeTab === 'created' && renderCreatedEvents()}
            {activeTab === 'past' && renderPastEvents()}
          </>
        )}
      </div>
    </div>
  );
}

export default MyEvents;