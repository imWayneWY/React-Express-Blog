import mongoose from 'mongoose';

module.exports = new mongoose.Schema({
    articleId: String,
    author: String,
    time: String,
    content: String,
    isReported: Boolean,
    reportUser: String,
    reportReason: String,
    reportTime: String,
});