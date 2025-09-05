import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt } = body as { prompt: string };

    if (!prompt || typeof prompt !== "string") {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    const CLIPDROP_API_KEY = process.env.CLIPDROP_API_KEY;
    if (!CLIPDROP_API_KEY) {
      return new NextResponse("Missing ClipDrop API key", { status: 500 });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);

    const response = await fetch("https://clipdrop-api.co/text-to-image/v1", {
      method: "POST",
      headers: {
        "x-api-key": CLIPDROP_API_KEY,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("ClipDrop API error:", response.status, errorText);

      return NextResponse.json(
        {
          error: `ClipDrop API error: ${response.status} ${errorText}`,
        },
        { status: response.status }
      );
    }

    // ClipDrop returns PNG directly → convert to base64
    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    return NextResponse.json({
      images: [
        {
          id: Date.now().toString(),
          prompt,
          src: `data:image/png;base64,${base64}`,
        },
      ],
    });
  } catch (error) {
    console.error("[IMAGE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
