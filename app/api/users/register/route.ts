
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const saltRounds = 10;

export async function POST(request: Request){

    try {
        const reqBody = await request.json()
        const {fname, lname, email, password} = reqBody
        console.log("mamba",reqBody)
        // check if user already exists
        const user = await prisma.user.findUnique({ where: { email: email.value } });

        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }
        const hashedPassword = await bcrypt.hash(password.value, saltRounds);

        const newUser = await prisma.user.create({
          data: {
            fname: fname.value,
            lname: lname.value,
            email: email.value,
            password: hashedPassword,
            isAdmin: false,
          },
        });
        return NextResponse.json(newUser, {status: 200})
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}