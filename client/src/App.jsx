import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Login, Signup } from "./pages";
import { Bounce, ToastContainer } from "react-toastify";
import Courses from "./pages/instructor/Courses";

const App = () => {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/courses" element={<Courses />} />

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
