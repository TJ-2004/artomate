import { BackgroundLines } from "@/components/ui/background-lines";
import React from "react";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <BackgroundLines className="">
      <main className="h-auto bg-[#111827] overflow-auto">
        <div className="mx-auto max-w-screen-xl h-full w-full">{children}</div>
      </main>
    </BackgroundLines>
  );
};
export default LandingLayout;
