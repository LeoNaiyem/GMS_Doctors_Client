import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { AttentionSeeker, Fade } from "react-awesome-reveal";
import customer_care from "../../assets/images/customer_care.jpg";
import telephone from "../../assets/images/telephone.jpg";

const FooterBanner = () => {
  return (
    <Box sx={{ py: 3 }}>
      <Box
        sx={{ display: "flex", justifyContent: "center", minHeight: "40vh" }}
      >
        <Box sx={{ width: "80%", height: "100%", pt: 3, pb: 2, mt: 3 }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 5 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Grid item xs={5}>
              <img
                style={{ width: "100%", height: "100%", borderRadius: "10px" }}
                src={customer_care}
                alt="customer_care"
              />
            </Grid>
            <Grid item xs={7}>
              <Typography
                sx={{ fontSize: "25px", fontWeight: 600 }}
                variant="p"
                color=""
              >
                Do you want to repair you phone?
              </Typography>

              <Typography
                sx={{ fontSize: "50px", fontWeight: 900, my: 1 }}
                variant="h4"
                color="#1873C6"
              >
                <Fade cascade damping={0.4}>
                  +06-256569481
                </Fade>
              </Typography>
              <Typography variant="p" color="text.secondary">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Molestias temporibus odio cum optio dolores rerum?
              </Typography>
              <Box>
                <AttentionSeeker effect="heartBeat" delay={6000}>
                  <img
                    style={{ height: "100px" }}
                    src={telephone}
                    alt="telephone"
                  />
                </AttentionSeeker>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default FooterBanner;
