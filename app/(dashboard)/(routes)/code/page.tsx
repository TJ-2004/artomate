"use client";
import * as z from "zod";
import axios from "axios";
import Heading from "@/components/heading";
import { Code } from "lucide-react";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import EmptyComponent from "@/components/empty";
import LoadingComponent from "@/components/loader";
import { cn } from "@/lib/utils";
import AvatarComponent from "@/components/userAvatar";
import BotAvatarComponent from "@/components/botAvatar";
import PulsatingButton from "@/components/ui/pulsating-button";
interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
const CodePage = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });
  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatMessage = {
        role: "user",
        content: values.prompt,
      };
      // console.log(userMessage);
      const response = await axios.post("/api/code", {
        question: [{ content: userMessage.content }],
      });
      // console.log({ content: userMessage.content });
      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: response.data.reply.content, // Assuming this is the assistant's reply
      };
      setMessages((current) => [...current, userMessage, assistantMessage]);
      // console.log(messages);
      form.reset({ prompt: values.prompt });
    } catch (error: unknown) {
      //To do Open Pro Model
      console.error("Error during API call:", error);
    } finally {
      router.refresh();
    }
  };
  return (
    <div>
      <Heading
        title="Code Generation"
        description="Generate Code using descriptive text."
        icon={Code}
        iconColor="text-green-700"
        bgColor="bg-green-700/10"
      />
      <div className="px-4 lg-px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2 "
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        placeholder="Simple toggle button using react hooks."
                        {...field}
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <PulsatingButton
                className="col-span-12 lg:col-span-2 w-full bg-[#111827]"
                disabled={isLoading}
              >
                Generate
              </PulsatingButton>
            </form>
          </Form>
        </div>

        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg flex w-full items-center justify-center">
              <LoadingComponent label="Artomate is thinking..." />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <EmptyComponent label="Transform your ideas into reality with AI-powered code generation at your fingertips!" />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message, index) => (
              <div
                key={`${message.content}-${index}`}
                className={cn(
                  "p-8 w-full flex items-start gap-x-8 rounded-lg bg-muted ",
                  message.role === "user" ? " text-black " : "text-black"
                )}
              >
                {message.role === "user" ? (
                  <AvatarComponent />
                ) : (
                  <BotAvatarComponent />
                )}
                <ReactMarkdown
                  components={{
                    pre: ({ ...props }) => (
                      <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                        <pre {...props} />
                      </div>
                    ),
                    code: ({ ...props }) => (
                      <code
                        className="bg-black/10 rounded-lg p-1 "
                        {...props}
                      />
                    ),
                  }}
                  className="text-sm overflow-hidden leading-7"
                >
                  {message.content || ""}
                </ReactMarkdown>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePage;
