'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const BargainingTheoryPage: NextPage = () => (
  <TheoryTemplate
    title="Bargaining Theory"
    subtitle="How two parties divide a surplus—and how the rules of negotiation decide the split."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            <strong>Bargaining theory</strong> studies how parties divide a
            surplus (money, power, gains from trade) when there is both common
            interest and conflict. Both sides prefer a deal to nothing, but each
            wants the larger share. The outcome depends on alternatives,
            patience, and the rules of the negotiation. John Nash&rsquo;s
            axiomatic approach and Rubinstein&rsquo;s alternating-offer model
            are the classic frameworks.
          </p>
        ),
      },
      {
        title: 'Nash bargaining solution',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>The framework:</strong> Nash (1950) asked what a fair,
              efficient bargain between two parties would look like, deriving a
              solution from axioms of symmetry, efficiency, and independence.
            </p>
            <p>
              <strong>Maximize the product of gains:</strong> The solution
              splits the surplus to maximize the product of each side&rsquo;s
              gain over its <strong>disagreement point</strong> (what each gets
              if no deal happens).
            </p>
            <p>
              <strong>Threat points matter:</strong> A party with a better
              outside option walks away with more. The better your fallback, the
              bigger your share of the surplus.
            </p>
          </div>
        ),
      },
      {
        title: 'Rubinstein bargaining',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Alternating offers:</strong> Players take turns proposing
              a split, and bargaining continues across rounds. Each round costs
              something because the surplus shrinks over time.
            </p>
            <p>
              <strong>Patience is power:</strong> The more patient player—who
              discounts the future less—can hold out longer and capture a larger
              share, because the impatient player concedes to avoid delay.
            </p>
            <p>
              <strong>Immediate agreement:</strong> In equilibrium, a deal is
              reached on the first round with an efficient split reflecting the
              relative patience of the two sides.
            </p>
          </div>
        ),
      },
      {
        title: 'Real-world applications',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Wage negotiations:</strong> A worker&rsquo;s leverage in
              salary talks depends on outside offers and how quickly each side
              wants to settle.
            </p>
            <p>
              <strong>Deal-making:</strong> Mergers, settlements, and two-party
              deals follow bargaining logic: alternatives and patience determine
              who captures the gains.
            </p>
            <p>
              <strong>International disputes:</strong> Dividing territory,
              resources, or treaty concessions reflects the relative power and
              patience of the negotiating parties.
            </p>
            <p>
              <strong>Bargaining power:</strong> Improving your alternatives
              (building skills, cultivating options) is the practical lever
              bargaining theory hands to negotiators.
            </p>
          </div>
        ),
      },
    ]}
  />
);

export default BargainingTheoryPage;
