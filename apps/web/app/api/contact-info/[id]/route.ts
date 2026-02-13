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

// PUT update contact info item
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { label, value, type } = body;

    const item = await prisma.contactInfo.update({
      where: { id },
      data: {
        ...(label !== undefined && { label }),
        ...(value !== undefined && { value }),
        ...(type !== undefined && { type }),
      },
    });

    return NextResponse.json(item, { headers: corsHeaders });
  } catch (error) {
    console.error("Failed to update contact info:", error);
    return NextResponse.json(
      { error: "Failed to update contact info" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// DELETE contact info item
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.contactInfo.delete({ where: { id } });
    return NextResponse.json(
      { message: "Deleted successfully" },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error("Failed to delete contact info:", error);
    return NextResponse.json(
      { error: "Failed to delete contact info" },
      { status: 500, headers: corsHeaders }
    );
  }
}
