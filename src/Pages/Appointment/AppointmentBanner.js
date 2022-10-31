import { Box, Typography } from "@mui/material";
import React from "react";
import "react-phone-input-2/lib/material.css";
import { useParams } from "react-router-dom";
import bgImage from "../../assets/images/download.jpg";
import "./AppointmentBanner.css";

const AppointmentBanner = () => {
  const { serviceName } = useParams();

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

  return (
    <Box sx={{ mt: "4rem" }}>
      <Box className="blur_effect" style={bg}>
        <Typography
          sx={{ fontWeight: 700, color: "white", position: "relative" }}
          variant="h4"
        >
          Book An Appointment for{" "}
          <Typography variant="caption" color="#ee7600">
            {serviceName}
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default AppointmentBanner;
