import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Login, Signup } from "./pages";
import { Bounce, ToastContainer } from "react-toastify";
import Courses from "./pages/instructor/Courses";
import AuthRoute from "./routes/AuthRoute";
import Intructor from "./routes/Intructor";
import Student from "./routes/Student";
import EnrolledCourses from "./pages/student/EnrolledCourses";
import Dashboard from "./pages/instructor/Dashboard";

const App = () => {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        {/* AUTH ROUTE */}
        <Route element={<AuthRoute />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>
        {/* INSTRUCTOR */}
        <Route element={<Intructor />}>
          <Route path="/instrucor-dash" element={<Dashboard />} />
          <Route path="/courses" element={<Courses />} />
        </Route>

        {/* STUDENT */}
        <Route element={<Student />}>
          <Route path="/enrolled-courses" element={<EnrolledCourses />} />
        </Route>
        {/* ADMIN */}
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
};

export default App;
