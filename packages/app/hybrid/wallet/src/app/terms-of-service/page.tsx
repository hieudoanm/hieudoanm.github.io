'use client';

import Link from 'next/link';
import { DashboardTemplate } from '@/components/templates';
import { FiArrowLeft } from 'react-icons/fi';

export default function TermsOfServicePage() {
  return (
    <DashboardTemplate>
      <div className="mx-auto max-w-3xl">
        <Link
          href="/profile"
          className="text-base-content/60 mb-4 inline-flex items-center gap-1 text-sm hover:underline">
          <FiArrowLeft /> Back to Profile
        </Link>

        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold">Terms of Service</h1>
            <p className="text-base-content/60">Last updated: July 23, 2026</p>
          </div>

          <div className="card bg-base-200 shadow-md">
            <div className="card-body gap-4">
              <section>
                <h2 className="text-lg font-semibold">
                  1. Acceptance of Terms
                </h2>
                <p className="text-base-content/60 text-sm">
                  By accessing and using the Wallet application
                  (&quot;Service&quot;), you agree to be bound by these Terms of
                  Service. If you do not agree to all of these terms, you may
                  not use the Service.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold">
                  2. Description of Service
                </h2>
                <p className="text-base-content/60 text-sm">
                  The Wallet application provides a personal finance management
                  tool that allows users to track accounts, transactions,
                  budgets, and perform currency conversions. All data in the
                  application is simulated and does not connect to real
                  financial institutions.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold">3. User Accounts</h2>
                <p className="text-base-content/60 text-sm">
                  You are responsible for maintaining the confidentiality of
                  your account credentials. You agree to notify us immediately
                  of any unauthorized use of your account.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold">4. Data and Privacy</h2>
                <p className="text-base-content/60 text-sm">
                  All data stored in the Wallet application is kept locally on
                  your device. We do not transmit, store, or have access to your
                  financial data on external servers. Please refer to our
                  Privacy Policy for more details.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold">
                  5. Disclaimer of Warranties
                </h2>
                <p className="text-base-content/60 text-sm">
                  The Service is provided &quot;as is&quot; without warranties
                  of any kind, either express or implied. We do not warrant that
                  the Service will be uninterrupted or error-free.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold">
                  6. Limitation of Liability
                </h2>
                <p className="text-base-content/60 text-sm">
                  In no event shall we be liable for any indirect, incidental,
                  special, consequential, or punitive damages resulting from
                  your use of or inability to use the Service.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold">7. Changes to Terms</h2>
                <p className="text-base-content/60 text-sm">
                  We reserve the right to modify these terms at any time.
                  Changes will be effective immediately upon posting. Your
                  continued use of the Service constitutes acceptance of the
                  modified terms.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold">8. Contact</h2>
                <p className="text-base-content/60 text-sm">
                  If you have questions about these Terms, please contact us at
                  support@wallet.example.com.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </DashboardTemplate>
  );
}
