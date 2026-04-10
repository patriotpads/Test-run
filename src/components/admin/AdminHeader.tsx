import React from 'react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Bell, User, LogOut, Home } from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';

export function AdminHeader() {
  const { user, logout } = useAdminAuth();

  return (
    <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <SidebarTrigger />
        <h2 className="text-lg font-semibold text-gray-900">Admin Dashboard</h2>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>

        <Link to="/">
          <Button variant="ghost" className="flex items-center space-x-2">
            <Home className="h-5 w-5" />
            <span className="text-sm">Back To Home</span>
          </Button>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span className="text-sm">{user?.email}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
