import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessage = await PostMessage.find();
    res.status(200).json(postMessage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const postPosts = async (req, res) => {
  const post = req.body;
  const newPostsMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });
  try {
    await newPostsMessage.save();
    res.status(201).json(newPostsMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const UpdatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, tags, selectedFile } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  const updatePost = new PostMessage({ title, message, creator, tags, selectedFile, _id: id });
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

  if (!req.userId) return res.json({ message: "Unauthenticated!" });

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  const post = await PostMessage.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes.filter((id) => id !== String(req.userId));
  }

  const likePost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
  return res.status(202).json(likePost);
};
