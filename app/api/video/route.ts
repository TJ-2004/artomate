import { NextResponse } from "next/server";

// Video API is disabled for now to avoid deployment issues.
// Re-enable by adding an implementation and required env vars.

export async function GET() {
  return new NextResponse("Video generation is disabled", { status: 503 });
}

export async function POST() {
  return new NextResponse("Video generation is disabled", { status: 503 });
}


