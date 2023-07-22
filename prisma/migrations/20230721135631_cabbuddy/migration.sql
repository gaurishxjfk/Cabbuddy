-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "fname" TEXT NOT NULL,
    "lname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CabOwner" (
    "id" SERIAL NOT NULL,
    "ownerName" TEXT NOT NULL,
    "ownerEmail" TEXT NOT NULL,
    "ownerMobileNo" TEXT NOT NULL,
    "ownerAddress" TEXT NOT NULL,
    "ownerState" TEXT NOT NULL,
    "ownerPincode" TEXT NOT NULL,
    "terms" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL DEFAULT 5,

    CONSTRAINT "CabOwner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CabDetails" (
    "id" SERIAL NOT NULL,
    "regNo" TEXT NOT NULL,
    "cabModel" TEXT NOT NULL,
    "cabColor" TEXT NOT NULL,
    "engineNo" TEXT NOT NULL,
    "seatingCapacity" INTEGER NOT NULL,
    "fuelType" TEXT NOT NULL,
    "cabImage" TEXT,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "CabDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Driver" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "licenseNo" TEXT NOT NULL,
    "mobileNo" TEXT NOT NULL,
    "DOB" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "terms" BOOLEAN NOT NULL,
    "licenseImage" TEXT NOT NULL,
    "userId" INTEGER NOT NULL DEFAULT 5,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CabDriverLink" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "cabId" INTEGER NOT NULL,
    "driverId" INTEGER NOT NULL,

    CONSTRAINT "CabDriverLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CabOwner_ownerEmail_key" ON "CabOwner"("ownerEmail");

-- CreateIndex
CREATE UNIQUE INDEX "CabOwner_ownerMobileNo_key" ON "CabOwner"("ownerMobileNo");

-- CreateIndex
CREATE UNIQUE INDEX "CabDetails_regNo_key" ON "CabDetails"("regNo");

-- CreateIndex
CREATE UNIQUE INDEX "CabDetails_engineNo_key" ON "CabDetails"("engineNo");

-- CreateIndex
CREATE UNIQUE INDEX "Driver_email_key" ON "Driver"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Driver_mobileNo_key" ON "Driver"("mobileNo");

-- AddForeignKey
ALTER TABLE "CabOwner" ADD CONSTRAINT "CabOwner_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CabDetails" ADD CONSTRAINT "CabDetails_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "CabOwner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Driver" ADD CONSTRAINT "Driver_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CabDriverLink" ADD CONSTRAINT "CabDriverLink_cabId_fkey" FOREIGN KEY ("cabId") REFERENCES "CabDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CabDriverLink" ADD CONSTRAINT "CabDriverLink_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
