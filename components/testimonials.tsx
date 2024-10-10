"use effect";
import { HoverEffect } from "@/components/ui/card-hover-effect";

export function Testimonials() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "Sarthak Patwal",
    description:
      "This AI tool is absolutely amazing! It's the best I've come across so far.",
    minititle: "Frontend Developer",
    link: "https://stripe.com",
  },
  {
    title: "Tanish Bharadwaj",
    description:
      "This is by far the most efficient and user-friendly AI tool I've used. Incredible!.",
    minititle: "Mobile Developer",
    link: "https://netflix.com",
  },
  {
    title: "Saurav Singh Shekhawat",
    description:
      "I've tried many, but this AI tool stands out as the best. Super intuitive and powerful!.",
    minititle: "Blockchain Developer",
    link: "https://google.com",
  },
  {
    title: "Aryan Gupta",
    description:
      "I'm blown away by the versatility of this AI! Chatting with AI, generating stunning images, writing code, and making music all in one app? Incredible!.",
    minititle: "Backend Engineer",
    link: "https://meta.com",
  },
  {
    title: "Harshit Rustagi",
    minititle: "Software Developer",
    description:
      "Absolutely loving this AI platform! From generating images to writing code and composing music, it's got everything I need!.",
    link: "https://amazon.com",
  },
  {
    title: "Rohit Pilli",
    description:
      "I've never seen an app that handles image creation, code generation, AI chats, and music production so smoothly. It's a powerhouse!.",
    minititle: "Marketing Proffesional",
    link: "https://microsoft.com",
  },
];
