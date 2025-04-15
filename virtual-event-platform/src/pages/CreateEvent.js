import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateEvent.css';

function CreateEvent() {
  const [activeStep, setActiveStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [eventMode, setEventMode] = useState('');
  const [formData, setFormData] = useState({
    eventName: '',
    description: '',
    eventType: '',
    eventMode: '',
    category: '',
    startDate: '',
    endDate: '',
    language: '',
    venueName: '',
    venueAddress: '',
    paymentMethod: '',
    organizerName: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const renderEventSection = () => (
    <div className="form-section">
      <fieldset className="full-width">
        <legend>Event Information</legend>
        <label>Name of Event</label>
        <input
          type="text"
          placeholder="Enter your event name"
          name="eventName"
          value={formData.eventName}
          onChange={handleInputChange}
        />
        <label>Description</label>
        <textarea
          placeholder="Description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        ></textarea>
        <label>Event Type</label>
        <select
          name="eventType"
          value={formData.eventType}
          onChange={handleInputChange}
        >
          <option value="">Type</option>
          <option value="Webinar">Webinar</option>
          <option value="Conference">Conference</option>
          <option value="Meetup">Meetup</option>
        </select>
        <label>Event Mode</label>
        <select
          name="eventMode"
          value={formData.eventMode}
          onChange={(e) => {
            handleInputChange(e);
            setEventMode(e.target.value);
          }}
        >
          <option value="">Mode</option>
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
        </select>
        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
        >
          <option value="">Category</option>
          <option value="Technology">Technology</option>
          <option value="Education">Education</option>
          <option value="Health">Health</option>
          <option value="Business">Business</option>
        </select>
        <label>Start Date & Time</label>
        <input
          type="datetime-local"
          name="startDate"
          value={formData.startDate}
          onChange={handleInputChange}
        />
        <label>End Date & Time</label>
        <input
          type="datetime-local"
          name="endDate"
          value={formData.endDate}
          onChange={handleInputChange}
        />
        <label>Language</label>
        <select
          name="language"
          value={formData.language}
          onChange={handleInputChange}
        >
          <option value="">Language</option>
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
          <option value="Marathi">Marathi</option>
        </select>

        <label>Upload Event Poster</label>
        <input type="file" />
      </fieldset>

      <div className="double-row">
        <fieldset>
          <legend>Organisation Details</legend>
          <label>Organizer/Company Name</label>
          <input
            type="text"
            placeholder="Enter Name"
            name="organizerName"
            value={formData.organizerName}
            onChange={handleInputChange}
          />

          <label>Organizer/Company Email</label>
          <input type="email" placeholder="Enter Email" name="organizerEmail" />

          <label>Contact Number</label>
          <input type="tel" placeholder="Contact Number" name="contactNumber" />
        </fieldset>

        <fieldset>
          <legend>Ticketing & Registration</legend>
          <label>Ticket Type</label>
          <select name="ticketType">
            <option>Type</option>
            <option>Free</option>
            <option>Paid</option>
            <option>Donation</option>
          </select>

          <label>Attendee Limit</label>
          <input type="number" placeholder="Enter Number" name="attendeeLimit" />

          <label>Last Date of Registration</label>
          <input type="date" name="registrationDeadline" />
        </fieldset>
      </div>
    </div>
  );

  const renderVenueSection = () => (
    <div className="form-section">
      <fieldset disabled={eventMode !== 'Offline'}>
        <legend>Venue (Offline Event Only)</legend>
        <label>Venue Name</label>
        <input
          type="text"
          placeholder="Enter location or venue name"
          name="venueName"
          value={formData.venueName}
          onChange={handleInputChange}
        />
        <label>Full Address</label>
        <input
          type="text"
          placeholder="Street, City, State, PIN"
          name="venueAddress"
          value={formData.venueAddress}
          onChange={handleInputChange}
        />
      </fieldset>
    </div>
  );

  const renderPaymentSection = () => (
    <div className="form-section">
      <fieldset>
        <legend>Payment</legend>
        <label>Payment Method</label>
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={(e) => {
            handleInputChange(e);
            setPaymentMethod(e.target.value);
          }}
        >
          <option value="">Select Payment Method</option>
          <option value="bank">Bank Transfer</option>
          <option value="upi">UPI</option>
          <option value="paypal">PayPal</option>
        </select>
        {paymentMethod === 'bank' && (
          <>
            <label>Beneficiary Name</label>
            <input type="text" placeholder="Enter Beneficiary name" />
            <label>Account Number</label>
            <input type="text" placeholder="Enter account number" />
            <label>Bank Name</label>
            <select>
              <option>Select bank name</option>
              <option>State Bank of India</option>
              <option>HDFC Bank</option>
              <option>ICICI Bank</option>
              <option>Axis Bank</option>
            </select>
            <label>IFSC Code</label>
            <input type="text" placeholder="Enter Bank IFSC" />
          </>
        )}
        {paymentMethod === 'upi' && (
          <>
            <label>UPI ID</label>
            <input type="text" placeholder="example@bank" />
          </>
        )}
        {paymentMethod === 'paypal' && (
          <>
            <label>PayPal Email</label>
            <input type="email" placeholder="example@paypal.com" />
          </>
        )}
      </fieldset>
    </div>
  );

  const handleNext = () => {
    setActiveStep((prev) => Math.min(prev + 1, 3));
  };

  const handlePrevious = () => {
    setActiveStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = ['eventName', 'eventType', 'eventMode', 'startDate', 'endDate'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill in the ${field} field.`);
        return;
      }
    }

    if (eventMode === 'Offline' && (!formData.venueName || !formData.venueAddress)) {
      alert('Please fill in the venue details for offline events.');
      return;
    }

    const posterInput = document.querySelector('input[type="file"]');
    const poster = posterInput?.files[0] ? URL.createObjectURL(posterInput.files[0]) : '';

    const newEvent = {
      ...formData,
      createdByUser: true,
      startDate: new Date(formData.startDate).toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      endDate: new Date(formData.endDate).toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      startTime: new Date(formData.startDate).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }),
      endTime: new Date(formData.endDate).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }),
      location: eventMode === 'Online' ? 'Online' : formData.venueName || 'N/A',
      organizer: formData.organizerName || 'N/A',
      poster,
    };

    const existingEvents = JSON.parse(localStorage.getItem(formData.eventType)) || [];
    localStorage.setItem(formData.eventType, JSON.stringify([...existingEvents, newEvent]));

    alert('Event submitted successfully!');
    setActiveStep(1);
    navigate(`/${formData.eventType.toLowerCase()}`);
  };

  return (
    <div className="app-container">
      <div className="steps">
        <div className={`step ${activeStep === 1 ? 'active' : ''}`} onClick={() => setActiveStep(1)}>
          1. Event Information
        </div>
        <div className={`step ${activeStep === 2 ? 'active' : ''}`} onClick={() => setActiveStep(2)}>
          2. Venue
        </div>
        <div className={`step ${activeStep === 3 ? 'active' : ''}`} onClick={() => setActiveStep(3)}>
          3. Payment
        </div>
      </div>

      <form className="event-form" onSubmit={handleSubmit}>
        {activeStep === 1 && renderEventSection()}
        {activeStep === 2 && renderVenueSection()}
        {activeStep === 3 && renderPaymentSection()}

        <div className="navigation-buttons">
          {activeStep > 1 && (
            <button type="button" className="form-button" onClick={handlePrevious}>
              Previous
            </button>
          )}
          {activeStep < 3 && (
            <button type="button" className="form-button" onClick={handleNext}>
              Next
            </button>
          )}
          {activeStep === 3 && (
            <button type="submit" className="form-button">
              Submit Event
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default CreateEvent;
