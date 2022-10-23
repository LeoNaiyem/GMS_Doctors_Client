import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import bgImage from "../../assets/images/download.jpg";
import auth from "../../firebase.init";
import "./AppointmentBanner.css";

const AppointmentBanner = () => {
  const [phoneNumber, setPhoneNumber] = useState();
  const [service, setService] = React.useState("Smart Phones");
  const [user] = useAuthState(auth);
  const handleChange = (event) => {
    setService(event.target.value);
  };

  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);
  const nextDate = currentDate.toLocaleDateString();
  const reformatDateString = (s) => {
    var b = s.split(/\D/);
    return b.reverse().join("-");
  };

  console.log();

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const newData = { ...data, phone: phoneNumber, service: service };
    console.log(newData);
  };

  return (
    <Box sx={{ mt: "4rem" }}>
      <Box className="blur_effect" style={bg}>
        <Typography
          sx={{ fontWeight: 700, color: "white", position: "relative" }}
          variant="h4"
        >
          Book An Appointment
        </Typography>
      </Box>

      <Box sx={{ py: 3 }} component="section">
        <Typography sx={{ textAlign: "center" }} variant="h6">
          Complete Appointment Form
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              backgroundColor: "#ee7600",
              width: "60px",
              height: "3px",
              borderRadius: "10px",
            }}
          ></Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
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
                  sx={{ m: 1, width: "95%" }}
                />
                <PhoneInput
                  name="phoneNumber"
                  type="text"
                  country={"bd"}
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  containerStyle={{
                    margin: "10px 8px",
                  }}
                  inputStyle={{
                    width: "95%",
                  }}
                  required
                />
                <TextField
                  {...register("brand", {
                    required: { value: true, message: "Email is required" },
                  })}
                  id="outlined-multiline-flexible"
                  label="Brand"
                  type="text"
                  placeholder="Brand Name"
                  helperText={errors.brand?.message}
                  sx={{ m: 1, width: "95%" }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
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
                  sx={{ m: 1, width: "95%" }}
                />
                {/* <TextField
                  {...register("service", {
                    required: { value: true, message: "Service is required" },
                  })}
                  id="outlined-multiline-flexible"
                  label="Service"
                  defaultValue="Select Service"
                  helperText={errors.service?.message}
                  sx={{ m: 1, width: "95%" }}
                /> */}
                <FormControl sx={{ m: 1, width: "95%" }}>
                  <InputLabel id="demo-simple-select-label">Service</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={service}
                    label="Service"
                    onChange={handleChange}
                  >
                    <MenuItem value={"Smart Phones"}>Smart Phones</MenuItem>
                    <MenuItem value={"Tablet & iPad"}>Tablet & iPad</MenuItem>
                    <MenuItem value={"LCD & LED TV"}>LCD & LED TV</MenuItem>
                    <MenuItem value={"Desktop & Mac"}>Desktop & Mac</MenuItem>
                    <MenuItem value={"Came Console"}>Came Console</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  {...register("date", {
                    required: { value: true, message: "Time is required" },
                  })}
                  id="outlined-multiline-flexible"
                  label="Date (mm/dd/yy)"
                  type="date"
                  placeholder="Select Date"
                  defaultValue={reformatDateString(nextDate)}
                  helperText={errors.time?.message}
                  sx={{ m: 1, width: "95%" }}
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              type="submit"
              sx={{
                mt: 2,
                width: "40%",
              }}
            >
              Book
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AppointmentBanner;
