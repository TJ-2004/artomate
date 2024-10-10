"use client";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import TypewriterComponent from "typewriter-effect";
import { FloatingDockDemo } from "@/components/ui/floating-dock-demo";
import { RainbowButton } from "./ui/rainbow-button";
import WordPullUp from "./ui/word-pull-up";
import { ArrowRight } from "lucide-react";
const LandingHero = () => {
  const { isSignedIn } = useAuth();
  return (
    <div className="text-white font-bold py-36 text-center space-y-5 h-screen ">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1>The Best AI Tool for</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          <TypewriterComponent
            options={{
              strings: [
                "Chatbot.",
                "Photo Generation.",
                "Image Generation.",
                "Code Generation.",
                "Music Generation.",
                "Video Generation.",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className="text-sm md:text-xl font-light text-zinc-400">
        <WordPullUp words="Create content using AI 10x faster." />
      </div>
      <div className="flex items-center justify-center p-2">
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <RainbowButton className="gap-3 p-5">
            <p className="text-xl">Start Generating For Free</p>
            <ArrowRight className="text-white" />
          </RainbowButton>
        </Link>
      </div>
      <div className="text-zinc-400 text-sm md:text-lg font-mormal">
        Your imagination, Artomate generate everything you need, all at no cost!
      </div>
      <FloatingDockDemo />
    </div>
  );
};

export default LandingHero;
