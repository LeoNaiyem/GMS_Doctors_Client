import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import desktop from "../../assets/images/desktop.jpg";
import game from "../../assets/images/game console.jpg";
import phone from "../../assets/images/phones.jpg";
import tablet from "../../assets/images/tablet.jpg";
import tv from "../../assets/images/tv.jpg";
import Loader from "../Shared/Loader";
import SingleService from "./SingleService";

const demoServices = [
  {
    id: 1,
    name: "Tablet & iPad",
    image: tablet,
  },
  {
    id: 2,
    name: "Smart Phones",
    image: phone,
  },
  {
    id: 3,
    name: "Desktop & Mac",
    image: desktop,
  },
  {
    id: 4,
    name: "Came Console",
    image: game,
  },
  {
    id: 5,
    name: "LCD & LED TV",
    image: tv,
  },
];
console.log(demoServices)
const Services = () => {
  const getData = async () => {
    const res = await fetch("http://localhost:5001/services");
    return res.json();
  };
  const { data:services, error, isError, isLoading } = useQuery("users", getData);

  if (isLoading) {
    return <Loader/>
  }
  if (error) {
    toast.error(error.message);
  }
  if (isError) {
    toast.error(error.message);
  }
  return (
    <Container sx={{ py: 3 }}>
      <Box component="section">
        <Typography sx={{ textAlign: "center" }} color="#ee7600" variant="h6">
          CHOOSE THE BEST
        </Typography>
        <Typography sx={{ textAlign: "center" }} variant="h4">
          OUR SERVICES
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              backgroundColor: "#ee7600",
              width: "80px",
              height: "3px",
              borderRadius: "10px",
            }}
          ></Box>
        </Box>
      </Box>
      <Box sx={{ pt: 5, pb: 2, mt: 5 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {services.map((service, index) => (
            <SingleService key={index} service={service}></SingleService>
          ))}
        </Grid>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Divider sx={{ width: "70%" }}>
          <Link to="/">View All</Link>
        </Divider>
      </Box>
    </Container>
  );
};

export default Services;
