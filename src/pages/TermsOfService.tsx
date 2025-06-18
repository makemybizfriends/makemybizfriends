
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { DESIGN_GUIDELINES } from '@/styles/designGuidelines';

export default function TermsOfService() {
  return (
    <div className={DESIGN_GUIDELINES.layout.pageWrapper}>
      <div className={DESIGN_GUIDELINES.layout.container}>
        <div className={DESIGN_GUIDELINES.layout.pageHeader.wrapper}>
          <h1 className={DESIGN_GUIDELINES.layout.pageHeader.title}>Terms of Service</h1>
          <p className={DESIGN_GUIDELINES.layout.pageHeader.subtitle}>
            Last updated: December 2024
          </p>
        </div>

        <Card className={DESIGN_GUIDELINES.layout.card.primary}>
          <CardContent className="p-8 space-y-8">
            <section>
              <h2 className={DESIGN_GUIDELINES.components.typography.heading2}>1. Acceptance of Terms</h2>
              <p className="mt-4 text-muted-foreground">
                By accessing and using Make Biz Friends platform, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className={DESIGN_GUIDELINES.components.typography.heading2}>2. Use License</h2>
              <p className="mt-4 text-muted-foreground">
                Permission is granted to temporarily use Make Biz Friends for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="mt-4 list-disc list-inside space-y-2 text-muted-foreground">
                <li>modify or copy the materials</li>
                <li>use the materials for any commercial purpose or for any public display</li>
                <li>attempt to reverse engineer any software contained on the platform</li>
                <li>remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className={DESIGN_GUIDELINES.components.typography.heading2}>3. User Accounts</h2>
              <p className="mt-4 text-muted-foreground">
                When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for any activities that occur under your account.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className={DESIGN_GUIDELINES.components.typography.heading2}>4. Business Transactions</h2>
              <p className="mt-4 text-muted-foreground">
                Make Biz Friends acts as a platform to connect buyers and suppliers. We are not responsible for the quality, safety, legality, or any other aspect of products or services offered by users. All transactions are between the respective parties.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className={DESIGN_GUIDELINES.components.typography.heading2}>5. Verification Process</h2>
              <p className="mt-4 text-muted-foreground">
                Our verification process is designed to enhance trust between users. However, verification does not guarantee the quality of products or services, and users should exercise their own judgment in all business dealings.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className={DESIGN_GUIDELINES.components.typography.heading2}>6. Prohibited Uses</h2>
              <p className="mt-4 text-muted-foreground">
                You may not use our platform for any unlawful purpose or to solicit others to perform unlawful acts. You may not transmit any worms or viruses or any code of a destructive nature.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className={DESIGN_GUIDELINES.components.typography.heading2}>7. Contact Information</h2>
              <p className="mt-4 text-muted-foreground">
                If you have any questions about these Terms of Service, please contact us through our contact page or support channels.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
