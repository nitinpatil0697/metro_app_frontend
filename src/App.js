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
import PaymentSuccess from './components/Home/GenerateTicket/Payment/PaymentSuccess';
import PaymentFailed from './components/Home/GenerateTicket/Payment/PaymentFailed';

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
        <Route path="/paymentsuccess" element={<PaymentSuccess/>} />
        <Route path="/paymentfailed" element={<PaymentFailed/>} />
      </Routes>
    </Router>
  );
}

export default App;
