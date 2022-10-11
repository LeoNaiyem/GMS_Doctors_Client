import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import business_women from "../../assets/images/client-business_women.jpg";
import business_man from "../../assets/images/client_businessman.jpg";
import dr from "../../assets/images/client_dr.jpg";
import ClientReview from "./ClientReview";

const reviews = [
  {
    id: 1,
    name: "Naiyema Hossain",
    email: "naiyema@hossain.com",
    image: business_women,
    opinion:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, sequi!",
    profession: "Business Women",
  },
  {
    id: 2,
    name: "Dr. Sara",
    email: "dr@sara.com",
    image: dr,
    opinion:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, sequi!",
    profession: "Doctor",
  },
  {
    id: 3,
    name: "Muhammad",
    email: "muhammad@gmail.com",
    image: business_man,
    opinion:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, sequi!",
    profession: "Business Man",
  },
];
const Testimonials = () => {
  return (
    <Box sx={{ py: 5, backgroundColor: "#F5BFBF", position: "relative" }} component="section">
      <Box sx={{ minHeight: "40vh" }}>
        <Typography sx={{ textAlign: "center" }} color="#ee7600" variant="h6">
          OUR TESTIMONIALS
        </Typography>
        <Typography sx={{ textAlign: "center" }} variant="h4">
          WHAT OUR CLIENT SAY'S
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
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ width: "80%", pt: 3, pb: 2, mt: 3 }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {reviews.map((review) => (
                <ClientReview key={review.id} review={review} />
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Testimonials;
