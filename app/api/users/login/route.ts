import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await prisma.user.findUnique({
      where: { email: email.value },
    });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const passwordMatch = await bcrypt.compare(password.value, user.password);
    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      throw new Error("Secret key is not defined");
    }

    const expiresIn = "1h";

    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn });

    const response = NextResponse.json(
      { message: "Login successful", user },
      { status: 200 }
    );
    response.cookies.set("jwtToken", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
