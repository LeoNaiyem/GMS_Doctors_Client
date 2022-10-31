import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SendIcon from "@mui/icons-material/Send";
import TwitterIcon from "@mui/icons-material/Twitter";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Typography
} from "@mui/material";
import React from "react";
import logo from "../../assets/images/setting.png";

const Footer = () => {
  return (
    <Box sx={{ py: 3, backgroundColor: "#333333" }}>
      <Box
        sx={{ display: "flex", justifyContent: "center", minHeight: "30vh" }}
      >
        <Box sx={{ width: "80%", height: "100%", pt: 3, pb: 2, mt: 3 }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 5 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              height: "100%",
            }}
          >
            <Grid item xs={6} sm={4} md={3}>
              <Box
                sx={{
                  display: "flex",
                  minHeight: "100px",
                  alignItems: "center",
                }}
              >
                <Box>
                  <img style={{ height: "60px" }} src={logo} alt="logo" />
                </Box>
                <Box sx={{ ml: -1, mt: 2, color: "white" }}>
                  <Typography
                    sx={{
                      lineHeight: "10px",
                      fontWeight: 900,
                    }}
                  >
                    GMS
                  </Typography>
                  <Typography color="#07bdb5">DOCTORS</Typography>
                </Box>
              </Box>
              <Stack direction="row">
                <IconButton aria-label="facebook" size="small">
                  <FacebookIcon color="primary" fontSize="small" />
                </IconButton>
                <IconButton color="primary" size="small">
                  <TwitterIcon fontSize="small" />
                </IconButton>
                <IconButton color="primary" size="small">
                  <InstagramIcon fontSize="small" />
                </IconButton>
                <IconButton color="primary" size="small">
                  <LinkedInIcon fontSize="small" />
                </IconButton>
                <IconButton color="primary" size="small">
                  <GoogleIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
              <Typography variant="button" color="white">
                NEWSLETTER
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  mb: 5,
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "#1972C6",
                    width: "50px",
                    height: "3px",
                    borderRadius: "10px",
                  }}
                ></Box>
              </Box>
              <Typography sx={{ py: 3 }} variant="p" color="#9A9A9A">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
                impedit est neque labore consectetur optio.
              </Typography>
              <Box sx={{ mt: 2, display: "flex", gap: "5px" }}>
                <input
                  style={{
                    borderRadius: "5px",
                    outline: "none",
                    border: "none",
                    padding: "0 5px",
                  }}
                  type="text"
                  placeholder="Email Here"
                />
                <Button variant="contained" size="small">
                  <SendIcon fontSize="small" />
                </Button>
              </Box>
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
              <Typography variant="button" color="white">
                contact us
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  mb: 5,
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "#1972C6",
                    width: "50px",
                    height: "3px",
                    borderRadius: "10px",
                  }}
                ></Box>
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "center", color: "#9A9A9A" }}
              >
                <LocalPhoneIcon
                  sx={{ fontSize: "20px", pr: "5px", color: "white" }}
                />
                <Typography variant="p">+61-215475987</Typography>
              </Box>
              <Typography sx={{ pl: "25px" }} color="#9A9A9A" variant="p">
                +61-215475986
              </Typography>
              <Box
                sx={{
                  pt: 2,
                  display: "flex",
                  alignItems: "center",
                  color: "#9A9A9A",
                }}
              >
                <EmailIcon
                  sx={{ fontSize: "20px", pr: "5px", color: "white" }}
                />
                <Typography variant="p">gms.doctors@gmail.com</Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
              <Typography variant="button" color="white">
                our location
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  mb: 5,
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "#1972C6",
                    width: "50px",
                    height: "3px",
                    borderRadius: "10px",
                  }}
                ></Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  color: "#9A9A9A",
                }}
              >
                <LocationOnIcon
                  sx={{ fontSize: "20px", pr: "5px", color: "white" }}
                />
                <Typography variant="p">
                  121 King Street, Melbouren <br /> Victoria 3000 Australia{" "}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  color: "#9A9A9A",
                  pt: 2,
                }}
              >
                <AccessTimeIcon
                  sx={{ fontSize: "20px", pr: "5px", color: "white" }}
                />
                <Typography variant="p">
                  Mon-Fri: 9:00am-6:00pm <br />
                  Sat-Sun: 10:00am-5:00pm
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
