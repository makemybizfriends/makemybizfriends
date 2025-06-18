
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Building2 } from "lucide-react";
import { MobileAuthModal } from "@/components/auth/MobileAuthModal";

export default function Login() {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const handleAuthClick = () => {
    setAuthModalOpen(true);
  };

  return (
    <>
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
              Connect, Trade, and Grow Your Business
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4">
                <div className="text-2xl font-bold text-primary">5K+</div>
                <div className="text-sm text-muted-foreground">Active Vendors</div>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Products</div>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Options */}
          <Card className="shadow-2xl">
            <div className="gradient-secondary p-8 rounded-t-lg">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white text-center mb-2">Welcome!</h3>
              <p className="text-white/80 text-center">Quick and secure mobile authentication</p>
            </div>
            <CardContent className="p-8">
              <div className="space-y-4">
                <Button 
                  onClick={handleAuthClick}
                  className="w-full gradient-primary text-white border-0 hover:opacity-90 py-3"
                >
                  Sign In with Mobile
                </Button>
                <div className="text-center text-sm text-muted-foreground">
                  Secure OTP-based authentication
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Auth Modal */}
      <MobileAuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode="login"
      />
    </>
  );
}
