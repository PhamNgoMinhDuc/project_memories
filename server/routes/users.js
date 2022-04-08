import { postSignIn, postSignUp, postUpdateUser, changePassword } from "../controllers/users.js";
import Express from "express";

const router = Express.Router();

router.post("/signin", postSignIn);
router.post("/signup", postSignUp);

router.patch("/:id/updateUser", postUpdateUser);
router.patch("/:id/changePassword", changePassword);

export default router;
