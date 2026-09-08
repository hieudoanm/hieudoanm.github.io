'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const MentalAccountingPage: NextPage = () => (
  <TheoryTemplate
    title="Mental Accounting"
    subtitle="Why people treat money differently depending on where it comes from—and where it&rsquo;s going."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            <strong>Mental accounting</strong>, coined by Richard Thaler,
            describes how people mentally categorize money into separate
            &ldquo;accounts&rdquo; based on its source and intended use, rather
            than treating all money as fungible. A rational person would treat a
            dollar as a dollar regardless of origin; in practice, people earmark
            tax refunds, gifts, or gambling winnings as &ldquo;extra&rdquo; and
            spend them more freely than ordinary income.
          </p>
        ),
      },
      {
        title: 'How it shows up',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Windfall spending:</strong> A bonus or refund is placed in
              a &ldquo;found money&rdquo; account and splurged, while ordinary
              salary is guarded as &ldquo;real&rdquo; money.
            </p>
            <p>
              <strong>Budgeting by category:</strong> People allocate fixed
              budgets to food, entertainment, and bills, and resist spending
              across categories even when total spending would be sensible.
            </p>
            <p>
              <strong>Expensive vs cheap accounts:</strong> Borrowing on a
              credit card while holding idle savings reflects keeping separate
              mental pools rather than netting them out.
            </p>
          </div>
        ),
      },
      {
        title: 'Why it matters',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Errors in savings:</strong> Treating a tax refund as
              spending money while carrying debt ignores that paying down debt
              is effectively a risk-free return.
            </p>
            <p>
              <strong>Rationalizing vice:</strong> People use mental accounts to
              justify spending—&ldquo;I earned this treat&rdquo;—even when it
              contradicts their own budgets.
            </p>
            <p>
              <strong>Investment framing:</strong> Investors segregate gains and
              losses into accounts (see the disposition effect), altering how
              they hold or sell assets relative to a holistic view.
            </p>
          </div>
        ),
      },
      {
        title: 'The rational integration',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Money is fungible:</strong> A dollar in any account has
              the same purchasing power, so the rational view treats resources
              as one pool.
            </p>
            <p>
              <strong>Improved by rules:</strong> Rather than fighting the
              impulse, rational people exploit mental accounting—using separate
              &ldquo;accounts&rdquo; as a self-control device, such as automatic
              savings or a dedicated travel fund.
            </p>
            <p>
              <strong>A double-edged tool:</strong> Mental accounting is a bias
              when it distorts spending, but a useful constraint when
              deliberately harnessed to enforce saving goals.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/mental-accounting/scenarios',
        label: 'Mental Accounting Game',
        description:
          'Wrestle with six Thaler-style vignettes — then split a $1,000 windfall across mental accounts.',
      },
    ]}
    references={[
      {
        href: 'https://en.wikipedia.org/wiki/Mental_accounting',
        label: 'Wikipedia: Mental Accounting',
        description:
          "Overview of Thaler's concept and its role in behavioral economics.",
      },
      {
        href: 'https://www.investopedia.com/terms/m/mental-accounting.asp',
        label: 'Investopedia: Mental Accounting',
        description:
          'Entry explaining how people categorize and treat money differently.',
      },
      {
        href: 'https://www.nobelprize.org/prizes/economic-sciences/2017/summary/',
        label: 'Nobel Prize: Richard Thaler 2017',
        description:
          'Nobel award to Thaler for contributions to behavioral economics including mental accounting.',
      },
    ]}
  />
);

export default MentalAccountingPage;
