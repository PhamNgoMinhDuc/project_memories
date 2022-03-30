import Express from "express";
import { postSignIn, postSignUp } from "../controllers/users.js";

const router = Express.Router();

router.post("/signin", postSignIn);
router.post("/signup", postSignUp);

export default router;