// import packages
import mongoose from "mongoose";
import express from "express";
import multer from "multer";
import cors from "cors";
import path from "path";

// import routes
import user from "./routes/User.js";
import auth from "./routes/Auth.js";
import post from "./routes/Post.js";

// multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload");
  },
  filename: (req, file, cb) => {
    cb(null, `${req.body.name + path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

// constants
const app = express();
const port = process.env.PORT || 2322;
const connectMongoUrl =
  "mongodb+srv://blog:blog@cluster0.2mdadii.mongodb.net/?retryWrites=true&w=majority";

const connectMongo = async () => {
  try {
    await mongoose
      .connect(connectMongoUrl)
      .then(() => console.log("Connect to database ✅"));
  } catch (error) {
    console.log("Mongo error ❌");
    console.log(error);
  }
};

// middlewares
app.use(express.json());
app.use(cors({ origin: "*" }));

// routes
app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/post", post);
app.use("/api/upload", upload.single("file"), (req, res) => {
  res.json("File uploaded...");
});
app.listen(port, () => {
  connectMongo()
  console.log(`Server is running on port ${port} ✅`);
});
