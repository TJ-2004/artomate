"use client";
import LandingHero from "@/components/landing-hero";
import { LandingNavbar } from "@/components/landing-navbar";
import { Testimonials } from "@/components/testimonials";
import React from "react";

const LandingPage = () => {
  return (
    <div className="h-full">
      <LandingNavbar />
      <LandingHero />
      <Testimonials />
    </div>
  );
};

export default LandingPage;
