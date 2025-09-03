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
import { BASE_URL, toastAlert } from "../../utils";
import { apiEndPoints } from "../../constant/apiEndPoints";
import axios from "axios";

const Signup = () => {
  const roles = ["student", "instructor"];
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "",
    },
  });
  const onSubmit = async (data) => {
    console.log("Form data:", data);
    try {
      setLoading(true);
      const api = `${BASE_URL}${apiEndPoints.signup}`;
      const response = await axios.post(api, data);
      console.log("response", response);
      setLoading(false);
      toastAlert({
        type: "success",
        message: response.data.message || "Signup Successful!",
      });
      navigate("/login");
    } catch (error) {
      setLoading(false);
      console.log(error.message);
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
          Sign Up
        </Typography>

        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <TextField variant="outlined" label="Name" fullWidth {...field} />
          )}
        />

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
        <Controller
          control={control}
          name="role"
          render={({ field }) => (
            <TextField select label="Role" fullWidth {...field}>
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Button variant="contained" type="submit" fullWidth>
          {loading ? "signing up" : "Sign Up"}
        </Button>

        <Typography
          sx={{
            display: "flex",
            gap: "5px",
            justifyContent: "center",
          }}
        >
          Have an Account
          <Link
            style={{
              color: "blue",
              textDecoration: "none",
            }}
            to={"/login"}
          >
            Login
          </Link>
        </Typography>
      </Box>
    </Stack>
  );
};

export default Signup;
