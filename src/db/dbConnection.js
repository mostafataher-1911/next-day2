const { default: mongoose } = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://rashaaad19:QHWuHkXrDT53g65t@cluster0.iarp1lq.mongodb.net/todos')
        console.log("MongoDB connected successfully");
    }
    catch (error) {
        console.error("MongoDB connection failed:", error);
        throw new Error("Database connection failed");
    }

}

const disconnectDB = async () => {
    await mongoose.disconnect();
}

module.exports = {connectDB, disconnectDB};