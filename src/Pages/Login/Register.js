import Button from "@mui/joy/Button";
import Chip from "@mui/joy/Chip";
import Sheet from "@mui/joy/Sheet";
import { CssVarsProvider } from "@mui/joy/styles";
import TextField from "@mui/joy/TextField";
import { Divider, Typography } from "@mui/material";
import React, { useEffect } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateProfile
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import useToken from "../../hooks/useToken";
import Loader from "../Shared/Loader";

const Register = () => {
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  let signInError;
  const navigate = useNavigate();
  const [token] = useToken(user || gUser);
  // const location = useLocation();
  // let from = location.state?.from?.pathname || "/home";

  const onSubmit = async (data) => {
    const { email, password, confirmPassword, name } = data;
    if (password !== confirmPassword) {
      return alert("Passwords Are Not Matching!");
    }
    if (password === confirmPassword) {
      await createUserWithEmailAndPassword(email, password);
    }
    await updateProfile({ displayName: name });
    reset();
  };
  if (error || gError || updateError) {
    signInError = (
      <Typography fontSize="13px" color="red" variant="caption" role="alert">
        {error?.message || gError?.message || updateError?.message}
      </Typography>
    );
  }

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  if (loading || gLoading || updating) {
    return <Loader />;
  }
  return (
    <CssVarsProvider>
      <Sheet
        sx={{
          maxWidth: 400,
          mx: "auto",
          py: 3,
          px: 2,
          my: 4,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          borderRadius: "sm",
          boxShadow: "md",
        }}
        variant="outlined"
      >
        <Typography
          sx={{ alignSelf: "center", fontWeight: "700", fontSize: "20px" }}
          variant="h6"
          color="#096bde"
        >
          Register
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("name", {
              required: { value: true, message: "Name is required" },
              maxLength: {
                value: 20,
                message: " Name should not exceed 10 characters",
              },
            })}
            name="name"
            type="text"
            placeholder="Your Name"
            label="Name"
          />
          {errors.name?.type === "required" && (
            <Typography
              fontSize="13px"
              color="red"
              variant="caption"
              role="alert"
            >
              {errors?.name?.message}
            </Typography>
          )}
          {errors.name?.type === "maxLength" && (
            <Typography
              fontSize="13px"
              color="red"
              variant="caption"
              role="alert"
            >
              {errors?.name?.message}
            </Typography>
          )}
          <TextField
            {...register("email", {
              required: { value: true, message: "Email is required" },
              pattern: {
                value:
                  /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/,
                message: "Provide a valid email",
              },
            })}
            name="email"
            type="email"
            placeholder="Your Email"
            label="Email"
            sx={{ mt: 1 }}
          />
          {errors.email?.type === "required" && (
            <Typography
              fontSize="13px"
              color="red"
              variant="caption"
              role="alert"
            >
              {errors?.email?.message}
            </Typography>
          )}
          {errors.email?.type === "pattern" && (
            <Typography
              fontSize="13px"
              color="red"
              variant="caption"
              role="alert"
            >
              {errors?.email?.message}
            </Typography>
          )}
          <TextField
            {...register("password", {
              required: { value: true, message: "Password is required" },
              minLength: {
                value: 10,
                message: "Password must be at least 10 characters",
              },
            })}
            name="password"
            type="password"
            placeholder="Password"
            label="Password"
            sx={{ mt: 1 }}
          />
          {errors.password?.type === "required" && (
            <Typography
              fontSize="13px"
              color="red"
              variant="caption"
              role="alert"
            >
              {errors?.password?.message}
            </Typography>
          )}
          {errors.password?.type === "minLength" && (
            <Typography
              fontSize="13px"
              color="red"
              variant="caption"
              role="alert"
            >
              {errors?.password?.message}
            </Typography>
          )}
          <TextField
            name="confirmPassword"
            type="password"
            placeholder="Retype password"
            label="Retype Password"
            sx={{ mt: 1 }}
            {...register("confirmPassword")}
          />
          {signInError}
          <Button
            type="submit"
            sx={{
              mt: 2,
              width: "100%",
            }}
          >
            Register
          </Button>
        </form>
        <Typography fontSize="sm" sx={{ alignSelf: "center" }}>
          Already have an account?<Link to="/login">Login</Link>
        </Typography>
        <Divider>
          <Chip variant="soft" color="neutral" size="sm">
            OR
          </Chip>
        </Divider>
        <Button onClick={() => signInWithGoogle()} variant="outlined">
          Continue With Google
        </Button>
      </Sheet>
    </CssVarsProvider>
  );
};

export default Register;
