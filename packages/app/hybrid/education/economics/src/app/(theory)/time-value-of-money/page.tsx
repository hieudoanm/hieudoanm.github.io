'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const TimeValuePage: NextPage = () => (
  <TheoryTemplate
    title="Time Value of Money"
    subtitle="Why a dollar today is worth more than a dollar tomorrow—the engine of all finance."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            The <strong>time value of money (TVM)</strong> is the principle that
            a sum of money has different value depending on when it is received.
            A dollar today is worth more than a dollar tomorrow because it can
            be invested to earn interest, or spent now, while future dollars
            carry risk and suffer inflation. This idea underpins interest rates,
            loans, investments, and valuation across all of finance.
          </p>
        ),
      },
      {
        title: 'Present and future value',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Future value:</strong> How much a sum grows when invested
              at an interest rate. It is the present amount compounded forward:
              FV = PV × (1 + r)<sup>t</sup>.
            </p>
            <p>
              <strong>Present value:</strong> How much a future sum is worth
              today. It discounts the future amount back: PV = FV / (1 + r)
              <sup>t</sup>.
            </p>
            <p>
              <strong>Discounting:</strong> The higher the interest rate, the
              less a future dollar is worth today. Discounting turns any stream
              of future payments into a comparable present-day number.
            </p>
          </div>
        ),
      },
      {
        title: 'Compounding and discounting',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Compounding:</strong> Interest earned on interest grows
              money exponentially. The earlier you start saving, the more
              compounding multiplies your balance—why starting young matters so
              much.
            </p>
            <p>
              <strong>Annuities and perpetuities:</strong> A fixed payment each
              period has a present value computed by discounting the whole
              stream—the basis of mortgages, pensions, and bond pricing.
            </p>
            <p>
              <strong>The rule of 72:</strong> Roughly, doubling time in years
              equals 72 divided by the annual return, giving a quick intuition
              for compounding.
            </p>
          </div>
        ),
      },
      {
        title: 'Why it matters',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Investment decisions:</strong> Comparing a project&rsquo;s
              future cash flows to its cost today requires discounting them all
              to present value (net present value analysis).
            </p>
            <p>
              <strong>Bonds and loans:</strong> Bond prices and loan terms are
              determined by discounting promised future payments at the market
              interest rate.
            </p>
            <p>
              <strong>Retirement planning:</strong> Saving today relies on
              knowing how much a stream of future contributions will be worth.
            </p>
            <p>
              <strong>Inflation and risk:</strong> Delayed money must compensate
              for lost purchasing power and uncertainty, which is why interest
              rates embed an inflation premium and a risk premium.
            </p>
          </div>
        ),
      },
    ]}
  />
);

export default TimeValuePage;
