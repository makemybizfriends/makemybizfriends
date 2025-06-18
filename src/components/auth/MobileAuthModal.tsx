
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Shield, Phone, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface MobileAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

export function MobileAuthModal({ isOpen, onClose, initialMode = 'login' }: MobileAuthModalProps) {
  const [authMode, setAuthMode] = useState<'login' | 'register'>(initialMode);
  const [step, setStep] = useState<'mobile' | 'otp'>('mobile');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { login } = useAuth();

  const mockOTP = '123456';

  const handleSendOTP = async () => {
    if (!mobile || mobile.length < 10) {
      toast({
        title: "Invalid mobile number",
        description: "Please enter a valid 10-digit mobile number",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
      toast({
        title: "OTP Sent",
        description: `Verification code sent to ${mobile}. Use 123456 for demo.`,
      });
    }, 1000);
  };

  const handleVerifyOTP = async () => {
    if (otp !== mockOTP) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the correct verification code (123456)",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      const action = authMode === 'register' ? 'Account created' : 'Logged in';
      
      // Login the user
      login(mobile);
      
      toast({
        title: "Success!",
        description: `${action} successfully`,
      });
      onClose();
      // Reset form
      setMobile('');
      setOtp('');
      setStep('mobile');
    }, 1000);
  };

  const resetToMobile = () => {
    setStep('mobile');
    setOtp('');
  };

  const toggleAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'register' : 'login');
    setStep('mobile');
    setOtp('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center">
              {step === 'otp' ? (
                <Shield className="h-6 w-6 text-white" />
              ) : (
                <Phone className="h-6 w-6 text-white" />
              )}
            </div>
          </div>
          <DialogTitle className="text-center text-2xl font-bold">
            {step === 'otp' 
              ? 'Verify OTP' 
              : authMode === 'register' 
                ? 'Create Account' 
                : 'Welcome Back'
            }
          </DialogTitle>
          <DialogDescription className="text-center">
            {step === 'otp' 
              ? `Enter the verification code sent to ${mobile}`
              : authMode === 'register'
                ? 'Enter your mobile number to create account'
                : 'Enter your mobile number to continue'
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {step === 'otp' ? (
            // OTP Verification
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetToMobile}
                  className="p-0 h-auto"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Change number
                </Button>
              </div>
              
              <div className="space-y-2">
                <Label className="text-center block">Enter 6-digit code</Label>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={setOtp}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                Demo OTP: <span className="font-semibold text-primary">123456</span>
              </div>

              <Button
                onClick={handleVerifyOTP}
                disabled={otp.length !== 6 || isLoading}
                className="w-full gradient-primary text-white border-0 hover:opacity-90"
              >
                {isLoading ? 'Verifying...' : 'Verify & Continue'}
              </Button>
            </div>
          ) : (
            // Mobile Number Entry
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="Enter 10-digit mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                />
              </div>

              <Button
                onClick={handleSendOTP}
                disabled={!mobile || mobile.length < 10 || isLoading}
                className="w-full gradient-primary text-white border-0 hover:opacity-90"
              >
                {isLoading ? 'Sending...' : 'Send OTP'}
              </Button>

              {/* Toggle between login and register */}
              <div className="text-center text-sm">
                <span className="text-muted-foreground">
                  {authMode === 'register' 
                    ? 'Already have an account? ' 
                    : "Don't have an account? "
                  }
                </span>
                <button
                  onClick={toggleAuthMode}
                  className="text-primary font-medium hover:underline"
                >
                  {authMode === 'register' ? 'Sign In' : 'Register'}
                </button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
