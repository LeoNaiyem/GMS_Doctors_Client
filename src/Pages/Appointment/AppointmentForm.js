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
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import Loader from "../Shared/Loader";

const AppointmentForm = ({ serviceNames }) => {
  const navigate = useNavigate();
  const { serviceName } = useParams();
  const [phoneNumber, setPhoneNumber] = useState();
  const [service, setService] = React.useState(serviceName || "Smart Phones");
  const [user] = useAuthState(auth);
  const handleChange = (event) => {
    setService(event.target.value);
  };
  const getData = async () => {
    const res = await fetch(`https://gms-doctors-server.onrender.com/services/${serviceName}`);
    return res.json();
  };
  const {
    data: serviceInfo,
    error,
    isError,
    isLoading,
  } = useQuery(["serviceInfo", serviceName], getData);
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);
  const nextDate = currentDate.toLocaleDateString();
  const reformatDateString = (s) => {
    var b = s.split(/\D/);
    return b.reverse().join("-");
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const apData = {
      ...data,
      paid:false,
      service,
      price: serviceInfo?.price,
      providerName: serviceInfo?.providerName,
      providerEmail: serviceInfo?.providerEmail,
    };
    fetch("https://gms-doctors-server.onrender.com/appointments", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(apData),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.insertedId) {
          toast.success("Appointment booked successfully");
          reset();
          navigate(`/payment/${result.insertedId}`);
        } else {
          toast.error("Something went wrong");
        }
      });
  };

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
              <PhoneInput
                name="phoneNumber"
                type="text"
                country={"bd"}
                value={phoneNumber}
                onChange={setPhoneNumber}
                containerStyle={{
                  margin: "8px",
                }}
                inputStyle={{
                  width: "100%",
                }}
                required
              />
              <TextField
                {...register("date", {
                  required: { value: true, message: "Time is required" },
                })}
                id="outlined-multiline-flexible"
                label="Date (mm/dd/yy)"
                type="date"
                placeholder="Select Date"
                defaultValue={reformatDateString(nextDate)}
                helperText={errors.date?.message}
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
              <FormControl sx={{ m: 1, width: "100%" }}>
                <InputLabel id="demo-simple-select-label">Service</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={service}
                  label="Service"
                  onChange={handleChange}
                >
                  {serviceNames.map((name, index) => (
                    <MenuItem key={index} value={name?.serviceName}>
                      {name?.serviceName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                {...register("model", {
                  required: { value: true, message: "Model name is required" },
                })}
                id="outlined-multiline-flexible"
                label="Model Name"
                type="text"
                placeholder={`${serviceName} Model Name`}
                helperText={errors.model?.message}
                sx={{ m: 1, width: "100%" }}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            type="submit"
            sx={{ mt: 1, width: "40%" }}
          >
            Book
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AppointmentForm;
