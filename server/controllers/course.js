import { v2 as cloudinary } from "cloudinary";
import Course from "../models/Course.js";
import dotenv from "dotenv";
import User from "../models/User.js";
dotenv.config();
//CREATE COURSE
export const createCourse = async (req, res) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    const uploadToCloudinary = async (buffer) => {
      try {
        const fileBase64 = `data:video/mp4;base64,${buffer.toString("base64")}`;
        const result = await cloudinary.uploader.upload(fileBase64, {
          resource_type: "video",
        });
        return result;
      } catch (err) {
        throw new Error(err.message);
      }
    };
    const { title, desc, category } = req.body;
    const instructor = req.user;
    let videoUrl = "";
    if (req.file) {
      console.log("video started");
      const result = await uploadToCloudinary(req.file.buffer);
      console.log("video uploaded");
      console.log(result);
      videoUrl = result.secure_url;
    }

    console.log("videoUrl", videoUrl);
    const obj = {
      title,
      desc,
      category,
      instructor,
      video: videoUrl,
      students: [],
    };
    console.log("obj", obj);
    const course = await Course.create(obj);
    console.log("course", course);
    res.status(200).json({
      message: "Course Uploaded!",
      data: course,
      status: true,
    });
    console.log("obj", obj);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error.message,
      data: null,
      status: false,
    });
  }
};

//UPDATE COURSE
export const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const instructorId = req.user._id;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course Not Found!",
        status: false,
        data: null,
      });
    }

    console.log("course.instructor:", course.instructor);
    console.log("instructorId:", instructorId);

    if (!course.instructor.equals(instructorId)) {
      return res.status(403).json({
        message: "You are not allowed!",
        status: false,
        data: null,
      });
    }

    const { title, desc, video, students } = req.body;

    if (title) course.title = title;
    if (desc) course.desc = desc;
    if (video) course.video = video;
    if (students) course.students = students;

    await course.save();

    res.status(200).json({
      message: "Course Updated!",
      data: course,
      status: true,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: error.message,
      data: null,
      status: false,
    });
  }
};

//DELETE COURSE
export const deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const instructorId = req.user._id;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course Not Found!",
        status: false,
        data: null,
      });
    }
    if (!course.instructor.equals(instructorId)) {
      return res.status(403).json({
        message: "You are not allowed!",
        status: false,
        data: null,
      });
    }
    await course.deleteOne();

    res.status(200).json({
      message: "Course Deleted!",
      data: course,
      status: true,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: error.message,
      data: null,
      status: false,
    });
  }
};

//ENROLL COURSE
export const enrollCourse = async (req, res) => {
  try {
    const studentId = req.user._id;
    const courseId = req.params.id;
    console.log("studentId", studentId);
    console.log("courseId", courseId);
    const response = await Course.findById(courseId);
    if (!response) {
      return res.status(400).json({
        message: "Course Not Found!",
        status: false,
        data: null,
      });
    }
    const isEnroll = response.students.includes(studentId);
    console.log("isEnroll", isEnroll);
    if (isEnroll) {
      return res.status(400).json({
        message: "You are already enrolled!",
        status: false,
        data: null,
      });
    }
    await response.students.push(studentId);
    await response.save();
    res.status(200).json({
      message: "Enrolled Successfully!",
      data: response,
      status: true,
    });
  } catch (error) {
    res.status(200).json({
      message: error.message,
      data: null,
      status: false,
    });
  }
};

export const cancelEnrollmentCourse = async (req, res) => {
  try {
    const studentId = req.user._id;
    const courseId = req.params.id;
    console.log("studentId", studentId);
    console.log("courseId", courseId);
    const response = await Course.findById(courseId);
    if (!response) {
      return res.status(400).json({
        message: "Course Not Found!",
        status: false,
        data: null,
      });
    }
    const isEnroll = response.students.includes(studentId);
    console.log("isEnroll", isEnroll);
    if (!isEnroll) {
      return res.status(400).json({
        message: "You are not enrolled!",
        status: false,
        data: null,
      });
    }
    await response.students.pop(studentId);
    await response.save();
    res.status(200).json({
      message: "Cancelled Enrollment Successfully!",
      data: response,
      status: true,
    });
  } catch (error) {
    res.status(200).json({
      message: error.message,
      data: null,
      status: false,
    });
  }
};

export const getAllCourse = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(201).json({
      message: "All courses",
      data: courses,
      status: true,
    });
  } catch (error) {
    res.status(201).json({
      message: error.message,
      data: null,
      status: false,
    });
  }
};

export const getAllEnrolledCourse = async (req, res) => {
  try {
    const studentId = req.user._id;
    const courses = await Course.find({ students: [studentId] });
    console.log("courses", courses);
    res.status(201).json({
      message: "All courses",
      data: courses,
      status: true,
    });
  } catch (error) {
    res.status(201).json({
      message: error.message,
      data: null,
      status: false,
    });
  }
};
