'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const BusinessCyclesPage: NextPage = () => (
  <TheoryTemplate
    title="Business Cycles"
    subtitle="The recurring pattern of expansion and contraction that every economy experiences."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            The <strong>business cycle</strong> is the recurring fluctuation of
            economic activity around its long-run trend, consisting of periods
            of
            <strong>expansion</strong> (growth, falling unemployment) and{' '}
            <strong>contraction</strong> (recession, rising unemployment), with
            <strong>peaks</strong> and <strong>troughs</strong> marking the
            turning points. Understanding these cycles is central to predicting
            the economy and designing stabilization policy.
          </p>
        ),
      },
      {
        title: 'The phases',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Expansion:</strong> Output rises, employment grows, and
              incomes increase, often for several years.
            </p>
            <p>
              <strong>Peak:</strong> The top of the cycle, where activity is
              highest before turning down.
            </p>
            <p>
              <strong>Contraction / recession:</strong> Output falls, job losses
              mount, and confidence deteriorates—conventionally defined as two
              consecutive quarters of decline, though dating normally requires
              judgment.
            </p>
            <p>
              <strong>Trough:</strong> The lowest point, after which recovery
              begins.
            </p>
          </div>
        ),
      },
      {
        title: 'What drives cycles',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Demand shocks:</strong> Sudden changes in spending—
              confidence swings, investment booms, or policy changes—push output
              above or below potential (see Keynesian Economics).
            </p>
            <p>
              <strong>Supply shocks:</strong> Technology breakthroughs or input
              price swings (like oil) shift the economy&rsquo;s productive
              capacity.
            </p>
            <p>
              <strong>Financial amplification:</strong> Credit and asset-price
              booms and busts magnify cycles—tight credit deepens recessions,
              easy credit fuels expansions.
            </p>
            <p>
              <strong>Animal spirits:</strong> Shifts in confidence and
              sentiment can be self-fulfilling as households and firms spend or
              hoard.
            </p>
          </div>
        ),
      },
      {
        title: 'Stabilization policy',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Countercyclical policy:</strong> Governments use fiscal
              stimulus in recessions and restraint in booms; central banks
              adjust interest rates to smooth the cycle (see Fiscal Policy and
              Monetary Policy).
            </p>
            <p>
              <strong>Automatic stabilizers:</strong> Unemployment benefits and
              progressive taxes automatically cushion income during downturns
              without new legislation.
            </p>
            <p>
              <strong>The limits:</strong> Timing and forecasting are
              imprecise—policy can lag the cycle, potentially worsening it.
              Modern macroeconomic debate focuses on how actively to manage it.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/business-cycles/predict',
        label: 'Business Cycle Forecaster',
        description:
          'Act as an economic forecaster: use trailing growth, unemployment, confidence and inflation to call the next phase of the cycle before it is revealed.',
      },
    ]}
    references={[
      {
        href: 'https://en.wikipedia.org/wiki/Business_cycle',
        label: 'Wikipedia: Business Cycle',
        description:
          'Overview of the phases of the business cycle and competing theories of its causes.',
      },
      {
        href: 'https://www.khanacademy.org/economics-finance-domain/macroeconomics/healthy-economy/business-cycles/v/business-cycles-intro',
        label: 'Khan Academy: Business Cycles Intro',
        description:
          'Video introduction to expansions, recessions, and stabilization policy.',
      },
      {
        href: 'https://www.nber.org/research/data/us-business-cycle-expansions-and-contractions',
        label: 'NBER: US Business Cycle Dates',
        description:
          'Official chronology of US business cycle peaks and troughs maintained by the NBER.',
      },
    ]}
  />
);

export default BusinessCyclesPage;
