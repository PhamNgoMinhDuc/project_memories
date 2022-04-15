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
      message.email = "Email is empty";
    }

    if (password.length <= 0) {
      message.password = "Password is empty";
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
      message.email = "Email is empty";
    }

    if (password.length <= 0) {
      message.password = "Password is empty";
    }

    if (confirmPassword.length <= 0) {
      message.confirmPassword = "Confirm password is empty";
    }

    if (firstName.length <= 0) {
      message.firstName = "First name is empty";
    }
    if (lastName.length <= 0) {
      message.lastName = "Last name is empty";
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
        message.avatar = "Avatar is empty";
      }

      if (firstName.length <= 0) {
        message.firstName = "First name is empty";
      }

      if (lastName.length <= 0) {
        message.lastName = "Last name is empty";
      }
      if (Object.keys(message).length === 0) {
        const user = new User({ name: `${firstName} ${lastName}`, avatar: avatar, _id: id });
        const updateUser = await User.findByIdAndUpdate(id, user, { new: true });
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, "test", { expiresIn: "1h" });
        res.status(202).json({ result: updateUser, token });
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
        message.oldPassword = "Wrong password";
      }

      if (newPassword.length <= 0) {
        message.newPassword = "New password is empty";
      }

      if (oldPassword.length <= 0) {
        message.oldPassword = "Old password is empty";
      }

      if (Object.keys(message).length === 0) {
        const hashedPassword = await bcrypt.hash(newPassword, 12);

        const Password = new User({ password: hashedPassword, avatar: existingUser.avatar, _id: id });
        const updatePassword = await User.findByIdAndUpdate(id, Password, { new: true });
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, "test", { expiresIn: "1h" });
        res.status(202).json({ result: updatePassword, token });
      } else {
        res.status(400).json({ errPassword: message });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};
