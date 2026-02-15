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
    const { title, category, year, icon } = body;

    const award = await prisma.aiFilmAward.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(category !== undefined && { category }),
        ...(year !== undefined && { year }),
        ...(icon !== undefined && { icon }),
      },
    });

    return NextResponse.json(award, { headers: corsHeaders });
  } catch (error) {
    console.error("Failed to update award:", error);
    return NextResponse.json(
      { error: "Failed to update award" },
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
    await prisma.aiFilmAward.delete({ where: { id } });
    return NextResponse.json(
      { message: "Award deleted" },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error("Failed to delete award:", error);
    return NextResponse.json(
      { error: "Failed to delete award" },
      { status: 500, headers: corsHeaders }
    );
  }
}
