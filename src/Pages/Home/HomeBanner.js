import {
  Box,
  Button,
  Container,
  Grid,
  Toolbar,
  Typography
} from "@mui/material";
import React from "react";
import { Slide } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import home_banner from "../../assets/images/home_banner.jpg";

const HomeBanner = () => {
  return (
    <Container sx={{py: 3}}>
      <Toolbar />
      <Box component="main" sx={{ py: 5 }}>
        <Grid
          sx={{
            width: "100%",
            mxHeight: "350px",
            display: "flex",
            alignItems: "center",
          }}
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid sx={{ px: 5 }} item xs={2} sm={4} md={6}>
            <Slide direction="left">
            <Typography sx={{ fontWeight: 700 }} variant="h3">
              What Can I Fix For <br /> You Today!
            </Typography>
            <Typography
              sx={{
                fontWeight: 500,
                mt: 1,
                mb: 2,
                fontSize: "22px",
                color: "#ee7600",
              }}
              display="block"
              variant="p"
            >
              Quick, Affordable And Certified Cell Phone Repair <br /> Service At
              Your Door.
            </Typography>
            <Link style={{ textDecoration: "none" }} to="/appointment/Smart%20Phones">
              <Button variant="contained" color="warning">
                Repair My Phone
              </Button>
            </Link>
            </Slide>
          </Grid>
          <Grid sx={{marginLeft:'30px'}} item xs={2} sm={4} md={4}>
            <Slide direction="right">

            <img
              style={{ height: "350px", borderRadius: "10px" }}
              src={home_banner}
              alt="banner"
            />
            </Slide>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default HomeBanner;
