import React, { useEffect, useState } from 'react';
import { fetchData } from '../../../../utils/ApiHandlers';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { Button } from '@mui/material';

const UserTable = () => {

  const API_URL = 'http://localhost:8080/user/allUsers';
  const [users, setUsers] = useState([]);
  const pagination = true;
  const paginationPageSize = 10;
  const paginationPageSizeSelector = [10, 20, 50];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetchData(API_URL);
        setUsers(response.data);
        console.log(users)
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchUsers();
  }, []);

  const [colDefs, setColDefs] = useState([
    { headerName : "Id", field: "id" },
    { headerName : "First Name", field: "first_name" },
    { headerName : "Last Name", field: "last_name" },
    { headerName : "Email", field: "email" },
    { headerName : "Phone", field: "phone" },
    { headerName : "Role", field: "role" },
    { headerName : "Enabled", field: "enabled" },
    {
      headerName: "Actions", field: "id", 
      cellRenderer: (params) => {
        // Render buttons using the React component or plain HTML
        return (
          <div>
            <Button
              variant="contained"
              color="primary"
             // onClick={() => handleUpdate(params.data)}
            >
              Update
            </Button>
            <Button
              variant="contained"
              color="secondary"
              //onClick={() => handleDelete(params.data)}
              style={{ marginLeft: '5px' }}
            >
              Delete
            </Button>
          </div>
        );
      },
      width: 200,
    },
  ]);


  return (
    <div
    className="ag-theme-quartz" 
    style={{ height: 550 , width: 1400 }}
   >
     <AgGridReact
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
          rowData={users}
          columnDefs={colDefs}
     />
   </div>
  );
};

export default UserTable;
