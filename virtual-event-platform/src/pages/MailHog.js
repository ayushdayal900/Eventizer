import React, { useState } from 'react';

function EmailSender() {
  const [responseMessage, setResponseMessage] = useState('');

  const sendEmail = async () => {
    const emailData = {
      recipient: 'user@eventizer.com',
      subject: 'Test Email from React',
      body: 'This email is sent through Flask and captured by MailHog!'
    };

    try {
      const res = await fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData)
      });
      const data = await res.json();
      setResponseMessage(data.message || data.error);
    } catch (error) {
      setResponseMessage('Error sending email');
    }
  };

  return (
    <div>
      <h2>Welcome to Eventizer</h2>
      <button onClick={sendEmail}>Send Email</button>
      <p>{responseMessage}</p>
    </div>
  );
}

export default EmailSender;