import * as React from "react";

import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <div className="input-container">
      <Icon className="icon" icon="bitcoin-icons:search-outline" />
      <input
        type={type}
        data-slot="input"
        placeholder="Search for a country..."
        className={cn("", className)}
        {...props}
      />
    </div>
  );
}

export { Input };
