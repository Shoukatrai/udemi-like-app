import React, { useState } from "react";
import {
  Box,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL, toastAlert } from "../../utils";
import { apiEndPoints } from "../../constant/apiEndPoints";
import cookie from "js-cookie";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const roles = ["student", "instructor"];
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      console.log("data", data);
      const api = `${BASE_URL}${apiEndPoints.login}`;
      const response = await axios.post(api, data);
      console.log("response", response);
      cookie.set("token", response.data.token);
      cookie.set("type", response.data.data.role);
      setLoading(false);
      toastAlert({
        type: "success",
        message: response.data.message || "Login Successful!",
      });
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.log("error", error.message);
      toastAlert({
        type: "error",
        message: error.message || "Something went wrong!",
      });
    }
  };

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh" }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          p: 4,
          width: 400,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          boxShadow: 3,
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" textAlign="center">
          Login
        </Typography>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextField variant="outlined" label="Email" {...field} fullWidth />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <TextField
              variant="outlined"
              label="Password"
              type="password"
              fullWidth
              {...field}
            />
          )}
        />
        <Button variant="contained" type="submit" fullWidth>
          Login
        </Button>

        <Typography
          sx={{
            display: "flex",
            gap: "5px",
            justifyContent: "center",
          }}
        >
          Don't Have an Account
          <Link
            style={{
              color: "blue",
              textDecoration: "none",
            }}
            to={"/signup"}
          >
            signup
          </Link>
        </Typography>
      </Box>
    </Stack>
  );
};

export default Login;
