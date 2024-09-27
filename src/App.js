import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import TicketFare from './components/Home/TicketFare/TicketFare';
import MetroRoutes from './components/Home/MetroRoutes/MetroRoutes';
import PurchasedTickets from './components/Home/PurchasedTickets/PurchasedTickets';
import Register from './components/Home/Register/Register';
import PaymentPage from './components/Home/GenerateTicket/Payment/PaymentPage';
import PaymentSuccess from './components/Home/GenerateTicket/Payment/PaymentSuccess';
import PaymentFailed from './components/Home/GenerateTicket/Payment/PaymentFailed';
import TicketDetails from './components/Home/GenerateTicket/TicketDetails';
import { useState } from 'react';
import CalculateFare from './components/Home/MetroRoutes/CalculateFare';
import Login from './components/Home/Register/Login';
import TicketScreen from './components/Home/Ticket/TicketScreen';
import About from './components/Home/About/About';
import AdminDashboard from './components/Home/Admin/AdminDashboard';
import UserTable from './components/Home/Admin/Grid/UserTable';
import TicketFareTable from './components/Home/Admin/Grid/TicketFareTable';
import PaymentTransactionTable from './components/Home/Admin/Grid/PaymentTransactionTable';

function App() {
  const [ticket,setTicket]=useState()
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/register' element={<Register/>} />
        <Route path="/metroroutes" element={<MetroRoutes />} />
        <Route path="/ticketfare" element={<TicketFare />} />
        <Route path="/calculatefare" element={<CalculateFare ticketInfo={ticket} setTicketInfo={setTicket}/>} />
        <Route path="/ticketscreen" element={<TicketScreen ticketInfo={ticket}/>} />
        <Route path="/purchasedTickets" element={<PurchasedTickets />} />
        <Route path="/paymentinitiate" element={<PaymentPage ticketInfo={ticket} />} />
        <Route path="/paymentsuccess" element={<PaymentSuccess/>} />
        <Route path="/paymentfailed" element={<PaymentFailed/>} />
        <Route path="/ticket-details" element={<TicketDetails ticketInfo={ticket}/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/admindashboard" element={<AdminDashboard/>}/>
        <Route path="/users" element={<UserTable />} />
        <Route path="/ticketfaretable" element={<TicketFareTable />} />
        <Route path="/paymentdetails" element={<PaymentTransactionTable />} />
      </Routes>
    </Router>
  );
}

export default App;
