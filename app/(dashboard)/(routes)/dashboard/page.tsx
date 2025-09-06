"use client";

import { Card } from "@/components/ui/card";
import WordPullUp from "@/components/ui/word-pull-up";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Code,
  ImageIcon,
  MessageSquare,
  Music,
  Video,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // ✅ optional toast for disabled

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/conversation",
    enabled: true,
  },
  {
    label: "Music Generation",
    icon: Music,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    href: "/music",
    enabled: false,
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-500/10",
    href: "/image",
    enabled: true,
  },
  {
    label: "Image Background Remover",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-500/10",
    href: "/remove-background",
    enabled: true,
  },
  {
    label: "Image Background Replacer",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-500/10",
    href: "/replace-background",
    enabled: true,
  },
  {
    label: "Video Generation",
    icon: Video,
    color: "text-orange-700",
    bgColor: "bg-orange-500/10",
    href: "/video",
    enabled: false,
  },
  {
    label: "Code Generation",
    icon: Code,
    bgColor: "bg-green-500/10",
    color: "text-green-700",
    href: "/code",
    enabled: true,
  },
];

const DashboardPage = () => {
  const router = useRouter();

  const handleClick = (tool: typeof tools[0]) => {
    if (tool.enabled) {
      router.push(tool.href);
    } else {
      toast(`🚀 This feature is coming soon!`);
    }
  };

  return (
    <div>
      <div className="mb-8 space-y-4">
        <WordPullUp
          className="text-2xl font-bold tracking-[-0.02em] text-white text-center md:text-4xl md:leading-[5rem]"
          words="Explore the power of AI."
        />
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Chat with the smartest AI - Experience the power of AI
        </p>
      </div>

      {/* Grid layout */}
      <div className="px-4 md:px-20 lg:px-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Card
              key={tool.href}
              onClick={() => handleClick(tool)}
              className={cn(
                "p-4 flex items-center justify-between transition border-black/5 cursor-pointer",
                tool.enabled ? "hover:shadow-md" : "opacity-50"
              )}
            >
              <div className="flex items-center gap-x-4">
                <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                  <tool.icon className={cn("h-8 w-8", tool.color)} />
                </div>
                <div className="font-semibold">{tool.label}</div>
              </div>
              {tool.enabled && <ArrowRight className="h-5 w-5" />}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
