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
    const contact = await prisma.aiFilmContact.findFirst();
    return NextResponse.json(contact, { headers: corsHeaders });
  } catch (error) {
    console.error("Failed to fetch AI film contact:", error);
    return NextResponse.json(
      { error: "Failed to fetch AI film contact" },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, subtitle, buttonText, buttonLink } = body;

    const existing = await prisma.aiFilmContact.findFirst();

    let contact;
    if (existing) {
      contact = await prisma.aiFilmContact.update({
        where: { id: existing.id },
        data: { title, subtitle, buttonText, buttonLink },
      });
    } else {
      contact = await prisma.aiFilmContact.create({
        data: { title, subtitle, buttonText, buttonLink },
      });
    }

    return NextResponse.json(contact, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error("Failed to update AI film contact:", error);
    return NextResponse.json(
      { error: "Failed to update AI film contact" },
      { status: 500, headers: corsHeaders }
    );
  }
}
