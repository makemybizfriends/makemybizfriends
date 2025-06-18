
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DESIGN_GUIDELINES } from '@/styles/designGuidelines';
import { BasicDetailsStep } from '@/components/post-requirement/BasicDetailsStep';
import { RequirementDetailsStep } from '@/components/post-requirement/RequirementDetailsStep';
import { ContactPreferencesStep } from '@/components/post-requirement/ContactPreferencesStep';
import { ReviewStep } from '@/components/post-requirement/ReviewStep';

export interface RequirementFormData {
  // Basic Details
  title: string;
  category: string;
  subCategory: string;
  description: string;
  
  // Requirement Details
  quantity: string;
  budget: string;
  timeline: string;
  location: string;
  specifications: string;
  
  // Contact Preferences
  contactMethod: string;
  urgency: string;
  additionalNotes: string;
}

const initialFormData: RequirementFormData = {
  title: '',
  category: '',
  subCategory: '',
  description: '',
  quantity: '',
  budget: '',
  timeline: '',
  location: '',
  specifications: '',
  contactMethod: '',
  urgency: '',
  additionalNotes: ''
};

const steps = [
  { id: 1, title: 'Basic Details', description: 'What are you looking for?' },
  { id: 2, title: 'Requirement Details', description: 'Specify your needs' },
  { id: 3, title: 'Contact Preferences', description: 'How to reach you' },
  { id: 4, title: 'Review & Submit', description: 'Confirm your requirement' }
];

export default function PostRequirement() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RequirementFormData>(initialFormData);

  const updateFormData = (data: Partial<RequirementFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Submitting requirement:', formData);
    // Handle form submission here
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <BasicDetailsStep formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <RequirementDetailsStep formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <ContactPreferencesStep formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <ReviewStep formData={formData} onSubmit={handleSubmit} />;
      default:
        return null;
    }
  };

  const progress = (currentStep / steps.length) * 100;

  return (
    <div className={DESIGN_GUIDELINES.layout.pageWrapper}>
      <div className={DESIGN_GUIDELINES.layout.container}>
        <div className={DESIGN_GUIDELINES.layout.pageHeader.wrapper}>
          <h1 className={DESIGN_GUIDELINES.layout.pageHeader.title}>
            Post Your Requirement
          </h1>
          <p className={DESIGN_GUIDELINES.layout.pageHeader.subtitle}>
            Tell us what you're looking for and get quotes from verified suppliers
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Progress Header */}
          <Card className={`${DESIGN_GUIDELINES.layout.card.primary} mb-6`}>
            <CardHeader className={DESIGN_GUIDELINES.layout.card.header}>
              <div className="flex items-center justify-between mb-4">
                <CardTitle className="text-lg font-semibold">
                  Step {currentStep} of {steps.length}
                </CardTitle>
                <span className="text-sm text-muted-foreground">
                  {Math.round(progress)}% Complete
                </span>
              </div>
              <Progress value={progress} className="mb-4" />
              
              {/* Step Indicators */}
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className={`
                      flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium
                      ${currentStep >= step.id 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                      }
                    `}>
                      {step.id}
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`
                        h-0.5 w-16 mx-2
                        ${currentStep > step.id ? 'bg-primary' : 'bg-muted'}
                      `} />
                    )}
                  </div>
                ))}
              </div>
            </CardHeader>
          </Card>

          {/* Step Content */}
          <Card className={DESIGN_GUIDELINES.layout.card.primary}>
            <CardHeader className={DESIGN_GUIDELINES.layout.card.header}>
              <CardTitle className={DESIGN_GUIDELINES.components.typography.heading2}>
                {steps[currentStep - 1].title}
              </CardTitle>
              <p className={DESIGN_GUIDELINES.components.typography.caption}>
                {steps[currentStep - 1].description}
              </p>
            </CardHeader>
            <CardContent className={DESIGN_GUIDELINES.layout.card.content}>
              {renderStepContent()}
              
              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                
                {currentStep < steps.length ? (
                  <Button
                    onClick={nextStep}
                    className="gradient-primary text-white hover:opacity-90 flex items-center gap-2"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="gradient-primary text-white hover:opacity-90"
                  >
                    Submit Requirement
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
