import { Grid, Paper } from "@mui/material";
import React from "react";

const GalleryItem = ({ item }) => {
  return (
    <Grid item xs={4} sm={4} md={4}>
      <Paper
        sx={{
          height: "300px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          px: 1,
          py: 3,
        }}
        elevation={3}
      >
        <img
          style={{ width: "100%", height: "100%", objectFit:'contain'}}
          src={item.image}
          alt="img"
        />
      </Paper>
    </Grid>
  );
};

export default GalleryItem;
