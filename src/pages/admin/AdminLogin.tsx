import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isAuthenticated, isLoading } = useAdminAuth();
  const { toast } = useToast();

  if (isAuthenticated && !isLoading) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const success = await login(email, password);
    
    if (success) {
      toast({
        title: 'Login successful',
        description: 'Welcome to PatriotPads Admin Panel',
      });
    } else {
      toast({
        title: 'Login failed',
        description: 'Invalid email or password',
        variant: 'destructive',
      });
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-vacation-blue/10 to-vacation-orange/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Home className="h-8 w-8 text-vacation-blue" />
            <div>
              <h1 className="text-xl font-bold text-vacation-navy">Patriotpads</h1>
              <p className="text-sm text-gray-600">Admin Panel</p>
            </div>
          </div>
          <CardTitle>Patriotpads Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting || isLoading}>
              {isSubmitting || isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
