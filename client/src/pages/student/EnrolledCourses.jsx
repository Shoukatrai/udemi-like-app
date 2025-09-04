import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { BASE_URL, toastAlert } from "../../utils";
import { apiEndPoints } from "../../constant/apiEndPoints";
import Cookies from "js-cookie";
import { Box, Typography } from "@mui/material";
import CourseCardStd from "../../components/Cards/CourseCardStd";

const EnrolledCourses = () => {
  const [data, setData] = useState([]);

  const fetchEnrolledCourses = async () => {
    try {
      const api = `${BASE_URL}${apiEndPoints.getEnrolledCourses}`;
      const response = await axios.get(api, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      setData(response.data.data || []);
    } catch (error) {
      toastAlert({
        type: "error",
        message: error.response?.data?.message || error.message,
      });
    }
  };

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  const onCancelEnroll = async (id) => {
    try {
      const api = `${BASE_URL}${apiEndPoints.cancelEnrollCourse(id)}`;
      const response = await axios.put(
        api,
        {},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      toastAlert({
        type: "success",
        message: response?.data?.message || "Enrollment cancelled!",
      });

      fetchEnrolledCourses();
    } catch (error) {
      toastAlert({
        type: "error",
        message: error.response?.data?.message || error.message,
      });
    }
  };

  return (
    <>
      <Navbar />
      <Box sx={{ p: 3 }}>
        <Typography
          variant="h5"
          sx={{ mb: 2, fontWeight: "bold", color: "var(--color-primary)" }}
        >
          My Enrolled Courses
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
          {data.length > 0 ? (
            data.map((course) => (
              <CourseCardStd
                key={course._id}
                course={course}
                onEnroll={onCancelEnroll}
                btnText="Cancel Enrollment"
              />
            ))
          ) : (
            <Typography
              sx={{ mt: 5, textAlign: "center", width: "100%" }}
              color="var(--color-text-secondary)"
            >
              You haven’t enrolled in any courses yet.
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

export default EnrolledCourses;
