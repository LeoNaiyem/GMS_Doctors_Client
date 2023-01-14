import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import bgImage from "../../assets/images/download.jpg";
import auth from "../../firebase.init";

const bg = {
  backgroundImage: `url(${bgImage})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center 40%",
  width: "100%",
  height: "25vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
};

const GiveReview = () => {
  const [user] = useAuthState(auth);
  console.log(user);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const reviewDetails ={
        ...data,
        img: user?.photoURL,
    }
    console.log(reviewDetails);
    fetch("https://gms-doctors-server.onrender.com/reviews", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(reviewDetails),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.insertedId) {
          toast.success("Appointment booked successfully");
          reset();
          navigate(`/dashboard/reviews`);
        } else {
          toast.error("Something went wrong");
        }
      });
  };
  return (
    <>
      <Box>
        <Box className="blur_effect" style={bg}>
          <Typography
            sx={{ fontWeight: 700, color: "white", position: "relative" }}
            variant="h4"
          >
            Give Review
          </Typography>
        </Box>
      </Box>
      <Box sx={{ py: 3, px: 5 }} component="section">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            px: 2,
          }}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                {...register("name", {
                  required: { value: true, message: "Email is required" },
                })}
                id="outlined-multiline-flexible"
                label="Name"
                type="text"
                placeholder="Name Here"
                defaultValue={user?.displayName}
                helperText={errors.name?.message}
                sx={{ m: 1, width: "100%" }}
              />
              <TextField
                {...register("profession", {
                  required: { value: true, message: "Profession is required" },
                })}
                id="outlined-multiline-flexible"
                label="Profession"
                type="text"
                placeholder="Your Profession"
                helperText={errors.profession?.message}
                sx={{ m: 1, width: "100%" }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <TextField
                {...register("email", {
                  required: { value: true, message: "Email is required" },
                })}
                id="outlined-multiline-flexible"
                label="Email"
                type="email"
                placeholder="Email Here"
                defaultValue={user?.email}
                helperText={errors.email?.message}
                sx={{ m: 1, width: "100%" }}
              />

              <TextField
                {...register("opinion", {
                  required: { value: true, message: "Leave a Comment" },
                })}
                sx={{ m: 1, width: "100%" }}
                id="outlined-multiline-static"
                label="Your Review"
                multiline
                placeholder="What Do You Think About Us ?"
                helperText={errors.opinion?.message}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            type="submit"
            sx={{ mt: 1, width: "30%" }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default GiveReview;
