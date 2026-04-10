
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Home, User, DollarSign } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'booking',
    title: 'New booking received',
    description: 'Malibu Beach House - 3 nights',
    time: '2 minutes ago',
    icon: Calendar,
    badge: 'New',
    badgeVariant: 'default' as const,
  },
  {
    id: 2,
    type: 'property',
    title: 'Property updated',
    description: 'Miami Ocean View - Photos added',
    time: '1 hour ago',
    icon: Home,
    badge: 'Updated',
    badgeVariant: 'secondary' as const,
  },
  {
    id: 3,
    type: 'user',
    title: 'New user registration',
    description: 'john.doe@email.com',
    time: '3 hours ago',
    icon: User,
    badge: 'User',
    badgeVariant: 'outline' as const,
  },
  {
    id: 4,
    type: 'payment',
    title: 'Payment received',
    description: '$1,250 for Big Bear Cabin',
    time: '5 hours ago',
    icon: DollarSign,
    badge: 'Payment',
    badgeVariant: 'secondary' as const,
  },
  {
    id: 5,
    type: 'booking',
    title: 'Booking cancelled',
    description: 'Orlando Family Suite - Refund processed',
    time: '1 day ago',
    icon: Calendar,
    badge: 'Cancelled',
    badgeVariant: 'destructive' as const,
  },
];

export function RecentActivities() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-vacation-blue/10 rounded-lg flex items-center justify-center">
                  <activity.icon className="w-4 h-4 text-vacation-blue" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-900">{activity.title}</p>
                  <Badge variant={activity.badgeVariant}>{activity.badge}</Badge>
                </div>
                <p className="text-sm text-gray-600">{activity.description}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
