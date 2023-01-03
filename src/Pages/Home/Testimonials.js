import { Avatar, Box, Paper, Typography } from "@mui/material";
import React from "react";
import { Slide } from "react-awesome-reveal";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import Loader from "../Shared/Loader";

const Testimonials = () => {
  const getData = async () => {
    const res = await fetch(`http://localhost:5001/reviews`);
    return res.json();
  };
  const {
    data: allReviews,
    error,
    isError,
    isLoading,
  } = useQuery(["allReviews"], getData);

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    toast.error(error.message);
  }
  if (isError) {
    toast.error(error.message);
  }
  return (
    <Box
      sx={{ py: 5, backgroundColor: "#F5BFBF", position: "relative" }}
      component="section"
    >
      <Box sx={{ minHeight: "40vh" }}>
      <Slide cascade>
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
        </Slide>
        <Box
          sx={{ py: 5, backgroundColor: "#F5BFBF", position: "relative" }}
          component="section"
        >
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ width: "80%", pt: 3, pb: 2, mt: 3 }}>
              <Swiper
                slidesPerView={3}
                spaceBetween={30}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
              >
                {allReviews.map((review) => {
                  return (
                    <SwiperSlide key={review._id}>
                      <Paper
                        sx={{
                          position: "relative",
                          padding: "1rem 1.5rem",
                          textAlign: "center",
                        }}
                        elevation={3}
                      >
                        <Typography
                          sx={{
                            textAlign: "center",
                            fontSize: "40px",
                            fontWeight: 900,
                            mb: 0,
                            pb: 0,
                            fontFamily: "roboto",
                          }}
                          variant="p"
                          color="#ee7600"
                          display="block"
                        >
                          “
                        </Typography>
                        <Typography variant="p" color="text.secondary">
                          <span style={{ fontWeight: 500, color: "#002984" }}>
                            GMS Doctors,
                          </span> {review.opinion}
                        </Typography>
                        <Box
                          sx={{
                            position: "absolute",
                            height: "20px",
                            width: "20px",
                            bottom: -10,
                            left: 30,
                            transform: "rotate(45deg)",
                            backgroundColor: "rgba(255,255,255,0.9)",
                          }}
                        ></Box>
                      </Paper>
                      <Box sx={{ display: "flex", gap: "1rem", mt: 4, pl: 1 }}>
                        <Box>
                          <Avatar
                            alt={review.name}
                            src={review.img}
                            sx={{ width: 50, height: 50 }}
                          />
                        </Box>
                        <Box>
                          <Typography
                            component="div"
                            variant="button"
                            color="#002984"
                          >
                            {review.name}
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            color="text.secondary"
                            component="div"
                          >
                            {review.profession}
                          </Typography>
                        </Box>
                      </Box>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Testimonials;
