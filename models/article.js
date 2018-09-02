import mongoose from 'mongoose';
import articleSchema from '../schemas/articles';

module.exports = mongoose.model("Article",articleSchema);