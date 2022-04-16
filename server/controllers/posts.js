import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await PostMessage.countDocuments({});

    const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
    res.status(200).json({ data: posts, currentPage: Number(page), numberOfPage: Math.ceil(total / LIMIT) });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostMessage.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  try {
    const LIMIT = 8;
    const title = new RegExp(searchQuery, "i");
    const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags.split(",") } }] }).limit(LIMIT);

    res.status(200).json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const postPosts = async (req, res) => {
  const post = req.body;
  const newPostsMessage = new PostMessage({ ...post, creator: post.userId, createdAt: new Date().toISOString() });
  try {
    let message = {};
    if (newPostsMessage.title.length <= 0) {
      message.title = "Title is empty";
    }
    if (newPostsMessage.message.length <= 0) {
      message.message = "Mesage is empty";
    }
    if (newPostsMessage.selectedFile.length <= 0) {
      message.selectedFile = "File is empty";
    }

    if (Object.keys(message).length === 0) {
      await newPostsMessage.save();
      res.status(201).json(newPostsMessage);
    } else {
      res.status(400).json({ message: message });
    }

    res.status(201).json(newPostsMessage);
  } catch (error) {
    res.status(409).json(error.message);
  }
};

export const UpdatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, tags, selectedFile } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  const updatePost = new PostMessage({ title, message, tags, selectedFile, _id: id });
  await PostMessage.findByIdAndUpdate(id, updatePost, { new: true });
  return res.status(202).json(updatePost);
};
export const DeletePosts = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  await PostMessage.findByIdAndRemove(id);
  return res.status(202).send("Delete succes!");
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  const userId = String(req.userId);
  if (!userId) return res.json({ message: "Unauthenticated!" });

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  const post = await PostMessage.findById(id);
  const index = post.likes.findIndex((id) => id === userId);
  if (index === -1) {
    post.likes.push(userId);
  } else {
    post.likes = post.likes.filter((item) => item !== userId);
  }

  const likePost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
  return res.status(202).json(likePost);
};

export const commentPost = async (req, res) => {
  const { id } = req.params;
  const { commentPost } = req.body;

  const post = await PostMessage.findById(id);

  post.comments.push(commentPost);

  const updatePost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
  return res.status(202).json(updatePost);
};
