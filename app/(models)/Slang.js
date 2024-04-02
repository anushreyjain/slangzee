import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const slangSchema = new Schema(
  {
    title: String,
    description: String,
    likes: Number,
    isBookmarked: Array,
    isLiked: Array,
    isApproved: Boolean,
    userId: String,
  },
  {
    timestamps: true,
  }
);

const Slang = mongoose.models.Slang || mongoose.model("Slang", slangSchema);

export default Slang;
