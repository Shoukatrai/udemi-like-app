import { Box, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../../utils";
import { apiEndPoints } from "../../constant/apiEndPoints";
import Cookies from "js-cookie";
const CourseCardInst = ({course}) => {
  
  return (
    <Stack
      spacing={2}
      sx={{
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        p: 2,
        maxWidth: 300,
      }}
    >
      <Box
        component="video"
        src= {course?.video}
        alt="Course Thumbnail"
        sx={{ width: "100%", borderRadius: 1 }}
      />

      <Typography variant="h6" fontWeight="bold">
        {course?.title}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        {course?.desc}
      </Typography>

      <Typography variant="caption" color="text.secondary">
        Extra details or metadata
      </Typography>
    </Stack>
  );
};

export default CourseCardInst;
