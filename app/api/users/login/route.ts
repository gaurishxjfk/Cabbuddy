import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await prisma.user.findUnique({ where: { email: email.value } });
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(password.value, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Generate JWT token
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
        throw new Error("Secret key is not defined");
      }
      
    const expiresIn = "1h";

    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn });

    // Set the cookie in the response
    const cookieValue = token;
    const cookieOptions = {
      httpOnly: true, // Only accessible through HTTP(S)
      secure: true, // Requires a secure connection (HTTPS)
      sameSite: "strict", // Restrict cookie to same site
      maxAge: 3600, // Expiration time in seconds (1 hour)
      path: "/", // Cookie accessible across the entire site
    };

    const response = NextResponse.json({ message: "Login successful", user }, { status: 200 });
    response.headers.append("Set-Cookie", `jwtToken=${cookieValue}; ${Object.entries(cookieOptions).map(([key, value]) => `${key}=${value}`).join("; ")}`);

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
