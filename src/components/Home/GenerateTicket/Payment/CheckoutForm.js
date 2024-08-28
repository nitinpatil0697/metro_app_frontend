import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = ({ clientSecret }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [processing, setProcessing] = useState(false);
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      setProcessing(true);
  
      if (!stripe || !elements) {
        return;
      }
  
      const cardElement = elements.getElement(CardElement);
  
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: 'Cardholder Name',
          },
        },
      });
  
      if (error) {
        setError(error.message);
        setProcessing(false);
      } else if (paymentIntent.status === 'succeeded') {
        setSuccess('Payment successful!');
        setError(null);
        setProcessing(false);
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="checkout-form">
        <CardElement className="card-element" />
        <button type="submit" disabled={!stripe || processing} className="pay-button">
          {processing ? 'Processing...' : 'Pay'}
        </button>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
      </form>
    );
  }

  export default CheckoutForm;