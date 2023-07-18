import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getDataFromToken } from "@/helpers/getDataFromToken";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    let cabOwner;
    const userId = await getDataFromToken(request);
    console.log("heyyyyyyy",userId)
    if(!userId){
        return NextResponse.json({ error: "Not a verified user" }, { status: 500 });
    }
    // Check if CabOwner already exists with the provided email and mobile number
    const existingCabOwner = await prisma.cabOwner.findFirst({
      where: {
        OR: [
          { ownerEmail: reqBody.ownerEmail },
          { ownerMobileNo: reqBody.ownerMobileNo.toString() },
        ],
      },
    });

    if (existingCabOwner) {
      cabOwner = existingCabOwner;
    } else {
      // Create a new CabOwner
      cabOwner = await prisma.cabOwner.create({
        data: {
          ownerName: reqBody.ownerName,
          ownerEmail: reqBody.ownerEmail,
          ownerMobileNo: reqBody.ownerMobileNo.toString(),
          ownerAddress: reqBody.ownerAddress,
          ownerState: reqBody.ownerState,
          ownerPincode: reqBody.ownerPincode.toString(),
          terms: reqBody.terms,
          userId: userId
        },
      });
    }

    // Create CabDetails
    const cabDetails = await prisma.cabDetails.create({
      data: {
        regNo: reqBody.regNo,
        cabModel: reqBody.cabModel,
        cabColor: reqBody.cabColor,
        engineNo: reqBody.engineNo,
        seatingCapacity: reqBody.seatingCapacity,
        fuelType: reqBody.fuelType,
        cabImage: reqBody.cabImage,
        ownerId: cabOwner.id,
      },
    });

    return NextResponse.json(cabDetails, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
