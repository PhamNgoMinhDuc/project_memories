import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.js";

export const postSignIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) res.status(400).json({ message: "User doesn't exist." });

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, "test", { expiresIn: "1h" });

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const postSignUp = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) res.status(400).json({ message: "User doesn't exist." });

    if (password !== confirmPassword) res.status(400).json({ message: "Password don't match." });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

    const token = jwt.sign({ email: result.email, id: result._id }, "test", { expiresIn: "1h" });

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const postUpdateUser = async (req, res) => {
  const { id } = req.params;
  const { lastName, firstName, avartar } = req.body;
  try {
    const existingUser = await User.findById(id);
    if (!existingUser) {
      res.status(400).json({ message: "User doesn't exist." });
    } else {
      const updateUser = new User({ name: `${firstName} ${lastName}`, avartar: avartar, _id: id });
      await User.findByIdAndUpdate(id, updateUser, { new: true });

      res.status(202).json(updateUser);
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const changePassword = async (req, res) => {
  const { id } = req.params;
  const { confirmPassword, newPassword } = req.body;
  try {
    const existingUser = await User.findById(id);
    if (!existingUser) {
      res.status(400).json({ message: "User doesn't exist." });
    } else {
      if (existingUser.password !== confirmPassword) {
        res.status(404).json({ message: "That Baij" });
      } else {
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        console.log(hashedPassword);
        const updatePassword = new User({ password: hashedPassword, _id: id });
        await User.findByIdAndUpdate(id, updatePassword, { new: true });

        res.status(200).json("thanh cong");
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};
