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

// GET all partners
export async function GET() {
  try {
    const partners = await prisma.partner.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(partners, { headers: corsHeaders });
  } catch (error) {
    console.error("Failed to fetch partners:", error);
    return NextResponse.json(
      { error: "Failed to fetch partners" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// POST new partner
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, logoUrl, color } = body;

    if (!name || !logoUrl) {
      return NextResponse.json(
        { error: "Name and logoUrl are required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const count = await prisma.partner.count();

    const partner = await prisma.partner.create({
      data: {
        name,
        logoUrl,
        color: color || "text-indigo-600 bg-indigo-100",
        order: count,
      },
    });

    return NextResponse.json(partner, { status: 201, headers: corsHeaders });
  } catch (error) {
    console.error("Failed to create partner:", error);
    return NextResponse.json(
      { error: "Failed to create partner" },
      { status: 500, headers: corsHeaders }
    );
  }
}
