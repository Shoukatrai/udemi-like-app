import jwt from "jsonwebtoken";
import User from "../models/User.js";
export const instructorCheck = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(400).json({
        message: "Token is missing!",
        data: null,
        status: false,
      });
    }
    const decodeToken = await jwt.verify(token, process.env.JWT_SECRET);
    console.log("decodeToken", decodeToken);
    const user = await User.findById(decodeToken.id);
    console.log(user.role);

    if (user.role !== "instructor") {
      return res.status(401).json({
        message: "You are unauthorized!",
        data: null,
        status: false,
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};

export const studentAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(400).json({
        message: "Token is missing!",
        data: null,
        status: false,
      });
    }
    const decodeToken = await jwt.verify(token, process.env.JWT_SECRET);
    console.log("decodeToken", decodeToken);
    const user = await User.findById(decodeToken.id);
    console.log(user.role);

    if (user.role !== "student") {
      return res.status(401).json({
        message: "You are unauthorized!",
        data: null,
        status: false,
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};

export const authCheck = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(400).json({
        message: "Token is missing!",
        data: null,
        status: false,
      });
    }
    const decodeToken = await jwt.verify(token, process.env.JWT_SECRET);
    console.log("decodeToken", decodeToken);
    // if (user.role !== "student") {
    //   return res.status(401).json({
    //     message: "You are unauthorized!",
    //     data: null,
    //     status: false,
    //   });
    // }
    req.user = decodeToken.id;
    next();
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};
