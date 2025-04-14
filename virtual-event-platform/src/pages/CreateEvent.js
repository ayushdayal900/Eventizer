import React, { useState } from 'react';
import './CreateEvent.css';
import logo from '../logo.png';

function CreateEvent() {
  const [activeStep, setActiveStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');

  const renderEventSection = () => (
    <div className="form-section">
      <fieldset className="full-width">
        <legend>Event Information</legend>
        <label>Name of Event</label>
        <input type="text" placeholder="Enter your event name" id="eventName" />

        <label>Description</label>
        <textarea placeholder="Description"></textarea>

        <label>Event Type</label>
        <select>
          <option>Type</option>
          <option>Webinar</option>
          <option>Conference</option>
          <option>Meetup</option>
        </select>

        <label>Event Mode</label>
        <select>
          <option>Mode</option>
          <option>Online</option>
          <option>Offline</option>
        </select>

        <label>Category</label>
        <select>
          <option>Category</option>
          <option>Technology</option>
          <option>Education</option>
          <option>Health</option>
          <option>Business</option>
        </select>

        <label>Start Date & Time</label>
        <input type="datetime-local" />

        <label>End Date & Time</label>
        <input type="datetime-local" />

        <label>Language</label>
        <select>
          <option>Language</option>
          <option>English</option>
          <option>Hindi</option>
          <option>Marathi</option>
        </select>

        <label>Upload Event Poster</label>
        <input type="file" />
      </fieldset>

      <div className="double-row">
        <fieldset>
          <legend>Organisation Details</legend>
          <label>Organizer/Company Name</label>
          <input type="text" placeholder="Enter Name" />

          <label>Organizer/Company Email</label>
          <input type="email" placeholder="Enter Email" />

          <label>Contact Number</label>
          <input type="tel" placeholder="Contact Number" />
        </fieldset>

        <fieldset>
          <legend>Ticketing & Registration</legend>
          <label>Ticket Type</label>
          <select>
            <option>Type</option>
            <option>Free</option>
            <option>Paid</option>
            <option>Donation</option>
          </select>

          <label>Attendee Limit</label>
          <input type="number" placeholder="Enter Number" />

          <label>Last Date of Registration</label>
          <input type="date" />
        </fieldset>
      </div>
    </div>
  );

  const renderVenueSection = () => (
    <div className="form-section">
      <fieldset>
        <legend>Venue (Offline Event Only)</legend>
        <label>Venue Name</label>
        <input type="text" placeholder="Enter location or venue name" id="venueName" />

        <label>Full Address</label>
        <input type="text" placeholder="Street, City, State, PIN" id="venueAddress" />

        <label>Google Map Link</label>
        <input type="text" placeholder="Google Map Link" />
      </fieldset>
    </div>
  );

  const renderPaymentSection = () => (
    <div className="form-section">
      <fieldset>
        <legend>Payment</legend>
        <label>Payment Method</label>
        <select onChange={(e) => setPaymentMethod(e.target.value)} value={paymentMethod} id="paymentMode">
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
            <input type="text" placeholder="Enter account number" id="accountNumber" />

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
    // if (activeStep === 1 && !document.getElementById('eventName').value.trim()) return;
    // if (activeStep === 2 && (!document.getElementById('venueName').value.trim() || !document.getElementById('venueAddress').value.trim())) return;
    // if (activeStep === 3) {
    //   const mode = document.getElementById('paymentMode').value;
    //   if (!mode) return;
    //   if (mode === 'bank' && !document.getElementById('accountNumber').value.trim()) return;
    // }
    // setActiveStep((prev) => Math.min(prev + 1, 3));
    setActiveStep((prev) => Math.min(prev + 1, 3));

  };

  const handlePrevious = () => {
    setActiveStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Event submitted successfully!');
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
            <button data-type="button-pre" type="button" onClick={handlePrevious}>
              Previous
            </button>
          )}
          {activeStep < 3 && (
            <button data-type="button-next" type="button" onClick={handleNext}>
              Next
            </button>
          )}
          {activeStep === 3 && (
            <button type="submit">
              Submit Event
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default CreateEvent;
