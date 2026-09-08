'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const AdverseSelectionPage: NextPage = () => (
  <TheoryTemplate
    title="Adverse Selection"
    subtitle="When hidden information before a deal leads markets to attract exactly the wrong participants."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            <strong>Adverse selection</strong> arises when one side of a
            transaction knows something the other side doesn&rsquo;t—before the
            deal is made. Because the uninformed party cannot tell good from
            bad, they set a price for the average, which drives away good
            participants and attracts bad ones. George Akerlof&rsquo;s famous
            paper on the <em>market for lemons</em> (1970, Nobel Prize 2001)
            showed this can cause markets to shrink or collapse entirely.
          </p>
        ),
      },
      {
        title: 'The market for lemons',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Hidden quality:</strong> A used-car seller knows whether
              their car is a peach or a lemon; the buyer doesn&rsquo;t. The
              buyer can only offer a price reflecting the average car.
            </p>
            <p>
              <strong>Selective exit:</strong> Owners of good cars refuse to
              sell at an average price, so only lemon owners sell. The pool of
              cars in the market deteriorates toward the bottom.
            </p>
            <p>
              <strong>Market failure:</strong> In the extreme, no one trades
              good cars at all, and the market for high-quality goods collapses
              even though people value them—a genuine market failure from hidden
              information.
            </p>
          </div>
        ),
      },
      {
        title: 'Real-world examples',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Health insurance:</strong> If insurers can&rsquo;t
              distinguish healthy from sick customers, they price for the
              average risk. Healthier people then decline coverage, leaving a
              sicker, costlier pool—raising premiums further.
            </p>
            <p>
              <strong>Insurance in general:</strong> Auto and life insurers face
              the same problem: the people most eager to buy are often the most
              expensive to cover.
            </p>
            <p>
              <strong>Labor markets:</strong> An employer can&rsquo;t always
              tell productive from unproductive applicants, so wages reflect the
              average—discouraging the best candidates from applying.
            </p>
            <p>
              <strong>Credit markets:</strong> Lenders who can&rsquo;t
              distinguish good from risky borrowers attract riskier ones.
            </p>
          </div>
        ),
      },
      {
        title: 'The solutions',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Screening:</strong> The uninformed party gathers
              information to sort participants—medical exams, credit checks,
              warranties, and used-car inspections all screen out bad risks.
            </p>
            <p>
              <strong>Signaling:</strong> The informed party voluntarily reveals
              quality through costly signals (see the Signaling page):
              education, certifications, guarantees, and brand reputations.
            </p>
            <p>
              <strong>Government intervention:</strong> Mandatory insurance
              pools and underwriting bans force broad participation so that risk
              is shared rather than selected against.
            </p>
            <p>
              <strong>Market mechanisms:</strong> Third-party ratings, licensed
              intermediaries, and reputation systems help buyers trust quality
              before they buy.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/adverse-selection/lemons',
        label: 'The Market for Lemons',
        description:
          'Post one price for a used car and watch good cars refuse to sell at "fair" prices—Akerlof\'s adverse selection in action.',
      },
    ]}
    references={[
      {
        href: 'https://en.wikipedia.org/wiki/Adverse_selection',
        label: 'Wikipedia: Adverse Selection',
        description:
          'Overview of adverse selection theory, its causes, and market implications.',
      },
      {
        href: 'https://www.investopedia.com/terms/a/adverseselection.asp',
        label: 'Investopedia: Adverse Selection',
        description:
          'Entry defining adverse selection and its role in insurance and financial markets.',
      },
      {
        href: 'https://www.nobelprize.org/prizes/economic-sciences/2001/akerlof/summary/',
        label: 'Nobel Prize: George Akerlof (2001)',
        description:
          'Nobel Prize page for Akerlof, summarising his research on markets with asymmetric information.',
      },
    ]}
  />
);

export default AdverseSelectionPage;
