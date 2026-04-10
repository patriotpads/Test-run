
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', revenue: 32000 },
  { month: 'Feb', revenue: 28000 },
  { month: 'Mar', revenue: 45000 },
  { month: 'Apr', revenue: 52000 },
  { month: 'May', revenue: 48000 },
  { month: 'Jun', revenue: 61000 },
  { month: 'Jul', revenue: 68000 },
  { month: 'Aug', revenue: 65000 },
  { month: 'Sep', revenue: 58000 },
  { month: 'Oct', revenue: 55000 },
  { month: 'Nov', revenue: 42000 },
  { month: 'Dec', revenue: 48000 },
];

export function RevenueChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#0EA5E9" 
              strokeWidth={2}
              dot={{ fill: '#0EA5E9' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
