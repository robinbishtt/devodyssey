import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        default: ""
    },
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
    }],
});

export default mongoose.model('User', userSchema);