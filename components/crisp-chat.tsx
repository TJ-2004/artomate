"use client";
import { Crisp } from "crisp-sdk-web";
import { useEffect } from "react";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("b7ca05cc-0c2c-45f1-b5f4-13dc17ce7fe3");
  });
  return null;
};
