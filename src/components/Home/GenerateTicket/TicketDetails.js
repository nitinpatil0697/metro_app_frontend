import React, { useEffect, useState } from 'react';
import './TicketDetails.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { fetchData } from '../../../utils/ApiHandlers';

const TicketDetails = ({ ticketInfo }) => {
  const { user_name, route, type, purchase_time, fare, id } = ticketInfo;
  const API_URL = `http://localhost:8080/payment/transaction/${id}`;
  const [paymentTranscation, setPaymentTranscation] = useState([]);

  useEffect(() => {
    const fetchPaymentTranscation = async () => {
      try {
        const data = await fetchData(API_URL);
        setPaymentTranscation(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchPaymentTranscation();
  }, []);

  const ticketData = {
    userName: user_name,
    routeName: route,
    ticketType: type,
    paymentStatus: "Confirmed",
    paymentAmount: "₹" + fare,
    transactionId: paymentTranscation,
    date: purchase_time,
  };

  const hideButtons = () => {
    const buttons = document.querySelector('.download-buttons');
    if (buttons) {
      buttons.style.display = 'none';
    }
  };

  const showButtons = () => {
    const buttons = document.querySelector('.download-buttons');
    if (buttons) {
      buttons.style.display = 'flex';
    }
  };

  const downloadPDF = () => {
    hideButtons();
    const input = document.getElementById('ticket-details');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save("ticket-details.pdf");
      showButtons();
    });
  };

  const downloadImage = () => {
    hideButtons();
    const input = document.getElementById('ticket-details');
    html2canvas(input).then((canvas) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'ticket-details.png';
      link.click();
      showButtons();
    });
  };

  return (
    <div className="ticket-details-container">
      <div id="ticket-details" className="ticket-details-card">
        <h2 className="ticket-heading">Your Metro Ticket</h2>
        <div className="ticket-info">
          <p><strong>Name:</strong> {ticketData.userName}</p>
          <p><strong>Route:</strong> {ticketData.routeName}</p>
          <p><strong>Ticket Type:</strong> {ticketData.ticketType}</p>
          <p><strong>Date of Purchase:</strong> {ticketData.date}</p>
        </div>
        <h3 className="payment-heading">Payment Details</h3>
        <div className="payment-info">
          <p><strong>Status:</strong> {ticketData.paymentStatus}</p>
          <p><strong>Amount Paid:</strong> {ticketData.paymentAmount}</p>
          <p><strong>Transaction ID:</strong> {ticketData.transactionId}</p>
        </div>
        <div className="download-buttons">
          <button className="pdf-button" onClick={downloadPDF}>Download as PDF</button>
          <button className="img-button" onClick={downloadImage}>Download as Image</button>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
