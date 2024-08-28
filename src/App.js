import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import TicketFare from './components/Home/TicketFare/TicketFare';
import Users from './components/Home/Users/Users';
import MetroRoutes from './components/Home/MetroRoutes/MetroRoutes';
import Generate from './components/Home/GenerateTicket/GenerateTicket';
import PurchasedTickets from './components/Home/PurchasedTickets/PurchasedTickets';
import Register from './components/Home/Register/Register';
import PaymentPage from './components/Home/GenerateTicket/Payment/PaymentPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/register' element={<Register/>} />
        <Route path="/metroroutes" element={<MetroRoutes />} />
        <Route path="/ticketfare" element={<TicketFare />} />
        <Route path="/users" element={<Users />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/purchasedTickets" element={<PurchasedTickets />} />
        <Route path="/paymentinitiate" element={<PaymentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
