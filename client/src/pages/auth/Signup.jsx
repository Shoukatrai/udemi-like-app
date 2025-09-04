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
    try {
      setLoading(true);
      const api = `${BASE_URL}${apiEndPoints.signup}`;
      const response = await axios.post(api, data);
      setLoading(false);

      toastAlert({
        type: "success",
        message: response.data.message || "Signup Successful!",
      });
      navigate("/login");
    } catch (error) {
      setLoading(false);
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
      sx={{
        minHeight: "100vh",
        backgroundColor: "var(--color-bg)",
      }}
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
          borderRadius: 3,
          backgroundColor: "var(--color-surface)",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.6)",
        }}
      >
        <Typography
          variant="h5"
          textAlign="center"
          sx={{ color: "var(--color-primary)", fontWeight: 700 }}
        >
          Sign Up
        </Typography>

        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <TextField
              variant="outlined"
              label="Name"
              fullWidth
              {...field}
              InputLabelProps={{
                style: { color: "var(--color-text-secondary)" },
              }}
              InputProps={{ style: { color: "var(--color-text-primary)" } }}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextField
              variant="outlined"
              label="Email"
              fullWidth
              {...field}
              InputLabelProps={{
                style: { color: "var(--color-text-secondary)" },
              }}
              InputProps={{ style: { color: "var(--color-text-primary)" } }}
            />
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
              InputLabelProps={{
                style: { color: "var(--color-text-secondary)" },
              }}
              InputProps={{ style: { color: "var(--color-text-primary)" } }}
            />
          )}
        />

        <Controller
          control={control}
          name="role"
          render={({ field }) => (
            <TextField
              select
              label="Role"
              fullWidth
              {...field}
              InputLabelProps={{
                style: { color: "var(--color-text-secondary)" },
              }}
              InputProps={{ style: { color: "var(--color-text-primary)" } }}
            >
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Button
          variant="contained"
          type="submit"
          fullWidth
          disabled={loading}
          sx={{
            backgroundColor: "var(--color-primary)",
            "&:hover": {
              backgroundColor: "#e65100", // darker orange
            },
            fontWeight: "bold",
            borderRadius: "8px",
          }}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>

        <Typography
          sx={{
            display: "flex",
            gap: "5px",
            justifyContent: "center",
            color: "var(--color-text-secondary)",
          }}
        >
          Have an Account?
          <Link
            style={{
              color: "var(--color-secondary)",
              textDecoration: "none",
              fontWeight: 600,
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
