import React, { useState, useEffect } from 'react';
import './PagesStyles.css';

function Conferences() {
  const [conferences, setConferences] = useState([]);
  const [filteredConferences, setFilteredConferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [registeredConferences, setRegisteredConferences] = useState({});
  const [filters, setFilters] = useState({
    category: 'All Categories',
    date: 'All Dates',
    price: 'Price - Any',
  });

  useEffect(() => {
    setTimeout(() => {
      const predefinedConferences = [
        {
          id: 1,
          title: "Tech Innovations 2025",
          date: "2025-06-10",
          time: "9:00 AM - 5:00 PM",
          location: "Tech Park, Bangalore",
          organizer: "Tech World",
          category: "Technology",
          price: 0,
          image: "/api/placeholder/300/200"
        },
        {
          id: 2,
          title: "Business Growth Strategies",
          date: "2025-06-15",
          time: "10:00 AM - 4:00 PM",
          location: "Business Center, Mumbai",
          organizer: "Business Leaders",
          category: "Business",
          price: 100,
          image: "/api/placeholder/300/200"
        }
      ];

      const storedConferences = JSON.parse(localStorage.getItem('Conference')) || [];
      const allConferences = [...predefinedConferences, ...storedConferences];
      const uniqueConferences = Array.from(new Map(allConferences.map((event) => [event.id, event])).values());

      setConferences(uniqueConferences);
      setFilteredConferences(uniqueConferences);
      setLoading(false);
    }, 800);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    let filtered = [...conferences];

    // Filter by category
    if (filters.category !== 'All Categories') {
      filtered = filtered.filter((conference) => conference.category === filters.category);
    }

    // Filter by date
    if (filters.date !== 'All Dates') {
      const today = new Date();
      filtered = filtered.filter((conference) => {
        const eventDate = new Date(conference.date);
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
      filtered = filtered.filter((conference) => {
        if (filters.price === 'Free') return conference.price === 0;
        if (filters.price === 'Paid') return conference.price > 0;
        return true;
      });
    }

    setFilteredConferences(filtered);
  }, [filters, conferences]);

  const handleRegisterClick = (id) => {
    setRegisteredConferences((prev) => ({
      ...prev,
      [id]: true
    }));
  };

  const handleDelete = (id) => {
    const updatedConferences = conferences.filter((conference) => conference.id !== id);
    setConferences(updatedConferences);
    localStorage.setItem('Conference', JSON.stringify(updatedConferences));
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Conferences</h1>
        <p>Explore upcoming conferences and events</p>
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
          <option>Business</option>
          <option>Education</option>
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

        <button className="filter-button" onClick={() => setFilteredConferences(conferences)}>
          Reset Filters
        </button>
      </div>

      <div className="events-grid">
        {loading ? (
          <div className="loading">Loading conferences...</div>
        ) : (
          filteredConferences.map((conference) => (
            <div className="event-card" key={conference.id}>
              <div className="event-image">
                <img src={conference.image || '/placeholder.jpg'} alt={conference.title} />
              </div>
              <div className="event-details">
                <h3>{conference.title}</h3>
                <div className="event-info">
                  <p>
                    <span>Date:</span> {new Date(conference.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }) || 'N/A'}
                  </p>
                  <p><span>Time:</span> {conference.time || 'N/A'}</p>
                  <p><span>Location:</span> {conference.location || 'N/A'}</p>
                  <p><span>Organizer:</span> {conference.organizer || 'N/A'}</p>
                  <p><span>Category:</span> {conference.category || 'N/A'}</p>
                  <p><span>Price:</span> {conference.price === 0 ? 'Free' : `$${conference.price}`}</p>
                </div>
                {registeredConferences[conference.id] ? (
                  <div className="register-button done">Registered</div>
                ) : (
                  <button
                    className="register-button"
                    onClick={() => handleRegisterClick(conference.id)}
                  >
                    Register Now
                  </button>
                )}
                {conference.createdByUser && (
                  <button
                    className="theme-delete-button"
                    onClick={() => handleDelete(conference.id)}
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

export default Conferences;
