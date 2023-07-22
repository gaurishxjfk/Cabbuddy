import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getDataFromToken } from "@/helpers/getDataFromToken";

const prisma = new PrismaClient();

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.nextUrl);
    const queryParams = new URLSearchParams(url.search);
    const id = queryParams.get("id");
    const userId = await getDataFromToken(request);
    console.log("heyyyyyyy", id);
    if (!userId) {
      return NextResponse.json({ error: "Not a verified user" }, { status: 500 });
    }

    const deletedDriverDetails = await prisma.driver.delete({
      where: {
        id: id ? parseInt(id) : undefined,
      },
    });

    return NextResponse.json(deletedDriverDetails, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
