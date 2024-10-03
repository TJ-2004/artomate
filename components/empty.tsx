import Image from "next/image";
import React from "react";
import LetterPullup from "@/components/ui/letter-pullup";
interface EmptyProps {
  label: string;
}
const EmptyComponent = ({ label }: EmptyProps) => {
  return (
    <div className="h-full p-20 flex flex-col items-center">
        <LetterPullup
          className="text-muted text-center  w-full  text-2xl sm:text-3xl text-wrap"
          words={label}
          delay={0.05}
        />
    </div>
  );
};

export default EmptyComponent;
