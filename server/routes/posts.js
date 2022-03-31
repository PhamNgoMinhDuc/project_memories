import Express from "express";
import { getPost, getPostsBySearch, getPosts, postPosts, UpdatePost, DeletePosts, likePost } from "../controllers/posts.js";
import auth from "../middleware/auth.js";
const router = Express.Router();

router.get("/search", getPostsBySearch);
router.get("/:id", getPost);
router.get("/", getPosts);

router.post("/", auth, postPosts);
router.patch("/:id", auth, UpdatePost);
router.delete("/:id", auth, DeletePosts);
router.patch("/:id/likePost", auth, likePost);

export default router;
