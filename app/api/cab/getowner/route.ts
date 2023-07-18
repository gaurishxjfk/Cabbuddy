import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.nextUrl);
    const queryParams = new URLSearchParams(url.search);
    const id = queryParams.get("id");
    const userId = await getDataFromToken(request);
    await prisma.$connect();
    const cabData = await prisma.cabOwner.findUnique({
      where: {
        id: id ? parseInt(id) : undefined
      }
    });
    await prisma.$disconnect();
    return NextResponse.json({
      mesaaage: "cabData found",
      data: cabData,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
