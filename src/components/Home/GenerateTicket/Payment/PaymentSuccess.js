import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentSuccess.css';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/ticket-details');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="payment-success-container">
      <div className="payment-success-message">
        <div className="checkmark-circle">
          <div className="checkmark"></div>
        </div>
        <h2>Payment Successful!</h2>
        <p>Thank you for your purchase. redirecting to ticket</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
