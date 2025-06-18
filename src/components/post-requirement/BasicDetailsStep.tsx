
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DESIGN_GUIDELINES } from '@/styles/designGuidelines';
import { RequirementFormData } from '@/pages/PostRequirement';

interface BasicDetailsStepProps {
  formData: RequirementFormData;
  updateFormData: (data: Partial<RequirementFormData>) => void;
}

const categories = [
  'Electronics & Electrical',
  'Machinery & Equipment',
  'Building & Construction',
  'Textiles & Apparel',
  'Food & Beverages',
  'Chemicals & Pharmaceuticals',
  'Automotive & Transportation',
  'Office Supplies',
  'Raw Materials',
  'Other'
];

export function BasicDetailsStep({ formData, updateFormData }: BasicDetailsStepProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="md:col-span-2 space-y-3">
          <Label htmlFor="title" className="text-base font-semibold text-foreground block">
            Requirement Title *
          </Label>
          <Input
            id="title"
            placeholder="e.g., Need 500 units of LED Bulbs"
            value={formData.title}
            onChange={(e) => updateFormData({ title: e.target.value })}
            className="h-12 px-4 text-base border-2 rounded-xl focus:border-primary transition-colors"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="category" className="text-base font-semibold text-foreground block">
            Category *
          </Label>
          <Select value={formData.category} onValueChange={(value) => updateFormData({ category: value })}>
            <SelectTrigger className="h-12 px-4 text-base border-2 rounded-xl focus:border-primary">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category} className="py-3">
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label htmlFor="subCategory" className="text-base font-semibold text-foreground block">
            Sub Category
          </Label>
          <Input
            id="subCategory"
            placeholder="e.g., LED Lighting"
            value={formData.subCategory}
            onChange={(e) => updateFormData({ subCategory: e.target.value })}
            className="h-12 px-4 text-base border-2 rounded-xl focus:border-primary transition-colors"
          />
        </div>

        <div className="md:col-span-2 space-y-3">
          <Label htmlFor="description" className="text-base font-semibold text-foreground block">
            Detailed Description *
          </Label>
          <Textarea
            id="description"
            placeholder="Describe your requirement in detail. Include specific features, quality standards, or any other important information..."
            value={formData.description}
            onChange={(e) => updateFormData({ description: e.target.value })}
            className="min-h-[140px] px-4 py-3 text-base border-2 rounded-xl focus:border-primary transition-colors resize-none"
            rows={6}
          />
        </div>
      </div>
    </div>
  );
}
