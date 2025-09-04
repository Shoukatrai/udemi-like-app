export const apiEndPoints = {
  signup: "/auth/signup",
  login: "/auth/login",
  createCourse: "/course/create",
  getAllCourses: "/course",
  getEnrolledCourses: "/course/enrolled",
  enrollCourse: (id) => `/course/enroll/${id}`,
  cancelEnrollCourse: (id) => `/course/cancel-enroll/${id}`,
};
