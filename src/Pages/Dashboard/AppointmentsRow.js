import { Button, TableCell, TableRow, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const AppointmentsRow = ({ ap, index, refetch }) => {
  const { _id, name, date, service, model, price, paid, status, transactionId } = ap;

  const handleApCancel = (id) => {
    const confirmed = window.confirm("Are you sure you want to cancel");
    if (!confirmed) {
      return;
    }
    const url = `http://localhost:5001/appointments/${id}`;
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
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={`/payment/${ap._id}`}
          >
            <Button variant="contained" color="success" size="small">
              Pay
            </Button>
          </Link>
        )}
      </TableCell>
      <TableCell align="left">{transactionId}</TableCell>
      <TableCell sx={{textTransform:"capitalize"}} align="center">
        {status}
      </TableCell>
      <TableCell align="center">
        <Button
          onClick={() => handleApCancel(_id)}
          variant="outlined"
          size="small"
          color="error"
          disabled={ap.paid}
        >
          Cancel
        </Button>
      </TableCell>      
    </TableRow>
  );
};

export default AppointmentsRow;
