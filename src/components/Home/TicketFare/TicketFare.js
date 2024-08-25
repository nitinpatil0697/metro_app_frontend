import React, { useEffect, useState } from 'react';
import { fetchData } from '../../../utils/ApiHandlers';
import './TicketFare.css';

const TicketFare = () => {
  const API_URL = 'http://localhost:8080/vendingMachine/allTicketFare';
  const [fares, setFares] = useState([]);

  useEffect(() => {
    const fetchFares = async () => {
      try {
        const data = await fetchData(API_URL);
        setFares(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchFares();
  }, []);

  return (
    <div>
      <div className="ticket-fare-background"></div> {/* Background image */}
      <div className="fare-container">
        <h2 className="fare-title">Metro Ticket Fares</h2>
        <div className="fare-list">
          {fares.map((fare) => (
            <div key={fare.id} className="fare-item">
              <h3 className="route-name">{fare.route_name}</h3>
              <p className="ticket-type">{fare.ticket_type}</p>
              <p className="fare-price">₹{fare.fare}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TicketFare;
