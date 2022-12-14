import { Button, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { Zoom } from "react-awesome-reveal";
import { Link } from "react-router-dom";

const SingleService = ({ service }) => {
  return (
    <Grid item xs={4} sm={4} md={3}>
      <Zoom>
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: 1,
          }}
          elevation={3}
        >
          <img
            style={{ height: "210px", width: "200px", objectFit: "contain" }}
            src={service.image}
            alt={service.serviceName}
          />
          <Typography sx={{ textAlign: "center" }}>
            {service.serviceName}
          </Typography>
          <Link
            style={{ textDecoration: "none" }}
            to={`/appointment/${service.serviceName}`}
          >
            <Button size="small" variant="text">
              Repair
            </Button>
          </Link>
        </Paper>
      </Zoom>
    </Grid>
  );
};

export default SingleService;
