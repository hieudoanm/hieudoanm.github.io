'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const EndowmentEffectPage: NextPage = () => (
  <TheoryTemplate
    title="The Endowment Effect"
    subtitle="Why people demand more to give something up than they would pay to get it."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            The <strong>endowment effect</strong> is the finding that people
            value something more once they own it. Simply possessing an item
            raises the price they demand to part with it above what they would
            have paid to acquire it in the first place. It is one of the most
            robust demonstrations that preferences depend on the reference point
            of ownership, contradicting standard economic assumptions.
          </p>
        ),
      },
      {
        title: 'How it is demonstrated',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>The classic mugs study:</strong> In a famous experiment,
              randomly chosen students given a coffee mug demanded far more to
              sell it (willingness to accept) than non-owners offered to buy it
              (willingness to pay)—despite random assignment meaning no true
              value difference existed.
            </p>
            <p>
              <strong>Reference dependence:</strong> The gap arises because
              owners anchor on the loss of the item, while buyers anchor on the
              gain—consistent with loss aversion.
            </p>
            <p>
              <strong>Robust but not universal:</strong> The effect is strongest
              for goods people feel attached to or use regularly, and weaker for
              money or purely exchangeable goods.
            </p>
          </div>
        ),
      },
      {
        title: 'The psychological driver',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Loss aversion:</strong> Giving up an owned object is felt
              as a loss, which hurts twice as much as an equivalent gain feels
              good (see Prospect Theory)—so owners overprice what they&rsquo;d
              sell.
            </p>
            <p>
              <strong>Identity and attachment:</strong> Owned items become part
              of the self, making their loss feel like a personal loss.
            </p>
            <p>
              <strong>Status quo bias:</strong> The endowment effect is a
              special case of favoring the current situation over a change,
              making people stick with what they have (see Status Quo Bias).
            </p>
          </div>
        ),
      },
      {
        title: 'Why it matters',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Voluntary exchange puzzles:</strong> A strong endowment
              effect can reduce the gains from trade predicted by rational
              models, since sellers value goods more than buyers.
            </p>
            <p>
              <strong>Investment behavior:</strong> Investors become reluctant
              to sell assets they own—especially losers—contributing to the
              disposition effect in finance.
            </p>
            <p>
              <strong>Policy and pricing:</strong> Free trials and ownership
              framing exploit the effect; companies that let customers
              &ldquo;own&rdquo; a product first make them value it more and are
              harder to give up.
            </p>
          </div>
        ),
      },
    ]}
  />
);

export default EndowmentEffectPage;
