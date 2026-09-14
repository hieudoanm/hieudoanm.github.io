'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const PerfectCompetitionPage: NextPage = () => (
  <TheoryTemplate
    title="Perfect Competition"
    subtitle="The idealized market where no one can influence price—and the benchmark for efficiency."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            <strong>Perfect competition</strong> is a market structure with many
            small buyers and sellers trading an identical product, with free
            entry and exit and perfect information. No single participant can
            influence the price—everyone is a <strong>price taker</strong>. It
            is rarely observed in reality but serves as the crucial benchmark
            against which efficiency and market power are measured.
          </p>
        ),
      },
      {
        title: 'Conditions',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Many participants:</strong> So many buyers and sellers
              that none can affect the market price by acting alone.
            </p>
            <p>
              <strong>Homogeneous product:</strong> Goods are identical, so
              consumers have no reason to prefer one seller&rsquo;s output over
              another&rsquo;s.
            </p>
            <p>
              <strong>Free entry and exit:</strong> Firms can enter or leave
              without barriers, so profits attract competition and losses
              trigger exit.
            </p>
            <p>
              <strong>Perfect information:</strong> Everyone knows prices,
              costs, and product quality, so no one is exploited by hidden
              differences.
            </p>
          </div>
        ),
      },
      {
        title: 'The results',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Price equals marginal cost:</strong> Each firm produces
              where price equals marginal cost—the condition for allocative
              efficiency, where resources flow to their most valued uses.
            </p>
            <p>
              <strong>Zero long-run profit:</strong> Entry and exit drive price
              to the minimum of average total cost, so firms earn only normal
              profit—productive efficiency at lowest possible cost.
            </p>
            <p>
              <strong>No market power:</strong> Every firm is a price taker,
              unable to raise price without losing all customers. The market
              price clears the market at the lowest sustainable cost.
            </p>
          </div>
        ),
      },
      {
        title: 'Why it matters as a benchmark',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Efficiency standard:</strong> Perfect competition produces
              the ideal allocation. Comparing real markets to it reveals how far
              market power distorts prices and output.
            </p>
            <p>
              <strong>Deadweight loss measure:</strong> The gap between
              competitive and actual pricing shows the social loss from monopoly
              and imperfect competition.
            </p>
            <p>
              <strong>Limits:</strong> Real markets rarely satisfy all
              conditions; the model is a simplification. It also ignores
              externalities and imperfect information, which is why those are
              studied separately as market failures.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/economics/perfect-competition/firm',
        label: 'Competitive Firm Lab',
        description:
          'A price-taking firm: choose output where price equals marginal cost, and watch long-run profits fall to zero.',
      },
    ]}
    references={[
      {
        href: 'https://en.wikipedia.org/wiki/Perfect_competition',
        label: 'Wikipedia: Perfect Competition',
        description: 'Overview of the market structure and its assumptions.',
      },
      {
        href: 'https://www.investopedia.com/terms/p/perfectcompetition.asp',
        label: 'Investopedia: Perfect Competition',
        description:
          'Entry on the conditions, results, and efficiency of perfect competition.',
      },
      {
        href: 'https://www.britannica.com/topic/perfect-competition',
        label: 'Britannica: Perfect Competition',
        description:
          'Article on the idealized market used as the benchmark for efficiency.',
      },
    ]}
  />
);

export default PerfectCompetitionPage;
