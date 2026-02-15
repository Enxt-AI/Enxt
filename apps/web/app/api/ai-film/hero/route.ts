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
    const hero = await prisma.aiFilmHero.findFirst();
    return NextResponse.json(hero, { headers: corsHeaders });
  } catch (error) {
    console.error("Failed to fetch AI film hero:", error);
    return NextResponse.json(
      { error: "Failed to fetch AI film hero" },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { videoUrl, titleLine1, titleLine2, titleLine3, buttonText, buttonLink } = body;

    if (!videoUrl) {
      return NextResponse.json(
        { error: "Video URL is required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const existing = await prisma.aiFilmHero.findFirst();

    let hero;
    if (existing) {
      hero = await prisma.aiFilmHero.update({
        where: { id: existing.id },
        data: { videoUrl, titleLine1, titleLine2, titleLine3, buttonText, buttonLink },
      });
    } else {
      hero = await prisma.aiFilmHero.create({
        data: { videoUrl, titleLine1, titleLine2, titleLine3, buttonText, buttonLink },
      });
    }

    return NextResponse.json(hero, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error("Failed to update AI film hero:", error);
    return NextResponse.json(
      { error: "Failed to update AI film hero" },
      { status: 500, headers: corsHeaders }
    );
  }
}
