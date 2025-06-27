const { default: mongoose } = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/todolist')
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