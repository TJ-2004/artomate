import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.formData();
    const imageFile = body.get("image_file") as File | null;
    const prompt = body.get("prompt") as string | null;

    if (!imageFile) {
      return new NextResponse("Image file is required", { status: 400 });
    }

    const CLIPDROP_API_KEY = process.env.CLIPDROP_API_KEY;
    if (!CLIPDROP_API_KEY) {
      return new NextResponse("Missing ClipDrop API key", { status: 500 });
    }

    // Forward request to ClipDrop API
    const formData = new FormData();
    formData.append("image_file", imageFile);
    formData.append("prompt", prompt ?? "");

    const response = await fetch("https://clipdrop-api.co/replace-background/v1", {
      method: "POST",
      headers: {
        "x-api-key": CLIPDROP_API_KEY,
        accept: "image/png", // can be image/webp or image/jpeg
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("ClipDrop API error:", response.status, errorText);

      return NextResponse.json(
        {
          error:
            errorText.includes("Unacceptable content detected")
              ? "⚠️ Please enter an appropriate prompt. Some content cannot be generated."
              : "Something went wrong. Please try again.",
        },
        { status: response.status }
      );
    }

    // Convert returned binary → base64
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
      credits: {
        remaining: response.headers.get("x-remaining-credits") || null,
        consumed: response.headers.get("x-credits-consumed") || null,
      },
    });
  } catch (error) {
    console.error("[REPLACE_BACKGROUND_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
