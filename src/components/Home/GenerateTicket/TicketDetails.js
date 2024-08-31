import React from 'react';
import './TicketDetails.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const TicketDetails = ({tickInfo}) => {
    const { user_name ,route} = tickInfo;

    const ticketData = {
      userName: user_name ,
      routeName: route,
      ticketType: "Single",
      peakHour: "Yes",
      paymentStatus: "Confirmed",
      paymentAmount: "$5.00",
      transactionId: "1234567890",
      date: "2024-08-30",
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
        <h2>Ticket Details</h2>
        <div className="ticket-info">
          <p><strong>Name:</strong> {ticketData.userName}</p>
          <p><strong>Route:</strong> {ticketData.routeName}</p>
          <p><strong>Ticket Type:</strong> {ticketData.ticketType}</p>
          <p><strong>Peak Hour:</strong> {ticketData.peakHour}</p>
          <p><strong>Date:</strong> {ticketData.date}</p>
        </div>
        <h3>Payment Confirmation</h3>
        <div className="payment-info">
          <p><strong>Status:</strong> {ticketData.paymentStatus}</p>
          <p><strong>Amount:</strong> {ticketData.paymentAmount}</p>
          <p><strong>Transaction ID:</strong> {ticketData.transactionId}</p>
        </div>
        <div className="download-buttons">
          <button onClick={downloadPDF}>Download as PDF</button>
          <button onClick={downloadImage}>Download as Image</button>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
