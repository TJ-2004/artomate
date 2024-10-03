"use client";
import * as z from "zod";
import axios from "axios";
import Heading from "@/components/heading";
import { MessageSquare } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import EmptyComponent from "@/components/empty";
interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
const ConversationPage = () => {
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
      const newMessages = [...messages, userMessage];
      // console.log(userMessage);
      const response = await axios.post("/api/conversation", {
        question: [{ content: userMessage.content }],
      });
      // console.log({ content: userMessage.content });
      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: response.data.reply.content, // Assuming this is the assistant's reply
      };
      setMessages((current) => [...current, userMessage, assistantMessage]);
      // console.log(messages);
      form.reset();
    } catch (error: any) {
      //To do Open Pro Model
      console.error("Error during API call:", error);
    } finally {
      router.refresh();
    }
  };
  return (
    <div>
      <Heading
        title="Conversation"
        description="Our most advanced conversation model."
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
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
                        placeholder="How do I calculate the radius of circle?"
                        {...field}
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 w-full"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>

        <div className="space-y-4  mt-4">
          {messages.length === 0 && !isLoading && <EmptyComponent />}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message, index) => (
              <div key={`${message.content}-${index}`}> {message.content}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
