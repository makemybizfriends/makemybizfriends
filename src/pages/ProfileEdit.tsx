import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Save, 
  Building2, 
  MapPin, 
  CreditCard, 
  ArrowLeft,
  Globe,
  Facebook,
  Instagram,
  Phone,
  Mail,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { DESIGN_GUIDELINES } from '@/styles/designGuidelines';

export default function ProfileEdit() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('personal');
  const [formData, setFormData] = useState({
    // Personal Information
    name: '',
    email: '',
    website: '',
    bio: '',
    
    // Address Information
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    
    // Company Information
    companyName: '',
    companyWebsite: '',
    gstin: '',
    pan: '',
    industry: '',
    businessType: '',
    facebook: '',
    instagram: '',
    google: '',
    
    // Bank Account Details
    accountHolderName: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    accountType: '',
    branch: '',
    upiId: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        website: '',
        bio: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        country: 'India',
        companyName: '',
        companyWebsite: '',
        gstin: '',
        pan: '',
        industry: '',
        businessType: '',
        facebook: '',
        instagram: '',
        google: '',
        accountHolderName: user.name || '',
        bankName: '',
        accountNumber: '',
        ifscCode: '',
        accountType: '',
        branch: '',
        upiId: '',
      });
    }
  }, [user]);

  const handleSave = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      updateUser({
        name: formData.name,
        email: formData.email,
        location: `${formData.city}, ${formData.state}`,
      });
      setIsLoading(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
      navigate('/profile');
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const navigationItems = [
    {
      id: 'personal',
      label: 'Personal',
      icon: User,
      color: 'from-blue-500 to-blue-600',
      description: 'Basic profile information'
    },
    {
      id: 'address',
      label: 'Address',
      icon: MapPin,
      color: 'from-green-500 to-green-600',
      description: 'Location details'
    },
    {
      id: 'company',
      label: 'Company',
      icon: Building2,
      color: 'from-purple-500 to-purple-600',
      description: 'Business information'
    },
    {
      id: 'bank',
      label: 'Bank Details',
      icon: CreditCard,
      color: 'from-orange-500 to-orange-600',
      description: 'Payment information'
    }
  ];

  return (
    <div className={DESIGN_GUIDELINES.layout.pageWrapper}>
      <div className={DESIGN_GUIDELINES.layout.container}>
        {/* Enhanced Header */}
        <div className="flex items-center justify-between mb-8 p-6 bg-white rounded-2xl shadow-sm border">
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              onClick={() => navigate('/profile')}
              className="p-3 h-auto rounded-xl hover:bg-accent"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Edit Profile
              </h1>
              <p className="text-muted-foreground mt-1 text-lg">
                Complete your profile to build trust with potential business partners
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="px-3 py-1">
              <AlertCircle className="h-3 w-3 mr-1" />
              Profile Incomplete
            </Badge>
          </div>
        </div>

        {/* Main Content with Enhanced Layout */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Enhanced Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-0 bg-gradient-to-br from-slate-50 to-blue-50">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-800">
                  Profile Sections
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="space-y-2">
                  {navigationItems.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`group relative overflow-hidden rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                        activeTab === item.id
                          ? 'bg-white shadow-md scale-105 border-l-4 border-primary'
                          : 'hover:bg-white/50 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center shadow-sm`}>
                          <item.icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`font-medium transition-colors ${
                            activeTab === item.id ? 'text-primary' : 'text-gray-700 group-hover:text-gray-900'
                          }`}>
                            {item.label}
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            {item.description}
                          </div>
                        </div>
                        {activeTab === item.id && (
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Form Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              {/* Personal Information Tab */}
              <TabsContent value="personal">
                <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-slate-50">
                  <CardHeader className="pb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <User className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-bold text-gray-800">
                          Personal Information
                        </CardTitle>
                        <p className="text-muted-foreground mt-1">
                          Your basic profile details and contact information
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <Separator className="mx-6" />
                  <CardContent className="p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <Label htmlFor="mobile" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                          <Phone className="h-4 w-4 text-blue-600" />
                          Mobile Number
                        </Label>
                        <Input
                          id="mobile"
                          type="tel"
                          value={user?.mobile || ''}
                          disabled
                          className="bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200 h-12 rounded-xl"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                          Full Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="border-gray-200 h-12 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                          <Mail className="h-4 w-4 text-blue-600" />
                          Email Address <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="border-gray-200 h-12 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="website" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                          <Globe className="h-4 w-4 text-blue-600" />
                          Website
                        </Label>
                        <Input
                          id="website"
                          type="url"
                          placeholder="https://www.example.com"
                          value={formData.website}
                          onChange={(e) => handleInputChange('website', e.target.value)}
                          className="border-gray-200 h-12 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="bio" className="text-sm font-semibold text-gray-700">
                        Bio/Description
                      </Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell us about yourself and your business..."
                        value={formData.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        rows={4}
                        className="border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Address Information Tab */}
              <TabsContent value="address">
                <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-green-50">
                  <CardHeader className="pb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <MapPin className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-bold text-gray-800">
                          Address Information
                        </CardTitle>
                        <p className="text-muted-foreground mt-1">
                          Your location and contact details
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <Separator className="mx-6" />
                  <CardContent className="p-8 space-y-8">
                    <div className="space-y-3">
                      <Label htmlFor="address" className="text-sm font-semibold text-gray-700">
                        Street Address <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="address"
                        placeholder="Enter complete address"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        rows={3}
                        className="border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <Label htmlFor="city" className="text-sm font-semibold text-gray-700">
                          City <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="city"
                          type="text"
                          placeholder="Enter city"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          className="border-gray-200 h-12 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="state" className="text-sm font-semibold text-gray-700">
                          State <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="state"
                          type="text"
                          placeholder="Enter state"
                          value={formData.state}
                          onChange={(e) => handleInputChange('state', e.target.value)}
                          className="border-gray-200 h-12 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="pincode" className="text-sm font-semibold text-gray-700">
                          PIN Code <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="pincode"
                          type="text"
                          placeholder="Enter PIN code"
                          value={formData.pincode}
                          onChange={(e) => handleInputChange('pincode', e.target.value)}
                          className="border-gray-200 h-12 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="country" className="text-sm font-semibold text-gray-700">
                          Country <span className="text-red-500">*</span>
                        </Label>
                        <Select onValueChange={(value) => handleInputChange('country', value)}>
                          <SelectTrigger className="border-gray-200 h-12 rounded-xl focus:ring-2 focus:ring-green-500">
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="India">India</SelectItem>
                            <SelectItem value="USA">USA</SelectItem>
                            <SelectItem value="UK">UK</SelectItem>
                            <SelectItem value="Canada">Canada</SelectItem>
                            <SelectItem value="Australia">Australia</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Company Information Tab */}
              <TabsContent value="company">
                <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-purple-50">
                  <CardHeader className="pb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <Building2 className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-bold text-gray-800">
                          Company Information
                        </CardTitle>
                        <p className="text-muted-foreground mt-1">
                          Business and company details
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <Separator className="mx-6" />
                  <CardContent className="p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="companyName">Company Name *</Label>
                        <Input
                          id="companyName"
                          type="text"
                          placeholder="Enter company name"
                          value={formData.companyName}
                          onChange={(e) => handleInputChange('companyName', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="companyWebsite" className="flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          Company Website
                        </Label>
                        <Input
                          id="companyWebsite"
                          type="url"
                          placeholder="https://company-website.com"
                          value={formData.companyWebsite}
                          onChange={(e) => handleInputChange('companyWebsite', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="gstin">GSTIN</Label>
                        <Input
                          id="gstin"
                          type="text"
                          placeholder="Enter GSTIN number"
                          value={formData.gstin}
                          onChange={(e) => handleInputChange('gstin', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="pan">PAN</Label>
                        <Input
                          id="pan"
                          type="text"
                          placeholder="Enter PAN number"
                          value={formData.pan}
                          onChange={(e) => handleInputChange('pan', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="industry">Industry *</Label>
                        <Select onValueChange={(value) => handleInputChange('industry', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="manufacturing">Manufacturing</SelectItem>
                            <SelectItem value="trading">Trading</SelectItem>
                            <SelectItem value="services">Services</SelectItem>
                            <SelectItem value="technology">Technology</SelectItem>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="retail">Retail</SelectItem>
                            <SelectItem value="construction">Construction</SelectItem>
                            <SelectItem value="agriculture">Agriculture</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="businessType">Business Type *</Label>
                        <Select onValueChange={(value) => handleInputChange('businessType', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select business type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="vendor">Vendor/Supplier</SelectItem>
                            <SelectItem value="buyer">Buyer</SelectItem>
                            <SelectItem value="both">Both Vendor & Buyer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Social Media Links */}
                    <div className="border-t pt-6">
                      <h4 className="font-medium text-foreground mb-4 flex items-center gap-2">
                        <Globe className="h-5 w-5" />
                        Social Media & Online Presence
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="facebook" className="flex items-center gap-2">
                            <Facebook className="h-4 w-4" />
                            Facebook
                          </Label>
                          <Input
                            id="facebook"
                            type="url"
                            placeholder="https://facebook.com/yourcompany"
                            value={formData.facebook}
                            onChange={(e) => handleInputChange('facebook', e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="instagram" className="flex items-center gap-2">
                            <Instagram className="h-4 w-4" />
                            Instagram
                          </Label>
                          <Input
                            id="instagram"
                            type="url"
                            placeholder="https://instagram.com/yourcompany"
                            value={formData.instagram}
                            onChange={(e) => handleInputChange('instagram', e.target.value)}
                          />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="google" className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            Google Business
                          </Label>
                          <Input
                            id="google"
                            type="url"
                            placeholder="https://business.google.com/yourcompany"
                            value={formData.google}
                            onChange={(e) => handleInputChange('google', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Bank Account Details Tab */}
              <TabsContent value="bank">
                <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-orange-50">
                  <CardHeader className="pb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <CreditCard className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-bold text-gray-800">
                          Bank Account Details
                        </CardTitle>
                        <p className="text-muted-foreground mt-1">
                          Payment and banking information
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <Separator className="mx-6" />
                  <CardContent className="p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="accountHolderName">Account Holder Name *</Label>
                        <Input
                          id="accountHolderName"
                          type="text"
                          placeholder="Enter account holder name"
                          value={formData.accountHolderName}
                          onChange={(e) => handleInputChange('accountHolderName', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bankName">Bank Name *</Label>
                        <Input
                          id="bankName"
                          type="text"
                          placeholder="Enter bank name"
                          value={formData.bankName}
                          onChange={(e) => handleInputChange('bankName', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="accountNumber">Account Number *</Label>
                        <Input
                          id="accountNumber"
                          type="text"
                          placeholder="Enter account number"
                          value={formData.accountNumber}
                          onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="ifscCode">IFSC Code *</Label>
                        <Input
                          id="ifscCode"
                          type="text"
                          placeholder="Enter IFSC code"
                          value={formData.ifscCode}
                          onChange={(e) => handleInputChange('ifscCode', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="accountType">Account Type</Label>
                        <Select onValueChange={(value) => handleInputChange('accountType', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select account type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="savings">Savings Account</SelectItem>
                            <SelectItem value="current">Current Account</SelectItem>
                            <SelectItem value="business">Business Account</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="branch">Branch</Label>
                        <Input
                          id="branch"
                          type="text"
                          placeholder="Enter branch location"
                          value={formData.branch}
                          onChange={(e) => handleInputChange('branch', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="upiId">UPI ID (Optional)</Label>
                      <Input
                        id="upiId"
                        type="text"
                        placeholder="yourname@upi"
                        value={formData.upiId}
                        onChange={(e) => handleInputChange('upiId', e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Enhanced Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <Button
                variant="outline"
                onClick={() => navigate('/profile')}
                className="flex-1 h-12 rounded-xl border-2 hover:bg-gray-50 transition-all duration-200"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={isLoading}
                className="flex-1 h-12 rounded-xl gradient-primary border-0 hover:opacity-90 transition-all duration-200 shadow-lg"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </div>
                ) : (
                  <>
                    <Save className="mr-2 h-5 w-5" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
