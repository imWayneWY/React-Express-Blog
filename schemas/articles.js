import mongoose from 'mongoose';

module.exports = new mongoose.Schema({
    title: String,
    content: String,
    viewCount: Number,
    commentCounter: Number,
    time: String,
    author: String,
    tags: Array,
    state: String
});