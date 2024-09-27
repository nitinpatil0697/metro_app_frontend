import React, { useEffect, useState } from 'react';
import { fetchData, putData, deleteData } from '../../../../utils/ApiHandlers';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

const PaymentTransactionTable = () => {
  const API_URL = 'http://localhost:8080/payment/transaction/all';
  const [payment, setpayments] = useState([]);

  const pagination = true;
  const paginationPageSize = 10;
  const paginationPageSizeSelector = [10, 20, 50];

  useEffect(() => {
    const fetchpayments = async () => {
      try {
        const response = await fetchData(API_URL);
        setpayments(response.data.result);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchpayments();
  }, []);

  const colDefs = [
    { headerName: "Id", field: "id" },
    { headerName: "Payment Id", field: "payment_id" },
    { headerName: "Payment Status", field: "payment_status" },
    { headerName: "Ticket Id", field: "ticket_id" },
    { headerName: "Transaction Amount", field: "transaction_amount" },
    { headerName: "Transaction Date", field: "transaction_date" },
    // { headerName: "Slot Start", field: "Slot Start" },
    // { headerName: "Slot End", field: "Slot End" },
  ];

  return (
    <div className="ag-theme-quartz" style={{ height: 550, width: 1400 }}>
      {payment.length > 1 && (
        <AgGridReact
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
          rowData={payment}
          columnDefs={colDefs}
        />
      )}
    </div>
  );
};

export default PaymentTransactionTable;
