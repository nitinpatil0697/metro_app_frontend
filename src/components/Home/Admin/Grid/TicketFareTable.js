import React, { useEffect, useState } from 'react';
import { fetchData } from '../../../../utils/ApiHandlers';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid

const TicketFareTable = () => {

  const API_URL = 'http://localhost:8080/vendingMachine/allTicketFare';
  const [fares, setFares] = useState([]);
  const pagination = true;
  const paginationPageSize = 10;
  const paginationPageSizeSelector = [10, 20, 50];

  useEffect(() => {
    const fetchFares = async () => {
      try {
        const response = await fetchData(API_URL);
        console.log(response)
        setFares(response.data);
       
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchFares();
  }, []);

  const [colDefs, setColDefs] = useState([
    { headerName : "Id", field: "id" },
    { headerName : "Route Name", field: "route_name" },
    { headerName : "Ticket Type", field: "ticket_type" },
    { headerName : "Fare", field: "fare" },
    { headerName : "Start Code", field: "start_code" },
    { headerName : "End code", field: "end_code" },
    { headerName : "Slot Start", field: "Slot Start" },
    { headerName : "Slot End", field: "Slot End" }
  ]);


  return (
    <div
    className="ag-theme-quartz" 
    style={{ height: 550 , width: 1400 }}
   >
    {fares.length > 1 &&  <AgGridReact
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
          rowData={fares}
          columnDefs={colDefs}
     />}
    
   </div>
  );
};

export default TicketFareTable;
