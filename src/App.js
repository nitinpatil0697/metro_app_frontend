import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import TicketFare from './components/Home/TicketFare/TicketFare';
import Users from './components/Home/Users/Users';
import MetroRoutes from './components/Home/MetroRoutes/MetroRoutes';
import Generate from './components/Home/GenerateTicket/GenerateTicket';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/metroroutes" element={<MetroRoutes />} />
        <Route path="/ticketfare" element={<TicketFare />} />
        <Route path="/users" element={<Users />} />
        <Route path="/generate" element={<Generate />} />
      </Routes>
    </Router>
  );
}

export default App;
