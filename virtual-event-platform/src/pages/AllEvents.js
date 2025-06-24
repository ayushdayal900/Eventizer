import React, { useEffect, useState } from 'react';

function AllEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/events')
      .then(res => res.json())
      .then(data => {
        console.log('Fetched events:', data); // Debug log
        setEvents(data);
      })
      .catch(err => console.error('Error fetching events:', err));
  }, []);

  return (
    <div>
      <h2>All Events</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {events.length === 0 && <p>No events available.</p>}
        {events.map(event => (
          <div key={event._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h3>{event.eventName}</h3>
            <p>{event.description}</p>
            {event.posterPath && (
              <img
                src={`http://localhost:5000/${event.posterPath.replace(/\\/g, '/')}.png`}
                alt="Poster"
                style={{ width: '200px', height: 'auto' }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllEvents;
