
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { DESIGN_GUIDELINES } from '@/styles/designGuidelines';
import { RequirementFormData } from '@/pages/PostRequirement';

interface ContactPreferencesStepProps {
  formData: RequirementFormData;
  updateFormData: (data: Partial<RequirementFormData>) => void;
}

const contactMethods = [
  { value: 'phone', label: 'Phone Call', description: 'Preferred for urgent requirements' },
  { value: 'email', label: 'Email', description: 'Detailed proposals and documentation' },
  { value: 'whatsapp', label: 'WhatsApp', description: 'Quick communication and updates' },
  { value: 'both', label: 'Phone & Email', description: 'Maximum flexibility' }
];

const urgencyLevels = [
  { value: 'urgent', label: 'Urgent', description: 'Need quotes within 24 hours' },
  { value: 'normal', label: 'Normal', description: 'Within 2-3 days is fine' },
  { value: 'flexible', label: 'Flexible', description: 'Take your time' }
];

export function ContactPreferencesStep({ formData, updateFormData }: ContactPreferencesStepProps) {
  return (
    <div className="space-y-10">
      <div className="space-y-6">
        <Label className="text-lg font-semibold text-foreground block">
          Preferred Contact Method *
        </Label>
        <RadioGroup 
          value={formData.contactMethod} 
          onValueChange={(value) => updateFormData({ contactMethod: value })}
          className="space-y-4"
        >
          {contactMethods.map((method) => (
            <div key={method.value} className="flex items-start space-x-4 p-4 rounded-xl border-2 hover:bg-accent/30 hover:border-primary/30 transition-all cursor-pointer">
              <RadioGroupItem value={method.value} id={method.value} className="mt-1.5 h-5 w-5" />
              <div className="flex-1 space-y-1">
                <Label htmlFor={method.value} className="text-base font-semibold cursor-pointer text-foreground">
                  {method.label}
                </Label>
                <p className="text-sm text-muted-foreground leading-relaxed">{method.description}</p>
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-6">
        <Label className="text-lg font-semibold text-foreground block">
          Urgency Level *
        </Label>
        <RadioGroup 
          value={formData.urgency} 
          onValueChange={(value) => updateFormData({ urgency: value })}
          className="space-y-4"
        >
          {urgencyLevels.map((level) => (
            <div key={level.value} className="flex items-start space-x-4 p-4 rounded-xl border-2 hover:bg-accent/30 hover:border-primary/30 transition-all cursor-pointer">
              <RadioGroupItem value={level.value} id={level.value} className="mt-1.5 h-5 w-5" />
              <div className="flex-1 space-y-1">
                <Label htmlFor={level.value} className="text-base font-semibold cursor-pointer text-foreground">
                  {level.label}
                </Label>
                <p className="text-sm text-muted-foreground leading-relaxed">{level.description}</p>
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label htmlFor="additionalNotes" className="text-base font-semibold text-foreground block">
          Additional Notes
        </Label>
        <Textarea
          id="additionalNotes"
          placeholder="Any additional information or special instructions for suppliers..."
          value={formData.additionalNotes}
          onChange={(e) => updateFormData({ additionalNotes: e.target.value })}
          className="min-h-[120px] px-4 py-3 text-base border-2 rounded-xl focus:border-primary transition-colors resize-none"
          rows={5}
        />
      </div>
    </div>
  );
}
