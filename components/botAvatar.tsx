import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const BotAvatarComponent = () => {
  return (
    <Avatar className="h-8 w-8 ">
      <AvatarImage src="/logo.png" />
    </Avatar>
  );
};

export default BotAvatarComponent;
