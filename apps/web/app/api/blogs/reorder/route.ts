import { prisma } from "@enxt/database";
import { NextRequest, NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderedIds } = body;

    if (!Array.isArray(orderedIds)) {
      return NextResponse.json(
        { error: "orderedIds array is required" },
        { status: 400, headers: corsHeaders }
      );
    }

    await Promise.all(
      orderedIds.map((id: string, index: number) =>
        prisma.blogPost.update({
          where: { id },
          data: { order: index },
        })
      )
    );

    return NextResponse.json(
      { message: "Order updated" },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error("Failed to reorder blog posts:", error);
    return NextResponse.json(
      { error: "Failed to reorder blog posts" },
      { status: 500, headers: corsHeaders }
    );
  }
}
