
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Home,
  Calendar,
  Users,
  FileText,
  BarChart3,
  Settings,
  User,
  Plus,
  List,
  MapPin,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigationItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/admin',
    exact: true,
  },
  {
    title: 'Properties',
    icon: Home,
    href: '/admin/properties',
  },
  {
    title: 'Bookings',
    icon: Calendar,
    children: [
      { title: 'All Bookings', href: '/admin/bookings', icon: List },
      { title: 'Calendar View', href: '/admin/bookings/calendar', icon: Calendar },
    ],
  },
  {
    title: 'Users',
    icon: Users,
    href: '/admin/users',
  },
  {
    title: 'Content',
    icon: FileText,
    children: [
      { title: 'Homepage', href: '/admin/content/homepage', icon: Home },
      { title: 'Destinations', href: '/admin/content/destinations', icon: MapPin },
    ],
  },
  {
    title: 'Analytics',
    icon: BarChart3,
    href: '/admin/analytics',
  },
  {
    title: 'Settings',
    icon: Settings,
    href: '/admin/settings',
  },
];

export function AdminSidebar() {
  const location = useLocation();

  const isActive = (href: string, exact?: boolean) => {
    if (exact) {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Home className="h-8 w-8 text-vacation-blue" />
          <div>
            <h1 className="text-xl font-bold text-vacation-navy">PatriotPads</h1>
            <p className="text-sm text-gray-600">Admin Panel</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.children ? (
                    <div className="space-y-1">
                      <div className="px-3 py-2 text-sm font-medium text-gray-900">
                        <item.icon className="inline-block w-4 h-4 mr-2" />
                        {item.title}
                      </div>
                      <div className="ml-6 space-y-1">
                        {item.children.map((child) => (
                          <SidebarMenuButton
                            key={child.href}
                            asChild
                            className={cn(
                              'w-full justify-start text-gray-600 hover:text-vacation-blue',
                              isActive(child.href) && 'bg-vacation-blue/10 text-vacation-blue'
                            )}
                          >
                            <Link to={child.href}>
                              <child.icon className="w-4 h-4 mr-2" />
                              {child.title}
                            </Link>
                          </SidebarMenuButton>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        'w-full justify-start text-gray-600 hover:text-vacation-blue',
                        isActive(item.href!, item.exact) && 'bg-vacation-blue/10 text-vacation-blue'
                      )}
                    >
                      <Link to={item.href!}>
                        <item.icon className="w-4 h-4 mr-2" />
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
