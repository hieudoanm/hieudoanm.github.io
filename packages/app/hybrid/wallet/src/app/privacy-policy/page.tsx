'use client';

import Link from 'next/link';
import { DashboardTemplate } from '@/components/templates';
import { FiArrowLeft } from 'react-icons/fi';

export default function PrivacyPolicyPage() {
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
            <h1 className="text-2xl font-bold">Privacy Policy</h1>
            <p className="text-base-content/60">Last updated: July 23, 2026</p>
          </div>

          <div className="card bg-base-200 shadow-md">
            <div className="card-body gap-4">
              <section>
                <h2 className="text-lg font-semibold">
                  1. Information We Collect
                </h2>
                <p className="text-base-content/60 text-sm">
                  The Wallet application stores all data locally on your device.
                  This includes account information, transaction history, budget
                  settings, and currency preferences. No data is transmitted to
                  external servers.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold">
                  2. How We Use Information
                </h2>
                <p className="text-base-content/60 text-sm">
                  All collected information is used solely to provide the
                  features of the Wallet application on your device. We do not
                  use your data for analytics, advertising, or any third-party
                  purposes.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold">3. Data Storage</h2>
                <p className="text-base-content/60 text-sm">
                  Your data is stored locally using browser storage APIs. You
                  can clear your data at any time by clearing your
                  browser&apos;s local storage or by uninstalling the
                  application.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold">4. Data Sharing</h2>
                <p className="text-base-content/60 text-sm">
                  We do not share, sell, rent, or trade your personal
                  information with any third parties. Since all data remains on
                  your device, there is no data sharing involved.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold">5. Security</h2>
                <p className="text-base-content/60 text-sm">
                  We implement reasonable security measures to protect the data
                  stored on your device. However, no method of electronic
                  storage is 100% secure, and we cannot guarantee absolute
                  security.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold">
                  6. Children&apos;s Privacy
                </h2>
                <p className="text-base-content/60 text-sm">
                  The Service is not intended for use by children under 13 years
                  of age. We do not knowingly collect personal information from
                  children under 13.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold">
                  7. Changes to This Policy
                </h2>
                <p className="text-base-content/60 text-sm">
                  We may update this Privacy Policy from time to time. Changes
                  will be reflected on this page with an updated revision date.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold">8. Contact</h2>
                <p className="text-base-content/60 text-sm">
                  If you have questions about this Privacy Policy, please
                  contact us at privacy@wallet.example.com.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </DashboardTemplate>
  );
}
