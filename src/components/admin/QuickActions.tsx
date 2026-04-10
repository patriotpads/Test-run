
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Calendar, Bell, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export function QuickActions() {
  const actions = [
    {
      title: 'Add New Property',
      description: 'List a new vacation rental',
      icon: Plus,
      href: '/admin/properties',
      variant: 'default' as const,
    },
    {
      title: 'View Bookings',
      description: 'Manage current reservations',
      icon: Calendar,
      href: '/admin/bookings',
      variant: 'outline' as const,
    },
    {
      title: 'Check Notifications',
      description: '3 urgent items need attention',
      icon: Bell,
      href: '/admin/notifications',
      variant: 'outline' as const,
    },
    {
      title: 'Generate Report',
      description: 'Create monthly performance report',
      icon: FileText,
      href: '/admin/analytics',
      variant: 'outline' as const,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action) => (
            <Button
              key={action.title}
              variant={action.variant}
              asChild
              className="h-auto p-4 flex flex-col items-start space-y-2"
            >
              <Link to={action.href}>
                <action.icon className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">{action.title}</div>
                  <div className="text-sm text-gray-600">{action.description}</div>
                </div>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
