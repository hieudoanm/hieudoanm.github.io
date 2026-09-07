'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const ArbitragePage: NextPage = () => (
  <TheoryTemplate
    title="Arbitrage"
    subtitle="Buying cheap and selling dear at the same moment—the force that keeps prices in line."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            <strong>Arbitrage</strong> is the practice of profiting from a price
            difference for the same (or equivalent) asset in different markets,
            buying where it is cheap and simultaneously selling where it is
            dear. Classically it is risk-free—the trades lock in a guaranteed
            profit. Its importance is not just the profit, but the role it plays
            in forcing prices toward a single, consistent value.
          </p>
        ),
      },
      {
        title: 'How it works',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>The opportunity:</strong> If gold trades at a lower price
              in London than in New York, an arbitrageur buys in London and
              sells in New York, capturing the spread with no risk.
            </p>
            <p>
              <strong>Across markets and instruments:</strong> The same logic
              applies to currencies, commodities, and even related securities
              whose relative prices have drifted apart.
            </p>
            <p>
              <strong>Speed matters:</strong> Modern arbitrage is largely
              automated and algorithmic, executed in milliseconds before the
              price gap closes.
            </p>
          </div>
        ),
      },
      {
        title: 'The law of one price',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Convergence:</strong> By buying the underpriced asset and
              selling the overpriced one, arbitrageurs push each toward their
              common fair value—enforcing the <strong>law of one price</strong>.
            </p>
            <p>
              <strong>Efficiency role:</strong> Arbitrage is the mechanism that
              keeps markets efficient, ensuring identical assets trade at
              consistent prices (see the Efficient Market Hypothesis).
            </p>
            <p>
              <strong>Limits:</strong> &ldquo;Risk arbitrage&rdquo; and{' '}
              <strong>limits to arbitrage</strong>—noise-trader risk, costs, and
              short-selling constraints—mean mispricing can persist for long
              periods.
            </p>
          </div>
        ),
      },
      {
        title: 'Modern forms and critics',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Statistical arbitrage:</strong> Instead of identical
              assets, quant funds trade statistically related securities betting
              that their historical price relationship reasserts itself.
            </p>
            <p>
              <strong>Global arbitrage:</strong> Cross-border price gaps also
              reflect transaction costs, taxes, and capital controls—so the law
              of one price holds only up to those frictions.
            </p>
            <p>
              <strong>Not always risk-free:</strong> True pure arbitrage is rare
              and fleeting; most &ldquo;arbitrage&rdquo; strategies carry
              residual risk, especially when prices can stay &ldquo;wrong&rdquo;
              longer than expected.
            </p>
          </div>
        ),
      },
    ]}
  />
);

export default ArbitragePage;
