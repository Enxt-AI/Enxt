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

// DELETE social link
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.socialLink.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Social link deleted successfully" },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error("Failed to delete social link:", error);
    return NextResponse.json(
      { error: "Failed to delete social link" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// PUT (update) social link
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { platform, url, icon, active, order } = body;

    const socialLink = await prisma.socialLink.update({
      where: { id },
      data: {
        platform,
        url,
        icon,
        active,
        order,
      },
    });

    return NextResponse.json(socialLink, { headers: corsHeaders });
  } catch (error) {
    console.error("Failed to update social link:", error);
    return NextResponse.json(
      { error: "Failed to update social link" },
      { status: 500, headers: corsHeaders }
    );
  }
}
