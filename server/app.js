import express from "express";
import { dbConnection } from "./config/db.js";
import dotenv from "dotenv";
import authRouter from "./routes/Auth.js";
import courseRouter from "./routes/course.js";
import cors from "cors";
dotenv.config();
const app = express();
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/course", courseRouter);

try {
  await dbConnection();
  console.log("DB connected");
} catch (err) {
  console.error("DB connection failed", err);
}
console.log("after DB connection");
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`server running on http://localhost:${PORT}`)
  );
}

// Vercel deployment
export default app;
