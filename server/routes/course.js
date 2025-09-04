import express from "express";
import {
  cancelEnrollmentCourse,
  createCourse,
  deleteCourse,
  enrollCourse,
  getAllCourse,
  getAllEnrolledCourse,
  updateCourse,
} from "../controllers/course.js";
import {
  authCheck,
  instructorCheck,
  studentAuth,
} from "../middlewares/instructorCheck.js";
import multer from "multer";
import upload from "../middlewares/multer.js";
const router = express.Router();

router.post("/create", instructorCheck, upload.single("video"), createCourse);
router.put("/update/:id", instructorCheck, updateCourse);
router.delete("/delete/:id", instructorCheck, deleteCourse);
router.put("/enroll/:id", studentAuth, enrollCourse);
router.put("/cancel-enroll/:id", studentAuth, cancelEnrollmentCourse);
router.get("/", getAllCourse);
router.get("/enrolled", studentAuth, getAllEnrolledCourse);

export default router;
