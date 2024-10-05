import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";
// import Groq from "groq-sdk";

// const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
// type Message = {
//   role: string;
//   content: string;
// };
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = 1, resolution = "512×512" } = body;
    // const [{ content }]: Message[] = question;
    // console.log(content); // Output: 'what is cricket'
    // console.log(question);
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    // if (!groq.apiKey) {
    //   return new NextResponse("Groq API Key not configured", { status: 500 });
    // }
    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API Key not configured", { status: 500 });
    }
    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }
    if (!amount) {
      return new NextResponse("Amount is required", { status: 400 });
    }
    if (!resolution) {
      return new NextResponse("Resolution is required", { status: 400 });
    }

    // const response = await getGroqChatCompletion(content);
    // // console.log(response.choices[0]?.message?.content || "");

    // const reply = response.choices[0]?.message;
    // // console.log(reply);
    // if (!reply) {
    //   return new NextResponse("No response from OpenAI", { status: 500 });
    // }
    const response = await openai.createImage({
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });
    return NextResponse.json(response.data.data);
  } catch (error) {
    console.log("[IMAGE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
// const getGroqChatCompletion = async (questionContent: string) => {
//   return groq.chat.completions.create({
//     messages: [
//       {
//         role: "user",
//         content: questionContent,
//       },
//     ],
//     model: "llama3-8b-8192",
//   });
// };
