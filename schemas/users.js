import mongoose from 'mongoose';

module.exports = new mongoose.Schema({
    _id: Number,
    username: String,
    password: String,
    type: String //admin or user
});