import React, { useEffect, useState } from 'react';
import { fetchData , putData, deleteData} from '../../../../utils/ApiHandlers';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { Button } from '@mui/material';
import UpdateUserModal from './UpdateUserModal';

const UserTable = () => {

  const API_URL = 'http://localhost:8080/user/allUsers';
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const pagination = true;
  const paginationPageSize = 10;
  const paginationPageSizeSelector = [10, 20, 50];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetchData(API_URL);
        setUsers(response.data);        
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
        return (
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
        );
      },
      width: 200,
    },
  ]);

  const handleUpdate = (data) => {
    setSelectedUser(data);
    setIsModalOpen(true); // Open modal for updating
  };

  const handleSave = async (updatedUser) => {
    try {
      const response = await putData(`http://localhost:8080/user/updateUser/${updatedUser.id}`, updatedUser);
      if (response.data.status == "success") {
        const updatedData = response.data.result;
        setUsers(prev => prev.map(user => user.id === updatedData.id ? updatedData : user));
      } else {
        console.error('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async (data) => {
    try {
      console.log("handleDelete clicked");
      const response = await deleteData(`http://localhost:8080/user/deleteUser/${data.id}`);
      console.log(response.data);
      if (response.data.status == "success") {
        setUsers(users.filter((user) => user.id !== data.id));
      } else {
        console.error('Failed to delete ticket User');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };


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

      {isModalOpen && (
        <UpdateUserModal
          user={selectedUser}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
   </div>
  );
};

export default UserTable;
