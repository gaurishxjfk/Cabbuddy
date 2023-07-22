import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getDataFromToken } from "@/helpers/getDataFromToken";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    let driver;
    const userId = await getDataFromToken(request);
    console.log("heyyyyyyy", userId);
    if (!userId) {
      return NextResponse.json(
        { error: "Not a verified user" },
        { status: 500 }
      );
    }
    
    const existingDriver = await prisma.driver.findFirst({
      where: { userId: userId },
    });

    if (existingDriver) {
      return NextResponse.json(
        { error: "driver already exists on this user" },
        { status: 500 }
      );
    } else {
      driver = await prisma.driver.create({
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
          userId: userId,
        },
      });
    }
    return NextResponse.json(driver, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
