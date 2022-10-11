import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ConstructionIcon from "@mui/icons-material/Construction";
import EngineeringIcon from "@mui/icons-material/Engineering";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import WalletIcon from "@mui/icons-material/Wallet";
import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import Specialty from "./Specialty";

const specialties = [
  {
    title: "Fast Repair Process",
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem illo nobis accusamus distinctio. Ad, suscipit?",
    icon: <ConstructionIcon fontSize="large" color="primary" />,
  },
  {
    title: "No Work No Fee",
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem illo nobis accusamus distinctio. Ad, suscipit?",
    icon: <WalletIcon fontSize="large" color="primary" />,
  },
  {
    title: "30 days Warranty",
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem illo nobis accusamus distinctio. Ad, suscipit?",
    icon: <AssignmentIcon fontSize="large" color="primary" />,
  },
  {
    title: "24/7 Service -Available",
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem illo nobis accusamus distinctio. Ad, suscipit?",
    icon: <AddIcCallIcon fontSize="large" color="primary" />,
  },
  {
    title: "Professionally Technicians",
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem illo nobis accusamus distinctio. Ad, suscipit?",
    icon: <EngineeringIcon fontSize="large" color="primary" />,
  },
  {
    title: "Satisfaction Guaranteed",
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem illo nobis accusamus distinctio. Ad, suscipit?",
    icon: <ThumbUpAltIcon fontSize="large" color="primary" />,
  },
];
const AboutUs = () => {
  return (
    <Container sx={{ py: 3 }}>
      <Box component="section">
        <Typography sx={{ textAlign: "center" }} color="#ee7600" variant="h6">
          ABOUT US
        </Typography>
        <Typography sx={{ textAlign: "center" }} variant="h4">
          WHY CHOOSE US
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
      <Box sx={{display: "flex", justifyContent: "center"}}>
        <Box sx={{width:"80%", pt: 3, pb: 2, mt: 3 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {specialties.map((specialty, index) => (
              <Specialty key={index} specialty={specialty}></Specialty>
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default AboutUs;
