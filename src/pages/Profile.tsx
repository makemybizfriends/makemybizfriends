import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Edit, 
  MapPin, 
  Mail, 
  Phone, 
  Globe, 
  Building2, 
  Calendar,
  CheckCircle,
  Clock,
  User,
  Briefcase,
  CreditCard
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4 shadow-lg border-0">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
              <User className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Not Signed In</h2>
            <p className="text-muted-foreground mb-6">Please sign in to view your profile.</p>
            <Button className="w-full">Sign In</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const userInitials = user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : user.mobile.slice(-2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Profile Header Section */}
        <Card className="mb-8 shadow-xl border-0 overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600"></div>
          <CardContent className="relative px-4 sm:px-8 pb-8">
            <div className="flex flex-col space-y-6 -mt-12 relative z-10 pt-10">
              {/* Avatar and Basic Info Row */}
              <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6">
                <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-white shadow-2xl bg-white mx-auto sm:mx-0">
                  <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-xl sm:text-3xl font-bold">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-4 text-center sm:text-left mt-4 sm:mt-0">
                  <div className="space-y-3">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight break-words leading-tight">
                      {user.name || 'User Profile'}
                    </h1>
                    <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                      <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                      <Badge variant="outline" className="border-blue-200 text-blue-700">
                        <Clock className="h-3 w-3 mr-1" />
                        Active
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:flex-wrap items-center gap-3 sm:gap-4 text-sm sm:text-base text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 flex-shrink-0" />
                      <span className="font-medium break-all">{user.mobile}</span>
                    </div>
                    {user.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 flex-shrink-0" />
                        <span className="break-words">{user.location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 flex-shrink-0" />
                      <span>Member since 2024</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Edit Button Row */}
              <div className="flex justify-center sm:justify-end">
                <Button 
                  onClick={() => navigate('/profile/edit')}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Information */}
            <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">Personal Information</h2>
                    <p className="text-sm text-muted-foreground">Your basic profile details</p>
                  </div>
                </div>
              </CardHeader>
              <Separator className="mx-6" />
              <CardContent className="pt-6 space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Full Name</label>
                    <p className="text-base font-medium text-foreground">{user.name || 'Not provided'}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Email</label>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <p className="text-base text-foreground">{user.email || 'Not provided'}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Mobile</label>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <p className="text-base font-medium text-foreground">{user.mobile}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Location</label>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <p className="text-base text-foreground">{user.location || 'Not provided'}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business Information */}
            <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Briefcase className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">Business Information</h2>
                    <p className="text-sm text-muted-foreground">Company and business details</p>
                  </div>
                </div>
              </CardHeader>
              <Separator className="mx-6" />
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No Business Information</h3>
                  <p className="text-muted-foreground mb-6">Add your company details to complete your profile</p>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/profile/edit')}
                    className="border-purple-200 text-purple-700 hover:bg-purple-50"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Add Business Info
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Right Column */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <Card className="shadow-lg border-0">
              <CardHeader className="pb-4">
                <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start hover:bg-blue-50 border-blue-200 text-blue-700"
                  onClick={() => navigate('/profile/edit')}
                >
                  <Edit className="h-4 w-4 mr-3" />
                  Edit Profile
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start hover:bg-green-50 border-green-200 text-green-700"
                >
                  <CheckCircle className="h-4 w-4 mr-3" />
                  Verify Account
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start hover:bg-purple-50 border-purple-200 text-purple-700"
                >
                  <CreditCard className="h-4 w-4 mr-3" />
                  Payment Settings
                </Button>
              </CardContent>
            </Card>

            {/* Account Status */}
            <Card className="shadow-lg border-0">
              <CardHeader className="pb-4">
                <h3 className="text-lg font-semibold text-foreground">Account Status</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">Profile Completion</span>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                    65%
                  </Badge>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-gradient-to-r from-orange-500 to-yellow-500 h-2 rounded-full" style={{width: '65%'}}></div>
                </div>
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-foreground">Phone Verified</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-orange-500" />
                    <span className="text-sm text-foreground">Email Pending</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-orange-500" />
                    <span className="text-sm text-foreground">Business Info Missing</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold text-foreground mb-2">Need Help?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our support team is here to assist you with any questions.
                </p>
                <Button variant="outline" className="w-full border-blue-200 text-blue-700 hover:bg-blue-50">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
