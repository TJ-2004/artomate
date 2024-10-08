"use client";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import ShinyButton from "./ui/shiny-button";

const font = Montserrat({
  weight: "600",
  subsets: ["latin"],
});
export const LandingNavbar = () => {
  const { isSignedIn } = useAuth();
  return (
    <nav className="p-4 bg-transparent flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <div className="relative h-8 w-8 mr-4">
          <Image fill alt="Logo" src="/logo.png" className="rounded-full" />
        </div>
        <h1 className={cn("text-2xl font-bold text-white", font.className)}>
          Artomate
        </h1>
      </Link>
      <div className="flex items-center gap-x-2">
        <Link className="" href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <ShinyButton className="bg-white rounded-full relative z-10">
            Get Started
          </ShinyButton>
        </Link>
      </div>
    </nav>
  );
};
