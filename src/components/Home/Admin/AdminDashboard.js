// AdminDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css'; // Optional CSS for styling

const AdminDashboard = () => {
  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
      <div className="button-container">
        <Link to="/users">
          <button className="dashboard-button">Users</button>
        </Link>
        <Link to="/paymentdetails">
          <button className="dashboard-button">Payment Transactions</button>
        </Link>
        <Link to="/ticketfaretable">
          <button className="dashboard-button">Ticket Fare</button>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
