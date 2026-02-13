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

// PUT update gallery item
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, category, imageUrl } = body;

    const item = await prisma.galleryItem.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(category !== undefined && { category }),
        ...(imageUrl !== undefined && { imageUrl }),
      },
    });

    return NextResponse.json(item, { headers: corsHeaders });
  } catch (error) {
    console.error("Failed to update gallery item:", error);
    return NextResponse.json(
      { error: "Failed to update gallery item" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// DELETE gallery item
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.galleryItem.delete({ where: { id } });
    return NextResponse.json(
      { message: "Gallery item deleted" },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error("Failed to delete gallery item:", error);
    return NextResponse.json(
      { error: "Failed to delete gallery item" },
      { status: 500, headers: corsHeaders }
    );
  }
}
