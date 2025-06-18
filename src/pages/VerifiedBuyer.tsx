
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckCircle, Shield, Star, Clock, Phone, Building2, Mail, FileText, Award, Users, TrendingUp } from 'lucide-react';
import { DESIGN_GUIDELINES } from '@/styles/designGuidelines';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

interface VerificationFormData {
  fullName: string;
  companyName: string;
  email: string;
  mobileNumber: string;
  gstNumber: string;
  consent: boolean;
}

const benefits = [
  {
    icon: Shield,
    title: 'Enhanced Trust',
    description: 'Verified badge increases supplier confidence and response rates by 75%',
    color: 'text-green-600'
  },
  {
    icon: Star,
    title: 'Priority Access',
    description: 'Get priority access to premium suppliers and exclusive deals',
    color: 'text-yellow-600'
  },
  {
    icon: Clock,
    title: 'Faster Responses',
    description: 'Verified buyers receive responses 3x faster than unverified users',
    color: 'text-blue-600'
  },
  {
    icon: Award,
    title: 'Better Pricing',
    description: 'Access to better pricing and negotiation opportunities',
    color: 'text-purple-600'
  }
];

const stats = [
  { icon: Users, number: '10,000+', label: 'Verified Buyers', color: 'text-blue-600' },
  { icon: Clock, number: '24-48hrs', label: 'Verification Time', color: 'text-green-600' },
  { icon: TrendingUp, number: '75%', label: 'Better Response Rate', color: 'text-purple-600' }
];

export default function VerifiedBuyer() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<VerificationFormData>({
    fullName: '',
    companyName: '',
    email: '',
    mobileNumber: '',
    gstNumber: '',
    consent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof VerificationFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Verification form submitted:', formData);
      
      toast({
        title: "Verification Request Submitted",
        description: "We'll review your details and get back to you within 24-48 hours.",
      });

      // Reset form
      setFormData({
        fullName: '',
        companyName: '',
        email: '',
        mobileNumber: '',
        gstNumber: '',
        consent: false
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit verification request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.fullName && formData.companyName && formData.email && 
                     formData.mobileNumber && formData.gstNumber && formData.consent;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-2xl">
                <Shield className="h-12 w-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 animate-pulse">
                <CheckCircle className="h-10 w-10 text-green-500 bg-white rounded-full shadow-lg" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Become a Verified Buyer
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join thousands of verified buyers who enjoy premium benefits, better pricing, 
            and faster supplier responses on <span className="font-semibold text-primary">Make Biz Friends</span>
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center border-0 shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardContent className="pt-8 pb-6">
                <div className="flex justify-center mb-4">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Benefits Section */}
          <div className="space-y-8">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                  Why Get Verified?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-white/60 hover:bg-white/80 transition-all duration-300">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <benefit.icon className={`h-6 w-6 ${benefit.color}`} />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2 text-gray-900">{benefit.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Process Steps */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-purple-50/50">
              <CardHeader>
                <CardTitle className="text-xl">Verification Process</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { step: 1, text: 'Submit your verification details', active: true },
                    { step: 2, text: 'Document verification (24-48 hours)', active: false },
                    { step: 3, text: 'Get your verified badge and benefits', active: false }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        item.active 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {item.step}
                      </div>
                      <span className="text-gray-700">{item.text}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Verification Form */}
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-indigo-50/50 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                  <FileText className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                Start Your Verification
              </CardTitle>
              <p className="text-gray-600">
                Fill in your details to begin the verification process
              </p>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div className="space-y-3">
                  <Label htmlFor="fullName" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <div className="h-5 w-5 rounded bg-blue-100 flex items-center justify-center">
                      <Phone className="h-3 w-3 text-blue-600" />
                    </div>
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Enter your full name"
                    className="h-12 border-2 focus:border-primary/50 bg-white/80"
                    required
                  />
                </div>

                {/* Company Name */}
                <div className="space-y-3">
                  <Label htmlFor="companyName" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <div className="h-5 w-5 rounded bg-purple-100 flex items-center justify-center">
                      <Building2 className="h-3 w-3 text-purple-600" />
                    </div>
                    Company Name *
                  </Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    placeholder="Enter your company name"
                    className="h-12 border-2 focus:border-primary/50 bg-white/80"
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <div className="h-5 w-5 rounded bg-green-100 flex items-center justify-center">
                      <Mail className="h-3 w-3 text-green-600" />
                    </div>
                    Email ID *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email address"
                    className="h-12 border-2 focus:border-primary/50 bg-white/80"
                    required
                  />
                </div>

                {/* Mobile Number */}
                <div className="space-y-3">
                  <Label htmlFor="mobileNumber" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <div className="h-5 w-5 rounded bg-yellow-100 flex items-center justify-center">
                      <Phone className="h-3 w-3 text-yellow-600" />
                    </div>
                    Mobile Number *
                  </Label>
                  <Input
                    id="mobileNumber"
                    type="tel"
                    value={formData.mobileNumber}
                    onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                    placeholder="Enter your mobile number"
                    className="h-12 border-2 focus:border-primary/50 bg-white/80"
                    required
                  />
                </div>

                {/* GST Number */}
                <div className="space-y-3">
                  <Label htmlFor="gstNumber" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <div className="h-5 w-5 rounded bg-pink-100 flex items-center justify-center">
                      <FileText className="h-3 w-3 text-pink-600" />
                    </div>
                    GST Number *
                  </Label>
                  <Input
                    id="gstNumber"
                    value={formData.gstNumber}
                    onChange={(e) => handleInputChange('gstNumber', e.target.value)}
                    placeholder="Enter your GST number"
                    className="h-12 border-2 focus:border-primary/50 bg-white/80"
                    required
                  />
                </div>

                {/* Consent Checkbox */}
                <div className="space-y-4 pt-4">
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50/50">
                    <Checkbox
                      id="consent"
                      checked={formData.consent}
                      onCheckedChange={(checked) => handleInputChange('consent', checked === true)}
                      className="mt-1"
                    />
                    <Label htmlFor="consent" className="text-sm leading-relaxed cursor-pointer text-gray-700">
                      I agree to the{' '}
                      <Link to="/terms-of-service" className="text-primary font-semibold underline hover:text-primary/80">
                        Terms and Conditions
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy-policy" className="text-primary font-semibold underline hover:text-primary/80">
                        Privacy Policy
                      </Link>.
                      I consent to Make Biz Friends verifying my information and using it for verification purposes.
                    </Label>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-6">
                  <div className="flex items-start gap-3 text-sm text-gray-600 p-4 rounded-xl bg-green-50/50">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>
                      All information will be verified and kept confidential. 
                      Our team will review your submission within 24-48 hours.
                    </span>
                  </div>

                  <Button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </div>
                    ) : (
                      'Submit for Verification'
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
