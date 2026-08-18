import { NextResponse } from "next/server";
import { connectDB } from "../../lib/mongodb";
import Product from "../../models/Product";

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find().sort({ createdAt: -1 });

    return NextResponse.json(products);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const { name, price, stock, description, image } =
      await request.json();

    if (!name || price === undefined || stock === undefined || !description || !image) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const product = await Product.create({
      name,
      price: Number(price),
      stock: Number(stock),
      description,
      image,
    });

    return NextResponse.json(
      {
        message: "Product added successfully",
        product,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to add product" },
      { status: 500 }
    );
  }
}