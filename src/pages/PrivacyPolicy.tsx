
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { DESIGN_GUIDELINES } from '@/styles/designGuidelines';

export default function PrivacyPolicy() {
  return (
    <div className={DESIGN_GUIDELINES.layout.pageWrapper}>
      <div className={DESIGN_GUIDELINES.layout.container}>
        <div className={DESIGN_GUIDELINES.layout.pageHeader.wrapper}>
          <h1 className={DESIGN_GUIDELINES.layout.pageHeader.title}>Privacy Policy</h1>
          <p className={DESIGN_GUIDELINES.layout.pageHeader.subtitle}>
            Last updated: December 2024
          </p>
        </div>

        <Card className={DESIGN_GUIDELINES.layout.card.primary}>
          <CardContent className="p-8 space-y-8">
            <section>
              <h2 className={DESIGN_GUIDELINES.components.typography.heading2}>1. Information We Collect</h2>
              <p className="mt-4 text-muted-foreground">
                We collect information you provide directly to us, such as when you create an account, submit verification documents, or contact us for support.
              </p>
              <ul className="mt-4 list-disc list-inside space-y-2 text-muted-foreground">
                <li>Personal information (name, email address, phone number)</li>
                <li>Business information (company name, GST number, business address)</li>
                <li>Usage data and analytics</li>
                <li>Communication records</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className={DESIGN_GUIDELINES.components.typography.heading2}>2. How We Use Your Information</h2>
              <p className="mt-4 text-muted-foreground">
                We use the information we collect to provide, maintain, and improve our services, including:
              </p>
              <ul className="mt-4 list-disc list-inside space-y-2 text-muted-foreground">
                <li>Creating and managing user accounts</li>
                <li>Verifying business credentials</li>
                <li>Facilitating connections between buyers and suppliers</li>
                <li>Providing customer support</li>
                <li>Improving our platform and services</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className={DESIGN_GUIDELINES.components.typography.heading2}>3. Information Sharing</h2>
              <p className="mt-4 text-muted-foreground">
                We do not sell, trade, or otherwise transfer your personal information to outside parties except as described in this policy. We may share information in the following circumstances:
              </p>
              <ul className="mt-4 list-disc list-inside space-y-2 text-muted-foreground">
                <li>With your consent</li>
                <li>For legal compliance</li>
                <li>To protect our rights and safety</li>
                <li>With service providers who assist in our operations</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className={DESIGN_GUIDELINES.components.typography.heading2}>4. Data Security</h2>
              <p className="mt-4 text-muted-foreground">
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className={DESIGN_GUIDELINES.components.typography.heading2}>5. Your Rights</h2>
              <p className="mt-4 text-muted-foreground">
                You have the right to access, update, or delete your personal information. You may also opt out of certain communications from us. Contact us to exercise these rights.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className={DESIGN_GUIDELINES.components.typography.heading2}>6. Cookies and Tracking</h2>
              <p className="mt-4 text-muted-foreground">
                We use cookies and similar tracking technologies to enhance your experience on our platform. You can control cookie settings through your browser preferences.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className={DESIGN_GUIDELINES.components.typography.heading2}>7. Contact Us</h2>
              <p className="mt-4 text-muted-foreground">
                If you have any questions about this Privacy Policy, please contact us through our contact page or support channels.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
