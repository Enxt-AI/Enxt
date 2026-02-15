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
    const steps = await prisma.aiFilmProcess.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(steps, { headers: corsHeaders });
  } catch (error) {
    console.error("Failed to fetch AI film process steps:", error);
    return NextResponse.json(
      { error: "Failed to fetch process steps" },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { number, title, description } = body;

    if (!number || !title || !description) {
      return NextResponse.json(
        { error: "number, title, and description are required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const count = await prisma.aiFilmProcess.count();

    const step = await prisma.aiFilmProcess.create({
      data: { number, title, description, order: count },
    });

    return NextResponse.json(step, { status: 201, headers: corsHeaders });
  } catch (error) {
    console.error("Failed to create AI film process step:", error);
    return NextResponse.json(
      { error: "Failed to create process step" },
      { status: 500, headers: corsHeaders }
    );
  }
}
