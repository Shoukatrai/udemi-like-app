import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import CourseCardStd from "../../components/Cards/CourseCardStd";
import { BASE_URL, toastAlert } from "../../utils";
import { apiEndPoints } from "../../constant/apiEndPoints";
import Cookies from "js-cookie";
import { Typography, Box, Stack, TextField, MenuItem } from "@mui/material";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const fetchCourses = async () => {
    try {
      const api = `${BASE_URL}${apiEndPoints.getAllCourses}`;
      const res = await axios.get(api, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      const courseData = res.data.data || [];
      setCourses(courseData);

      // Extract unique categories
      const uniqueCategories = [
        "All",
        ...new Set(courseData.map((c) => c.category).filter(Boolean)),
      ];
      setCategories(uniqueCategories);
    } catch (error) {
      toastAlert({
        type: "error",
        message: error.response?.data?.message || error.message,
      });
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const onEnroll = async (id) => {
    try {
      const api = `${BASE_URL}${apiEndPoints.enrollCourse(id)}`;
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
        message: response?.data?.message || "Enrolled successfully!",
      });
      fetchCourses();
    } catch (error) {
      toastAlert({
        type: "error",
        message: error.response?.data?.message || error.message,
      });
    }
  };

  // Filter courses by category
  const filteredCourses =
    selectedCategory === "All"
      ? courses
      : courses.filter((course) => course.category === selectedCategory);

  return (
    <div>
      <Navbar />
      <Box component="main" sx={{ p: 3 }}>
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography
            variant="h5"
            sx={{ mb: 5, fontWeight: "bold", color: "var(--color-primary)" }}
          >
            Available Courses
          </Typography>
          <TextField
            select
            label="Filter Courses"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            sx={{
              minWidth: 200,
              "& .MuiInputLabel-root": {
                color: "white", // default label color
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "white", // focused label stays white
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "orange", // default outline
                },
                "&:hover fieldset": {
                  borderColor: "darkorange", // hover outline
                },
                "&.Mui-focused fieldset": {
                  borderColor: "orange", // focused outline
                },
              },
            }}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>
        </Stack>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <CourseCardStd
                key={course._id}
                course={course}
                onEnroll={onEnroll}
                btnText="Enroll"
              />
            ))
          ) : (
            <Typography color="var(--color-text-secondary)">
              No courses available
            </Typography>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default Home;
