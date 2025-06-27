import { connectDB } from '../../../lib/mongodb';
import Todo from '../../../models/Todo';
import { z } from 'zod';

const TodoSchema = z.object({
  task: z.string().min(3),
  description: z.string().min(5),
});


export async function POST(req) {
  try {
    const formData = await req.formData();
    const task = formData.get('task');
    const description = formData.get('description');

    const parsed = TodoSchema.safeParse({ task, description });

    if (!parsed.success) {
      return Response.json({ error: parsed.error.format() }, { status: 400 });
    }

    await connectDB();
    const newTodo = await Todo.create({ task, description });

    return Response.json(newTodo, { status: 201 });
  } catch (err) {
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const todos = await Todo.find().sort({ _id: -1 });
    return Response.json(todos);
  } catch {
    return Response.json({ error: 'Error fetching todos' }, { status: 500 });
  }
}
