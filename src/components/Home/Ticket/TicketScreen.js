import React from 'react';
import './TicketScreen.css';

const TicketScreen = ({ ticketInfo }) => {
  return (
    <div className="ticket-screen-background">
      <div className="ticket-screen-container">
        <h2 className="ticket-screen-title">Ticket Information</h2>
        <div className="ticket-info">
          <p><strong>User Name:</strong> {ticketInfo.user_name}</p>
          <p><strong>Route Name:</strong> {ticketInfo.route}</p>
          <p><strong>Ticket Type:</strong> {ticketInfo.type}</p>
          <p><strong>Fare:</strong> ₹{ticketInfo.fare}</p>
          <p><strong>Purchase Time:</strong> {new Date(ticketInfo.purchase_time).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default TicketScreen;
