import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        fname: true,
        lname: true,
        email: true,
        isAdmin: true
      },
    });
    return NextResponse.json({
      mesaaage: "user found",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
