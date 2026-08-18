import { NextResponse } from "next/server";
import { connectDB } from "../../lib/mongodb";
import User from "../../models/User";

export async function GET() {
  try {
    await connectDB();

    const customers = await User.find(
      {},
      {
        name: 1,
        email: 1,
        createdAt: 1,
      }
    ).sort({ createdAt: -1 });

    return NextResponse.json(customers);
  } catch (error) {
    console.error("Fetch customers error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch customers",
      },
      { status: 500 }
    );
  }
}