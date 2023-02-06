import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.get("/", async (req, res) => {
  if (req.body.username) {
    const foundUser = await User.findOne({ username: req.body.username });
    if (foundUser) {
      res.status(200).json({
        message: "Tabriklayman siz hammasini to'g'ri qildingiz ✅",
        status: 200,
        statusText: "Successfully ✅",
        user: {
          ...foundUser,
        },
      });
    }
  } else {
    const allUsers = await User.find();
    res.json(allUsers);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(201).json({
      message: "User malumotlari muvafaqqiyatli yangilandi. ✅",
      status: 200,
      statusText: "Update",
      user: {
        ...updateUser,
      },
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    if (await User.findById(req.params.id)) {
      res.status(400).json({
        message: "User o'chirib tashlanmadi...",
        error: "Not Deleted",
        status: 400,
        statusText: "Bad",
      });
    } else {
      res.status(200).json({
        message: "User muvafaqqiyatli o'chirib yuborildi..✅",
        status: 200,
        statusText: "Successfully",
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
