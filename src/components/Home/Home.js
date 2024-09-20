import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the username from localStorage
    const storedUsername = localStorage.getItem('name');
    if (storedUsername) {
      setLoggedInUser(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    // Remove JWT and user info from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    setLoggedInUser(null); // Clear the logged-in user
    navigate('/'); // Redirect to login page
  };

  return (
    <div className="home-background">
      <div className="home-container">
        <div className="header">
          {loggedInUser ? (
            <div className="user-info">
              <div className="user-initial">
                {loggedInUser.charAt(0).toUpperCase()}
              </div>
              <span className="username">{loggedInUser}</span>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/register">
                <button className="auth-button">Register</button>
              </Link>
              <Link to="/login">
                <button className="auth-button">Login</button>
              </Link>
            </>
          )}
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
          <Link to="/calculatefare">
            <button className="home-button">Book Ticket</button>
          </Link>
          <Link to="/purchasedTickets">
            <button className="home-button">Purchased Tickets</button>
          </Link>
          <Link to="/about">
            <button className="home-button">About</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
