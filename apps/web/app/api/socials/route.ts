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

// GET all social links
export async function GET() {
  try {
    const socialLinks = await prisma.socialLink.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(socialLinks, { headers: corsHeaders });
  } catch (error) {
    console.error("Failed to fetch social links:", error);
    return NextResponse.json(
      { error: "Failed to fetch social links" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// POST new social link
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { platform, url, icon } = body;

    if (!platform || !url || !icon) {
      return NextResponse.json(
        { error: "Platform, URL, and Icon are required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const count = await prisma.socialLink.count();

    const socialLink = await prisma.socialLink.create({
      data: {
        platform,
        url,
        icon,
        order: count,
        active: true,
      },
    });

    return NextResponse.json(socialLink, { status: 201, headers: corsHeaders });
  } catch (error) {
    console.error("Failed to create social link:", error);
    return NextResponse.json(
      { error: "Failed to create social link" },
      { status: 500, headers: corsHeaders }
    );
  }
}
