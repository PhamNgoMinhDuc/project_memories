import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  avartar: {
    type: [String],
    default: [],
  },
  id: { type: String },
});

export default mongoose.model("User", userSchema);
