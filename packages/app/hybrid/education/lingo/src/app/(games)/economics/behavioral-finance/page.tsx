'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const BehavioralFinancePage: NextPage = () => (
  <TheoryTemplate
    title="Behavioral Finance"
    subtitle="When investors are not rational: how psychology creates mispricing and market anomalies."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            <strong>Behavioral finance</strong> studies how psychological biases
            cause investors to act irrationally, diverging from the efficient,
            rational markets of classical theory. By combining economics with
            psychology, it explains bubbles, crashes, and price anomalies that
            standard models cannot. It is the practical application of
            behavioral economics to financial markets.
          </p>
        ),
      },
      {
        title: 'Key biases at work',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Overconfidence:</strong> Investors trade too much,
              believing they can predict markets better than they can—and
              excessive trading tends to hurt returns.
            </p>
            <p>
              <strong>Loss aversion:</strong> Losses hurt roughly twice as much
              as equivalent gains feel good (see Prospect Theory), making
              investors hold losing stocks too long and sell winners too early.
            </p>
            <p>
              <strong>Herding:</strong> Investors follow the crowd, amplifying
              trends and inflating bubbles that later burst.
            </p>
            <p>
              <strong>Mental accounting:</strong> Treating money differently
              depending on its source (see Mental Accounting), leading to
              suboptimal portfolio decisions.
            </p>
          </div>
        ),
      },
      {
        title: 'Market consequences',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Mispricing:</strong> Biases push asset prices away from
              their fundamental value, contradicting the Efficient Market
              Hypothesis.
            </p>
            <p>
              <strong>Bubbles and crashes:</strong> Herding and overconfidence
              drive asset prices far from value before the inevitable collapse—
              from tulips to tech stocks to housing.
            </p>
            <p>
              <strong>Anomalies:</strong> The value premium, momentum, and the
              equity premium puzzle appear hard to reconcile with fully rational
              pricing—behavioral finance explains them through bias and risk.
            </p>
          </div>
        ),
      },
      {
        title: 'Limits of the critique',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Rational arbitrage:</strong> Even if some investors are
              irrational, sophisticated arbitrageurs should correct mispricing—
              though limits to arbitrage (costs, risk, short-selling
              constraints) mean they often can&rsquo;t.
            </p>
            <p>
              <strong>Market discipline:</strong> Irrational investors lose
              money over time and are gradually filtered out, weakening their
              influence.
            </p>
            <p>
              <strong>Complement, not replacement:</strong> Most economists
              treat behavioral finance as enriching—rather than
              overturning—financial theory, explaining deviations around broadly
              efficient markets.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/economics/behavioral-finance/bubble',
        label: 'Bubble Lab',
        description:
          'Trade an asset as its price inflates beyond fundamentals, then crashes — learn to sell before the bubble bursts.',
      },
    ]}
    references={[
      {
        href: 'https://en.wikipedia.org/wiki/Behavioral_economics',
        label: 'Wikipedia: Behavioral Economics',
        description:
          'Survey of behavioral economics and its application to financial markets and investor bias.',
      },
      {
        href: 'https://www.investopedia.com/terms/b/behavioralfinance.asp',
        label: 'Investopedia: Behavioral Finance',
        description:
          'Entry defining behavioral finance and the key biases that affect investor decision-making.',
      },
      {
        href: 'https://www.nobelprize.org/prizes/economic-sciences/2017/thaler/summary/',
        label: 'Nobel Prize: Richard Thaler (2017)',
        description:
          'Nobel Prize page for Thaler, whose work on nudge theory and mental accounting shaped behavioral finance.',
      },
    ]}
  />
);

export default BehavioralFinancePage;
