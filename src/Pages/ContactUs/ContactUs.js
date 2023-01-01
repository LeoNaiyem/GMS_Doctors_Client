import { Box, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import under_construction from "../../assets/images/under_construction.jpg";

const ContactUs = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <img style={{borderRadius:"10px"}} src={under_construction} alt="under construction" />
      <Link style={{textDecoration:"none", margin:"20px auto"}} to="/home">
          <Button variant="contained" color="success">Go Home</Button>{" "}
        </Link>
    </Box>
  );
};

export default ContactUs;
