'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const PriceDiscriminationPage: NextPage = () => (
  <TheoryTemplate
    title="Price Discrimination"
    subtitle="Charging different people different prices—for exactly the same product."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            <strong>Price discrimination</strong> is selling the same or similar
            product to different buyers at different prices. A firm can do this
            when it has market power, can identify customers with different
            willingness to pay, and can prevent resale between them. It lets
            firms capture more of the consumer surplus that would otherwise go
            to customers, raising revenue and often expanding output.
          </p>
        ),
      },
      {
        title: 'Three degrees',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>First degree (perfect):</strong> Charge each customer
              exactly their maximum willingness to pay, capturing all surplus.
              Rare in practice, but targeted pricing and negotiation approach
              it.
            </p>
            <p>
              <strong>Second degree (by quantity or version):</strong> Charge
              different prices for different amounts or versions—volume
              discounts, and premium vs. basic tiers—letting customers
              self-select.
            </p>
            <p>
              <strong>Third degree (by group):</strong> Charge different groups
              different prices—student discounts, senior prices, or
              country-based pricing—when groups differ in price sensitivity.
            </p>
          </div>
        ),
      },
      {
        title: 'Examples in practice',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Airline tickets:</strong> The same seat sells at vastly
              different prices based on booking time, flexibility, and traveler
              type—a classic mix of second- and third-degree discrimination.
            </p>
            <p>
              <strong>Software tiers:</strong> Free, personal, professional, and
              enterprise plans price discriminate by usage and willingness to
              pay.
            </p>
            <p>
              <strong>Coupons:</strong> Cutting coupons lets price-sensitive
              shoppers pay less while others pay full price, sorting buyers by
              their elasticity.
            </p>
            <p>
              <strong>Dynamic pricing:</strong> Algorithms adjust prices in real
              time based on demand, time, and user characteristics.
            </p>
          </div>
        ),
      },
      {
        title: 'Is it good or bad?',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Captures surplus:</strong> Firms earn more, capturing
              value that would otherwise remain with consumers—a transfer, not
              necessarily a waste.
            </p>
            <p>
              <strong>Can expand output:</strong> By lowering prices for elastic
              customers, discrimination can serve people who otherwise
              wouldn&rsquo;t buy, increasing output and possibly shrinking
              deadweight loss.
            </p>
            <p>
              <strong>Equity concerns:</strong> Charging groups differently can
              feel unfair, and aggressive personalization raises privacy
              worries.
            </p>
            <p>
              <strong>Arbitrage limits it:</strong> Discrimination only works if
              buyers can&rsquo;t resell between segments—which is why travel and
              services (with identity checks) discriminate more than goods.
            </p>
          </div>
        ),
      },
    ]}
  />
);

export default PriceDiscriminationPage;
