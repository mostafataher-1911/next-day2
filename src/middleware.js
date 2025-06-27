import { NextResponse } from "next/server";
import * as jwt from 'jsonwebtoken'
export function middleware(req) {
    if (req.nextUrl.pathname.includes("/dashboard")) {
        const auth = req.headers.get("authorization")?.split(" ")[1];
        console.log("Authorization Header:", auth);
       const tokenObj =  jwt.decode(auth,'iti-portsaid');

        if (!auth) {
            return NextResponse.redirect(new URL("/sign-in", req.url)); 
        }
        if(tokenObj.role!=='admin'){
        return NextResponse.redirect(new URL('/home', req.url));
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*'],
};
