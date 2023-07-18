import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);

    const cdc = request.nextUrl;
    const url = new URL(request.nextUrl);
    console.log(url)
    await prisma.$connect();
    const cabData = await prisma.cabDetails.findMany();
    await prisma.$disconnect();
    return NextResponse.json({
      mesaaage: "cabData found",
      data: cabData,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
