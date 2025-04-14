// import React from 'react';
// // import LandingPage from './components/LandingPage'; // Corrected the path
// import CreateEvent from './components/CreateEvent';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <h1 className="header">Create Event</h1>
//       <CreateEvent />
//       {/* <LandingPage /> */}
//     </div>
//   );
// }

// export default App;



import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
// import Home from './pages/Home';
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
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="content">
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/webinars" element={<Webinars />} />
            <Route path="/conferences" element={<Conferences />} />
            <Route path="/meetups" element={<Meetups />} />
            <Route path="/listyourevent" element={<ListYourEvent />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/giftcards" element={<GiftCards />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/myevents" element={<MyEvents />} />
            <Route path="/create-event" element={<CreateEvent />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
