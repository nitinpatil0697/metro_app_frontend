import React, { useEffect, useState } from 'react';
import { fetchData, putData } from '../../../../utils/ApiHandlers';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Button } from '@mui/material';
import UpdateTicketFareModal from './UpdateTicketFareModal';

const TicketFareTable = () => {
  const API_URL = 'http://localhost:8080/vendingMachine/allTicketFare';
  const [fares, setFares] = useState([]);
  const [selectedFare, setSelectedFare] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const pagination = true;
  const paginationPageSize = 10;
  const paginationPageSizeSelector = [10, 20, 50];

  useEffect(() => {
    const fetchFares = async () => {
      try {
        const response = await fetchData(API_URL);
        setFares(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchFares();
  }, []);

  const colDefs = [
    { headerName: "Id", field: "id" },
    { headerName: "Route Name", field: "route_name" },
    { headerName: "Ticket Type", field: "ticket_type" },
    { headerName: "Fare", field: "fare" },
    { headerName: "Start Code", field: "start_code" },
    { headerName: "End code", field: "end_code" },
    { headerName: "Slot Start", field: "Slot Start" },
    { headerName: "Slot End", field: "Slot End" },
    {
      headerName: "Actions",
      cellRenderer: (params) => (
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleUpdate(params.data)}
          >
            Update
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDelete(params.data)}
            style={{ marginLeft: '5px' }}
          >
            Delete
          </Button>
        </div>
      ),
      width: 200,
    },
  ];

  const handleUpdate = (data) => {
    setSelectedFare(data);
    setIsModalOpen(true); // Open modal for updating
  };

  const handleSave = async (updatedFare) => {
    try {
      const response = await putData(`http://localhost:8080/vendingMachine/updateTicketFare/${updatedFare.id}`, updatedFare);
      if (response.data.status == "success") {
        const updatedData = response.data.result;
        setFares(prev => prev.map(fare => fare.id === updatedData.id ? updatedData : fare));
      } else {
        console.error('Failed to update fare');
      }
    } catch (error) {
      console.error('Error updating fare:', error);
    }
  };

  const handleDelete = (data) => {
    console.log('Delete Ticket Fare', data);
  };

  return (
    <div className="ag-theme-quartz" style={{ height: 550, width: 1400 }}>
      {fares.length > 1 && (
        <AgGridReact
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
          rowData={fares}
          columnDefs={colDefs}
        />
      )}
      {isModalOpen && (
        <UpdateTicketFareModal
          fare={selectedFare}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default TicketFareTable;
