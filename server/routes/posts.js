import Express from "express";
import { getPosts, postPosts, UpdatePost, DeletePosts } from "../controllers/posts.js";

const router = Express.Router();

router.get("/", getPosts);
router.post("/", postPosts);
router.patch("/:id", UpdatePost);
router.delete("/:id", DeletePosts);

export default router;