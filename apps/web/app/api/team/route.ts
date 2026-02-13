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
    const teamSection = await prisma.teamSection.findFirst();
    return NextResponse.json(teamSection, { headers: corsHeaders });
  } catch (error) {
    console.error("Failed to fetch team section:", error);
    return NextResponse.json(
      { error: "Failed to fetch team section" },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imageUrl } = body;

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Image URL is required" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Check if a record already exists
    const existingSection = await prisma.teamSection.findFirst();

    let teamSection;
    if (existingSection) {
      teamSection = await prisma.teamSection.update({
        where: { id: existingSection.id },
        data: { imageUrl },
      });
    } else {
      teamSection = await prisma.teamSection.create({
        data: { imageUrl },
      });
    }

    return NextResponse.json(teamSection, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error("Failed to update team section:", error);
    return NextResponse.json(
      { error: "Failed to update team section" },
      { status: 500, headers: corsHeaders }
    );
  }
}
