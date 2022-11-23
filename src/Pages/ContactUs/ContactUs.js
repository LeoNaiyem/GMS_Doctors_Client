import { Box } from "@mui/material";
import React from "react";

const ContactUs = () => {
  const role = "user";
  const array = [
    { name: "Home", rq: "user" },
    { name: "Dashboard", rq: "admin" },
    { name: "payment", rq: "user" },
    { name: "Reviews", rq: "admin" },
  ];
  const adminRoutes = array.filter((route) => route.rq === role);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <h1>Contact Us</h1>

      <ul>
        {adminRoutes.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </Box>
  );
};

export default ContactUs;
