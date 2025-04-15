import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ZoomMtg } from '@zoomus/websdk';
import axios from 'axios';
import './ZoomMeeting.css';

// ✅ Setup SDK only once globally
ZoomMtg.setZoomJSLib('https://source.zoom.us/2.18.0/lib', '/av');
ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

const ZoomMeeting = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const config = location.state;

  useEffect(() => {
    if (!config || !config.meetingNumber) {
      alert('Missing meeting info.');
      navigate('/home');
      return;
    }

    const startMeeting = async () => {
      try {
        const { data } = await axios.post('http://localhost:5000/zoom-signature', {
          meetingNumber: config.meetingNumber,
          role: 0,
        });

        ZoomMtg.init({
          leaveUrl: 'http://localhost:3000',
          success: () => {
            ZoomMtg.join({
              signature: data.signature,
              sdkKey: 'Sr4qjqd6TNyZ9EsFtjR7g',
              meetingNumber: config.meetingNumber,
              userName: config.userName,
              passWord: config.password,
              success: () => console.log('Zoom joined'),
              error: (err) => console.error('Join error', err),
            });
          },
          error: (err) => console.error('Init error', err),
        });
      } catch (err) {
        console.error('Signature error', err);
      }
    };

    startMeeting();
  }, [config, navigate]);

  return (
    <div className="zoom-wrapper">
      <div id="zmmtg-root" />
    </div>
  );
};

export default ZoomMeeting;
