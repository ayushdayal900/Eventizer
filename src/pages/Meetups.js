import React, { useState, useEffect } from 'react';
import './PagesStyles.css';

function Meetups() {
  const [meetups, setMeetups] = useState([]);
  const [filteredMeetups, setFilteredMeetups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [registeredMeetups, setRegisteredMeetups] = useState({});
  const [filters, setFilters] = useState({
    category: 'All Categories',
    date: 'All Dates',
    price: 'Price - Any',
  });

  useEffect(() => {
    setTimeout(() => {
      const predefinedMeetups = [
        {
          id: 1,
          title: "Pune JavaScript Developers",
          date: "2025-04-20",
          time: "6:00 PM - 8:00 PM",
          location: "Workspaces Co., Koregaon Park",
          organizer: "Pune JS Community",
          category: "Technology",
          price: 0,
          image: "/api/placeholder/300/200"
        },
        {
          id: 2,
          title: "Book Lovers Club Meetup",
          date: "2025-04-25",
          time: "5:00 PM - 7:00 PM",
          location: "Cafe Reading Room, Aundh",
          organizer: "Pune Readers Circle",
          category: "Books & Literature",
          price: 50,
          image: "/api/placeholder/300/200"
        },
        {
          id: 3,
          title: "Entrepreneurship Networking Event",
          date: "2025-05-02",
          time: "7:00 PM - 9:00 PM",
          location: "Business Hub, Viman Nagar",
          organizer: "Startup Catalysts",
          category: "Business",
          price: 100,
          image: "/api/placeholder/300/200"
        }
      ];

      const storedMeetups = JSON.parse(localStorage.getItem('Meetup')) || [];
      const allMeetups = [...predefinedMeetups, ...storedMeetups];
      const uniqueMeetups = Array.from(new Map(allMeetups.map((event) => [event.id, event])).values());

      setMeetups(uniqueMeetups);
      setFilteredMeetups(uniqueMeetups);
      setLoading(false);
    }, 800);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    let filtered = [...meetups];

    // Filter by category
    if (filters.category !== 'All Categories') {
      filtered = filtered.filter((meetup) => meetup.category === filters.category);
    }

    // Filter by date
    if (filters.date !== 'All Dates') {
      const today = new Date();
      filtered = filtered.filter((meetup) => {
        const eventDate = new Date(meetup.date);
        if (filters.date === 'Today') {
          return eventDate.toDateString() === today.toDateString();
        } else if (filters.date === 'Tomorrow') {
          const tomorrow = new Date(today);
          tomorrow.setDate(today.getDate() + 1);
          return eventDate.toDateString() === tomorrow.toDateString();
        } else if (filters.date === 'This Weekend') {
          const day = today.getDay();
          const weekendStart = new Date(today);
          weekendStart.setDate(today.getDate() + (5 - day));
          const weekendEnd = new Date(weekendStart);
          weekendEnd.setDate(weekendStart.getDate() + 2);
          return eventDate >= weekendStart && eventDate <= weekendEnd;
        } else if (filters.date === 'This Month') {
          return eventDate.getMonth() === today.getMonth() && eventDate.getFullYear() === today.getFullYear();
        }
        return true;
      });
    }

    // Filter by price
    if (filters.price !== 'Price - Any') {
      filtered = filtered.filter((meetup) => {
        if (filters.price === 'Free') return meetup.price === 0;
        if (filters.price === 'Paid') return meetup.price > 0;
        return true;
      });
    }

    setFilteredMeetups(filtered);
  }, [filters, meetups]);

  const handleRegisterClick = (id) => {
    setRegisteredMeetups((prev) => ({
      ...prev,
      [id]: true
    }));
  };

  const handleDelete = (id) => {
    const updatedMeetups = meetups.filter((meetup) => meetup.id !== id);
    setMeetups(updatedMeetups);
    localStorage.setItem('Meetup', JSON.stringify(updatedMeetups));
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Meetups</h1>
        <p>Connect with like-minded people at local meetups</p>
      </div>

      <div className="filters">
        <select
          className="filter-select"
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
        >
          <option>All Categories</option>
          <option>Technology</option>
          <option>Books & Literature</option>
          <option>Business</option>
        </select>

        <select
          className="filter-select"
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
        >
          <option>All Dates</option>
          <option>Today</option>
          <option>Tomorrow</option>
          <option>This Weekend</option>
          <option>This Month</option>
        </select>

        <select
          className="filter-select"
          name="price"
          value={filters.price}
          onChange={handleFilterChange}
        >
          <option>Price - Any</option>
          <option>Free</option>
          <option>Paid</option>
        </select>

        <button className="filter-button" onClick={() => setFilteredMeetups(meetups)}>
          Reset Filters
        </button>
      </div>

      <div className="events-grid">
        {loading ? (
          <div className="loading">Loading meetups...</div>
        ) : (
          filteredMeetups.map((meetup) => (
            <div className="event-card" key={meetup.id}>
              <div className="event-image">
                <img src={meetup.image || '/placeholder.jpg'} alt={meetup.title} />
              </div>
              <div className="event-details">
                <h3>{meetup.title}</h3>
                <div className="event-info">
                  <p>
                    <span>Date:</span> {new Date(meetup.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }) || 'N/A'}
                  </p>
                  <p><span>Time:</span> {meetup.time || 'N/A'}</p>
                  <p><span>Location:</span> {meetup.location || 'N/A'}</p>
                  <p><span>Organizer:</span> {meetup.organizer || 'N/A'}</p>
                  <p><span>Category:</span> {meetup.category || 'N/A'}</p>
                  <p><span>Price:</span> {meetup.price === 0 ? 'Free' : `$${meetup.price}`}</p>
                </div>
                {registeredMeetups[meetup.id] ? (
                  <div className="register-button done">Registered</div>
                ) : (
                  <button
                    className="register-button"
                    onClick={() => handleRegisterClick(meetup.id)}
                  >
                    Register Now
                  </button>
                )}
                {meetup.createdByUser && (
                  <button
                    className="theme-delete-button"
                    onClick={() => handleDelete(meetup.id)}
                  >
                    Delete
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