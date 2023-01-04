import { Box, Button, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";
import "react-phone-input-2/lib/material.css";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import bgImage from "../../assets/images/download.jpg";
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
const AllServices = () => {
  const getData = async () => {
    const res = await fetch("https://gms-doctors-server.vercel.app/services");
    return res.json();
  };

  const {
    data: services,
    error,
    isError,
    isLoading,
    refetch
  } = useQuery("users", getData);

  const deleteService = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete");
    if (!confirmed) {
        return;
    }
    const url = `https://gms-doctors-server.vercel.app/services/${id}`;
    fetch(url, {
      method: "DELETE",
      headers: { "content-Type": "application/json" },
    })
    .then(response => response.json())
    .then(result =>{
        if (result.deletedCount >0) {
            toast.info("Deleted successfully");
            refetch();
        }
        else{
            toast.info("Failed to delete")
        }
    })
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
            All Services
          </Typography>
        </Box>
      </Box>
      <Box sx={{ py: 3, px: 5 }} component="section">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: "black" }}>
              <TableRow>
                <TableCell sx={{ color: "white" }} align="center">
                  Index
                </TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  Provider Email
                </TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  Provider Name
                </TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  Service
                </TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  Price
                </TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {services.map((service, index) => (
                <TableRow
                  key={service._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{service.providerEmail}</TableCell>
                  <TableCell align="center">{service.providerName}</TableCell>
                  <TableCell align="center">{service.serviceName}</TableCell>
                  <TableCell align="center">{service.price}</TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() => deleteService(service._id)}
                      variant="outlined"
                      size="small"
                      color="error"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default AllServices;
