import React, { useState } from 'react';
import './CreateEvent.css';
import { useNavigate } from 'react-router-dom';


function CreateEvent() {
  const [activeStep, setActiveStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');
  const navigate = useNavigate();


  const [eventData, setEventData] = useState({
    eventName: '',
    description: '',
    type: '',
    mode: '',
    category: '',
    startDate: '',
    endDate: '',
    language: '',
    poster: null,
    organizerName: '',
    organizerEmail: '',
    contactNumber: '',
    ticketType: '',
    attendeeLimit: '',
    registrationDeadline: '',
    venueName: '',
    venueAddress: '',
    googleMapLink: '',
    paymentMethod: '',
    beneficiaryName: '',
    accountNumber: '',
    bankName: '',
    ifsc: '',
    upiId: '',
    paypalEmail: ''
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setEventData((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in eventData) {
      formData.append(key, eventData[key]);
    }

    try {
      const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        alert('Event submitted successfully!');
        navigate('/events');
      } else {
        alert('Submission failed: ' + result.error);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred.');
    }
  };

  const renderEventSection = () => (
    <div className="form-section">
      <fieldset className="full-width">
        <legend>Event Information</legend>
        <input type="text" name="eventName" placeholder="Event Name" value={eventData.eventName} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={eventData.description} onChange={handleChange}></textarea>

        <select name="type" value={eventData.type} onChange={handleChange}>
          <option>Type</option>
          <option>Webinar</option>
          <option>Conference</option>
          <option>Meetup</option>
        </select>

        <select name="mode" value={eventData.mode} onChange={handleChange}>
          <option>Mode</option>
          <option>Online</option>
          <option>Offline</option>
        </select>

        <select name="category" value={eventData.category} onChange={handleChange}>
          <option>Category</option>
          <option>Technology</option>
          <option>Education</option>
          <option>Health</option>
          <option>Business</option>
        </select>

        <input type="datetime-local" name="startDate" value={eventData.startDate} onChange={handleChange} />
        <input type="datetime-local" name="endDate" value={eventData.endDate} onChange={handleChange} />

        <select name="language" value={eventData.language} onChange={handleChange}>
          <option>Language</option>
          <option>English</option>
          <option>Hindi</option>
          <option>Marathi</option>
        </select>

        <input type="file" name="poster" onChange={handleChange} />
      </fieldset>

      <div className="double-row">
        <fieldset>
          <legend>Organisation Details</legend>
          <input type="text" name="organizerName" placeholder="Organizer Name" value={eventData.organizerName} onChange={handleChange} />
          <input type="email" name="organizerEmail" placeholder="Organizer Email" value={eventData.organizerEmail} onChange={handleChange} />
          <input type="tel" name="contactNumber" placeholder="Contact Number" value={eventData.contactNumber} onChange={handleChange} />
        </fieldset>

        <fieldset>
          <legend>Ticketing & Registration</legend>
          <select name="ticketType" value={eventData.ticketType} onChange={handleChange}>
            <option>Type</option>
            <option>Free</option>
            <option>Paid</option>
            <option>Donation</option>
          </select>
          <input type="number" name="attendeeLimit" placeholder="Attendee Limit" value={eventData.attendeeLimit} onChange={handleChange} />
          <input type="date" name="registrationDeadline" value={eventData.registrationDeadline} onChange={handleChange} />
        </fieldset>
      </div>
    </div>
  );

  const renderVenueSection = () => (
    <div className="form-section">
      <fieldset>
        <legend>Venue (Offline Only)</legend>
        <input type="text" name="venueName" placeholder="Venue Name" value={eventData.venueName} onChange={handleChange} />
        <input type="text" name="venueAddress" placeholder="Full Address" value={eventData.venueAddress} onChange={handleChange} />
        <input type="text" name="googleMapLink" placeholder="Google Map Link" value={eventData.googleMapLink} onChange={handleChange} />
      </fieldset>
    </div>
  );

  const renderPaymentSection = () => (
    <div className="form-section">
      <fieldset>
        <legend>Payment</legend>
        <select name="paymentMethod" value={eventData.paymentMethod} onChange={(e) => {
          setPaymentMethod(e.target.value);
          handleChange(e);
        }}>
          <option value="">Select Payment Method</option>
          <option value="bank">Bank Transfer</option>
          <option value="upi">UPI</option>
          <option value="paypal">PayPal</option>
        </select>

        {paymentMethod === 'bank' && (
          <>
            <input type="text" name="beneficiaryName" placeholder="Beneficiary Name" value={eventData.beneficiaryName} onChange={handleChange} />
            <input type="text" name="accountNumber" placeholder="Account Number" value={eventData.accountNumber} onChange={handleChange} />
            <select name="bankName" value={eventData.bankName} onChange={handleChange}>
              <option>Select bank</option>
              <option>State Bank of India</option>
              <option>HDFC Bank</option>
              <option>ICICI Bank</option>
              <option>Axis Bank</option>
            </select>
            <input type="text" name="ifsc" placeholder="IFSC Code" value={eventData.ifsc} onChange={handleChange} />
          </>
        )}

        {paymentMethod === 'upi' && (
          <input type="text" name="upiId" placeholder="example@bank" value={eventData.upiId} onChange={handleChange} />
        )}

        {paymentMethod === 'paypal' && (
          <input type="email" name="paypalEmail" placeholder="PayPal Email" value={eventData.paypalEmail} onChange={handleChange} />
        )}
      </fieldset>
    </div>
  );

  return (
    <div className="app-container">
      <div className="steps">
        <div className={`step ${activeStep === 1 ? 'active' : ''}`} onClick={() => setActiveStep(1)}>1. Event Info</div>
        <div className={`step ${activeStep === 2 ? 'active' : ''}`} onClick={() => setActiveStep(2)}>2. Venue</div>
        <div className={`step ${activeStep === 3 ? 'active' : ''}`} onClick={() => setActiveStep(3)}>3. Payment</div>
      </div>

      <form className="event-form" onSubmit={handleSubmit}>
        {activeStep === 1 && renderEventSection()}
        {activeStep === 2 && renderVenueSection()}
        {activeStep === 3 && renderPaymentSection()}

        <div className="navigation-buttons">
          {activeStep > 1 && <button type="button" onClick={() => setActiveStep(activeStep - 1)}>Previous</button>}
          {activeStep < 3 && <button type="button" onClick={() => setActiveStep(activeStep + 1)}>Next</button>}
          {activeStep === 3 && <button type="submit">Submit</button>}
        </div>
      </form>
    </div>
  );
}

export default CreateEvent;
