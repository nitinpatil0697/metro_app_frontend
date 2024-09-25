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

const UpdateTicketFareModal = ({ fare, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...fare });

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
        <h2 id="modal-title">Update Ticket Fare</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Route Name"
            name="route_name"
            value={formData.route_name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Ticket Type"
            name="ticket_type"
            value={formData.ticket_type}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Fare"
            type="number"
            name="fare"
            value={formData.fare}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Start Code"
            name="start_code"
            value={formData.start_code}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="End Code"
            name="end_code"
            value={formData.end_code}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Slot Start"
            name="Slot Start"
            value={formData["Slot Start"]}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Slot End"
            name="Slot End"
            value={formData["Slot End"]}
            onChange={handleChange}
            fullWidth
            margin="normal"
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

export default UpdateTicketFareModal;
