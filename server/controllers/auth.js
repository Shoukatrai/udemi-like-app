import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password, role } = req.body;
    const isExists = await User.findOne({ email: email });
    if (isExists) {
      return res.status(400).json({
        message: "Email Address Already exists!",
        status: false,
        data: null,
      });
    }
    console.log("isExists", isExists);
    // const password = req.body.password
    const hashPass = await bcrypt.hash(password, 10);
    console.log("hashPass", hashPass);

    const obj = {
      email,
      password: hashPass,
      name,
      role,
    };
    console.log(obj);
    const user = await User.create(obj);
    res.json({
      message: "Signup successful!",
      data: user,
      status: true,
    });
  } catch (error) {
    console.log(error.mesage);
    res.json({
      message: error.message,
      status: false,
      data: null,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log("user", user);
    if (!user) {
      return res.status(400).json({
        message: "User not Found!",
        data: null,
        status: false,
      });
    }

    const token = await jwt.sign(
      { email: email, id: user._id },
      process.env.JWT_SECRET , {expiresIn : "10h"}
    );
    console.log("token", token);
    res.status(200).json({
      message: "lOGIN SUCCESSFUL!",
      status: true,
      data: user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: null,
      status: false,
    });
  }
};
