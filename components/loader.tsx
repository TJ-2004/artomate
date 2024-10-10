"use client";
import React from "react";
import { DNA } from "react-loader-spinner";
interface LoadingComponentProps {
  label: string;
}
const LoadingComponent = ({ label }: LoadingComponentProps) => {
  return (
    <div className="flex flex-col justify-center h-full gap-y-4  items-center w-full ">
      <DNA height={50} width={200} />
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
};

export default LoadingComponent;
