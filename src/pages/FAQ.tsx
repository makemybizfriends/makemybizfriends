
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { HelpCircle, Mail, Phone } from 'lucide-react';

export default function FAQ() {
  const faqs = [
    {
      question: "How do I become a verified vendor on Make Biz Friends?",
      answer: "To become a verified vendor, you need to complete our registration process, provide business documentation, and pass our verification checks. This includes business license verification, quality assessments, and compliance with our marketplace standards."
    },
    {
      question: "What are the fees for selling on the platform?",
      answer: "We offer competitive pricing with no listing fees. Our commission structure is transparent: 3% for verified vendors and 2% for premium members. Payment processing fees apply separately at standard rates."
    },
    {
      question: "How does the payment system work?",
      answer: "We use secure escrow services for all transactions. Buyers pay upfront, funds are held securely, and released to vendors upon successful delivery confirmation. We support multiple payment methods including bank transfers, credit cards, and digital wallets."
    },
    {
      question: "What support do you provide for international transactions?",
      answer: "We support international B2B transactions with multi-currency capabilities, international shipping coordination, customs documentation assistance, and dispute resolution services. Our platform operates in 100+ countries."
    },
    {
      question: "How do you ensure product quality and vendor reliability?",
      answer: "We have a comprehensive verification system including business documentation checks, quality assessments, customer reviews, and ongoing performance monitoring. All vendors must maintain high standards to remain on our platform."
    },
    {
      question: "What is your return and refund policy?",
      answer: "Returns and refunds are handled on a case-by-case basis in coordination with individual vendors. We facilitate dispute resolution and ensure fair outcomes for both buyers and sellers according to our marketplace policies."
    },
    {
      question: "How can I track my orders?",
      answer: "Once an order is placed, you'll receive tracking information and regular updates. Our platform provides real-time order status, shipping updates, and direct communication channels with vendors for any inquiries."
    },
    {
      question: "Do you offer bulk pricing for large orders?",
      answer: "Yes, many of our vendors offer volume discounts for bulk orders. You can request custom quotes directly through our platform, and vendors will provide competitive pricing based on your specific requirements."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center">
              <HelpCircle className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our B2B marketplace platform
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* FAQ Accordion */}
          <Card className="mb-12 shadow-lg">
            <CardContent className="p-8">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-b border-border">
                    <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Contact Support */}
          <Card className="gradient-secondary text-white shadow-2xl">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
              <p className="text-white/80 mb-6">
                Our support team is here to help you with any questions or concerns
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  <Mail className="mr-2 h-4 w-4" />
                  Email Support
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Us
                </Button>
              </div>
              <div className="mt-6 text-sm text-white/60">
                <p>Email: support@makebizfriends.com | Phone: +1 (555) 123-4567</p>
                <p>Support Hours: Monday - Friday, 9 AM - 6 PM EST</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
