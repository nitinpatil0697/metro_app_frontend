import React, { useEffect, useState } from 'react';
import { fetchData } from '../../../utils/ApiHandlers'; 
import './MetroRoutes.css';

const MetroRoutes = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define the API endpoint
  const API_URL = 'http://localhost:8080/vendingMachine/allRoutes';

  useEffect(() => {
    const getRoutes = async () => {
      try {
        const data = await fetchData(API_URL);
        setRoutes(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    getRoutes();
  }, []);

  if (loading) return <p>Loading routes...</p>;
  if (error) return <p>Error loading routes: {error}</p>;

  return (
    <div className="routes-container">
      <h2 className="routes-title">Available Metro Routes</h2>
      <ul className="routes-list">
        {routes.map(route => (
          <li key={route.id} className="route-item">
            <h3 className="route-name">{route.name}</h3>
            <ul className="stations-list">
              {route.stations.map(station => (
                <li key={station.id} className="station-item">
                  <p className="station-name">{station.name}</p>
                  {/* <p className="station-code">{station.code}</p> */}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MetroRoutes;
