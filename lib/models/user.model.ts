import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    image: String,
    bio: String,
    threads: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Thread"
    }],
    liked_threads: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Thread"
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    onboarded: { type: Boolean, default: false },
    communities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Community"
    }]
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;