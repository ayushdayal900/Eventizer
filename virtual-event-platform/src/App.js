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

import CreateEvent from './pages/CreateEvent';
import AdminDashboard from './pages/AdminDashboard';
import AllEvents from './pages/AllEvents';
// import ZoomMeeting from './pages/ZoomMeeting'; // ✅ Make sure it's imported once

import './App.css';

function App() {
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
            {/* <Route path="/zoom" element={<ZoomMeeting />} />  */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
