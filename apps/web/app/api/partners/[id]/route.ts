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

// PUT update partner
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, logoUrl, color } = body;

    const partner = await prisma.partner.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(logoUrl !== undefined && { logoUrl }),
        ...(color !== undefined && { color }),
      },
    });

    return NextResponse.json(partner, { headers: corsHeaders });
  } catch (error) {
    console.error("Failed to update partner:", error);
    return NextResponse.json(
      { error: "Failed to update partner" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// DELETE partner
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.partner.delete({ where: { id } });
    return NextResponse.json(
      { message: "Partner deleted" },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error("Failed to delete partner:", error);
    return NextResponse.json(
      { error: "Failed to delete partner" },
      { status: 500, headers: corsHeaders }
    );
  }
}
