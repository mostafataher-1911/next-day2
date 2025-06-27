import * as z from "zod/v4";

export const todoSchema = z.object({
    task_name: z.string().min(3, "Task name should be at least 3 characters long"),
    task_desc: z.string().min(3, "Task description should be at least 3 characters long"),
  });
  