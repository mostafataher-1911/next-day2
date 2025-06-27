import { connectDB, disconnectDB } from "@/db/dbConnection";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import * as jwt from 'jsonwebtoken'
export async function POST(request) {
    const body = await request.json();
    console.log({ user: body });
    await connectDB();
    const existingUser = await User.findOne({ email: body.email });
    if (!existingUser) {
        return NextResponse.json({
            message: 'There is no existing user with this email',
        });
    }

    const isMatched = await bcrypt.compare(body.password, existingUser.password);
    if (isMatched) {
        const payload = {
            username: existingUser.name,
            role: 'user',
        }
        const token = jwt.sign(payload, 'iti-portsaid', { expiresIn: '60d' }) 
        return NextResponse.json({ token: token, message: 'Sign-in successful' });
    }
    await disconnectDB();
    return NextResponse.json({
        message: 'Sign-in route is working',
    });

}