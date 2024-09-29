import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
        
    },
    age: {
        type: Number,
        
    },
    password: {
        type: String,
        required: true
    },
    isStudent: {
        type: Boolean,
        default: true
    },
}, { timestamps: true });
const User = new mongoose.model("User", userSchema);
export default User;