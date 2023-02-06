import express from "express";
import Post from "../models/Post.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allPosts = await Post.find();
    if (req.body.author) {
      const authorPosts = allPosts.filter(
        (item) => item.author === req.body.author
      );
      res.status(200).json({
        message: "Postlar author boyicha tartiblandi..✅",
        status: 200,
        statusText: "Success",
        authorPosts,
      });
    } else {
      res.status(200).json({
        message: "Hamma postlar yuborildi",
        status: 200,
        statusText: "Success",
        posts: [...allPosts],
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.status(201).json({
      message: "Post yaratildi.✅",
      status: 201,
      statusCode: "created",
      post: {
        ...newPost._doc,
      },
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatePost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(201).json({
      message: "Post malumotlari yangilandi.✅",
      status: 203,
      statusText: "Updated",
      update: {
        ...updatePost._doc,
      },
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({
      message: "Post o'chirib tashlandi",
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const foundUser = await Post.findById(req.params.id);
    if (foundUser) {
      res.status(200).json({
        message: "Siz qidirgan post topildi✅",
        post: {
          ...foundUser._doc,
        },
        status: 200,
        statusText: "Success",
      });
    } else {
      res.status(404).json({
        message: "Bunday idlik post topilmadi ❌",
        error: "Not Found",
        status: 404,
        statusText: "Not Found.",
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
