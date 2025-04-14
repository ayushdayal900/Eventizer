import React, { useState, useEffect } from 'react';
import './PagesStyles.css';
import EventDetail from './EventDetail';

function Meetups() {
  const [meetups, setMeetups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [joinedEvents, setJoinedEvents] = useState([]);

  useEffect(() => {
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
          image: "https://img.freepik.com/free-vector/gradient-halftone-technology-webinar_23-2149195110.jpg"
        },
        {
          id: 2,
          title: "Book Lovers Club Meetup",
          date: "April 25, 2025",
          time: "5:00 PM - 7:00 PM",
          location: "Cafe Reading Room, Aundh",
          organizer: "Pune Readers Circle",
          category: "Books & Literature",
          image: "https://img.freepik.com/free-vector/hand-drawn-book-club-youtube-thumbnail_23-2149702259.jpg"
        },
        {
          id: 3,
          title: "Entrepreneurship Networking",
          date: "May 2, 2025",
          time: "7:00 PM - 9:00 PM",
          location: "Business Hub, Viman Nagar",
          organizer: "Startup Catalysts",
          category: "Business",
          image: "https://img.freepik.com/free-vector/flat-design-business-workshop-youtube-thumbnail-template_23-2149393100.jpg"
        },
        {
          id: 4,
          title: "Finance Management",
          date: "May 2, 2025",
          time: "7:00 PM - 9:00 PM",
          location: "Business Hub, Viman Nagar",
          organizer: "Startup Catalysts",
          category: "Business",
          image: "https://img.freepik.com/free-psd/financial-management-concept_23-2151964759.jpg"
        }
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const handleJoin = (id) => {
    if (!joinedEvents.includes(id)) {
      setJoinedEvents(prev => [...prev, id]);
    }
  };

  const handleImageClick = (meetup) => {
    if (joinedEvents.includes(meetup.id)) {
      setSelectedEvent(meetup);
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
        <h1>Meetups</h1>
        <p>Connect with like-minded people at local meetups</p>
      </div>

      <div className="filters">
        {/* Filters can go here */}
      </div>

      <div className="events-grid">
        {loading ? (
          <div className="loading">Loading meetups...</div>
        ) : (
          meetups.map(meetup => (
            <div className="event-card" key={meetup.id}>
              <div className="event-image">
                <img
                  src={meetup.image}
                  alt={meetup.title}
                  onClick={() => handleImageClick(meetup)}
                  style={{ cursor: joinedEvents.includes(meetup.id) ? 'pointer' : 'default' }}
                />
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
                {joinedEvents.includes(meetup.id) ? (
                  <div className="register-button done">Done</div>
                ) : (
                  <button
                    className="register-button"
                    onClick={() => handleJoin(meetup.id)}
                  >
                    Join Now
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

export default Meetups;
