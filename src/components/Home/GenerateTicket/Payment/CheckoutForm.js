import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { json, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { postData } from '../../../../utils/ApiHandlers';

const CheckoutForm = ({ clientSecret, ticketInfo }) => {
  const CONFIRM_API_URL = "http://localhost:8080/payment/confirm"; 
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [processing, setProcessing] = useState(false);
    const navigate = useNavigate();
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      setProcessing(true);
  
      if (!stripe || !elements) {
        return;
      }
  
   
      const cardElement = elements.getElement(CardElement);
      console.log(cardElement)
  
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: 'Nitin Patil',
            address: {
                "city": "Pune",
                "country": "IN",
                "line1": "street",
                "line2": "street 2",
                "postal_code": "44343",
                "state": "Maharashtra"
              },
          },
        },
      });
  
      if (error) {
        setError(error.message);
        setProcessing(false);
        navigate('/paymentfailed')
      } else if (paymentIntent.status === 'succeeded') {
        postData(CONFIRM_API_URL, {
          ticket_id : ticketInfo.id,
          payment_capture : true,
          payment_confirm_response : "response"
        });
        setSuccess('Payment successful!');
        setError(null);
        setProcessing(false);
        navigate('/paymentsuccess')
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