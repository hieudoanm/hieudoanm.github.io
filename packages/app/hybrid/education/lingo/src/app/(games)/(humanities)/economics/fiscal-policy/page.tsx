'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const FiscalPolicyPage: NextPage = () => (
  <TheoryTemplate
    title="Fiscal Policy"
    subtitle="How government spending and taxation steer the economy."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            <strong>Fiscal policy</strong> is the use of government spending and
            taxation to influence the economy. It works through two channels:
            changing how much the government itself spends, and changing how
            much money households and firms keep through taxes and transfers. It
            is one of the two main levers of macroeconomic management, alongside
            monetary policy.
          </p>
        ),
      },
      {
        title: 'Expansionary and contractionary',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Expansionary:</strong> Cutting taxes or raising spending
              to boost demand during recessions, often at the cost of a larger
              budget deficit.
            </p>
            <p>
              <strong>Contractionary:</strong> Raising taxes or cutting spending
              to cool an overheating economy and tame inflation, usually
              improving the budget balance.
            </p>
            <p>
              <strong>Automatic stabilizers:</strong> Tax revenues fall and
              welfare spending rises automatically in downturns, cushioning the
              economy without new decisions.
            </p>
          </div>
        ),
      },
      {
        title: 'The multiplier debate',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>The multiplier:</strong> A dollar of government spending
              ripples through the economy—each recipient spends some again—so
              the total boost to demand can exceed the initial spending.
            </p>
            <p>
              <strong>Crowding out:</strong> Critics argue that government
              borrowing raises interest rates, displacing private investment and
              weakening the stimulus.
            </p>
            <p>
              <strong>When it works best:</strong> Multipliers tend to be
              largest in deep recessions when the economy is well below capacity
              and interest rates are low—so the size and timing of fiscal
              stimulus are crucial.
            </p>
          </div>
        ),
      },
      {
        title: 'Deficits and debt',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Deficit vs debt:</strong> A deficit is borrowing in a
              single year; the debt is the accumulated stock of past borrowing.
            </p>
            <p>
              <strong>When deficits make sense:</strong> Borrowing to fund
              investment or to ride out a recession can be prudent, paying for
              itself through future growth.
            </p>
            <p>
              <strong>Sustainability:</strong> Persistent large deficits raise
              the debt ratio, crowding out investment and risking higher
              interest rates or inflation. Balancing stimulus against debt
              sustainability is the core fiscal challenge.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/economics/fiscal-policy/stimulus',
        label: 'Fiscal Multiplier Lab',
        description:
          'Set government spending and tax cuts to close output gaps while keeping the fiscal budget in check.',
      },
    ]}
    references={[
      {
        href: 'https://en.wikipedia.org/wiki/Fiscal_policy',
        label: 'Wikipedia: Fiscal Policy',
        description:
          'Overview of fiscal policy tools, multiplier effects, and stabilization goals.',
      },
      {
        href: 'https://www.investopedia.com/terms/f/fiscalpolicy.asp',
        label: 'Investopedia: Fiscal Policy',
        description:
          'Entry explaining government spending, taxation, and their macroeconomic effects.',
      },
      {
        href: 'https://www.imf.org/en/Publications/fiscal-monitor',
        label: 'IMF: Fiscal Monitor',
        description:
          'IMF publication analyzing global fiscal trends, debt, and policy recommendations.',
      },
    ]}
  />
);

export default FiscalPolicyPage;
