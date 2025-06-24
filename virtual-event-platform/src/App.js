import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';

import Home from './pages/Home';
import Webinars from './pages/Webinars';
import Conferences from './pages/Conferences';
import Meetups from './pages/Meetups';
import ListYourEvent from './pages/ListYourEvent';
import Offers from './pages/Offers';
import GiftCards from './pages/GiftCards';
import Signup from './pages/Signup';
import Login from './pages/Login';

import MyEvents from './pages/MyEvents';
import RecordedVideos from './pages/RecordedVideo';

import CreateEvent from './pages/CreateEvent';
import AdminDashboard from './pages/AdminDashboard';
import AllEvents from './pages/AllEvents';
import Meeting from './meeting.js'; // ✅ Make sure it's imported once
// import ZoomMeeting from './pages/ZoomMeeting'; // ✅ Make sure it's imported once

import './App.css';

function App() {

  const payload = {
    sdkKey: "rAv_eE0WQXeVwuKknVbnSQ",
    sdkSecret: "QjEX2B1ppWhs6W127324v8KE736BV7WB",
    meetingNumber: "89753305986",
    role: 0,
    userName: "Eventizer User",
    userEmail: "user@example.com",
    password: "1rn4rV",
    leaveUrl: "http://localhost:3000/meeting"
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/webinars" element={<Webinars />} />
            <Route path="/conferences" element={<Conferences />} />
            <Route path="/meetups" element={<Meetups />} />
            <Route path="/listyourevent" element={<ListYourEvent />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/giftcards" element={<GiftCards />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/myevents" element={<MyEvents />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/events" element={<AllEvents />} />
            <Route path="/recorded-videos" element={<RecordedVideos />} />
            {/* <Route path="/zoom" element={<ZoomMeeting />} />  */}
            <Route path="/meeting"  element={<Meeting payload={payload}/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
