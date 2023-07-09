import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
    console.log(request,"dda")
  try {
    // Get the JWT token from the cookie
    const jwtToken = request
    console.log(request,"dda")
    return NextResponse.json({ request }, { status: 200 });
    // Check if the token exists
    if (!jwtToken) {
      return NextResponse.json({ error: "JWT token not found" }, { status: 401 });
    }

    // Verify and decode the JWT token
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      throw new Error("Secret key is not defined");
    }

    // const decodedToken = jwt.verify(jwtToken, secretKey);
    // return NextResponse.json({ decodedToken }, { status: 200 });
    // Retrieve the user ID from the decoded token
    // const userId = decodedToken.userId;

    // // Query the user from the database
    // const user = await prisma.user.findUnique({ where: { id: userId } });
    // if (!user) {
    //   return NextResponse.json({ error: "User not found" }, { status: 401 });
    // }

    // // Return the user details
    // return NextResponse.json({ decodedToken }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
