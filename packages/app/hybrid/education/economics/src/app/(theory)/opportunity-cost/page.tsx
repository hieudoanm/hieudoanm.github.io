'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const OpportunityCostPage: NextPage = () => (
  <TheoryTemplate
    title="Opportunity Cost & Comparative Advantage"
    subtitle="The real cost of every choice, and why trade makes everyone better off."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            <strong>Opportunity cost</strong> is the value of the best
            alternative you give up when you make a choice. Every
            decision—spending money, using time, allocating resources—has an
            implicit cost: what you could have done instead.{' '}
            <strong>Comparative advantage</strong> builds on this: individuals,
            firms, or countries should specialize in producing what they make at
            the <em>lowest relative opportunity cost</em>, then trade. When
            everyone does this, total output grows and everyone can be better
            off.
          </p>
        ),
      },
      {
        title: 'Opportunity cost',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>It is not just price:</strong> Going to college costs
              tuition, but also the salary you gave up by not working. The true
              cost includes both.
            </p>
            <p>
              <strong>It applies to time and resources:</strong> Spending an
              hour watching a show costs the hour you could have spent working,
              studying, or resting.
            </p>
            <p>
              <strong>Decision-making:</strong> Rational choices weigh marginal
              benefits against the opportunity cost—not just the sticker price.
            </p>
          </div>
        ),
      },
      {
        title: 'Comparative vs absolute advantage',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Absolute advantage:</strong> Being able to produce more of
              a good with the same resources (the best at everything).
            </p>
            <p>
              <strong>Comparative advantage:</strong> Producing a good at a
              lower opportunity cost than others—even if you are worse at
              everything, you are still relatively better at something.
            </p>
            <p>
              <strong>The key insight:</strong> Trade is beneficial not because
              you are the best, but because both sides gain when each
              specializes in what they do relatively least-badly.
            </p>
          </div>
        ),
      },
      {
        title: 'Why trade works',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Specialization:</strong> Focusing effort where your
              opportunity cost is lowest increases total production.
            </p>
            <p>
              <strong>Gains from trade:</strong> Two parties can both come out
              ahead by exchanging even when one is more efficient at producing
              both goods—as long as opportunity costs differ.
            </p>
            <p>
              <strong>Real-world application:</strong> This is the core economic
              justification for free trade, division of labor, and
              specialization in teams and global markets.
            </p>
            <p>
              <strong>Warning:</strong> Opportunity costs change, so comparative
              advantage can shift over time—which is why skills and economies
              must keep adapting.
            </p>
          </div>
        ),
      },
    ]}
  />
);

export default OpportunityCostPage;
