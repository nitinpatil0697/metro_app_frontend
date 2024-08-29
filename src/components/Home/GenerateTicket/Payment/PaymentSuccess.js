import React from 'react';
import './PaymentSuccess.css';

const PaymentSuccess = () => {
  return (
    <div className="payment-success-container">
      <div className="payment-success-message">
        <div className="checkmark-circle">
          <div className="checkmark"></div>
        </div>
        <h2>Payment Successful!</h2>
        <p>Thank you for your purchase.</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
