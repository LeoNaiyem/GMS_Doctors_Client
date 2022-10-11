import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import iphone from "../../assets/images/iphone_bf.jpg";
import phone from "../../assets/images/phone_bf.jpg";
import tablet from "../../assets/images/tablet_bf.png";
import GalleryItem from "./GalleryItem";

const galleryItems = [
  {
    id: 1,
    image: phone,
  },
  {
    id: 2,
    image: iphone,
  },
  {
    id: 3,
    image: tablet,
  },
];
const Gallery = () => {
  return (
    <Container sx={{ py: 5 }}>
      <Box component="section">
        <Typography sx={{ textAlign: "center" }} color="#ee7600" variant="h6">
          OUR GALLERY
        </Typography>
        <Typography sx={{ textAlign: "center" }} variant="h4">
          BEFORE & AFTER
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
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "80%", pt: 3, pb: 2, mt: 3 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {galleryItems.map((item, index) => (
              <GalleryItem key={index} item={item}></GalleryItem>
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Gallery;
