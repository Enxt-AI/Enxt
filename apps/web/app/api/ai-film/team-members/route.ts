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
    const members = await prisma.aiFilmTeamMember.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(members, { headers: corsHeaders });
  } catch (error) {
    console.error("Failed to fetch AI film team members:", error);
    return NextResponse.json(
      { error: "Failed to fetch team members" },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, crime, bounty, description, imageUrl } = body;

    if (!name || !crime || !bounty || !description || !imageUrl) {
      return NextResponse.json(
        { error: "name, crime, bounty, description, and imageUrl are required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const count = await prisma.aiFilmTeamMember.count();

    const member = await prisma.aiFilmTeamMember.create({
      data: { name, crime, bounty, description, imageUrl, order: count },
    });

    return NextResponse.json(member, { status: 201, headers: corsHeaders });
  } catch (error) {
    console.error("Failed to create AI film team member:", error);
    return NextResponse.json(
      { error: "Failed to create team member" },
      { status: 500, headers: corsHeaders }
    );
  }
}
