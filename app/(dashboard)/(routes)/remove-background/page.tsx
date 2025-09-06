"use client";

import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, Download, Eraser } from "lucide-react";
import { toast } from "sonner"; // ✅ using sonner

const BackgroundRemover = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
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

  // Remove background API call
  const handleRemoveBackground = async () => {
    if (!selectedFile) return;

    // ✅ Prevent duplicate removal
    if (processedImage) {
      toast.warning("Background already removed. Upload a new image to retry.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setIsLoading(true);
      setProcessedImage(null); // reset before request

      const response = await axios.post("/api/remove-background", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.imageUrl) {
        setProcessedImage(response.data.imageUrl);
        toast.success("Background removed successfully!");
      } else {
        console.error("No image returned:", response.data);
        toast.error("Something went wrong. No image returned.");
      }
    } catch (error) {
      console.error("Error removing background:", error);
      toast.error("Failed to remove background. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6 text-foreground">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Eraser className="w-6 h-6 text-pink-500" />
          Background Remover
        </h1>
        <p className="text-muted-foreground">
          Upload an image and remove its background instantly.
        </p>
      </div>

      {/* Upload + Result side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upload */}
        <Card className="bg-card border border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Upload Image</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input type="file" accept="image/*" onChange={handleFileChange} />
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
              disabled={!selectedFile || isLoading}
              onClick={handleRemoveBackground}
              className="w-full bg-gray-800 hover:bg-gray-900 text-white"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Eraser className="h-4 w-4 mr-2" />
              )}
              {isLoading ? "Processing..." : "Remove Background"}
            </Button>
          </CardContent>
        </Card>

        {/* Processed Image */}
        <Card className="bg-card border border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Download className="w-5 h-5 text-pink-500" />
              Processed Image
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            {!processedImage && !isLoading && (
              <p className="text-muted-foreground text-center py-12">
                Upload an image and click <strong>“Remove Background”</strong>{" "}
                to get started.
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
                  <Loader2 className="h-6 w-6 animate-spin text-pink-500 mb-2" />
                  <p className="text-muted-foreground">Processing image...</p>
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
                    link.download = "background-removed.png";
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

export default BackgroundRemover;
