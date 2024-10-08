import Image from "next/image";
import React from "react";
import WordPullUp from "./ui/word-pull-up";
interface EmptyProps {
  label: string;
}
const EmptyComponent = ({ label }: EmptyProps) => {
  return (
    <div className="h-full p-20 flex flex-col items-center">
        <WordPullUp
          className="text-muted text-center  w-full  text-2xl sm:text-3xl text-wrap"
          words={label}
        />
    </div>
  );
};

export default EmptyComponent;
