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
    let driver;
    if (id) {
      driver = await prisma.driver.findFirst({
        where: {
          id: id ? parseInt(id) : undefined,
        },
      });
    } else {
      driver = await prisma.driver.findFirst({
        where: {
          userId: userId ? parseInt(userId) : undefined,
        },
      });
    }

    await prisma.$disconnect();
    return NextResponse.json({
      mesaaage: "driver found",
      data: driver,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
