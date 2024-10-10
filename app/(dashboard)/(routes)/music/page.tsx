"use client";
import * as z from "zod";
import axios from "axios";
import Heading from "@/components/heading";
import { Music } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import EmptyComponent from "@/components/empty";
import LoadingComponent from "@/components/loader";
import PulsatingButton from "@/components/ui/pulsating-button";
const MusicPage = () => {
  const [music, setMusic] = useState<string>();
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
      setMusic(undefined);
      const response = await axios.post("/api/music", values);
      console.log(response)
      console.log(response.data)
      console.log(response.data.audio)
      setMusic(response.data.audio);
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
        title="Conversation"
        description="Turn your prompt into music."
        icon={Music}
        iconColor="text-emerald-500"
        bgColor="bg-emerald-500/10"
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
                        placeholder="Piano solo"
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
          {!music && !isLoading && (
            <EmptyComponent label="Music will be generated" />
          )}
          {music && (
            <audio controls className="w-full mt-8">
              <source src={music} />
            </audio>
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicPage;
