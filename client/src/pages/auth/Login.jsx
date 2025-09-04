import React, { useState } from "react";
import { Box, Stack, TextField, Typography, Button } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL, toastAlert } from "../../utils";
import { apiEndPoints } from "../../constant/apiEndPoints";
import cookie from "js-cookie";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const api = `${BASE_URL}${apiEndPoints.login}`;
      const response = await axios.post(api, data);

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
          Login
        </Typography>

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
              InputProps={{
                style: { color: "var(--color-text-primary)" },
              }}
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
              InputProps={{
                style: { color: "var(--color-text-primary)" },
              }}
            />
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
          {loading ? "Logging in..." : "Login"}
        </Button>

        <Typography
          sx={{
            display: "flex",
            gap: "5px",
            justifyContent: "center",
            color: "var(--color-text-secondary)",
          }}
        >
          Don't have an account?
          <Link
            style={{
              color: "var(--color-secondary)",
              textDecoration: "none",
              fontWeight: 600,
            }}
            to={"/signup"}
          >
            Signup
          </Link>
        </Typography>
      </Box>
    </Stack>
  );
};

export default Login;
