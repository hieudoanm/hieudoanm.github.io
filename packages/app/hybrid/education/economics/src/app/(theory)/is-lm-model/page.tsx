'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const ISLMPage: NextPage = () => (
  <TheoryTemplate
    title="The IS-LM Model"
    subtitle="A classic framework for how goods markets and money markets interact to set output and rates."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            The <strong>IS-LM model</strong>, developed by John Hicks and Alvin
            Hansen, captures the interaction between the{' '}
            <strong>goods market</strong> (the <strong>IS</strong> curve:
            investment-saving) and the <strong>money market</strong> (the{' '}
            <strong>LM</strong> curve: liquidity preference-money supply). Their
            intersection determines short-run output and the interest rate. It
            is the workhorse framework for teaching how fiscal and monetary
            policy affect the economy.
          </p>
        ),
      },
      {
        title: 'The IS curve',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Goods market equilibrium:</strong> The IS curve pairs
              interest rates with output where planned spending equals income
              (saving equals investment).
            </p>
            <p>
              <strong>Downward sloping:</strong> Lower interest rates make
              borrowing cheaper, stimulating investment and output—so each
              interest rate maps to a higher level of output.
            </p>
            <p>
              <strong>Shifts:</strong> Expansionary fiscal policy (more spending
              or lower taxes) shifts IS outward, raising output at every rate.
            </p>
          </div>
        ),
      },
      {
        title: 'The LM curve',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Money market equilibrium:</strong> The LM curve pairs
              interest rates with output where money demand equals the money
              supply.
            </p>
            <p>
              <strong>Upward sloping:</strong> Higher output raises the demand
              for money (for transactions), pushing up the interest rate that
              clears the money market.
            </p>
            <p>
              <strong>Shifts:</strong> Expansionary monetary policy—increasing
              the money supply—shifts LM outward, lowering rates at every level
              of output.
            </p>
          </div>
        ),
      },
      {
        title: 'Applying the model',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Equilibrium:</strong> The IS and LM curves cross at one
              (interest rate, output) pair where both markets clear
              simultaneously.
            </p>
            <p>
              <strong>Fiscal policy:</strong> Shifting IS raises output but also
              raises interest rates, which partially &ldquo;crowds out&rdquo;
              investment.
            </p>
            <p>
              <strong>Monetary policy:</strong> Shifting LM lowers rates and
              raises output, illustrating the transmission of policy through
              interest rates.
            </p>
            <p>
              <strong>Limitations:</strong> The model uses fixed prices and
              focuses on the short run; it is a teaching tool more than a
              complete description of modern economies.
            </p>
          </div>
        ),
      },
    ]}
  />
);

export default ISLMPage;
