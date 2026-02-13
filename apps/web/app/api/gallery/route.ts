import { prisma } from "@enxt/database";
import { NextRequest, NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// GET all gallery items
export async function GET() {
  try {
    const items = await prisma.galleryItem.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(items, { headers: corsHeaders });
  } catch (error) {
    console.error("Failed to fetch gallery items:", error);
    return NextResponse.json(
      { error: "Failed to fetch gallery items" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// POST new gallery item
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, category, imageUrl } = body;

    if (!title || !category || !imageUrl) {
      return NextResponse.json(
        { error: "All fields (title, category, imageUrl) are required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const count = await prisma.galleryItem.count();

    const item = await prisma.galleryItem.create({
      data: {
        title,
        category,
        imageUrl,
        order: count,
      },
    });

    return NextResponse.json(item, { status: 201, headers: corsHeaders });
  } catch (error) {
    console.error("Failed to create gallery item:", error);
    return NextResponse.json(
      { error: "Failed to create gallery item" },
      { status: 500, headers: corsHeaders }
    );
  }
}
