import { Grid, Paper, Typography } from "@mui/material";
import React from "react";

const SingleService = ({ service }) => {
  return (
    <Grid item xs={4} sm={4} md={3}>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p:1
        }}
        elevation={3}
      >
        <img
          style={{ height: "210px", width: "200px", objectFit: "contain" }}
          src={service.image}
          alt={service.name}
        />
        <Typography>{service.name}</Typography>
        <Typography variant="caption" color='primary' sx={{py:1, textTransform: "uppercase"}}>Repair</Typography>
      </Paper>
    </Grid>
  );
};

export default SingleService;
