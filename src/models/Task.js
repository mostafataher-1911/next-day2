const { default: mongoose } = require("mongoose");
const taskSchema = mongoose.Schema({
    task_name: { type: String, required: true },
    task_desc: { type: String },
    createdAt: { type: String, default: new Date().toISOString() },
})



const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

module.exports = Task;