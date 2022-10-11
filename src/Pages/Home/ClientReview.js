import { Avatar, Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";

const ClientReview = ({ review }) => {
  const { name, image, opinion, profession } = review;
  return (
    <Grid item xs={2} sm={4} md={4}>
      <Paper
        sx={{
          position: "relative",
          padding: "1rem 1.5rem",
          textAlign: "center",
        }}
        elevation={3}
      >
        <Typography sx={{ textAlign: "center", fontSize:"40px", fontWeight:900, mb:0, pb:0, fontFamily:'roboto'  }} variant="p" color="#ee7600" display="block">
          “
        </Typography>
        <Typography variant="p" color="text.secondary">
          <span style={{ fontWeight: 500, color:"#002984" }}>GMS Doctors,</span> {opinion}
        </Typography>
        <Box
          sx={{
            position: "absolute",
            height: "20px",
            width: "20px",
            bottom: -10,
            left: 30,
            transform: "rotate(45deg)",
            backgroundColor: "rgba(255,255,255,0.9)",
            // zIndex: "-1",
          }}
        ></Box>
      </Paper>
      <Box sx={{ display: "flex", gap: "1rem", mt: 4, pl: 1 }}>
        <Box>
          <Avatar alt={name} src={image} sx={{ width: 50, height: 50 }} />
        </Box>
        <Box>
          <Typography component="div" variant="button" color="#002984">
            {name}
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            component="div"
          >
            {profession}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
};

export default ClientReview;
