
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Edit3 } from 'lucide-react';
import { DESIGN_GUIDELINES } from '@/styles/designGuidelines';
import { RequirementFormData } from '@/pages/PostRequirement';

interface ReviewStepProps {
  formData: RequirementFormData;
  onSubmit: () => void;
}

export function ReviewStep({ formData, onSubmit }: ReviewStepProps) {
  const sections = [
    {
      title: 'Basic Details',
      items: [
        { label: 'Title', value: formData.title },
        { label: 'Category', value: formData.category },
        { label: 'Sub Category', value: formData.subCategory || 'Not specified' },
        { label: 'Description', value: formData.description }
      ]
    },
    {
      title: 'Requirement Details',
      items: [
        { label: 'Quantity', value: formData.quantity },
        { label: 'Budget', value: formData.budget || 'Not specified' },
        { label: 'Timeline', value: formData.timeline },
        { label: 'Location', value: formData.location },
        { label: 'Specifications', value: formData.specifications || 'Not specified' }
      ]
    },
    {
      title: 'Contact Preferences',
      items: [
        { label: 'Contact Method', value: formData.contactMethod },
        { label: 'Urgency', value: formData.urgency },
        { label: 'Additional Notes', value: formData.additionalNotes || 'None' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
        <CheckCircle className="h-6 w-6 text-green-600" />
        <div>
          <h3 className="font-semibold text-green-800">Ready to Submit</h3>
          <p className="text-sm text-green-700">
            Please review your requirement details before submitting
          </p>
        </div>
      </div>

      {sections.map((section, sectionIndex) => (
        <Card key={sectionIndex} className="border-l-4 border-l-primary">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{section.title}</CardTitle>
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                <Edit3 className="h-4 w-4 mr-1" />
                Edit
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {section.items.map((item, itemIndex) => (
              <div key={itemIndex}>
                <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                  <div className="min-w-[120px]">
                    <Badge variant="outline" className="text-xs">
                      {item.label}
                    </Badge>
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm ${
                      item.value === 'Not specified' || item.value === 'None' 
                        ? 'text-muted-foreground italic' 
                        : 'text-foreground'
                    }`}>
                      {item.value}
                    </p>
                  </div>
                </div>
                {itemIndex < section.items.length - 1 && <Separator className="mt-3" />}
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <h3 className="font-semibold text-blue-800 mb-2">What happens next?</h3>
          <ul className="space-y-2 text-sm text-blue-700">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
              Your requirement will be visible to verified suppliers
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
              You'll receive quotes within your specified timeline
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
              Compare quotes and connect with the best suppliers
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button
          onClick={onSubmit}
          className="gradient-primary text-white hover:opacity-90 px-8 py-3 text-lg"
          size="lg"
        >
          Submit Requirement
        </Button>
      </div>
    </div>
  );
}
