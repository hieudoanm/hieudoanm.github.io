'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const MarketMicrostructurePage: NextPage = () => (
  <TheoryTemplate
    title="Market Microstructure"
    subtitle="How the mechanics of trading—not just fundamentals—shape prices and liquidity."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            <strong>Market microstructure</strong> studies the process and rules
            by which financial assets are traded: how orders are matched, who
            provides liquidity, how information reaches prices, and how
            transaction costs are formed. It explains phenomena that standard
            efficient-market theory cannot—such as bid-ask spreads, price
            impact, and volatility clustering. Work by Grossman, Stiglitz, and
            Kyle forms the theoretical core.
          </p>
        ),
      },
      {
        title: 'The Grossman-Stiglitz paradox',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>The puzzle:</strong> If prices perfectly reflected all
              information, nobody would pay to acquire that information—yet if
              nobody acquires it, prices can&rsquo;t reflect it. Perfectly
              efficient markets are logically inconsistent.
            </p>
            <p>
              <strong>The resolution:</strong> Prices are naturally
              <strong> noisy</strong>. Because information gathering is costly,
              informed traders must be compensated through profits earned from
              uninformed traders. Equilibrium requires a degree of inefficiency
              to reward information collection.
            </p>
            <p>
              <strong>Implication:</strong> Information asymmetry is not a
              market failure to eliminate but a structural feature that makes
              markets function and prices informative.
            </p>
          </div>
        ),
      },
      {
        title: 'How prices form',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Bid-ask spread:</strong> The difference between the
              highest buy and lowest sell price compensates market makers for
              inventory risk, adverse selection, and processing costs. It is the
              transaction cost of immediate execution.
            </p>
            <p>
              <strong>Liquidity:</strong> How easily an asset can be bought or
              sold without moving its price. Liquid markets have tight spreads
              and can absorb large orders.
            </p>
            <p>
              <strong>Price impact:</strong> A large order moves prices as it
              reveals information or exhausts available liquidity. Kyle&rsquo;s
              model shows how informed trading is gradually incorporated into
              prices without fully revealing the information.
            </p>
          </div>
        ),
      },
      {
        title: 'Real-world applications',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>High-frequency trading:</strong> Microstructure explains
              how HFT firms profit from minuscule spreads and speed advantages,
              and whether they improve or harm liquidity.
            </p>
            <p>
              <strong>Market design:</strong> Exchanges choose between order
              types, tick sizes, and matching rules (continuous vs periodic
              auctions), which directly shape liquidity and price discovery.
            </p>
            <p>
              <strong>Flash crashes:</strong> The 2010 flash crash is analyzed
              through liquidity withdrawal and order-book
              dynamics—microstructure concepts.
            </p>
            <p>
              <strong>Transaction cost analysis:</strong> Institutional
              investors use microstructure to estimate and minimize the cost of
              executing large trades.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/economics/market-microstructure/order-book',
        label: 'Order Book',
        description:
          'Trade the spread: cross it with market orders or earn it back with limits.',
      },
    ]}
    references={[
      {
        href: 'https://en.wikipedia.org/wiki/Market_microstructure',
        label: 'Wikipedia: Market Microstructure',
        description:
          'Overview of trading mechanics, bid-ask spreads, and price formation.',
      },
      {
        href: 'https://www.investopedia.com/terms/m/market-microstructure.asp',
        label: 'Investopedia: Market Microstructure',
        description:
          'Entry explaining how market structure affects prices and liquidity.',
      },
      {
        href: 'https://en.wikipedia.org/wiki/Grossman%E2%80%93Stiglitz_paradox',
        label: 'Wikipedia: Grossman-Stiglitz Paradox',
        description:
          'Explanation of the paradox linking information costs to market efficiency.',
      },
    ]}
  />
);

export default MarketMicrostructurePage;
