import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getDataFromToken } from "@/helpers/getDataFromToken";

const prisma = new PrismaClient();

export async function PATCH(request: NextRequest) {
  try {
    const reqBody = await request.json();
    console.log(reqBody,"nana")
    const userId = await getDataFromToken(request);
    // if (!userId) {
    //   return NextResponse.json({ error: "Not a verified user" }, { status: 500 });
    // }

    // const existingCabOwner = await prisma.cabOwner.findFirst({
    //   where: {
    //     userId: userId,
    //   },
    // });

    // if (!existingCabOwner) {
    //   return NextResponse.json({ error: "Cab owner not found" }, { status: 500 });
    // }

    // const cabDetails = await prisma.cabDetails.findFirst({
    //   where: {
    //     ownerId: existingCabOwner.id,
    //   },
    // });

    // if (!cabDetails) {
    //   return NextResponse.json({ error: "Cab details not found" }, { status: 500 });
    // }

    // Update the cabDetails
    const updatedCabDetails = await prisma.cabDetails.update({
      where: {
        id: reqBody.id,
      },
      data: {
        isApproved: reqBody.isApproved,
      },
    });

    return NextResponse.json(updatedCabDetails, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
