import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";

const Specialty = ({ specialty }) => {
  return (
    <Grid item xs={4} sm={4} md={4}>
      <Paper
        sx={{
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
        <Box>{specialty.icon}</Box>
        <Typography sx={{ py: 1, fontWeight: 700 }} variant="h6">
          {specialty.title}
        </Typography>
        <Typography variant="subtitle1" color="gray" sx={{ py: 1 }}>
          {specialty.des}
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Specialty;
