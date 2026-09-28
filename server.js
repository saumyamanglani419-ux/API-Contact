import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";

import userRouter from "./Routes/user.js";
import contactRouter from "./Routes/contact.js";

// Load environment variables
config();

const app = express();

// Middleware
app.use(express.json());

// User Router
app.use("/api/user", userRouter);

// Contact Router
app.use("/api/contact", contactRouter);

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "home route",
  });
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "NodeJs_Mastery_Course",
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB Connection Error:", err);
  });

// Server
const port = process.env.PORT || 1000;

app.listen(port, () => {
  console.log("Server is running on", port);
});