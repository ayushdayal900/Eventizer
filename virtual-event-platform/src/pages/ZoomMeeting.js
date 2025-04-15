// ZoomMeeting.js
import React, { useEffect, useState } from 'react';
import { ZoomMtg } from '@zoomus/websdk';
import axios from 'axios';
import './ZoomMeeting.css';

// Zoom SDK Setup (should run once)
ZoomMtg.setZoomJSLib('https://source.zoom.us/2.18.0/lib', '/av');
ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

const ZoomMeeting = () => {
  const [meetingStarted, setMeetingStarted] = useState(false);

  const meetingConfig = {
    meetingNumber: 'YOUR_MEETING_ID',
    role: 0,
    sdkKey: 'YOUR_SDK_KEY',
    userName: 'Guest User',
    userEmail: '',
    passWord: 'YOUR_MEETING_PASSWORD',
  };

  const startMeeting = async () => {
    try {
      const { data } = await axios.post('http://localhost:5000/zoom-signature', {
        meetingNumber: meetingConfig.meetingNumber,
        role: meetingConfig.role,
      });

      document.getElementById('zmmtg-root').style.display = 'block'; // Show SDK DOM

      ZoomMtg.init({
        leaveUrl: 'http://localhost:3000/home',
        success: () => {
          ZoomMtg.join({
            signature: data.signature,
            sdkKey: meetingConfig.sdkKey,
            meetingNumber: meetingConfig.meetingNumber,
            userName: meetingConfig.userName,
            passWord: meetingConfig.passWord,
            success: () => console.log('✅ Joined Zoom Meeting'),
            error: (err) => console.error('❌ Zoom Join Error:', err),
          });
        },
        error: (err) => {
          console.error('❌ Zoom Init Error:', err);
        },
      });

      setMeetingStarted(true);
    } catch (error) {
      console.error('❌ Signature Fetch Error:', error);
    }
  };

  return (
    <div>
      {!meetingStarted && (
        <div className="zoom-join-container">
          <button onClick={startMeeting} className="join-btn">
            Join Zoom Meeting
          </button>
        </div>
      )}
      <div id="zmmtg-root" style={{ display: 'none', zIndex: 999 }} />
    </div>
  );
};

export default ZoomMeeting;
