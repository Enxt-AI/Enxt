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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { number, title, description } = body;

    const step = await prisma.aiFilmProcess.update({
      where: { id },
      data: {
        ...(number !== undefined && { number }),
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
      },
    });

    return NextResponse.json(step, { headers: corsHeaders });
  } catch (error) {
    console.error("Failed to update process step:", error);
    return NextResponse.json(
      { error: "Failed to update process step" },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.aiFilmProcess.delete({ where: { id } });
    return NextResponse.json(
      { message: "Process step deleted" },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error("Failed to delete process step:", error);
    return NextResponse.json(
      { error: "Failed to delete process step" },
      { status: 500, headers: corsHeaders }
    );
  }
}
