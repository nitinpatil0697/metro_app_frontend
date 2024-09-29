import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "../Map/MetroMap.css";
import { fetchData } from '../../../utils/ApiHandlers';

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const MetroMap = () => {
  const [stations, setStations] = useState([]);
  const API_URL = 'http://localhost:8080/vendingMachine/allStations';
  
  // Initialize the default position and selected station
  const [position, setPosition] = useState([18.5205, 73.8570]); // Default position
  const [selectedStation, setSelectedStation] = useState(""); // Default selected station

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetchData(API_URL);
        setStations(response.data);
        console.log(response.data);
        
        // Set initial position and selected station if there are stations
        if (response.data.length > 0) {
          setPosition([
            parseFloat(response.data[0].latitude),
            parseFloat(response.data[0].longitude),
          ]);
          setSelectedStation(response.data[0].name);
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchStations();
  }, []);

  const handleStationChange = (event) => {
    const selectedStationName = event.target.value;
    setSelectedStation(selectedStationName);

    if (selectedStationName) {
      const station = stations.find((station) => station.name === selectedStationName);
      if (station) {
        setPosition([
          parseFloat(station.latitude), 
          parseFloat(station.longitude)
        ]);
      }
    } else {
      // Reset to a default position when "All Stations" is selected
      setPosition([18.5205, 73.8570]); // Set to a central point
    }
  };

  return (
    <div className="map-container">
      <h2 className="map-title">Metro Map</h2>
      <div className="dropdown-container">
        <select
          value={selectedStation}
          onChange={handleStationChange}
          className="station-dropdown"
        >
          <option value="">All Stations</option>
          {stations.map((station) => (
            <option key={station.id} value={station.name}>
              {station.name}
            </option>
          ))}
        </select>
      </div>
      <MapContainer
        center={position}
        zoom={12}
        style={{ height: "500px", width: "1000px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Show all stations when "All Stations" is selected */}
        {selectedStation === "" ? (
          stations.map((station) => (
            <Marker
              key={station.id}
              position={[parseFloat(station.latitude), parseFloat(station.longitude)]}
            >
              <Popup>{station.name}, India</Popup>
            </Marker>
          ))
        ) : (
          <Marker position={position}>
            <Popup>{selectedStation}, India</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default MetroMap;
