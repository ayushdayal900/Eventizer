import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PagesStyles.css';

function MyEvents() {
  const [activeTab, setActiveTab] = useState('registered');
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:5000/api/events');
        const data = await res.json();
        setAllEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
        setAllEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const now = new Date();

  const registeredEvents = allEvents.filter(event => {
    return !event.createdByUser && new Date(event.endDate) >= now;
  });

  const createdEvents = allEvents.filter(event => event.createdByUser);

  const pastEvents = allEvents.filter(event => new Date(event.endDate) < now);

  const getImageUrl = (event) => {
    if (event.posterPath) {
      return `http://localhost:5000${event.posterPath.startsWith('/') ? '' : '/'}${event.posterPath}`;
    }
    if (event.image) {
      return event.image.startsWith('http') ? event.image : `http://localhost:5000${event.image.startsWith('/') ? '' : '/'}${event.image}`;
    }
    return 'http://example.com/placeholder.jpg';
  };

  const renderRegisteredEvents = () => (
    <div className="events-grid">
      {registeredEvents.map(event => (
        <div className="event-card" key={event._id}>
          <div className="event-image">
            <img src={getImageUrl(event)} alt={event.eventName} />
          </div>
          <div className="event-details">
            <h3>{event.eventName}</h3>
            <div className="event-info">
              <p><span>Date:</span> {event.startDate}</p>
              <p><span>Time:</span> {event.startDate}</p>
              <p><span>Organizer:</span> {event.organizerName}</p>
              <p><span>Category:</span> {event.category}</p>
              <p>
                <span>Status:</span>
                <span className="status-badge">Upcoming</span>
              </p>
            </div>
            <div className="event-actions">
              <button className="register-button">Download Ticket</button>
              <button className="register-button">Add to Calendar</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCreatedEvents = () => (
    <div className="events-grid">
      {createdEvents.map(event => (
        <div className="event-card" key={event._id}>
          <div className="event-image">
            <img src={getImageUrl(event)} alt={event.eventName} />
          </div>
          <div className="event-details">
            <h3>{event.eventName}</h3>
            <div className="event-info">
              <p><span>Date:</span> {event.startDate}</p>
              <p><span>Time:</span> TBD</p>
              <p><span>Status:</span> <span className="status-badge">Active</span></p>
              <p><span>Registrations:</span> N/A</p>
            </div>
            <div className="event-actions">
              <button className="register-button">Manage Event</button>
              <button className="register-button">View Registrations</button>
            </div>
          </div>
        </div>
      ))}
      <div className="create-new">
        <Link to="/create-event" className="register-button">
          Create New Event
        </Link>
      </div>
    </div>
  );

  const renderPastEvents = () => (
    <div className="events-grid">
      {pastEvents.map(event => (
        <div className="event-card" key={event._id}>
          <div className="event-image">
            <img src={getImageUrl(event)} alt={event.eventName} />
          </div>
          <div className="event-details">
            <h3>{event.eventName}</h3>
            <div className="event-info">
              <p><span>Date:</span> {event.startDate}</p>
              <p><span>Time:</span> TBD</p>
              <p><span>Organizer:</span> {event.organizerName}</p>
              <p>
                <span>Status:</span>
                <span className="status-badge">Attended</span>
              </p>
            </div>
            <div className="event-actions">
              <button className="register-button">View Certificate</button>
              <button className="register-button">Event Feedback</button>
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
        ) : (
          <>
            {activeTab === 'registered' && registeredEvents.length > 0 && renderRegisteredEvents()}
            {activeTab === 'created' && createdEvents.length > 0 && renderCreatedEvents()}
            {activeTab === 'past' && pastEvents.length > 0 && renderPastEvents()}
            {((activeTab === 'registered' && registeredEvents.length === 0) ||
              (activeTab === 'created' && createdEvents.length === 0) ||
              (activeTab === 'past' && pastEvents.length === 0)) && (
              <div className="no-events">
                <p>You don't have any {activeTab} events.</p>
                {activeTab === 'created' && (
                  <Link to="/create-event" className="register-button">
                    Create Your First Event
                  </Link>
                )}
                {activeTab === 'registered' && (
                  <Link to="/" className="register-button">
                    Browse Events
                  </Link>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default MyEvents;
