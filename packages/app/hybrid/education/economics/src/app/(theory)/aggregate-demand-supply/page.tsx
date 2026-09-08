'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const AggregateDemandSupplyPage: NextPage = () => (
  <TheoryTemplate
    title="Aggregate Demand & Supply"
    subtitle="The economy-wide version of supply and demand—explaining output, prices, and recessions."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            <strong>Aggregate demand (AD)</strong> and{' '}
            <strong>aggregate supply (AS)</strong> are the macroeconomy&rsquo;s
            counterpart to market supply and demand. AD is total spending across
            the economy; AS is total output firms are willing to supply at each
            price level. Their intersection determines overall output and the
            price level—the &ldquo;big picture&rdquo; of why economies grow,
            inflate, or slide into recession.
          </p>
        ),
      },
      {
        title: 'Components of AD',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>AD = C + I + G + NX:</strong> Consumption, investment,
              government spending, and net exports together make up total
              planned spending in the economy.
            </p>
            <p>
              <strong>Why AD slopes down:</strong> Higher price levels reduce
              the real value of money (wealth effect), raise interest rates
              (interest effect), and make exports less competitive (trade
              effect)—so total spending falls as prices rise.
            </p>
            <p>
              <strong>Shifts:</strong> Changes in consumer confidence,
              investment, fiscal, or monetary policy shift the whole AD curve.
            </p>
          </div>
        ),
      },
      {
        title: 'Aggregate supply',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Short run:</strong> Because wages and prices are sticky,
              firms expand output when prices rise—the short-run AS curve slopes
              upward.
            </p>
            <p>
              <strong>Long run:</strong> Wages and prices adjust fully, so
              output settles at the economy&rsquo;s potential—the long-run AS
              curve is vertical at potential output regardless of the price
              level.
            </p>
            <p>
              <strong>Supply shocks:</strong> Events like oil price spikes or
              productivity gains shift AS, changing output and prices together.
            </p>
          </div>
        ),
      },
      {
        title: 'Putting it together',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Equilibrium:</strong> Where AD meets AS determines real
              GDP and the price level. Shifts in either move the economy along
              the business cycle.
            </p>
            <p>
              <strong>Recession gap:</strong> If AD falls short of potential,
              output drops below capacity with unemployment above normal—the
              situation Keynesian policy targets (see Keynesian Economics).
            </p>
            <p>
              <strong>Inflationary gap:</strong> If AD exceeds potential, output
              can temporarily rise above it, pushing up prices—inviting
              contractionary policy (see Monetary Policy).
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/aggregate-demand-supply/shocks',
        label: 'AD-AS Shocks Lab',
        description:
          'Hit the economy with demand shocks and watch the short-run gap and inflation evolve—then adjust back to long-run.',
      },
    ]}
    references={[
      {
        href: 'https://en.wikipedia.org/wiki/Aggregate_demand',
        label: 'Wikipedia: Aggregate Demand',
        description:
          'Explanation of aggregate demand, its components, and the downward-sloping curve.',
      },
      {
        href: 'https://www.khanacademy.org/economics-finance-domain/macroeconomics/gdp-topic/aggregate-demand-supply/v/aggregate-demand',
        label: 'Khan Academy: Aggregate Demand',
        description:
          'Video walkthrough of the aggregate demand concept and the AD-AS model.',
      },
      {
        href: 'https://www.investopedia.com/terms/a/aggregatedemand.asp',
        label: 'Investopedia: Aggregate Demand',
        description:
          'Entry defining aggregate demand, its formula, and factors that shift the curve.',
      },
    ]}
  />
);

export default AggregateDemandSupplyPage;
