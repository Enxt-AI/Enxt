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

// PUT update career opening
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, department, location, type, description, requirements } =
      body;

    const opening = await prisma.careerOpening.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(department !== undefined && { department }),
        ...(location !== undefined && { location }),
        ...(type !== undefined && { type }),
        ...(description !== undefined && { description }),
        ...(requirements !== undefined && {
          requirements: JSON.stringify(requirements),
        }),
      },
    });

    return NextResponse.json(
      { ...opening, requirements: JSON.parse(opening.requirements) },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error("Failed to update career opening:", error);
    return NextResponse.json(
      { error: "Failed to update career opening" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// DELETE career opening
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.careerOpening.delete({ where: { id } });
    return NextResponse.json(
      { message: "Career opening deleted" },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error("Failed to delete career opening:", error);
    return NextResponse.json(
      { error: "Failed to delete career opening" },
      { status: 500, headers: corsHeaders }
    );
  }
}
