const { default: mongoose } = require("mongoose");
const bc = require("bcryptjs");
const UserSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },

    createdAt: { type: String, default: new Date().toISOString() },
})


UserSchema.pre('save', async function (next) {
    const hashedPassword = await bc.hash(this.password, 12); 
    console.log(hashedPassword);
    this.password = hashedPassword
    next();
})



const User = mongoose.models.User || mongoose.model("User", UserSchema);

module.exports = User;