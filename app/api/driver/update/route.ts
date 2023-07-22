import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getDataFromToken } from "@/helpers/getDataFromToken";

const prisma = new PrismaClient();

export async function PATCH(request: NextRequest) {
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

    const existingDriver = await prisma.driver.findFirst({
      where: {
        userId: userId,
      },
    });

    if (!existingDriver) {
      return NextResponse.json(
        { error: "Cab owner not found" },
        { status: 500 }
      );
    }

    const updatedDriverDetails = await prisma.driver.update({
      where: {
        id: reqBody.id,
      },
      data: {
        name: reqBody.name,
        email: reqBody.email,
        licenseNo: reqBody.licenseNo,
        mobileNo: reqBody.mobileNo.toString(),
        licenseImage: reqBody.licenseImage,
        DOB: reqBody.DOB,
        address: reqBody.address,
        state: reqBody.state,
        pincode: reqBody.pincode.toString(),
        terms: reqBody.terms,
      },
    });

    return NextResponse.json(updatedDriverDetails, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
