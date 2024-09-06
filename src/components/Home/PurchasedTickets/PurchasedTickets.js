import React, { useState } from 'react';
import TicketScreen from '../Ticket/TicketScreen';
import './PurchasedTickets.css';
import {fetchData} from '../../../utils/ApiHandlers';

const PurchasedTickets = () => {
  const [username, setUsername] = useState('');
  const [ticketData, setTicketData] = useState([]);
  const [displayedTickets, setDisplayedTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const API_URL = `http://localhost:8080/vendingMachine/allTickets/${username}`;
    
    try {
      const response = await fetchData(API_URL);
      const tickets = response.data;
      setTicketData(tickets);
      setDisplayedTickets(tickets.slice(0, 10)); // Display only the first 10 tickets
    } catch (error) {
      console.error('Error fetching tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTicketClick = (ticket) => {
    setDisplayedTickets([ticket]); // Display only the selected ticket
  };

  return (
    <div className="tickets-container">
      <h1 className='purchased-ticket-title'>Purchased Tickets</h1>
      
      {/* Conditionally render form, ticket list, or detailed ticket screen */}
      {!ticketData.length ? (
        <form className="tickets-form" onSubmit={handleSubmit}>
          <label className="tickets-label">
            Enter Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="tickets-input"
            />
          </label>
          <button type="submit" className="tickets-button" disabled={loading}>
            {loading ? 'Loading...' : 'Fetch Tickets'}
          </button>
        </form>
      ) : (
        <div className="tickets-list">
          <h2>Purchased Tickets for {username}</h2>
          <ul>
            {displayedTickets.map(ticket => (
              <li key={ticket.id} onClick={() => handleTicketClick(ticket)}>
                {ticket.route} - {ticket.type} - {ticket.fare} - {ticket.purchase_time}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Render TicketScreen if a single ticket is selected */}
      {displayedTickets.length === 1 && (
        <TicketScreen ticketInfo={displayedTickets[0]} />
      )}
    </div>
  );
};

export default PurchasedTickets;
