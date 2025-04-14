// src/zoom_meeting.js
import React, { useEffect } from 'react';
import { ZoomMtg } from '@zoomus/websdk';
import '@zoomus/websdk/dist/css/bootstrap.css';
import '@zoomus/websdk/dist/css/react-select.css';

ZoomMtg.setZoomJSLib('https://source.zoom.us/2.18.0/lib', '/av');
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

function ZoomMeeting() {
  useEffect(() => {
    const meetingConfig = {
      apiKey: 'YOUR_API_KEY',
      signature: 'YOUR_SIGNATURE', // Use backend-generated signature
      meetingNumber: 'YOUR_MEETING_ID',
      passWord: 'YOUR_PASSWORD',
      userName: 'Your Name',
      userEmail: '',
      role: 0
    };

    ZoomMtg.init({
      leaveUrl: 'http://localhost:3000',
      success: () => {
        ZoomMtg.join({
          ...meetingConfig,
          success: () => console.log('✅ Joined Zoom Meeting'),
          error: (err) => console.error('❌ Join Error:', err)
        });
      },
      error: (err) => console.error('❌ Init Error:', err)
    });
  }, []);

  return <div id="zmmtg-root"></div>;
}

export default ZoomMeeting;
