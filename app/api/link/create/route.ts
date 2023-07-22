import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getDataFromToken } from "@/helpers/getDataFromToken";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const userId = await getDataFromToken(request);
    console.log("heyyyyyyy", userId);
    if (!userId) {
      return NextResponse.json(
        { error: "Not a verified user" },
        { status: 500 }
      );
    }

    const existingLink = await prisma.cabDriverLink.findFirst({
        where: {
          OR: [
            { cab: { id: parseInt(reqBody.cabId) } },
            { driver: { id: parseInt(reqBody.driverId) } }
          ],
        },
      });

    if (existingLink) {
      return NextResponse.json(
        { error: "Link already exists" },
        { status: 500 }
      );
    }
    // Create a new link
    const linkedCab = await prisma.cabDriverLink.create({
        data: {
          cab: {
            connect: { id: parseInt(reqBody.cabId) }
          },
          driver: {
            connect: { id: parseInt(reqBody.driverId) }
          },
        },
      });
    return NextResponse.json(linkedCab, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
