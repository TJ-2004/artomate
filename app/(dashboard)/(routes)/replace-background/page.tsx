"use client";

import { useState } from "react";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Loader2,
  Download,
  ImageIcon,
  Upload,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner"; // ✅ Sonner for notifications

const ReplaceBackground = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setProcessedImage(null); // reset processed image
    }
  };

  // Call API to replace background
  const handleReplaceBackground = async () => {
    if (!selectedFile) {
      toast.error("Please upload an image first.");
      return;
    }
    if (!prompt.trim()) {
      toast.error("Please enter a background description.");
      return;
    }

    const formData = new FormData();
    formData.append("image_file", selectedFile);
    formData.append("prompt", prompt);

    try {
      setIsLoading(true);
      setProcessedImage(null);

      const response = await axios.post("/api/replace-background", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data?.images?.length > 0) {
        setProcessedImage(response.data.images[0].src);
        toast.success("Background replaced successfully!");
      } else {
        console.error("No image returned:", response.data);
        toast.error("Something went wrong. No image returned.");
      }
    } catch (err) {
      const error = err as AxiosError;

      if (error.response?.status === 404) {
        toast.error("API endpoint not found (404). Check your API route.");
      } else {
        console.error("Error replacing background:", error);
        toast.error("Failed to replace background. Try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6 text-foreground">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <ImageIcon className="w-6 h-6 text-blue-500" />
          Replace Background
        </h1>
        <p className="text-muted-foreground">
          Upload an image and describe the new background.
        </p>
      </div>

      {/* Upload + Result side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upload Section */}
        <Card className="bg-card border border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Upload className="w-5 h-5 text-blue-500" />
              Upload & Describe
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input type="file" accept="image/*" onChange={handleFileChange} />
            <Textarea
              placeholder="e.g. Replace with a cozy beach sunset..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            {preview && (
              <div className="relative w-full h-56 bg-muted rounded-md overflow-hidden flex items-center justify-center">
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>
            )}
            <Button
              disabled={!selectedFile || !prompt || isLoading}
              onClick={handleReplaceBackground}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <ImageIcon className="h-4 w-4 mr-2" />
              )}
              {isLoading ? "Processing..." : "Replace Background"}
            </Button>
          </CardContent>
        </Card>

        {/* Processed Image Section */}
        <Card className="bg-card border border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Download className="w-5 h-5 text-blue-500" />
              Result
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            {!processedImage && !isLoading && (
              <p className="text-muted-foreground text-center py-12">
                Upload an image and enter a <strong>prompt</strong> to get
                started.
              </p>
            )}

            {isLoading && preview && (
              <div className="w-full space-y-4">
                <div className="relative w-full h-56 bg-muted rounded-md overflow-hidden flex items-center justify-center opacity-50">
                  <Image
                    src={preview}
                    alt="Processing..."
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col items-center justify-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin text-blue-500 mb-2" />
                  <p className="text-muted-foreground">
                    Replacing background...
                  </p>
                </div>
              </div>
            )}

            {processedImage && (
              <div className="w-full space-y-4">
                <div className="relative w-full h-56 bg-muted rounded-md overflow-hidden flex items-center justify-center">
                  <Image
                    src={processedImage}
                    alt="Processed"
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
                <Button
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = processedImage;
                    link.download = "background-replaced.png";
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
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReplaceBackground;
