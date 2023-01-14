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
import React from "react";
import { useForm } from "react-hook-form";
import "react-phone-input-2/lib/material.css";
import { toast } from "react-toastify";
import bgImage from "../../assets/images/download.jpg";
import Loader from "../../Pages/Shared/Loader";

const AddService = () => {
  // const [user] = useAuthState(auth);
  const [service, setService] = React.useState("Smart Phones");
  const [isLoading, setIsLoading] = React.useState(false);
  const handleChange = (event) => {
    setService(event.target.value);
  };
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

  // const currentUrl = window.location.href;
  // const lastSegment = currentUrl.split("/").pop();
  // console.log(lastSegment);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const imgApiKye = process.env.REACT_APP_IMAGE_BB_API_KEY;
  const onSubmit = (data) => {
    console.log(data);
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imgApiKye}`;
    setIsLoading(true);
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          const imgUrl = result.data.url;
          const service = {
            providerName: data.providerName,
            providerEmail: data.email,
            serviceName: data.name,
            price: data.price,
            image: imgUrl,
          };
          //sending data to the server
          fetch("https://gms-doctors-server.onrender.com/services", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(service),
          })
            .then((res) => res.json())
            .then((inserted) => {
              if (inserted.insertedId) {
                setIsLoading(false);
                toast.success("Service added successfully");
                reset();
              } else {
                toast.error("Something Went Wrong!");
                setIsLoading(false);
              }
            });
        }
      });
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <Box>
        <Box className="blur_effect" style={bg}>
          <Typography
            sx={{ fontWeight: 700, color: "white", position: "relative" }}
            variant="h4"
          >
            Add A New Service
          </Typography>
        </Box>
      </Box>
      <Box sx={{ py: 2, px: 5 }} component="section">
        <Typography sx={{ textAlign: "center" }} variant="h6">
          Complete The Form
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
                    required: {
                      value: true,
                      message: "Service name is required",
                    },
                  })}
                  id="outlined-multiline-flexible"
                  label="Service Name"
                  type="text"
                  placeholder="Enter The Service Name"
                  helperText={errors.name?.message}
                  sx={{ m: 1, width: "100%" }}
                />
                <TextField
                  {...register("providerName", {
                    required: {
                      value: true,
                      message: "Provider name is required",
                    },
                  })}
                  id="outlined-multiline-flexible"
                  label="Provider Name"
                  type="text"
                  placeholder="Service provider name"
                  helperText={errors.providerName?.message}
                  sx={{ m: 1, width: "100%" }}
                />
                <TextField
                  {...register("price", {
                    required: { value: true, message: "Price is required" },
                  })}
                  id="outlined-multiline-flexible"
                  label="Price"
                  type="text"
                  placeholder="Service price"
                  helperText={errors.price?.message}
                  sx={{ m: 1, width: "100%" }}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormControl sx={{ m: 1, width: "100%" }}>
                  <InputLabel id="demo-simple-select-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={service}
                    label="Category"
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
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Provider email is required",
                    },
                  })}
                  id="outlined-multiline-flexible"
                  label="Provider Email"
                  type="email"
                  placeholder="Service Provider Email"
                  helperText={errors.email?.message}
                  sx={{ m: 1, width: "100%" }}
                />
                <TextField
                  {...register("image", {
                    required: {
                      value: true,
                      message: " Service image is required",
                    },
                  })}
                  id="outlined-multiline-flexible"
                  type="file"
                  helperText={errors.image?.message}
                  sx={{ m: 1, width: "100%" }}
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              type="submit"
              sx={{ mt: 1, width: "40%" }}
            >
              Add Service
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AddService;
