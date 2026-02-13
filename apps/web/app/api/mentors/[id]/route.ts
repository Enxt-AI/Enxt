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

// PUT update mentor
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, role, imageUrl, bio, expertise } = body;

    const mentor = await prisma.mentor.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(role !== undefined && { role }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(bio !== undefined && { bio }),
        ...(expertise !== undefined && { expertise }),
      },
    });

    return NextResponse.json(mentor, { headers: corsHeaders });
  } catch (error) {
    console.error("Failed to update mentor:", error);
    return NextResponse.json(
      { error: "Failed to update mentor" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// DELETE mentor
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.mentor.delete({ where: { id } });
    return NextResponse.json(
      { message: "Mentor deleted" },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error("Failed to delete mentor:", error);
    return NextResponse.json(
      { error: "Failed to delete mentor" },
      { status: 500, headers: corsHeaders }
    );
  }
}
