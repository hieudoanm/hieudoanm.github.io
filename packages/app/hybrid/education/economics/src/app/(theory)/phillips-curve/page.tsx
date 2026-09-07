'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const PhillipsCurvePage: NextPage = () => (
  <TheoryTemplate
    title="The Phillips Curve"
    subtitle="Does lower unemployment always mean higher inflation? The famous tradeoff—and why it breaks."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            The <strong>Phillips curve</strong>, from economist A.&nbsp;W.
            Phillips, is the empirical relationship between unemployment and
            inflation. Its original finding: when unemployment is low, inflation
            tends to be high, and vice versa—an apparent{' '}
            <strong>tradeoff</strong> that policymakers seemed to face between
            the two. The &ldquo;menu&rdquo; of choices between inflation and
            unemployment shaped macroeconomic policy for decades.
          </p>
        ),
      },
      {
        title: 'Why the tradeoff seemed to exist',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Boom dynamics:</strong> When the economy booms, firms hire
              heavily, pushing unemployment down and wages up—and higher wages
              feed into higher prices.
            </p>
            <p>
              <strong>Stimulus:</strong> Expansionary policy raises demand,
              boosting output and employment while putting upward pressure on
              prices. Traditionally, policymakers could &ldquo;buy&rdquo; lower
              unemployment with a bit more inflation.
            </p>
            <p>
              <strong>Slump dynamics:</strong> The reverse—a recession brings
              high unemployment and falling inflationary pressure.
            </p>
          </div>
        ),
      },
      {
        title: 'The expectations critique',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Phelps-Friedman insight:</strong> Milton Friedman and
              Edmund Phelps argued the tradeoff is only short-run. Workers and
              firms eventually learn to expect the higher inflation and adjust
              wages accordingly, neutralizing the boost.
            </p>
            <p>
              <strong>The natural rate:</strong> In the long run, unemployment
              returns to its <strong>natural rate</strong>—the level consistent
              with stable inflation—regardless of how much inflation is
              tolerated.
            </p>
            <p>
              <strong>The long-run curve is vertical:</strong> Attempts to push
              unemployment permanently below the natural rate only produce ever-
              rising inflation, not lasting jobs.
            </p>
          </div>
        ),
      },
      {
        title: 'Modern relevance',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Anchored expectations:</strong> With central banks
              targeting low inflation, the short-run tradeoff has weakened in
              practice— unemployment and inflation can move independently when
              expectations are well anchored.
            </p>
            <p>
              <strong>Supply shocks:</strong> Events like oil spikes cause
              <em>stagflation</em>—high inflation and high unemployment
              together—which the simple curve cannot explain.
            </p>
            <p>
              <strong>Policy lesson:</strong> The Phillips curve cautions
              against relying on a fixed inflation-unemployment menu;
              expectations and supply conditions matter as much as the tradeoff
              itself.
            </p>
          </div>
        ),
      },
    ]}
    references={[
      {
        href: 'https://en.wikipedia.org/wiki/Phillips_curve',
        label: 'Wikipedia: Phillips Curve',
        description: 'Overview of the tradeoff and the expectations critique.',
      },
      {
        href: 'https://www.investopedia.com/terms/p/phillipscurve.asp',
        label: 'Investopedia: Phillips Curve',
        description:
          'Entry explaining the inflation–unemployment relationship and its limits.',
      },
      {
        href: 'https://www.britannica.com/topic/Phillips-curve',
        label: 'Britannica: Phillips Curve',
        description:
          'Article on the research behind the curve and why the tradeoff broke down.',
      },
    ]}
  />
);

export default PhillipsCurvePage;
