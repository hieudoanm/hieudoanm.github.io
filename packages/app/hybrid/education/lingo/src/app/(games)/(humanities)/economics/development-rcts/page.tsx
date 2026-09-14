'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const DevelopmentRCTsPage: NextPage = () => (
  <TheoryTemplate
    title="Development Economics & RCTs"
    subtitle="Using randomized experiments to discover what actually reduces poverty."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            <strong>Development RCTs</strong> apply the methods of clinical
            trials to development policy. Researchers randomly assign villages,
            schools, or households to receive an intervention, then compare
            outcomes against a control group. This approach, championed by
            Abhijit Banerjee, Esther Duflo, and Michael Kremer (Nobel Prize
            2019), shifted development economics from grand theories toward
            evidence about what actually works.
          </p>
        ),
      },
      {
        title: 'Why randomized trials',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Clean identification:</strong> Random assignment means
              treated and control groups are balanced on both observable and
              unobservable characteristics, so any difference in outcomes is
              attributable to the intervention—not to selection.
            </p>
            <p>
              <strong>Credible answers to specific questions:</strong> Instead
              of debating whether &ldquo;education improves income,&rdquo; an
              RCT asks precisely: does providing free deworming pills improve
              school attendance?
            </p>
            <p>
              <strong>Iterative improvement:</strong> Results feed back into
              program design. First test the medication, then test how to get
              people to take it, then test how to scale the delivery.
            </p>
          </div>
        ),
      },
      {
        title: 'Landmark findings',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Deworming:</strong> Kremer&rsquo;s school deworming
              program in Kenya found that deworming tablets dramatically
              improved attendance cheaply—spurring mass treatment programs
              across the developing world.
            </p>
            <p>
              <strong>Micro-credit:</strong> Banerjee and Duflo found that
              extending micro-credit to poor households had modest effects on
              business creation but did not transform lasting poverty—tempering
              earlier hype.
            </p>
            <p>
              <strong>Teaching at the right level:</strong> RCTs showed that
              tailoring instruction to students&rsquo; actual level (rather than
              the curriculum) dramatically improved learning, influencing policy
              across several countries.
            </p>
            <p>
              <strong>Commitment savings:</strong> Devices that lock up savings
              helped people save more—consistent with present bias—guiding
              products like commitment savings accounts.
            </p>
          </div>
        ),
      },
      {
        title: 'Criticisms and limits',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>External validity:</strong> A result in one village may
              not hold elsewhere or at scale. RCTs answer localized questions
              well but generalizing requires judgment beyond the experiment.
            </p>
            <p>
              <strong>LATE and heterogeneity:</strong> RCTs estimate average
              effects for the studied population, not for everyone. Effects
              often vary across subgroups, making blanket conclusions risky.
            </p>
            <p>
              <strong>Ethics:</strong> Randomly denying a potentially helpful
              intervention to a control group raises moral questions, though
              researchers argue ignorance is itself costly.
            </p>
            <p>
              <strong>Narrow focus:</strong> Critics contend RCTs favor small,
              measurable interventions while sidelining big structural questions
              about institutions, power, and inequality.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/economics/development-rcts/experiment',
        label: 'RCT Simulator',
        description:
          'Run your own experiment: pick a sample size and allocation, observe the ATE and confidence interval, then judge whether the finding is significant or noise.',
      },
    ]}
    references={[
      {
        href: 'https://www.nobelprize.org/prizes/economic-sciences/2019/summary/',
        label: 'Nobel Prize: 2019 Economic Sciences',
        description:
          'Nobel citation for Banerjee, Duflo, and Kremer for their experimental approach to alleviating global poverty.',
      },
      {
        href: 'https://en.wikipedia.org/wiki/Randomized_controlled_trial',
        label: 'Wikipedia: Randomized Controlled Trial',
        description:
          'Explanation of RCT methodology, design principles, and applications in development economics.',
      },
      {
        href: 'https://www.povertyactionlab.org/',
        label: 'J-PAL: Poverty Action Lab',
        description:
          'MIT-led network conducting randomized evaluations of anti-poverty programs worldwide.',
      },
    ]}
  />
);

export default DevelopmentRCTsPage;
