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

// GET all contact info items
export async function GET() {
  try {
    const items = await prisma.contactInfo.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(items, { headers: corsHeaders });
  } catch (error) {
    console.error("Failed to fetch contact info:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact info" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// POST new contact info item
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { label, value, type } = body;

    if (!label || !value) {
      return NextResponse.json(
        { error: "Fields label and value are required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const count = await prisma.contactInfo.count();

    const item = await prisma.contactInfo.create({
      data: {
        label,
        value,
        type: type || "text",
        order: count,
      },
    });

    return NextResponse.json(item, { status: 201, headers: corsHeaders });
  } catch (error) {
    console.error("Failed to create contact info:", error);
    return NextResponse.json(
      { error: "Failed to create contact info" },
      { status: 500, headers: corsHeaders }
    );
  }
}
