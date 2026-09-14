'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const TimeInconsistencyPage: NextPage = () => (
  <TheoryTemplate
    title="Time Inconsistency & Credibility"
    subtitle="Why commitments made today so often fail tomorrow—and how to make them stick."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            <strong>Time inconsistency</strong> occurs when a person&rsquo;s or
            institution&rsquo;s preferences now differ from the preferences they
            will hold later. A classic example is monetary policy: a central
            bank wants low inflation, but once people expect low inflation, the
            bank is tempted to create surprise inflation to boost output.
            Finland&rsquo;s Kydland and Prescott won the Nobel Prize in 2004 for
            showing why such rules beat discretion, and why
            <strong>credibility</strong> matters.
          </p>
        ),
      },
      {
        title: 'Present bias',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>The problem of now vs later:</strong> People discount the
              near future much more steeply than the distant future—a pattern
              called hyperbolic discounting. &ldquo;Start the diet Monday&rdquo;
              feels easy, but when Monday arrives, the salad again loses to the
              cake.
            </p>
            <p>
              <strong>Planning vs action:</strong> The same person can genuinely
              prefer saving for retirement and simultaneously spend impulsively.
              Preferences are not stable over time, which is why good intentions
              fail.
            </p>
            <p>
              <strong>Commitment devices:</strong> Anticipating future weakness,
              people voluntarily restrict their future choices—savings accounts
              with withdrawal penalties, gym contracts, or deleting distracting
              apps. Rational today protecting against irrational tomorrow.
            </p>
          </div>
        ),
      },
      {
        title: 'Policy credibility',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>The inflation bias:</strong> If the central bank merely
              announces low inflation, private agents rationally anticipate the
              temptation to inflate and build in higher wage demands. The result
              is higher inflation with no extra output—the worst of both worlds.
            </p>
            <p>
              <strong>Rules over discretion:</strong> Binding rules (like a
              fixed inflation target or a monetary rule) remove the temptation,
              producing better outcomes than letting policymakers decide each
              period.
            </p>
            <p>
              <strong>Central bank independence:</strong> Giving central banks
              independence and clear mandates makes them more credible. Because
              they no longer face electoral pressure, their promises are
              believed—lowering inflation expectations without sacrificing
              policy flexibility.
            </p>
          </div>
        ),
      },
      {
        title: 'Real-world examples',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Dieting and exercise:</strong> People buy gym memberships
              and prepay for meal plans precisely because they cannot trust
              their future selves to choose well in the moment.
            </p>
            <p>
              <strong>Retirement saving:</strong> Default auto-enrollment
              exploits present bias—people stay in plans rather than actively
              opting out.
            </p>
            <p>
              <strong>Peace negotiations:</strong> Governments promise to
              demobilize, but each side doubts the other will follow through.
              Third-party guarantees and enforcement make these commitments
              credible.
            </p>
            <p>
              <strong>Carbon commitments:</strong> Countries announce climate
              targets knowing future governments may not honor them—the
              credibility problem at global scale.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/economics/time-inconsistency/savings',
        label: 'Commitment Device',
        description:
          'Save across 12 days and feel present bias steal your own plans.',
      },
    ]}
    references={[
      {
        href: 'https://en.wikipedia.org/wiki/Dynamic_inconsistency',
        label: 'Wikipedia: Dynamic inconsistency',
        description:
          'Time inconsistency of preferences and credibility in economic policy.',
      },
      {
        href: 'https://www.nobelprize.org/prizes/economic-sciences/2004/summary/',
        label: 'Nobel Prize: 2004 Prize in Economics',
        description:
          'The 2004 Nobel Prize awarded for work on the time consistency of economic policy.',
      },
      {
        href: 'https://en.wikipedia.org/wiki/Hyperbolic_discounting',
        label: 'Wikipedia: Hyperbolic discounting',
        description:
          'Hyperbolic discounting as a model of present-biased intertemporal choice.',
      },
    ]}
  />
);

export default TimeInconsistencyPage;
