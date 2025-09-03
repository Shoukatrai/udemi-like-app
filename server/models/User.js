import mongoose from "mongoose";

const userScehema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role : {
    type : String,
    enum : ["student", "instructor" , "admin"]
  },
});

export default mongoose.model("User" , userScehema)
