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

// GET all career openings
export async function GET() {
  try {
    const openings = await prisma.careerOpening.findMany({
      orderBy: { order: "asc" },
    });
    // Parse requirements JSON string to array for each opening
    const parsed = openings.map((o) => ({
      ...o,
      requirements: JSON.parse(o.requirements),
    }));
    return NextResponse.json(parsed, { headers: corsHeaders });
  } catch (error) {
    console.error("Failed to fetch career openings:", error);
    return NextResponse.json(
      { error: "Failed to fetch career openings" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// POST new career opening
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, department, location, type, description, requirements } =
      body;

    if (!title || !department || !location || !type || !description) {
      return NextResponse.json(
        {
          error:
            "Fields title, department, location, type, description are required",
        },
        { status: 400, headers: corsHeaders }
      );
    }

    const count = await prisma.careerOpening.count();

    const opening = await prisma.careerOpening.create({
      data: {
        title,
        department,
        location,
        type,
        description,
        requirements: JSON.stringify(requirements || []),
        order: count,
      },
    });

    return NextResponse.json(
      { ...opening, requirements: JSON.parse(opening.requirements) },
      { status: 201, headers: corsHeaders }
    );
  } catch (error) {
    console.error("Failed to create career opening:", error);
    return NextResponse.json(
      { error: "Failed to create career opening" },
      { status: 500, headers: corsHeaders }
    );
  }
}
