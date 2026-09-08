'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const PortfolioTheoryPage: NextPage = () => (
  <TheoryTemplate
    title="Portfolio Theory"
    subtitle="Why diversification is the only free lunch in investing—and how to build an optimal mix."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            <strong>Modern Portfolio Theory (MPT)</strong>, pioneered by Harry
            Markowitz, studies how to assemble assets to maximize expected
            return for a given level of risk. Its central finding: because asset
            returns don&rsquo;t move perfectly together, combining them in a
            portfolio reduces risk more than return—so investors can earn the
            same return for less risk purely through diversification.
          </p>
        ),
      },
      {
        title: 'Correlation is everything',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Diversification:</strong> The risk of a portfolio depends
              not just on each asset&rsquo;s own risk but on how their returns
              move together.
            </p>
            <p>
              <strong>Correlation:</strong> Holding assets with low or negative
              correlation smooths overall returns—when one falls, another tends
              to rise. This is why diversification reduces risk.
            </p>
            <p>
              <strong>The free lunch:</strong> Combining imperfectly correlated
              assets delivers a better risk-return tradeoff than any single
              asset alone.
            </p>
          </div>
        ),
      },
      {
        title: 'The efficient frontier',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>The frontier:</strong> Among all portfolios, some maximize
              return for each level of risk. This optimal set of portfolios is
              the <strong>efficient frontier</strong>.
            </p>
            <p>
              <strong>Below the frontier:</strong> Portfolios lying below it are
              inefficient—they accept more risk than necessary for their return,
              so they can be improved by rebalancing.
            </p>
            <p>
              <strong>On the frontier:</strong> Rational investors select a
              portfolio on the efficient frontier based on their risk tolerance.
            </p>
          </div>
        ),
      },
      {
        title: 'The capital market line',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Adding a risk-free asset:</strong> Combining the market
              portfolio with the risk-free asset gives the{' '}
              <strong>Capital Market Line</strong>—the best possible tradeoff
              between risk and return.
            </p>
            <p>
              <strong>The market portfolio:</strong> Theory implies every
              investor holds the same risky portfolio (the market) and adjusts
              risk by borrowing or lending at the risk-free rate.
            </p>
            <p>
              <strong>Indexing implication:</strong> This supports broad,
              low-cost market exposure (index funds) as the rational default,
              with risk adjusted by the share allocated to safe assets (see the
              Efficient Market Hypothesis).
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/portfolio-theory/frontier',
        label: 'Diversification Lab',
        description:
          'Mix three risky assets to trace the efficient frontier, and discover the 1/√N rule of idiosyncratic-risk reduction.',
      },
    ]}
    references={[
      {
        href: 'https://en.wikipedia.org/wiki/Modern_portfolio_theory',
        label: 'Wikipedia: Modern Portfolio Theory',
        description:
          'Overview of MPT, diversification, and the efficient frontier.',
      },
      {
        href: 'https://www.investopedia.com/terms/m/modernportfoliotheory.asp',
        label: 'Investopedia: Modern Portfolio Theory',
        description:
          'Entry on MPT, expected returns, and portfolio construction.',
      },
      {
        href: 'https://www.nobelprize.org/prizes/economic-sciences/1990/markowitz/facts/',
        label: 'Nobel Prize: Harry Markowitz (1990)',
        description:
          'Nobel biography of Markowitz, founder of modern portfolio theory.',
      },
    ]}
  />
);

export default PortfolioTheoryPage;
