import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";
import "../../index.css";
import thumbnail from "../../assets/react.svg";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const CourseCardStd = ({ course, onEnroll  , btnText}) => {
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        backgroundColor: "var(--color-surface)",
        color: "var(--color-text-primary)",
        borderRadius: "7px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
        maxWidth: 320,
      }}
    >
      {thumbnail && (
        <CardMedia
          component="video"
          height="160"
          src={course?.video}
          image={course?.video}
          alt={course?.title}
        />
      )}
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {course?.title || "Video Title"}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "var(--color-text-secondary)", mb: 1 }}
        >
          {course?.desc || "Video Description"}
        </Typography>
        <Typography variant="caption" sx={{ display: "block", mb: 2 }}>
          Instructor:{" "}
          <span style={{ color: "var(--color-secondary)" }}>
            {course?.intructor || "Admin"}
          </span>
        </Typography>

        <Box textAlign="center">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "var(--color-primary)",
              color: "white",
              "&:hover": {
                backgroundColor: "#c62828",
              },
              borderRadius: "20px",
              px: 3,
            }}
            onClick={() => {
              Cookies.get("token") ? onEnroll(course?._id) : navigate("/login");
            }}
          >
            {btnText}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CourseCardStd;
