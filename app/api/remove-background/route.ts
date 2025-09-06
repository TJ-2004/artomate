import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return new NextResponse("Image file is required", { status: 400 });
    }

    const CLIPDROP_API_KEY = process.env.CLIPDROP_API_KEY;
    if (!CLIPDROP_API_KEY) {
      return new NextResponse("Missing ClipDrop API key", { status: 500 });
    }

    // Prepare form data for ClipDrop API
    const apiFormData = new FormData();
    apiFormData.append("image_file", file);

    // Optional: Handle transparency behavior (default: return_input_if_non_opaque)
    // apiFormData.append("transparency_handling", "discard_alpha_layer");

    const response = await fetch("https://clipdrop-api.co/remove-background/v1", {
      method: "POST",
      headers: {
        "x-api-key": CLIPDROP_API_KEY,
      },
      body: apiFormData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("ClipDrop API error:", response.status, errorText);

      return NextResponse.json(
        {
          error:
            errorText.includes("No api key provided")
              ? "⚠️ API key is missing or invalid."
              : "Something went wrong. Please try again.",
        },
        { status: response.status }
      );
    }

    // ClipDrop returns binary image → convert to base64
    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    return NextResponse.json({
      imageUrl: `data:image/png;base64,${base64}`,
    });
  } catch (error) {
    console.error("[REMOVE_BG_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
