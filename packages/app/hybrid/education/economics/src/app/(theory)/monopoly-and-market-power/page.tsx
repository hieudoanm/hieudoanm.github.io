'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const MonopolyPage: NextPage = () => (
  <TheoryTemplate
    title="Monopoly & Market Power"
    subtitle="When one seller controls the market—and why that usually hurts consumers."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            A <strong>monopoly</strong> exists when a single seller dominates a
            market with no close substitutes. Because it faces no competition,
            the monopolist holds <strong>market power</strong>: the ability to
            raise price above the competitive level and still keep customers.
            The result is usually higher prices, lower output, and a transfer of
            wealth from consumers to the firm.
          </p>
        ),
      },
      {
        title: 'Sources of monopoly',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Barriers to entry:</strong> Monopolies persist because new
              competitors cannot easily enter. High fixed costs, control of key
              inputs, and strong economies of scale keep rivals out.
            </p>
            <p>
              <strong>Natural monopoly:</strong> When one firm can serve the
              whole market at lower average cost than two or more firms—as with
              water, electricity, and rail—competition is wasteful and a single
              provider is natural.
            </p>
            <p>
              <strong>Legal and strategic:</strong> Patents, licenses, and
              exclusive rights grant temporary monopolies, while
              anti-competitive practices and network effects can entrench
              dominant firms.
            </p>
          </div>
        ),
      },
      {
        title: 'How a monopolist prices',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Price setter, not taker:</strong> Unlike a competitive
              firm that accepts the market price, a monopolist chooses a price
              by balancing higher price against fewer sales.
            </p>
            <p>
              <strong>Marginal revenue &lt; price:</strong> To sell more, the
              monopolist must cut the price on all units, so the extra revenue
              from an additional sale is less than the price charged. This drags
              output below the competitive level and price above it.
            </p>
            <p>
              <strong>Profit-maximizing quantity:</strong> The monopolist
              produces where marginal revenue equals marginal cost, then charges
              the highest price that quantity will bear.
            </p>
          </div>
        ),
      },
      {
        title: 'The cost to society',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Deadweight loss:</strong> Because the monopolist charges
              above marginal cost, some buyers who value the product more than
              its cost don&rsquo;t buy. Those foregone transactions are pure
              waste—a loss to society with no corresponding gain.
            </p>
            <p>
              <strong>Reduced innovation:</strong> Without competitive pressure,
              a protected monopolist has weaker incentives to improve products
              or cut costs—though the promise of monopoly profits also funds
              research.
            </p>
            <p>
              <strong>Rent seeking:</strong> Firms may spend resources lobbying
              to obtain or protect a monopoly position, diverting effort from
              productive activity.
            </p>
            <p>
              <strong>Antitrust response:</strong> Competition policy—breaking
              up monopolies, blocking anti-competitive mergers, and regulating
              natural monopolies—aims to restore competition and protect
              consumers.
            </p>
          </div>
        ),
      },
    ]}
    references={[
      {
        href: 'https://en.wikipedia.org/wiki/Monopoly',
        label: 'Wikipedia: Monopoly',
        description:
          'Overview of monopoly theory, pricing, deadweight loss, and regulation.',
      },
      {
        href: 'https://www.investopedia.com/terms/m/monopoly.asp',
        label: 'Investopedia: Monopoly',
        description:
          'Entry defining monopoly, barriers to entry, and market power.',
      },
      {
        href: 'https://www.britannica.com/topic/monopoly-economics',
        label: 'Encyclopedia Britannica: Monopoly',
        description:
          'Encyclopedia entry on monopoly and its effects on market outcomes.',
      },
    ]}
  />
);

export default MonopolyPage;
