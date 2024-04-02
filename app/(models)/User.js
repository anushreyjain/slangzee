import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const validRoles = ["user", "admin"];

const userSchema = new Schema(
  {
    email: { type: String, unique: true },
    picture: String,
    given_name: String,
    family_name: String,
    email_verified: Boolean,
    role: { type: String, enum: validRoles, default: "user" },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
