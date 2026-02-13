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

// GET all mentors
export async function GET() {
  try {
    const mentors = await prisma.mentor.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(mentors, { headers: corsHeaders });
  } catch (error) {
    console.error("Failed to fetch mentors:", error);
    return NextResponse.json(
      { error: "Failed to fetch mentors" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// POST new mentor
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, role, imageUrl, bio, expertise } = body;

    if (!name || !role || !imageUrl || !bio || !expertise) {
      return NextResponse.json(
        { error: "All fields (name, role, imageUrl, bio, expertise) are required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const count = await prisma.mentor.count();

    const mentor = await prisma.mentor.create({
      data: {
        name,
        role,
        imageUrl,
        bio,
        expertise,
        order: count,
      },
    });

    return NextResponse.json(mentor, { status: 201, headers: corsHeaders });
  } catch (error) {
    console.error("Failed to create mentor:", error);
    return NextResponse.json(
      { error: "Failed to create mentor" },
      { status: 500, headers: corsHeaders }
    );
  }
}
