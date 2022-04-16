import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  avatar: {
    type: String,
  },
  id: { type: String },
});

export default mongoose.model("User", userSchema);
