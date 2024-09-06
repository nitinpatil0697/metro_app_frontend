import React, { useState, useEffect } from 'react';
import './CalculateFare.css';
import { fetchData, postData } from '../../../utils/ApiHandlers';
import TicketScreen from '../Ticket/TicketScreen';
import { useNavigate } from 'react-router-dom';

const CalculateFare = ({ticketInfo, setTicketInfo}) => {
  const [route, setRoute] = useState('');
  const [stations, setStations] = useState({});
  const [entryStation, setEntryStation] = useState('');
  const [destinationStation, setDestinationStation] = useState('');
  const [fare, setFare] = useState(null);
  const [ticketType, setTicketType] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (route) {
      fetchData(`http://localhost:8080/vendingMachine/route/${route}`)
        .then(response => {
          setStations(response.data);
        })
        .catch(error => {
          console.error('Error fetching stations:', error);
        });
    }
  }, [route]);

  const handleRouteChange = (e) => {
    setRoute(e.target.value);
    setEntryStation('');
    setDestinationStation('');
    setFare(null);
  };

  const handleEntryStationChange = (e) => {
    setEntryStation(e.target.value);
  };

  const handleDestinationStationChange = (e) => {
    setDestinationStation(e.target.value);
  };

  const handleTicketTypeChange = (e) => {
    setTicketType(e.target.value);
  };

  const calculateFare = () => {
    if (entryStation && destinationStation) {
      fetchData(`http://localhost:8080/vendingMachine/calculatefare?start=${entryStation}&end=${destinationStation}&ticket=${ticketType}`)
        .then(response => {
          setFare(response.data);
        })
        .catch(error => {
          console.error('Error calculating fare:', error);
        });
    } else {
      alert('Please select both Entry and Destination Stations');
    }
  };

  const generateTicket = async () => {
    const storedUsername = localStorage.getItem('email');
    const API_URL = "http://localhost:8080/vendingMachine/generateTicket";
    const formData = {
      user_name: storedUsername,
      route_name: route,
      ticket_type: ticketType,
      start_station: entryStation,
      end_station: destinationStation,
      peak_hour: false,
    };

    try {
      const response = await postData(API_URL, formData);
      setTicketInfo(response.data.result); 
      console.log(response)
      navigate("/ticketscreen")
    } catch (error) {
      console.error("Error generating ticket:", error.message);
    }
  };

  return (
    <div className="calculate-fare-container">
      <h1>Calculate Fare</h1>
      <div className="route-selection">
        <label htmlFor="route">Select Line:</label>
        <select id="route" value={route} onChange={handleRouteChange}>
          <option value="">--Select Line--</option>
          <option value="Red Line">Red Line</option>
          <option value="Blue Line">Blue Line</option>
          <option value="Green Line">Green Line</option>
          <option value="Yellow Line">Yellow Line</option>
          <option value="Orange Line">Orange Line</option>
        </select>
      </div>

      {route && (
        <div className="station-selection">
          <div className="dropdown">
            <label htmlFor="entryStation">Entry Station:</label>
            <select id="entryStation" value={entryStation} onChange={handleEntryStationChange}>
              <option value="">--Select Entry Station--</option>
              {Object.entries(stations).map(([code, name]) => (
                <option key={code} value={code}>{name}</option>
              ))}
            </select>
          </div>

          <div className="dropdown">
            <label htmlFor="destinationStation">Destination Station:</label>
            <select id="destinationStation" value={destinationStation} onChange={handleDestinationStationChange}>
              <option value="">--Select Destination Station--</option>
              {Object.entries(stations).map(([code, name]) => (
                <option key={code} value={code}>{name}</option>
              ))}
            </select>
          </div>

          <div className="calculate-fare-selection">
              <label htmlFor="ticket-type">Select Ticket Type:</label>
              <select id="ticket-type" value={ticketType} onChange={handleTicketTypeChange}>
                <option value="">--Select Ticket Type--</option>
                <option value="Single Ride">Single Ride</option>
                <option value="Weekly Pass">Weekly Pass</option>
              </select>
            </div>
        </div>
      )}

      {route && fare === null &&(
        <button className="calculate-fare-button" onClick={calculateFare}>
          Calculate Fare
        </button>
      )}

      {fare !== null && (
        <div className="fare-display">
          <h2>Total Fare: ₹{fare}</h2>
        </div>
      )}

      {fare && (
        <button className="calculate-fare-button" onClick={generateTicket}>
          Generate Ticket
        </button>
      )}
    </div>
  );
};

export default CalculateFare;
