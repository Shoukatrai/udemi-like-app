import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (buffer) => {
  try {
    // Convert buffer to base64 string
    const fileBase64 = `data:video/mp4;base64,${buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(fileBase64, {
      resource_type: "video", // 👈 important for videos
    });

    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};
