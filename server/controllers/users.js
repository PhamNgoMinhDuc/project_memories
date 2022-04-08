import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.js";

export const postSignIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    let message = {};
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      message.email = "User doesn't exist.";
    } else {
      const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
      if (!isPasswordCorrect) {
        message.password = "Invalid credentials";
      }
    }

    if (email.length <= 0) {
      message.email = "Chua Dien email";
    }

    if (password.length <= 0) {
      message.password = "Chua Dien password";
    }
    if (Object.keys(message).length === 0) {
      const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, "test", { expiresIn: "1h" });

      res.status(200).json({ result: existingUser, token });
    } else {
      res.status(400).json({ errSignIn: message });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const postSignUp = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  try {
    let message = {};
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      message.email = "User doesn't exist.";
    }

    if (password !== confirmPassword) {
      message.password = "Password don't match.";
    }

    if (email.length <= 0) {
      message.email = "Chua Dien email";
    }

    if (password.length <= 0) {
      message.password = "Chua Dien password";
    }

    if (confirmPassword.length <= 0) {
      message.confirmPassword = "Chua Dien confirmPassword";
    }

    if (firstName.length <= 0) {
      message.firstName = "Chua Dien firstName";
    }
    if (lastName.length <= 0) {
      message.lastName = "Chua Dien lastName";
    }

    if (Object.keys(message).length === 0) {
      const hashedPassword = await bcrypt.hash(password, 12);

      const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

      const token = jwt.sign({ email: result.email, id: result._id }, "test", { expiresIn: "1h" });

      res.status(200).json({ result, token });
    } else {
      res.status(400).json({ errSignUp: message });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const postUpdateUser = async (req, res) => {
  const { id } = req.params;
  const { lastName, firstName, avatar } = req.body;
  try {
    let message = {};
    const existingUser = await User.findById(id);

    if (!existingUser) {
      res.status(400).json({ message: "User doesn't exist." });
    } else {
      if (avatar.length <= 0) {
        message.avatar = "Chua Dien avartar";
      }

      if (firstName.length <= 0) {
        message.firstName = "Chua Dien firstName";
      }

      if (lastName.length <= 0) {
        message.lastName = "Chua Dien lastName";
      }
      if (Object.keys(message).length === 0) {
        const updateUser = new User({ name: `${firstName} ${lastName}`, avatar: avatar, _id: id });
        await User.findByIdAndUpdate(id, updateUser, { new: true });

        res.status(202).json({ result: updateUser });
      } else {
        res.status(400).json({ errUpdate: message });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const changePassword = async (req, res) => {
  const { id } = req.params;
  const { oldPassword, newPassword } = req.body;
  try {
    let message = {};
    const existingUser = await User.findById(id);
    if (!existingUser) {
      res.status(400).json({ message: "User doesn't exist." });
    } else {
      const isPasswordCorrect = await bcrypt.compare(oldPassword, existingUser.password);

      if (!isPasswordCorrect) {
        message.oldPassword = "sai mat khau";
      }

      if (newPassword.length <= 0) {
        message.newPassword = "Chua Dien newPassword";
      }

      if (oldPassword.length <= 0) {
        message.oldPassword = "Chua Dien oldPassword";
      }

      if (Object.keys(message).length === 0) {
        const hashedPassword = await bcrypt.hash(newPassword, 12);

        const updatePassword = new User({ password: hashedPassword, _id: id });
        await User.findByIdAndUpdate(id, updatePassword, { new: true });

        res.status(200).json(updatePassword);
      } else {
        res.status(400).json({ errPassword: message });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};
