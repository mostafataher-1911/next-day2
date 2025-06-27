import { connectDB, disconnectDB } from "@/db/dbConnection";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request) {
    const body = await request.json();
    console.log({ user: body });
    await connectDB();
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
        return NextResponse.json({
            message: 'User already exists with this email',
        });
    }
    console.log(body)
    const newUser = new User(body);
    await newUser.save();
    await disconnectDB();
    return NextResponse.json({
        message: 'Sign-up route is working',
    });

}