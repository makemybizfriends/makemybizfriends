
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  AlertTriangle, 
  Shield, 
  CreditCard, 
  UserX, 
  Smartphone, 
  Users 
} from 'lucide-react';
import { DESIGN_GUIDELINES, getBrandText } from '@/styles/designGuidelines';

interface SafetyTipsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const safetyTips = [
  {
    icon: Shield,
    title: "Don't enter UPI PIN/OTP, scan unknown QR codes, or click unsafe links.",
    iconColor: "text-blue-600"
  },
  {
    icon: CreditCard,
    title: "Never give money or product in advance",
    iconColor: "text-green-600"
  },
  {
    icon: UserX,
    title: getBrandText('report-suspicious'),
    iconColor: "text-red-600"
  },
  {
    icon: Smartphone,
    title: "Don't share personal details like photos or IDs.",
    iconColor: "text-purple-600"
  },
  {
    icon: Users,
    title: "Be cautious during buyer-seller meetings.",
    iconColor: "text-orange-600"
  }
];

export function SafetyTipsModal({ isOpen, onClose }: SafetyTipsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader className={DESIGN_GUIDELINES.modal.header}>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </div>
          
          <DialogTitle className={`${DESIGN_GUIDELINES.modal.title} text-center`}>
            {getBrandText('safety-title')}
          </DialogTitle>
          
          <DialogDescription className={`${DESIGN_GUIDELINES.modal.description} text-center`}>
            Follow these guidelines to ensure safe transactions
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {safetyTips.map((tip, index) => (
            <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
              <div className={`flex-shrink-0 ${tip.iconColor}`}>
                <tip.icon className="h-5 w-5" />
              </div>
              <p className="text-sm text-foreground leading-relaxed">
                {tip.title}
              </p>
            </div>
          ))}
        </div>

        <Separator />

        <div className="flex justify-center pt-2">
          <Button 
            onClick={onClose}
            className="w-full gradient-primary text-white hover:opacity-90"
          >
            {getBrandText('continue-chat')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
