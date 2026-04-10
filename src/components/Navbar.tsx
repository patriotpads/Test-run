import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ChevronLeft, Mail, MessageCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:christina@esellogic.com?subject=Booking%20Inquiry';
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/919515762697', '_blank');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleGoBack}
              className="mr-1 hover:bg-gray-100 rounded-full transition-all duration-200"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </Button>
            
            <Link to="/" className="flex items-center space-x-3 group transition-all duration-200 hover:scale-[1.02]">
              <div className="relative bg-white rounded-xl p-1 shadow-sm group-hover:shadow-md transition-all duration-200">
                <img 
                  src="/logo3.png" 
                  alt="PatriotPads Logo" 
                  className="h-20 w-20 object-contain" 
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-[#071439] leading-tight tracking-tight group-hover:text-[#dc2626] transition-colors duration-200">
                  PatriotPads
                </span>
                <span className="text-xs text-black font-medium tracking-wide hidden sm:block">
                  Perfect Getaways
                </span>
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium text-gray-700 hover:text-[#dc2626] transition-colors duration-200 relative group">
              Home
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-[#dc2626] scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
            </Link>
            <Link to="/listings" className="text-sm font-medium text-gray-700 hover:text-[#dc2626] transition-colors duration-200 relative group">
              Properties
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-[#dc2626] scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
            </Link>
            <Link to="/about" className="text-sm font-medium text-gray-700 hover:text-[#dc2626] transition-colors duration-200 relative group">
              About
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-[#dc2626] scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
            </Link>
          </nav>

          <div className="flex items-center space-x-3 ml-4 md:ml-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-[#dc2626] hover:bg-[#1e3a8a] transition-colors duration-200 font-medium px-6 text-white">
                  Book Now
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem 
                  onClick={handleEmailClick}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Mail className="h-4 w-4" />
                  <span>Email Us</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;