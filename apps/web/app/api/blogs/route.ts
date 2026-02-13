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

// GET all blog posts
export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(posts, { headers: corsHeaders });
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// POST new blog post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, excerpt, content, author, date, category, imageUrl } = body;

    if (!title || !excerpt || !author || !date || !category || !imageUrl) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const count = await prisma.blogPost.count();

    const post = await prisma.blogPost.create({
      data: {
        title,
        excerpt,
        content: content || "",
        author,
        date,
        category,
        imageUrl,
        order: count,
      },
    });

    return NextResponse.json(post, { status: 201, headers: corsHeaders });
  } catch (error) {
    console.error("Failed to create blog post:", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500, headers: corsHeaders }
    );
  }
}
