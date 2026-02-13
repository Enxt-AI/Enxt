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

// POST reorder contact info items
export async function POST(request: NextRequest) {
  try {
    const { orderedIds } = await request.json();

    if (!Array.isArray(orderedIds)) {
      return NextResponse.json(
        { error: "orderedIds must be an array" },
        { status: 400, headers: corsHeaders }
      );
    }

    await Promise.all(
      orderedIds.map((id: string, index: number) =>
        prisma.contactInfo.update({
          where: { id },
          data: { order: index },
        })
      )
    );

    return NextResponse.json(
      { message: "Reordered successfully" },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error("Failed to reorder contact info:", error);
    return NextResponse.json(
      { error: "Failed to reorder contact info" },
      { status: 500, headers: corsHeaders }
    );
  }
}
