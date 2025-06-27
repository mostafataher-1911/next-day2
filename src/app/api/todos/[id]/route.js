import { connectDB } from '@/db/dbConnection';
import Task from '@/models/Task';
import { NextResponse } from 'next/server';

export async function DELETE(request, context) {
  await connectDB();

  const { id } = context.params;
  console.log(id);
  try {
    const deleted = await Task.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}


export async function PATCH(request, context) {
  await connectDB();
  const { id } = context.params;
  try {
    const { task_name, task_desc } = await request.json();
    const updatedTask = await Task.findByIdAndUpdate(id, { task_name, task_desc }, { new: true });
    if (!updatedTask) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Updated successfully", updatedTask });

  } catch (error) {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });

  }
}

