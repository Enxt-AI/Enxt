import { prisma } from "@enxt/database";
import { NextRequest, NextResponse } from "next/server";

// CORS headers for cross-origin panel access
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// GET all hero products
export async function GET() {
  try {
    const products = await prisma.heroProduct.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(products, { headers: corsHeaders });
  } catch (error) {
    console.error("Failed to fetch hero products:", error);
    return NextResponse.json(
      { error: "Failed to fetch hero products" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// POST new hero product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, link, thumbnail } = body;

    if (!title || !thumbnail) {
      return NextResponse.json(
        { error: "Title and thumbnail are required" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Auto-assign order as last position
    const count = await prisma.heroProduct.count();

    const product = await prisma.heroProduct.create({
      data: {
        title,
        link: link || "#",
        thumbnail,
        order: count,
      },
    });

    return NextResponse.json(product, { status: 201, headers: corsHeaders });
  } catch (error) {
    console.error("Failed to create hero product:", error);
    return NextResponse.json(
      { error: "Failed to create hero product" },
      { status: 500, headers: corsHeaders }
    );
  }
}
