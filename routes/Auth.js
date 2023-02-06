import express from "express";
import User from "../models/User.js";
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({
      message: "Xatolarsiz ro'yhatdan o'tdingiz.✅",
      status: 201,
      statusText: "created",
      user: {
        ...newUser._doc,
      },
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const foundUser = await User.findOne({ username: username });
    if (foundUser && foundUser.password === password) {
      res.status(200).json({
        message: "Tabriklayman siz hammasini to'g'ri qildingiz ✅",
        status: 200,
        statusText: "Successfully ✅",
        user: {
          ...foundUser._doc,
        },
      });
    } else {
      res.status(404).json({
        message:
          "Siz kritgan usernamelik accaunt topilmadi iltimos yaxshilab o'ylab ko'ring. ❌",
        status: 404,
        statusText: "Not Found ❌",
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
