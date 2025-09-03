import React, { useEffect, useState } from "react";
import InstructorDash from "../../components/layouts/InstructorDash";
import CourseCardInst from "../../components/Cards/CourseCardInst";
import { Button, Stack } from "@mui/material";
import { Add } from "@mui/icons-material";
import AddCourse from "../../components/models/AddCourse";
import { BASE_URL } from "../../utils";
import { apiEndPoints } from "../../constant/apiEndPoints";
import axios from "axios";
import Cookies from "js-cookie";
const Courses = () => {
  const [refresh, setRefresh] = useState();
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState();
  const handleClose = () => {
    setOpenModal(false);
  };
  const fetchAllCourses = async () => {
    try {
      const api = `${BASE_URL}${apiEndPoints.getAllCourses}`;
      const response = await axios.get(api, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log("response", response);
      setData(response.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    fetchAllCourses();
  }, [refresh]);
  return (
    <InstructorDash>
      <Stack
        sx={{
          gap: "10px",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {data.map((course) => {
          return<CourseCardInst key={course._id} course = {course}/>;
        })}
      </Stack>
      <Button
        variant="contained"
        color="primary"
        sx={{
          position: "fixed",
          bottom: 32,
          right: 32,
          borderRadius: "50%",
          minWidth: 56,
          minHeight: 56,
          boxShadow: 3,
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "green",
        }}
        onClick={() => setOpenModal(true)}
      >
        <Add fontSize="large" />
      </Button>

      <AddCourse
        open={openModal}
        setOpen={setOpenModal}
        handleClose={handleClose}
        setRefresh={setRefresh}
      />
    </InstructorDash>
  );
};

export default Courses;
