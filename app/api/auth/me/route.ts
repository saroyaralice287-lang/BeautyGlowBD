import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "../../../lib/mongodb";
import User from "../../../models/User";

export async function GET(request: Request) {
  try {
    const cookieHeader = request.headers.get("cookie");

    const token = cookieHeader
      ?.split(";")
      .find((cookie) => cookie.trim().startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json(
        { loggedIn: false },
        { status: 401 }
      );
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }

    const decoded = jwt.verify(token, secret) as {
      id: string;
      email: string;
      role?: string;
    };

    await connectDB();

    const user = await User.findById(decoded.id).select(
      "_id name email role"
    );

    if (!user) {
      return NextResponse.json(
        { loggedIn: false },
        { status: 401 }
      );
    }

    return NextResponse.json({
      loggedIn: true,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Auth check error:", error);

    return NextResponse.json(
      { loggedIn: false },
      { status: 401 }
    );
  }
}