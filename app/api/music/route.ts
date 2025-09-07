import { NextResponse } from "next/server";

// Music generation is disabled. Replicate is no longer used in this project.
export async function GET() {
  return new NextResponse("Music generation is disabled", { status: 503 });
}

export async function POST() {
  return new NextResponse("Music generation is disabled", { status: 503 });
}
