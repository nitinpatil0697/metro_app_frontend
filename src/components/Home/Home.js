import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-background">
      <div className="home-container">
        <div className="header">
          <Link to="/register">
            <button className="auth-button">Register</button>
          </Link>
          <Link to="/login">
            <button className="auth-button">Login</button>
          </Link>
        </div>
        <h1 className="home-title">Metro Ticket Vending Portal</h1>
        <p className="home-info">
          Welcome to the Metro Ticket Vending Machine project! 
          This application allows users to easily purchase metro tickets, manage their accounts,
          and more. Explore the features by clicking the buttons below.
        </p>
        <div className="home-button-container">
        <Link to="/metroroutes">
            <button className="home-button">Metro Routes</button>
          </Link>
          <Link to="/ticketfare">
            <button className="home-button">Ticket Fare</button>
          </Link>
          {/* <Link to="/users">
            <button className="home-button">Registered Users</button>
          </Link> */}
          <Link to="/generate">
            <button className="home-button">Generate Ticket</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
