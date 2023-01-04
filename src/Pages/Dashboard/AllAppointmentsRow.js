import {
    Button,
    FormControl, MenuItem,
    Select,
    TableCell,
    TableRow,
    Typography
} from "@mui/material";
import React from "react";
import { toast } from "react-toastify";

const AllAppointmentsRow = ({ ap, index, refetch }) => {
  const { _id, name, date, service, model, price, paid, status } = ap;
  const [appointmentStatus, setAppointmentStatus] = React.useState(status ||"pending");
  // console.log(status)
  const handleChange = (event) => {
    setAppointmentStatus(event.target.value);
    const apStatus = event.target.value;
    const apStatusObj = {status: apStatus}
    const url = `https://gms-doctors-server.vercel.app/allAppointments/${_id}`;
    fetch(url, {
      method: "PUT",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(apStatusObj),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.modifiedCount === 1) {
          toast.info("Status updated successfully");
          refetch();
        } else {
          toast.info("Failed to update");
        }
    })
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to cancel");
    if (!confirmed) {
      return;
    }
    const url = `https://gms-doctors-server.vercel.app/appointments/${id}`;
    fetch(url, {
      method: "DELETE",
      headers: { "content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.deletedCount > 0) {
          toast.info("Appointment cancelled successfully");
          refetch();
        } else {
          toast.info("Failed to delete");
        }
      });
  };
  return (
    <TableRow
      key={_id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell align="center">{index + 1}</TableCell>
      <TableCell align="center">{name}</TableCell>
      <TableCell align="center">{date}</TableCell>
      <TableCell align="center">{service}</TableCell>
      <TableCell align="center">{model}</TableCell>
      <TableCell align="center">${price}</TableCell>
      <TableCell align="center">
        {paid ? (
          <Typography variant="button" color="green">
            Paid
          </Typography>
        ) : (
          <Typography variant="button" color="red">
            Not Paid
          </Typography>
        )}
      </TableCell>
      <TableCell>
        <FormControl sx={{ minWidth: 80 }} size="small">
          <Select
            sx={{boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 }}}
            labelId="demo-select-small"
            id="demo-select-small"
            value={appointmentStatus}
            onChange={handleChange}
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="ongoing">Ongoing</MenuItem>
            <MenuItem value="done">Done</MenuItem>
          </Select>
        </FormControl>
      </TableCell>
      <TableCell align="center">
        <Button
          onClick={() => handleDelete(_id)}
          variant="outlined"
          size="small"
          color="error"
          disabled={ap.paid}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default AllAppointmentsRow;
