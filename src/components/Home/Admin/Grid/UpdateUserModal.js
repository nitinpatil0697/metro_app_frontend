import React, { useState } from "react";
import { Modal, Button, TextField, Box } from "@mui/material";

// Style for the modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxHeight: "80vh", // Set maximum height for scrolling
  overflowY: "auto", // Enable vertical scrolling
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const UpdateUserModal = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Call save function with updated data
    onClose(); // Close the modal
  };

  return (
    <Modal
      open={true}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <h2 id="modal-title">Update User Details</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="First Name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Last Name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Enabled"
            name="enabled"
            value={formData.enabled}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
            <Button onClick={onClose} variant="outlined" color="secondary">
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default UpdateUserModal;
