'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const MonetaryPolicyPage: NextPage = () => (
  <TheoryTemplate
    title="Monetary Policy & Inflation"
    subtitle="How central banks steer the economy through money, interest rates—and expectations."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            <strong>Monetary policy</strong> is how a central bank manages the
            money supply and interest rates to achieve its goals—typically price
            stability, full employment, and moderate growth. By raising or
            lowering rates and buying or selling assets, it influences how much
            borrowing, spending, and investment happen across the economy. The
            overarching goal is to keep inflation low and stable so that money
            holds its value.
          </p>
        ),
      },
      {
        title: 'The tools',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Interest rates:</strong> The policy rate is the central
              lever. Higher rates make borrowing dearer, cooling spending and
              inflation; lower rates stimulate borrowing and demand.
            </p>
            <p>
              <strong>Open market operations:</strong> Buying government bonds
              injects money into the economy; selling them drains it.
            </p>
            <p>
              <strong>Quantitative easing:</strong> In deep downturns, central
              banks buy longer-term assets to push down long-term rates when
              policy rates are already near zero.
            </p>
            <p>
              <strong>Reserve requirements and guidance:</strong> Regulations
              and explicit statements about future policy shape bank lending and
              market expectations.
            </p>
          </div>
        ),
      },
      {
        title: 'Why inflation matters',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Money losing value:</strong> Inflation erodes purchasing
              power, hurts savers, and distorts prices and contracts.
            </p>
            <p>
              <strong>Expectations are central:</strong> If people expect high
              inflation, they raise prices and wages, making high inflation
              self-fulfilling. This is why central banks work hard to anchor
              expectations—credibility is the key asset (see Time
              Inconsistency).
            </p>
            <p>
              <strong>The quantity theory:</strong> In the long run, sustained
              inflation is driven by money growing faster than output. Central
              banks limit it by controlling money growth.
            </p>
            <p>
              <strong>Deflation is also bad:</strong> Falling prices can
              discourage spending and force debts to become harder to repay,
              which central banks hence target a small positive inflation rate.
            </p>
          </div>
        ),
      },
      {
        title: 'Modern practice',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Inflation targeting:</strong> Most major central banks
              commit to an explicit target (often ~2%), anchoring expectations
              and guiding policy decisions.
            </p>
            <p>
              <strong>Independence:</strong> Central banks operate free of
              short-term political control, which makes their anti-inflation
              promises credible.
            </p>
            <p>
              <strong>Data-driven decisions:</strong> Policymakers weigh
              employment, growth, and inflation, adjusting policy gradually and
              communicating clearly to shape market expectations.
            </p>
            <p>
              <strong>Limits:</strong> Monetary policy is less effective when
              rates are at zero, when inflation expectations are unanchored, or
              when the problem is supply-side rather than a demand shortfall.
            </p>
          </div>
        ),
      },
    ]}
  />
);

export default MonetaryPolicyPage;
