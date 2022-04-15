import { postSignIn, postSignUp, postUpdateUser, changePassword } from "../controllers/users.js";
import Express from "express";
import auth from "../middleware/auth.js";
const router = Express.Router();

router.post("/signin", postSignIn);
router.post("/signup", postSignUp);

router.patch("/:id/updateUser", auth, postUpdateUser);
router.patch("/:id/changePassword", auth, changePassword);

export default router;
