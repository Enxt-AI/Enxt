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
    const portfolio = await prisma.aiFilmPortfolio.findFirst();
    return NextResponse.json(portfolio, { headers: corsHeaders });
  } catch (error) {
    console.error("Failed to fetch AI film portfolio:", error);
    return NextResponse.json(
      { error: "Failed to fetch AI film portfolio" },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sectionTitle, description, videoUrl, videoTitle } = body;

    if (!videoUrl) {
      return NextResponse.json(
        { error: "Video URL is required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const existing = await prisma.aiFilmPortfolio.findFirst();

    let portfolio;
    if (existing) {
      portfolio = await prisma.aiFilmPortfolio.update({
        where: { id: existing.id },
        data: { sectionTitle, description, videoUrl, videoTitle },
      });
    } else {
      portfolio = await prisma.aiFilmPortfolio.create({
        data: { sectionTitle, description, videoUrl, videoTitle },
      });
    }

    return NextResponse.json(portfolio, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error("Failed to update AI film portfolio:", error);
    return NextResponse.json(
      { error: "Failed to update AI film portfolio" },
      { status: 500, headers: corsHeaders }
    );
  }
}
