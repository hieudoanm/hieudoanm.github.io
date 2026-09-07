'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const UnemploymentPage: NextPage = () => (
  <TheoryTemplate
    title="Unemployment & Okun's Law"
    subtitle="Why people are out of work, and how joblessness moves with economic growth."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            <strong>Unemployment</strong> is the share of the labor force
            actively seeking work but unable to find it. Understanding its types
            and causes is essential to diagnosing an economy&rsquo;s health.{' '}
            <strong>Okun&rsquo;s Law</strong>, named for Arthur Okun, describes
            the empirical link between output growth and unemployment: when real
            GDP grows faster than its potential, unemployment tends to fall.
          </p>
        ),
      },
      {
        title: 'Types of unemployment',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Frictional:</strong> Short-term unemployment from people
              moving between jobs or entering the workforce—normal and healthy
              as workers search for better matches.
            </p>
            <p>
              <strong>Structural:</strong> A mismatch between workers&rsquo;
              skills and available jobs, often from technological change or
              shifting industries—longer-lasting and harder to fix.
            </p>
            <p>
              <strong>Cyclical:</strong> Unemployment that rises during
              recessions when aggregate demand falls—the type policy aims to
              reduce (see Business Cycles).
            </p>
            <p>
              <strong>The natural rate:</strong> Frictional plus structural
              unemployment makes up the natural rate—the level consistent with
              stable inflation when the economy is at full employment.
            </p>
          </div>
        ),
      },
      {
        title: "Okun's Law",
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>The relationship:</strong> Roughly, a 1 percentage point
              rise in unemployment above the natural rate is associated with
              output falling about 2 points below potential—yielding the
              familiar 2-for-1 rule of thumb.
            </p>
            <p>
              <strong>From growth to jobs:</strong> A more practical form: each
              year GDP grows about 1 point above potential, the unemployment
              rate tends to fall by around half a percentage point. So the
              economy needs to grow near its potential just to hold unemployment
              steady.
            </p>
            <p>
              <strong>It is a rule of thumb:</strong> The exact coefficient
              varies by country and era, but the direction is robust: growth
              creates jobs, recessions destroy them.
            </p>
          </div>
        ),
      },
      {
        title: 'Why unemployment matters',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Lost output:</strong> Unemployed workers produce nothing,
              so high unemployment means the economy operates below its
              potential— the gap Okun&rsquo;s Law quantifies.
            </p>
            <p>
              <strong>Human costs:</strong> Unemployment imposes hardship on
              individuals and families well beyond lost income—skills decay and
              long stretches out of work permanently lower lifetime earnings.
            </p>
            <p>
              <strong>Policy target:</strong> Reducing cyclical unemployment
              without pushing inflation too high is a central goal of
              macroeconomic policy, balancing the tradeoff captured by the
              Phillips curve.
            </p>
          </div>
        ),
      },
    ]}
    references={[
      {
        href: 'https://www.investopedia.com/terms/o/okunslaw.asp',
        label: "Investopedia: Okun's Law",
        description:
          "Okun's law linking short-run GDP growth to changes in the unemployment rate.",
      },
      {
        href: 'https://www.investopedia.com/terms/u/unemployment.asp',
        label: 'Investopedia: Unemployment',
        description:
          'Definition of unemployment and how the unemployment rate is measured.',
      },
      {
        href: 'https://en.wikipedia.org/wiki/Okun%27s_law',
        label: "Wikipedia: Okun's law",
        description:
          'The empirical relationship between output and unemployment gaps.',
      },
    ]}
  />
);

export default UnemploymentPage;
