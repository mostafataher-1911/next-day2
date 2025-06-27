import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  task: String,
  description: String,
});

export default mongoose.models.Todo || mongoose.model('Todo', TodoSchema);
