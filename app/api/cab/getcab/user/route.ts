import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, CabDetails } from "@prisma/client";
import { getDataFromToken } from "@/helpers/getDataFromToken";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    
    await prisma.$connect();
    
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        cabOwner: {
          include: {
            cabs: true,
          },
        },
      },
    });
    
    await prisma.$disconnect();

    if (user && user.cabOwner) {
      const cabData: CabDetails[] = user.cabOwner.flatMap((owner) => owner.cabs);
      return NextResponse.json({
        message: "Cab data found",
        data: cabData,
      });
    } else {
      return NextResponse.json({ message: "Cab data not found" });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
