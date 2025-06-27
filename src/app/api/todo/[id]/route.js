import { connectDB } from '../../../../lib/mongodb';

import Todo from '../../../../models/Todo';

import mongoose from 'mongoose';

export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    console.log("Params:", params);

    await connectDB();

    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const deleted = await Todo.findByIdAndDelete(id);

    if (!deleted) {
      return Response.json({ error: 'Todo not found' }, { status: 404 });
    }

    return Response.json({ message: 'Todo deleted successfully' }, { status: 200 });
  } catch (err) {
    console.error("DELETE error:", err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}