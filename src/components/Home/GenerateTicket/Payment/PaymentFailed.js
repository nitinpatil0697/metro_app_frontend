import React from 'react';
import './PaymentFailed.css';

const PaymentFailed = ({ errorMessage }) => {
  return (
    <div className="payment-error-container">
      <div className="payment-error-message">
        <div className="cross-circle">
          <div className="cross"></div>
        </div>
        <h2>Payment Failed</h2>
        <p>{errorMessage}</p>
      </div>
    </div>
  );
};

export default PaymentFailed;
