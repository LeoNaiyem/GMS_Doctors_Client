import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import bgImage from "../../assets/images/not_found.jpg";

const imageStyle = {
  width: "100%",
  height: "100%",
};
const NotFound = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <img style={imageStyle} src={bgImage} alt="not_found"></img>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          position: "absolute",
          top: "63vh",
        }}
      >
        <Typography sx={{ color: "#d9311e", fontWeight: 700, mb:1 }} variant="h2">
          Page Not Found !
        </Typography>
        <Link style={{ textDecoration: "none" }} to="/home">
          <Button variant="contained" color="success">Back to Home</Button>
        </Link>
      </Box>
    </Box>
  );
};

export default NotFound;
