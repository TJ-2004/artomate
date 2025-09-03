import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

type Message = {
  role: string;
  content: string;
};

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { question } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    
    if (!process.env.GROQ_API_KEY) {
      return new NextResponse("Groq API Key not configured", { status: 500 });
    }
    
    if (!question || typeof question !== "string") {
      return new NextResponse("Question must be a string", { status: 400 });
    }

    const response = await getGroqChatCompletion(question);

    const reply = response.choices[0]?.message;
    if (!reply) {
      return new NextResponse("No response from Groq", { status: 500 });
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

const getGroqChatCompletion = async (questionContent: string) => {
  return groq.chat.completions.create({
    messages: [{ role: "user", content: questionContent }],
    model: "llama-3.3-70b-versatile",
  });
};
