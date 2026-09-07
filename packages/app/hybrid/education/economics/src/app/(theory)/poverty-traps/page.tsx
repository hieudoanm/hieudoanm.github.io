'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const PovertyTrapsPage: NextPage = () => (
  <TheoryTemplate
    title="Poverty Traps"
    subtitle="Why the poor can stay poor: self-reinforcing cycles that block escape from destitution."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            A <strong>poverty trap</strong> is a self-reinforcing mechanism that
            keeps people or countries poor even when escape is theoretically
            possible. Because the poor lack the minimal resources—savings,
            health, education, credit—needed to make productive investments,
            they can&rsquo;t take the step that would lift them out of poverty.
            It contrasts with the view that markets naturally reward effort and
            lift everyone (see Development Economics).
          </p>
        ),
      },
      {
        title: 'How traps form',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Credit constraints:</strong> Poor households can&rsquo;t
              borrow to invest in seeds, tools, or skills, so they remain
              trapped at subsistence levels despite high returns to investment.
            </p>
            <p>
              <strong>Health:</strong> Malnutrition and disease sap energy and
              productivity, lowering income, worsening health further—a downward
              spiral.
            </p>
            <p>
              <strong>Education:</strong> Families too poor to send children to
              school or keep them healthy reproduce low human capital across
              generations.
            </p>
            <p>
              <strong>Geography and institutions:</strong> Weak infrastructure
              and institutions can trap entire regions, not just individuals.
            </p>
          </div>
        ),
      },
      {
        title: 'Thresholds and S-curves',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Multiple equilibria:</strong> Below a certain asset
              threshold, income growth fails to take off and people stagnate;
              above it, they accumulate and grow. This produces two stable
              outcomes rather than one smooth path.
            </p>
            <p>
              <strong>The poverty line matters:</strong> Whether a &ldquo;big
              push&rdquo; (a coordinated wave of investment) can leap the
              threshold is a central debate.
            </p>
            <p>
              <strong>Not universal:</strong> Many poor people are poor mainly
              due to temporary shocks or bad luck, not a trap—distinguishing the
              two matters for policy.
            </p>
          </div>
        ),
      },
      {
        title: 'The policy implication',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Targeted transfers:</strong> One-off grants, cash
              transfers, and asset provision (livestock, capital) can push
              households past the threshold to self-sustaining growth.
            </p>
            <p>
              <strong>Microfinance and access:</strong> Extending credit and
              insurance lets the poor invest and smooth shocks that would
              otherwise push them back into poverty.
            </p>
            <p>
              <strong>Evidence-first:</strong> Randomized trials (see
              Development RCTs) test which interventions actually break traps,
              informing cost-effective aid.
            </p>
          </div>
        ),
      },
    ]}
    references={[
      {
        href: 'https://en.wikipedia.org/wiki/Poverty_trap',
        label: 'Wikipedia: Poverty Trap',
        description:
          'Overview of self-reinforcing mechanisms that keep people poor.',
      },
      {
        href: 'https://www.investopedia.com/terms/p/poverty-trap.asp',
        label: 'Investopedia: Poverty Trap',
        description:
          'Entry on the causes of poverty traps and proposed solutions.',
      },
      {
        href: 'https://www.nobelprize.org/prizes/economic-sciences/2019/summary/',
        label: 'Nobel Prize: 2019 laureates',
        description:
          '2019 prize for the experimental approach to alleviating global poverty.',
      },
    ]}
  />
);

export default PovertyTrapsPage;
