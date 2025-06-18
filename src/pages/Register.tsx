
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="space-y-8 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start space-x-3">
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center">
              <Building2 className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Make Biz Friends</h1>
              <p className="text-muted-foreground">Professional B2B Marketplace</p>
            </div>
          </div>
          
          <h2 className="text-4xl font-bold text-foreground">
            Join India's Premier B2B Network
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-primary">10K+</div>
              <div className="text-sm text-muted-foreground">Verified Vendors</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-primary">50K+</div>
              <div className="text-sm text-muted-foreground">Products Listed</div>
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <Card className="shadow-2xl">
          <div className="gradient-secondary p-8 rounded-t-lg">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white text-center mb-2">Create Your Account</h3>
            <p className="text-white/80 text-center">Join thousands of successful businesses</p>
          </div>
          <CardContent className="p-8">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Business Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 border border-input rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter your business name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Contact Person</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 border border-input rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter contact person name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 border border-input rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter business email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input 
                  type="password" 
                  className="w-full px-4 py-3 border border-input rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Create a secure password"
                />
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-muted-foreground">
                  I agree to Make Biz Friends{' '}
                  <Link to="/terms-of-service" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy-policy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </span>
              </div>
              <Button className="w-full gradient-primary text-white border-0 hover:opacity-90 py-3">
                Create Account
              </Button>
              <div className="text-center">
                <span className="text-muted-foreground">Already have an account? </span>
                <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
