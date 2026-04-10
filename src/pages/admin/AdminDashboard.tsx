
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Calendar, DollarSign, Users } from 'lucide-react';
import { RevenueChart } from '@/components/admin/charts/RevenueChart';
import { BookingDistributionChart } from '@/components/admin/charts/BookingDistributionChart';
import { RecentActivities } from '@/components/admin/RecentActivities';
import { QuickActions } from '@/components/admin/QuickActions';

const stats = [
  {
    title: 'Total Properties',
    value: '24',
    change: '+2 this month',
    icon: Home,
    color: 'text-vacation-blue',
  },
  {
    title: 'Active Bookings',
    value: '156',
    change: '+12% from last month',
    icon: Calendar,
    color: 'text-vacation-orange',
  },
  {
    title: 'Monthly Revenue',
    value: '$48,392',
    change: '+18% from last month',
    icon: DollarSign,
    color: 'text-green-600',
  },
  {
    title: 'Total Users',
    value: '2,847',
    change: '+201 this month',
    icon: Users,
    color: 'text-purple-600',
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your properties.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-gray-600">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <BookingDistributionChart />
      </div>

      {/* Recent Activities */}
      <RecentActivities />
    </div>
  );
}
