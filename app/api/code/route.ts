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
    const { userId } = auth();
    const body = await req.json();
    const { question } = body;
    const [{ content }]: Message[] = question;
    // console.log(content); // Output: 'what is cricket'
    // console.log(question);
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!groq.apiKey) {
      return new NextResponse("Groq API Key not configured", { status: 500 });
    }
    if (!question) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const response = await getGroqChatCompletion(content);
    // console.log(response.choices[0]?.message?.content || "");

    const reply = response.choices[0]?.message;
    // console.log(reply);
    if (!reply) {
      return new NextResponse("No response from OpenAI", { status: 500 });
    }
    return NextResponse.json({ reply });
  } catch (error) {
    console.log("[CONVERSATION_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
const getGroqChatCompletion = async (questionContent: string) => {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: questionContent,
      },
    ],
    model: "llama3-8b-8192",
  });
};
