
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DESIGN_GUIDELINES } from '@/styles/designGuidelines';
import { RequirementFormData } from '@/pages/PostRequirement';

interface RequirementDetailsStepProps {
  formData: RequirementFormData;
  updateFormData: (data: Partial<RequirementFormData>) => void;
}

const timelineOptions = [
  'Immediate (Within 1 week)',
  'Within 2 weeks',
  'Within 1 month',
  'Within 3 months',
  'Within 6 months',
  'Flexible timeline'
];

export function RequirementDetailsStep({ formData, updateFormData }: RequirementDetailsStepProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <Label htmlFor="quantity" className="text-base font-semibold text-foreground block">
            Quantity Required *
          </Label>
          <Input
            id="quantity"
            placeholder="e.g., 500 pieces, 10 tons, 1 unit"
            value={formData.quantity}
            onChange={(e) => updateFormData({ quantity: e.target.value })}
            className="h-12 px-4 text-base border-2 rounded-xl focus:border-primary transition-colors"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="budget" className="text-base font-semibold text-foreground block">
            Budget Range
          </Label>
          <Input
            id="budget"
            placeholder="e.g., ₹50,000 - ₹1,00,000"
            value={formData.budget}
            onChange={(e) => updateFormData({ budget: e.target.value })}
            className="h-12 px-4 text-base border-2 rounded-xl focus:border-primary transition-colors"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="timeline" className="text-base font-semibold text-foreground block">
            Timeline *
          </Label>
          <Select value={formData.timeline} onValueChange={(value) => updateFormData({ timeline: value })}>
            <SelectTrigger className="h-12 px-4 text-base border-2 rounded-xl focus:border-primary">
              <SelectValue placeholder="Select timeline" />
            </SelectTrigger>
            <SelectContent>
              {timelineOptions.map((option) => (
                <SelectItem key={option} value={option} className="py-3">
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label htmlFor="location" className="text-base font-semibold text-foreground block">
            Delivery Location *
          </Label>
          <Input
            id="location"
            placeholder="e.g., Mumbai, Maharashtra"
            value={formData.location}
            onChange={(e) => updateFormData({ location: e.target.value })}
            className="h-12 px-4 text-base border-2 rounded-xl focus:border-primary transition-colors"
          />
        </div>

        <div className="md:col-span-2 space-y-3">
          <Label htmlFor="specifications" className="text-base font-semibold text-foreground block">
            Technical Specifications
          </Label>
          <Textarea
            id="specifications"
            placeholder="Include technical details, certifications required, quality standards, brand preferences, etc."
            value={formData.specifications}
            onChange={(e) => updateFormData({ specifications: e.target.value })}
            className="min-h-[120px] px-4 py-3 text-base border-2 rounded-xl focus:border-primary transition-colors resize-none"
            rows={5}
          />
        </div>
      </div>
    </div>
  );
}
