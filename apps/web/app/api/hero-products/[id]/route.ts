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

// PUT update hero product
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, link, thumbnail, order } = body;

    const product = await prisma.heroProduct.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(link !== undefined && { link }),
        ...(thumbnail !== undefined && { thumbnail }),
        ...(order !== undefined && { order }),
      },
    });

    return NextResponse.json(product, { headers: corsHeaders });
  } catch (error) {
    console.error("Failed to update hero product:", error);
    return NextResponse.json(
      { error: "Failed to update hero product" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// DELETE hero product
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.heroProduct.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Product deleted" },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error("Failed to delete hero product:", error);
    return NextResponse.json(
      { error: "Failed to delete hero product" },
      { status: 500, headers: corsHeaders }
    );
  }
}
