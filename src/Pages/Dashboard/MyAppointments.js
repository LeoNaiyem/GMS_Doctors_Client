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
import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import bgImage from "../../assets/images/download.jpg";
import auth from "../../firebase.init";
import Loader from "../Shared/Loader";
import AppointmentsRow from "./AppointmentsRow";

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
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const getData = async () => {
    const res = await fetch(
      `https://gms-doctors-server.onrender.com/appointments?email=${user.email}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    if (res.status === 401 || res.status === 403) {
      signOut(auth);
      localStorage.removeItem("accessToken");
      navigate("/home");
    }
    return res.json();
  };
  const {
    data: appointments,
    error,
    isError,
    isLoading,
    refetch,
  } = useQuery(["appointments", user.email], getData);

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
        {appointments?.length === 0 ? (
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
                    Tans ID
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="center">
                    Status
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="center">
                    Action
                  </TableCell>                  
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments.map((ap, index) => (
                  <AppointmentsRow key={ap._id} ap={ap} refetch={refetch} index={index} />
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
