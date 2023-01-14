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
import AllUsersRow from "./AllUsersRow";

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

const AllUsers = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const getData = async () => {
    const res = await fetch(`https://gms-doctors-server.onrender.com/users`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    if (res.status === 401 || res.status === 403) {
      signOut(auth);
      localStorage.removeItem("accessToken");
      navigate("/home");
    }
    return res.json();
  };
  const {
    data: users,
    error,
    isError,
    isLoading,
    refetch,
  } = useQuery(["users", user.email], getData);

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
            All Users
          </Typography>
        </Box>
      </Box>
      <Box sx={{ py: 3, px: 5 }} component="section">
        {users?.length === 0 ? (
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
              <TableHead sx={{ backgroundColor: "#9c27b0" }}>
                <TableRow>
                  <TableCell sx={{ color: "white" }} align="center">
                    Index
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="left">
                    Email
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="center">
                    Action
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="center">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, index) => (
                  <AllUsersRow key={user._id} user={user} refetch={refetch} index={index} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </>
  );
};

export default AllUsers;
