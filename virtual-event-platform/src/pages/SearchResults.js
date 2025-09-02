import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchResult.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResults() {
  const query = useQuery();
  const searchText = query.get('query') || '';
  const selectedCity = query.get('city') || '';
  
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = new URL('http://localhost:5000/api/search');
        if (searchText) url.searchParams.append('query', searchText);
        if (selectedCity && selectedCity !== 'City') url.searchParams.append('city', selectedCity);

        const response = await fetch(url.toString());
        if (!response.ok) throw new Error('Failed to fetch search results');

        const data = await response.json();
        setEvents(data);
      } catch (err) {
        console.error('Search error:', err);
        setError('Something went wrong while fetching results.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [searchText, selectedCity]);

  return (
    <div className="search-results">
      <h2>
        Showing results for <strong>{searchText || 'All Events'}</strong>
        {selectedCity && selectedCity !== 'City' && <> in <strong>{selectedCity}</strong></>}
      </h2>

      {loading && <p>Loading results...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {!loading && !error && events.length === 0 && (
        <p>No matching events found.</p>
      )}

      {!loading && !error && events.length > 0 && (
        <ul className="event-list">
          {events.map(event => (
            <li key={event._id} className="event-item">
              <h3>{event.eventName}</h3>
              <p><strong>Type:</strong> {event.type}</p>
              <p><strong>Category:</strong> {event.category}</p>
              <p><strong>Venue:</strong> {event.venueAddress}</p>
              <p>{event.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchResults;
