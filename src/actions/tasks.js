import { connectDB, disconnectDB } from "@/db/dbConnection";
import Task from "@/models/Task";
import { revalidatePath } from "next/cache";
import { todoSchema } from "../validations/todoSchema";

//* Server action to display all todos
export const getTodos = async () => {
    try {
        await connectDB();
        const tasks = await Task.find({});
        await disconnectDB();
        return tasks;
    } catch (error) {
        console.log(error);
        return [];
    }
};

//* Server action to create a new todo
export const createTodo = async (prevState, formData) => {
    "use server"; //? directive
    console.log('this is prev state', prevState);
    const taskName = formData.get("task_name");
    const taskDesc = formData.get("task_desc");
    console.log(taskName, taskDesc);
    const newTask = {
        task_name: taskName,
        task_desc: taskDesc,
    };
    try {
        const taskValues = await todoSchema.parseAsync(newTask);
        //* Add Data to db using model
        await connectDB();
        console.log(taskValues);
        const task = new Task(taskValues);
        console.log(taskValues, 2);

        await task.save();
        await disconnectDB();
        revalidatePath("/");
        return {
            success: true,
            message: "Task added successfully!",
        };


    } catch (error) {

        const errorMsg = error.issues[0]?.message;
        return {
            success: false,
            message: errorMsg || "Something went wrong",
        };


    }
};


