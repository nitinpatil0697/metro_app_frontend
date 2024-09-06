import React, { useState } from "react";
import axios from "axios";
import TicketScreen from "../Ticket/TicketScreen";
import "./GenerateTicket.css";
import { Link } from "react-router-dom";
import apiClient from "../../../utils/AxiosConfig";
import { postData } from "../../../utils/ApiHandlers";

const GenerateTicket = ({ticketInfo,setTicketInfo}) => {
  const API_URL = "http://localhost:8080/vendingMachine/generateTicket";
  const [formData, setFormData] = useState({
    user_name: "",
    route_name: "Red Line",
    ticket_type: "Single Ride",
    peak_hour: false,
  });

  //const [ticketInfo, setTicketInfo] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      peak_hour: e.target.checked,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postData(API_URL, formData);
      setTicketInfo(response.data.result);
    } catch (error) {
      console.error("Error generating ticket:", error.message);
    }
  };

  return (
    <div className="generate-ticket-background">
      {ticketInfo ? (
        <TicketScreen ticketInfo={ticketInfo} />
      ) : (
        <div className="generate-ticket-container">
          <h2 className="generate-ticket-title">Generate Ticket</h2>
          <form onSubmit={handleSubmit} className="generate-ticket-form">
            <div className="form-group">
              <label htmlFor="user_name">User Name</label>
              <input
                type="text"
                id="user_name"
                name="user_name"
                value={formData.user_name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="route_name">Route Name</label>
              <select
                id="route_name"
                name="route_name"
                value={formData.route_name}
                onChange={handleInputChange}
                required
              >
                <option value="Red Line">Red Line</option>
                <option value="Blue Line">Blue Line</option>
                <option value="Green Line">Green Line</option>
                <option value="Yellow Line">Yellow Line</option>
                <option value="Orange Line">Orange Line</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="ticket_type">Ticket Type</label>
              <select
                id="ticket_type"
                name="ticket_type"
                value={formData.ticket_type}
                onChange={handleInputChange}
                required
              >
                <option value="Single Ride">Single Ride</option>
                <option value="Weekly Pass">Weekly Pass</option>
                <option value="Monthly Pass">Monthly Pass</option>
                <option value="Return">Return</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="peak_hour">Peak Hour</label>
              <input
                type="checkbox"
                id="peak_hour"
                name="peak_hour"
                checked={formData.peak_hour}
                onChange={handleCheckboxChange}
              />
            </div>
            <button type="submit" className="submit-button">Generate Ticket</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default GenerateTicket;
