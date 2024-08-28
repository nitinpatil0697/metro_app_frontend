import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './PaymentPage.css';
import CheckoutForm from './CheckoutForm';
// Initialize Stripe with your publishable key
const stripePromise = loadStripe('pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3');

const PaymentPage = () => {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Fetch the clientSecret from the backend when the component mounts
    axios.post('http://localhost:8080/payment/initiate', {
      amount: 1000,  // Example amount in cents (e.g., $10.00)
      currency: 'usd',
    })
    .then(response => {
      setClientSecret(response.data.clientSecret);
    })
    .catch(error => {
      console.error('Error creating payment intent:', error);
    });
  }, []);

  return (
    <div className="payment-page">
      <h1>Metro Ticket Payment</h1>
      {clientSecret ? (
        <Elements stripe={stripePromise}>
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default PaymentPage;
