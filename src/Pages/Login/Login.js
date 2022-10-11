import Button from "@mui/joy/Button";
import Chip from "@mui/joy/Chip";
import Sheet from "@mui/joy/Sheet";
import { CssVarsProvider } from "@mui/joy/styles";
import TextField from "@mui/joy/TextField";
import { Box, Divider, Typography } from "@mui/material";
import React, { useEffect } from "react";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import Loader from "../Shared/Loader";

const Login = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let signInError;
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/home";
  useEffect(() => {
    if (user || gUser) {
      navigate(from, { replace: true });
    }
  }, [user, from, navigate, gUser]);
  if (loading || gLoading) {
    return <Loader />;
  }

  if (error || gError) {
    signInError = (
      <Typography fontSize="13px" color="red" variant="caption" role="alert">
        {error?.message || gError?.message}
      </Typography>
    );
  }

  const onSubmit = (data) => {
    const { email, password } = data;
    signInWithEmailAndPassword(email, password);
  };
  return (
    <Box
      sx={{
        mt: "5rem",
      }}
    >
      <CssVarsProvider>
        <Sheet
          sx={{
            maxWidth: 350,
            mx: "auto",
            py: 3,
            px: 2,
            my: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            borderRadius: "sm",
            boxShadow: "md",
          }}
          variant="outlined"
        >
          <Typography
            sx={{ alignSelf: "center", fontWeight: "700", fontSize: "22px" }}
            variant="h6"
            color="#096bde"
          >
            Login
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              name="email"
              type="email"
              placeholder="Email Here"
              label="Email"
              {...register("email", {
                required: { value: true, message: "Email is required" },
              })}
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
            <TextField
              name="password"
              type="password"
              placeholder="password"
              label="Password"
              sx={{ mt: 1 }}
              {...register("password", {
                required: { value: true, message: "Password is required" },
              })}
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
            {signInError}
            <Button
              type="submit"
              sx={{
                mt: 2,
                width: "100%",
              }}
            >
              Login
            </Button>
          </form>
          <Typography fontSize="sm" sx={{ alignSelf: "center" }}>
            Don't have an account?<Link to="/register">Register</Link>
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
    </Box>
  );
};

export default Login;
