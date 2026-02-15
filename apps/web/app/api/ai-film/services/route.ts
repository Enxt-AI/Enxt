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
    const services = await prisma.aiFilmService.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(services, { headers: corsHeaders });
  } catch (error) {
    console.error("Failed to fetch AI film services:", error);
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, imageUrl } = body;

    if (!title || !description || !imageUrl) {
      return NextResponse.json(
        { error: "title, description, and imageUrl are required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const count = await prisma.aiFilmService.count();

    const service = await prisma.aiFilmService.create({
      data: { title, description, imageUrl, order: count },
    });

    return NextResponse.json(service, { status: 201, headers: corsHeaders });
  } catch (error) {
    console.error("Failed to create AI film service:", error);
    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500, headers: corsHeaders }
    );
  }
}
