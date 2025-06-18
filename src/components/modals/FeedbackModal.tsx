
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  requirementTitle: string;
  supplierName: string;
  postedDate: string;
}

export function FeedbackModal({ 
  isOpen, 
  onClose, 
  userName, 
  requirementTitle, 
  supplierName, 
  postedDate 
}: FeedbackModalProps) {
  const [selectedFeedback, setSelectedFeedback] = useState<'yes' | 'no' | null>(null);

  const handleFeedbackSubmit = () => {
    console.log('Feedback submitted:', selectedFeedback);
    // Handle feedback submission here
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-md p-0 rounded-lg border shadow-lg">
        <div className="relative p-6">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Dear {userName},
            </h2>
            
            <h3 className="text-xl font-semibold text-foreground">
              Is Your requirement completed?
            </h3>
            
            <div className="py-4">
              <p className="text-lg font-medium text-foreground mb-2">
                Enquiry to {supplierName}
              </p>
              <p className="text-lg font-medium text-foreground mb-2">
                for {requirementTitle}
              </p>
              <p className="text-sm text-muted-foreground">
                Requirement posted : {postedDate}
              </p>
            </div>
            
            <hr className="border-gray-200 my-6" />
            
            <div className="flex space-x-4 justify-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setSelectedFeedback('no')}
                className={`px-12 py-3 rounded-lg text-lg font-medium transition-all ${
                  selectedFeedback === 'no' 
                    ? 'bg-red-50 border-red-300 text-red-600' 
                    : 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100'
                }`}
              >
                No
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => setSelectedFeedback('yes')}
                className={`px-12 py-3 rounded-lg text-lg font-medium transition-all ${
                  selectedFeedback === 'yes' 
                    ? 'bg-teal-50 border-teal-300 text-teal-600' 
                    : 'bg-teal-50 border-teal-200 text-teal-600 hover:bg-teal-100'
                }`}
              >
                Yes
              </Button>
            </div>
            
            {selectedFeedback && (
              <div className="mt-6">
                <Button
                  onClick={handleFeedbackSubmit}
                  className="gradient-primary text-white hover:opacity-90 px-8 py-2"
                >
                  Submit Feedback
                </Button>
              </div>
            )}
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
