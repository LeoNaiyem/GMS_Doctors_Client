import { Box, Grid, List, ListItem, Typography } from "@mui/material";
import React from "react";
import { Fade } from "react-awesome-reveal";
import banner from "../../assets/images/about_banner.jpg";
// import bgImage from "../../assets/images/customer_care.jpg";

// const bg = {
//   backgroundImage: `url(${bgImage})`,
//   backgroundRepeat: "no-repeat",
//   backgroundPosition: "right",
//   backgroundSize: "cover",
//   height: "100%"
// };
const AboutUsBanner = () => {
  return (
    <Box sx={{ py: 3 }}>
      <Grid
        sx={{
          display: "flex",
          alignItems: "center",
          height: "500px",
          backgroundColor: "#FFCBCB"
        }}
        container
      >
        <Grid sx={{ height: "100%" }} item xs={12} sm={6}>
          <img
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            src={banner}
            alt="banner"
          />
        </Grid>
        <Grid sx={{ height: "100%" }} item xs={12} sm={6}>
          <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column", height: "100%", px:"5rem"}}>
            <Box>
              <Typography color="#ee7600" variant="h6">
                ABOUT US
              </Typography>
              <Typography variant="h5">HOW WE CAN HELP</Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  mb: "20px",
                }}
              >
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
            <Typography variant="p">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
              harum inventore voluptatibus! Assumenda repellendus natus, dolorem
              harum unde eius consectetur id, nisi minus repudiandae animi.
            </Typography>
            <nav aria-label="device fix return">
              <List>
                <ListItem disablePadding>
                <Fade direction="up">
                  <Typography
                    sx={{ fontSize: "20px", fontWeight: 400 }}
                    variant="h6"
                  >
                    <span
                      style={{
                        fontSize: "30px",
                        fontWeight: 900,
                        color: "#1772C3",
                        fontStyle: "italic",
                        paddingRight: "10px",
                      }}
                    >
                      #1
                    </span>{" "}
                    Broken Device
                  </Typography>
                  </Fade>
                </ListItem>
                <ListItem disablePadding>
                <Fade direction="up" delay={1000}>
                  <Typography
                    sx={{ fontSize: "20px", fontWeight: 400 }}
                    variant="h6"
                  >
                    <span
                      style={{
                        fontSize: "30px",
                        fontWeight: 900,
                        color: "#1772C3",
                        fontStyle: "italic",
                        paddingRight: "10px",
                      }}
                    >
                      #2
                    </span>{" "}
                    Send it to US
                  </Typography>
                  </Fade>
                </ListItem>
                <ListItem disablePadding>
                <Fade direction="up" delay={2000}>
                  <Typography
                    sx={{ fontSize: "20px", fontWeight: 400 }}
                    variant="h6"
                  >
                    <span
                      style={{
                        fontSize: "30px",
                        fontWeight: 900,
                        color: "#1772C3",
                        fontStyle: "italic",
                        paddingRight: "10px",
                      }}
                    >
                      #3
                    </span>{" "}
                    Quick fix
                  </Typography>
                  </Fade>
                </ListItem>
                <ListItem disablePadding>
                <Fade direction="up" delay={3000}>
                  <Typography
                    sx={{ fontSize: "20px", fontWeight: 400 }}
                    variant="h6"
                  >
                    <span
                      style={{
                        fontSize: "30px",
                        fontWeight: 900,
                        color: "#1772C3",
                        fontStyle: "italic",
                        paddingRight: "10px",
                      }}
                    >
                      #4
                    </span>{" "}
                    Fast Return
                  </Typography>
                  </Fade>
                </ListItem>
              </List>
            </nav>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutUsBanner;
