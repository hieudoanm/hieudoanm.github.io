'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const InstitutionsGrowthPage: NextPage = () => (
  <TheoryTemplate
    title="Institutions & Economic Growth"
    subtitle="Why the rules of a society—its institutions—decide whether nations prosper or stagnate."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            The study of <strong>institutions and growth</strong> asks why some
            countries are rich and others poor over the long run. The answer
            increasingly points to <strong>institutions</strong>: the formal and
            informal rules that shape incentives. Douglass North (1993)
            formalized this view, and Daron Acemoglu, Simon Johnson, and James
            Robinson (2024) showed that countries with more{' '}
            <strong>inclusive</strong> institutions grow faster than those with{' '}
            <strong>extractive</strong> ones.
          </p>
        ),
      },
      {
        title: 'Inclusive vs extractive',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Inclusive institutions:</strong> Protect property rights,
              enforce contracts, allow broad participation, and reward
              innovation. They encourage investment, entrepreneurship, and
              growth by aligning private incentives with social value.
            </p>
            <p>
              <strong>Extractive institutions:</strong> Concentrate power and
              wealth in a small elite, expropriate the many, and suppress
              competition and innovation. They generate wealth for the few but
              stagnation for the many.
            </p>
            <p>
              <strong>Politics first:</strong> Institutions are not neutral
              technical arrangements—they reflect the distribution of political
              power. Those in power create rules that favor themselves.
            </p>
          </div>
        ),
      },
      {
        title: 'Why institutions matter',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Incentives drive behavior:</strong> If people believe
              their profits will be expropriated, they stop investing,
              innovating, and producing. Secure property rights and a fair rule
              of law create the confidence growth requires.
            </p>
            <p>
              <strong>The geography puzzle:</strong> Geography and climate
              partly explain income, but cannot explain reversals of fortune.
              Places once rich became poor and vice versa as institutions
              changed—evidence that institutions, not resources, are decisive.
            </p>
            <p>
              <strong>Colonial legacy:</strong> Acemoglu, Johnson, and Robinson
              showed that colonies with dense European settlement developed
              inclusive institutions and prosper, while those exploited for
              extraction developed extractive institutions and lagged—a reversal
              within the former colonial world.
            </p>
          </div>
        ),
      },
      {
        title: 'Why growth persists or stalls',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Self-reinforcing dynamics:</strong> Inclusive institutions
              create constituencies that defend them and invest further.
              Extractive institutions resist reform because elites benefit from
              the status quo—a vicious cycle.
            </p>
            <p>
              <strong>Critical junctures:</strong> Historical turning points
              (revolutions, disasters, technological shocks) can reshape
              institutions, but their direction depends on political conflicts
              at that moment.
            </p>
            <p>
              <strong>The reform challenge:</strong> If institutions are the
              deep cause of prosperity, then lasting development requires
              changing them—a slow, contested, political process, not a
              technical fix.
            </p>
          </div>
        ),
      },
    ]}
  />
);

export default InstitutionsGrowthPage;
