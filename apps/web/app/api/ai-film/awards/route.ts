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

export async function GET() {
  try {
    const awards = await prisma.aiFilmAward.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(awards, { headers: corsHeaders });
  } catch (error) {
    console.error("Failed to fetch AI film awards:", error);
    return NextResponse.json(
      { error: "Failed to fetch awards" },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, category, year, icon } = body;

    if (!title || !category || !year) {
      return NextResponse.json(
        { error: "title, category, and year are required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const count = await prisma.aiFilmAward.count();

    const award = await prisma.aiFilmAward.create({
      data: { title, category, year, icon: icon || "Trophy", order: count },
    });

    return NextResponse.json(award, { status: 201, headers: corsHeaders });
  } catch (error) {
    console.error("Failed to create AI film award:", error);
    return NextResponse.json(
      { error: "Failed to create award" },
      { status: 500, headers: corsHeaders }
    );
  }
}
