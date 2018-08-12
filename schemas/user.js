import mongoose from 'mongoose';

module.exports = new mongoose.Schema({
    username: String,
    password: String,
    type: String //admin or user
});