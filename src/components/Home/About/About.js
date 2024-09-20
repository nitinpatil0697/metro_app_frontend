// src/About.js
import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-block">
        <h2>About Metro Ticket Vending Machine Project</h2>
        <p>
          Welcome to the Metro Ticket Vending Machine Portal! This project is designed to provide
          a seamless and efficient ticket purchasing experience for metro users.
        </p>
      </div>

      <div className="about-block">
        <h2>Project Purpose</h2>
        <p>
          The primary objective of this project is to provide users with an easy-to-use interface
          to view routes, check ticket fares, register users, and generate tickets. This application aims
          to streamline the ticketing process and improve the overall customer experience.
        </p>
      </div>

      <div className="about-block">
        <h2>Key Features</h2>
        <ul>
          <li>View all available metro routes with detailed information.</li>
          <li>Check ticket fares based on route, ticket type, and peak hour.</li>
          <li>User registration for personalized ticket generation.</li>
          <li>Generate and view ticket details, including payment confirmation.</li>
        </ul>
      </div>

      <div className="about-block">
        <h2>Technologies Used</h2>
        <ul>
          <li><strong>Frontend:</strong> React, HTML, CSS, JavaScript</li>
          <li><strong>Backend:</strong> Spring Boot, REST API</li>
          <li><strong>Database:</strong> MySQL</li>
          <li><strong>Tools:</strong> Insomnia for API testing, Git for version control</li>
        </ul>
      </div>

      <div className="about-block">
        <h2>Development Team</h2>
        <p>
          This project is developed by a dedicated team of software engineers passionate about
          creating efficient and user-friendly applications. The team comprises frontend developers,
          backend developers, and a project manager.
        </p>
      </div>

      <div className="about-block">
        <h2>Contact Information</h2>
        <p>
          For any inquiries or feedback, please reach out to us at: <a href="mailto:nitin.patil0697@gmail.com">nitin.patil0697@gmail.com</a>
        </p>
      </div>
    </div>
  );
};

export default About;
