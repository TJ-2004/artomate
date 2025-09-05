"use client";
import * as z from "zod";
import axios from "axios";
import Heading from "@/components/heading";
import { Download, ImageIcon } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { amountOptions, formSchema, resoluitonOptions } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import EmptyComponent from "@/components/empty";
import LoadingComponent from "@/components/loader";
import PulsatingButton from "@/components/ui/pulsating-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ImageItem {
  id: string;
  prompt: string;
  src: string;
}
const ImageGenerationPage = () => {
  const router = useRouter();
  const [images, setImages] = useState<ImageItem[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512×512",
    },
  });
  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([]);
      const response = await axios.post<{ images: ImageItem[] }>("/api/image", {
        prompt: values.prompt,
      });
      setImages(response.data.images || []);
      form.reset({
        prompt: values.prompt,
        amount: values.amount,
        resolution: values.resolution,
      });
    } catch (error: any) {
      console.error("Error during API call:", error);
  
      // Show error from API
      const errorMessage =
        error.response?.data?.error || "Something went wrong. Please try again.";
      alert(errorMessage); // 🔴 replace with toast/snackbar if you want
    } finally {
      router.refresh();
    }
  };
  

  return (
    <div>
      <Heading
        title="Image Generation"
        description="Turn your prompt into an image."
        icon={ImageIcon}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
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
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormControl className="m-0 p-0">
                      <Input
                        placeholder="A picture of a horse in Swiss alps"
                        {...field}
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="amount"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {amountOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                name="resolution"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {resoluitonOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
            <div className="p-20">
              <LoadingComponent label="Artomate is thinking..." />
            </div>
          )}
          {images.length === 0 && !isLoading && (
            <EmptyComponent label="Type your text and let AI generate an image instantly!" />
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
            {images.map((image) => (
              <Card key={image.id} className="rounded-lg overflow-hidden">
                <div className="relative aspect-square">
                  <Image
                    key={image.id}
                    src={image.src}
                    alt={image.prompt}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <CardFooter className="p-2">
                  <Button
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = image.src; // base64 PNG returned by API
                      link.download = `${image.prompt.replace(
                        /\s+/g,
                        "_"
                      )}.png`; // filename
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    variant="secondary"
                    className="w-full"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGenerationPage;
