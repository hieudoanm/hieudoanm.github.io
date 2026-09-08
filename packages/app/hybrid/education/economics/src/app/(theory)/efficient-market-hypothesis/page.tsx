'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const EMHPage: NextPage = () => (
  <TheoryTemplate
    title="Efficient Market Hypothesis"
    subtitle="Are prices always right? The theory that markets instantly reflect all available information."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            The <strong>Efficient Market Hypothesis (EMH)</strong>, associated
            with Eugene Fama, holds that asset prices fully reflect all
            available information. If true, it is impossible to consistently
            beat the market by trading on that information—prices already
            incorporate it. The EMH is the intellectual foundation of passive,
            index-based investing.
          </p>
        ),
      },
      {
        title: 'Three forms',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Weak form:</strong> Prices reflect all past price data.
              Technical analysis—predicting future prices from past
              patterns—cannot systematically generate excess returns.
            </p>
            <p>
              <strong>Semi-strong form:</strong> Prices reflect all publicly
              available information (financials, news). Fundamental analysis of
              public data cannot consistently beat the market, because prices
              adjust almost instantly to new public disclosures.
            </p>
            <p>
              <strong>Strong form:</strong> Prices reflect all information,
              including private and insider information. No one—even
              insiders—can reliably beat the market.
            </p>
          </div>
        ),
      },
      {
        title: 'Evidence and challenges',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Supporting:</strong> The overwhelming majority of actively
              managed funds fail to beat low-cost index funds over long periods—
              consistent with prices already being efficient.
            </p>
            <p>
              <strong>Anomalies:</strong> Seasonal effects, value and momentum
              premiums, and post-earnings drift suggest systematic patterns
              inconsistent with full efficiency.
            </p>
            <p>
              <strong>Behavioral finance:</strong> Psychological biases (see
              Overconfidence Bias, Mental Accounting) lead to mispricing that
              efficient markets would rule out.
            </p>
          </div>
        ),
      },
      {
        title: 'The practical lesson',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Indexing works:</strong> Even if markets aren&rsquo;t
              perfectly efficient, they are hard to beat after costs—so
              diversified, low-cost index funds beat most active managers.
            </p>
            <p>
              <strong>Insider trading is illegal:</strong> The strong
              form&rsquo;s most extreme claim is precisely why insider trading
              is prohibited— information advantage would let insiders profit
              unfairly.
            </p>
            <p>
              <strong>A lively debate:</strong> The EMH is one of
              finance&rsquo;s most contested ideas, dividing believers in market
              efficiency from behavioral economists who see persistent,
              exploitable mistakes (see Behavioral Finance).
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/efficient-market-hypothesis/random-walk',
        label: 'Random Walk Market',
        description:
          'Simulate a weak-form efficient market where a public tip has no reliable predictive power.',
      },
    ]}
    references={[
      {
        href: 'https://en.wikipedia.org/wiki/Efficient-market_hypothesis',
        label: 'Wikipedia: Efficient-Market Hypothesis',
        description:
          'Comprehensive overview of EMH forms, evidence, and critiques.',
      },
      {
        href: 'https://www.nobelprize.org/prizes/economic-sciences/2013/summary/',
        label: 'Nobel Prize: 2013 Economic Sciences',
        description:
          'Nobel citation for Eugene Fama, Lars Peter Hansen, and Robert Shiller for empirical analysis of asset prices.',
      },
      {
        href: 'https://www.investopedia.com/terms/e/efficientmarkethypothesis.asp',
        label: 'Investopedia: Efficient Market Hypothesis',
        description:
          'Entry explaining the three forms of EMH and implications for investing.',
      },
    ]}
  />
);

export default EMHPage;
