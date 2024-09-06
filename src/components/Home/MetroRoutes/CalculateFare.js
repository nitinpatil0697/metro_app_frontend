import React, { useState, useEffect } from 'react';
import './CalculateFare.css';
import { fetchData } from '../../../utils/ApiHandlers';

const CalculateFare = () => {
  const [route, setRoute] = useState('');
  const [stations, setStations] = useState({});
  const [entryStation, setEntryStation] = useState('');
  const [destinationStation, setDestinationStation] = useState('');
  const [fare, setFare] = useState(null);

  useEffect(() => {
    if (route) {
      fetchData(`http://localhost:8080/vendingMachine/route/${route}`)
        .then(
          response => {
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

  const calculateFare = () => {
    if (entryStation && destinationStation) {
      fetchData(`http://localhost:8080/vendingMachine/calculatefare?start=${entryStation}&end=${destinationStation}`)
        .then(response => {
            console.log(response.data)
          setFare(response.data);
        })
        .catch(error => {
          console.error('Error calculating fare:', error);
        });
    } else {
      alert('Please select both Entry and Destination Stations');
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
        </div>
      )}

      {route && (
        <button className="calculate-fare-button" onClick={calculateFare}>
          Calculate Fare
        </button>
      )}

      {fare !== null && (
        <div className="fare-display">
          <h2>Total Fare: ₹{fare}</h2>
        </div>
      )}
    </div>
  );
};

export default CalculateFare;
