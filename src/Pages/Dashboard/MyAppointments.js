import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import bgImage from "../../assets/images/download.jpg";
import auth from "../../firebase.init";
import Loader from "../Shared/Loader";

const bg = {
  backgroundImage: `url(${bgImage})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center 40%",
  width: "100%",
  height: "25vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
};

const MyAppointments = () => {
  const [user] = useAuthState(auth);
  const getData = async () => {
    const res = await fetch(
      `http://localhost:5001/appointments?email=${user.email}`
    );
    return res.json();
  };
  const {
    data: appointments,
    error,
    isError,
    isLoading,
    refetch,
  } = useQuery(["appointments", user.email], getData);
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

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    toast.error(error.message);
  }
  if (isError) {
    toast.error(error.message);
  }
  return (
    <>
      <Box>
        <Box className="blur_effect" style={bg}>
          <Typography
            sx={{ fontWeight: 700, color: "white", position: "relative" }}
            variant="h4"
          >
            My Appointments
          </Typography>
        </Box>
      </Box>
      <Box sx={{ py: 3, px: 5 }} component="section">
        {appointments.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              mt: 4,
            }}
          >
            <Typography variant="h5" color="secondary">
              You have no appointments
            </Typography>
            <Link
              style={{ textDecoration: "none", marginTop: "10px" }}
              to="/home"
            >
              <Button variant="outlined" color="success">
                Get An Appointment Now
              </Button>
            </Link>
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ backgroundColor: "green" }}>
                <TableRow>
                  <TableCell sx={{ color: "white" }} align="center">
                    Index
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="center">
                    Name
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="center">
                    Date
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="center">
                    Service
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="center">
                    Model
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="center">
                    Price
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="center">
                    Payment
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="center">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments.map((ap, index) => (
                  <TableRow
                    key={ap._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{ap?.name}</TableCell>
                    <TableCell align="center">{ap?.date}</TableCell>
                    <TableCell align="center">{ap?.service}</TableCell>
                    <TableCell align="center">{ap?.model}</TableCell>
                    <TableCell align="center">${ap?.price}</TableCell>
                    <TableCell align="center">
                      {ap.paid ? (
                        <Typography variant="button" color="green">
                          Paid
                        </Typography>
                      ) : (
                        <Link
                          style={{ textDecoration: "none", color: "inherit" }}
                          to={`/payment/${ap._id}`}
                        >
                          <Button
                            variant="contained"
                            color="success"
                            size="small"
                          >
                            Pay
                          </Button>
                        </Link>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() => handleApCancel(ap._id)}
                        variant="outlined"
                        size="small"
                        color="error"
                        disabled={ap.paid}
                      >
                        Cancel
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </>
  );
};

export default MyAppointments;
