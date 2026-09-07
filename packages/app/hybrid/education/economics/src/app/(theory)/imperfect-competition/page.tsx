'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const ImperfectCompetitionPage: NextPage = () => (
  <TheoryTemplate
    title="Imperfect Competition"
    subtitle="The real world lies between perfect competition and monopoly—where firms hold some pricing power."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            <strong>Imperfect competition</strong> describes markets where firms
            hold some degree of market power, so they face downward-sloping
            demand curves and can raise price above marginal cost. It spans{' '}
            <strong>monopolistic competition</strong> (many firms selling
            differentiated products) and <strong>oligopoly</strong> (a few large
            firms). Almost every real market is imperfectly competitive—perfect
            competition is an idealized benchmark.
          </p>
        ),
      },
      {
        title: 'Monopolistic competition',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Many firms, differentiated products:</strong> Restaurants,
              clothing brands, and local firms compete vigorously while each
              offers something slightly unique—a distinct brand, quality, or
              location.
            </p>
            <p>
              <strong>Some pricing power:</strong> Differentiation means each
              firm can raise price a little without losing all customers, unlike
              a competitive price taker.
            </p>
            <p>
              <strong>Free entry and zero long-run profit:</strong> Profit
              attracts entrants who erode it until, in the long run, firms earn
              only normal profit—but they still price above marginal cost,
              leaving excess capacity relative to the ideal.
            </p>
          </div>
        ),
      },
      {
        title: 'The spectrum of market structures',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Perfect competition:</strong> Many identical producers, no
              market power, price equals marginal cost.
            </p>
            <p>
              <strong>Monopolistic competition:</strong> Many differentiated
              firms with modest market power.
            </p>
            <p>
              <strong>Oligopoly:</strong> A few large firms whose decisions are
              interdependent, with significant market power (see Oligopoly).
            </p>
            <p>
              <strong>Monopoly:</strong> A single seller with maximum market
              power (see Monopoly &amp; Market Power).
            </p>
          </div>
        ),
      },
      {
        title: 'Why it matters',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Higher prices, more variety:</strong> Market power lets
              firms price above cost (a deadweight loss), but differentiation
              delivers product variety consumers value—a genuine tradeoff.
            </p>
            <p>
              <strong>Advertising and branding:</strong> Under imperfect
              competition, firms invest heavily in advertising to differentiate
              and protect market share, which can be informative or wasteful.
            </p>
            <p>
              <strong>Antitrust:</strong> Regulators care about how much market
              power firms hold and exercise, scrutinizing mergers that would
              reduce competition.
            </p>
            <p>
              <strong>Most markets:</strong> From coffee shops to airlines,
              understanding imperfect competition is key to real-world pricing
              and firm strategy.
            </p>
          </div>
        ),
      },
    ]}
  />
);

export default ImperfectCompetitionPage;
