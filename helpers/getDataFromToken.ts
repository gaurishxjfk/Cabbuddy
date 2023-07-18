import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("jwtToken")?.value || '';
        const decodedToken:any = jwt.verify(token, process.env.SECRET_KEY!);
        return decodedToken.userId;
    } catch (error: any) {
        return error.message;
    }

}
