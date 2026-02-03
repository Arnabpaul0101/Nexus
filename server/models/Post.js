import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: { type: String, required: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['Engineering', 'Design', 'General', 'HR'] 
  }
}, { timestamps: true });

export default mongoose.model('Post', postSchema);