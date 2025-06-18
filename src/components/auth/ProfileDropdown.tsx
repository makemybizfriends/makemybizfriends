
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Edit, 
  LogOut, 
  MapPin, 
  Eye, 
  FileText, 
  ShieldCheck, 
  Building2, 
  ShoppingCart, 
  Clock, 
  Settings,
  ChevronDown,
  User
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export function ProfileDropdown() {
  const { user, logout } = useAuth();

  if (!user) return null;

  const userInitials = user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : user.mobile.slice(-2);

  const menuItems = [
    {
      label: 'View Profile',
      icon: Eye,
      href: '/profile',
      color: 'text-blue-600',
      helpText: 'View your public profile'
    },
    {
      label: 'My Orders',
      icon: ShoppingCart,
      href: '/my-orders',
      color: 'text-indigo-600',
      helpText: 'Track your orders and requirements'
    },
    {
      label: 'Post Requirement',
      icon: FileText,
      href: '/post-requirement',
      color: 'text-green-600',
      helpText: 'Create new business requirement'
    },
    {
      label: 'Verified Buyer',
      icon: ShieldCheck,
      href: '/verified-buyer',
      color: 'text-purple-600',
      helpText: 'Get verified status'
    },
    {
      label: 'Directory',
      icon: Building2,
      href: '/directory',
      color: 'text-orange-600',
      helpText: 'Browse business directory'
    },
    {
      label: 'Activity',
      icon: Clock,
      href: '/activity',
      color: 'text-teal-600',
      helpText: 'View recent activity'
    },
    {
      label: 'Settings',
      icon: Settings,
      href: '/settings',
      color: 'text-gray-600',
      helpText: 'Account preferences'
    }
  ];

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className="flex items-center space-x-2 h-auto p-2 rounded-lg hover:bg-accent/50 transition-all duration-200"
          >
            <Avatar className="h-8 w-8 ring-1 ring-white shadow-sm">
              <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-xs font-semibold">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:block text-left">
              <div className="text-sm font-medium text-foreground">{user.name || 'User'}</div>
              <div className="text-xs text-muted-foreground">{user.mobile}</div>
            </div>
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent 
          align="end" 
          className="w-64 bg-background border shadow-lg z-50 rounded-lg p-0"
          sideOffset={8}
        >
          {/* Compact Profile Header */}
          <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 border-b">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10 ring-1 ring-white shadow-sm">
                <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-sm font-bold">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-foreground truncate">{user.name || 'User'}</div>
                <div className="text-xs text-muted-foreground truncate">{user.mobile}</div>
                {user.location && (
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span className="truncate">{user.location}</span>
                  </div>
                )}
              </div>
            </div>
            
            <Link to="/profile/edit">
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-3 h-8 text-xs border-blue-200 text-blue-700 hover:bg-blue-50"
              >
                <Edit className="h-3 w-3 mr-1" />
                Edit Profile
              </Button>
            </Link>
          </div>
          
          {/* Compact Menu Items */}
          <div className="py-1">
            {menuItems.map((item, index) => (
              <DropdownMenuItem key={index} asChild className="cursor-pointer p-0">
                <Link 
                  to={item.href} 
                  className="flex items-center space-x-3 px-4 py-2.5 hover:bg-accent/50 transition-colors group"
                >
                  <div className={`flex-shrink-0 ${item.color}`}>
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground">
                      {item.label}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {item.helpText}
                    </div>
                  </div>
                </Link>
              </DropdownMenuItem>
            ))}
          </div>
          
          <DropdownMenuSeparator className="mx-2 my-1" />
          
          {/* Compact Logout */}
          <div className="p-1">
            <DropdownMenuItem 
              onClick={logout}
              className="flex items-center space-x-3 px-4 py-2.5 cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md mx-1 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <div className="flex-1">
                <span className="text-sm font-medium">Sign Out</span>
                <div className="text-xs text-red-500">End your session</div>
              </div>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
