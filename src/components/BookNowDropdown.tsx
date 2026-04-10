import React from "react";
import { Mail } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const handleEmailClick = () => {
  window.location.href =
    "mailto:christina@esellogic.com?subject=Booking%20Inquiry";
};

export default function BookNowDropdown({ buttonText }: { buttonText?: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-full bg-[#dc2626] hover:bg-[#1e3a8a] text-white transition-colors duration-200 font-semibold">
          {buttonText || "Request to Book"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 z-50">
        <DropdownMenuItem
          onClick={handleEmailClick}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Mail className="h-4 w-4" />
          <span>Email Us</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
