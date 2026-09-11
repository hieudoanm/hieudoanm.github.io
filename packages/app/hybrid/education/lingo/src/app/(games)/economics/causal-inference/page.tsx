'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const CausalInferencePage: NextPage = () => (
  <TheoryTemplate
    title="Causal Inference & LATE"
    subtitle="Moving beyond correlation to understand what actually causes what."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            <strong>Causal inference</strong> is the set of methods for
            estimating cause and effect from data—answering &ldquo;what happens
            if we change X?&rdquo; rather than merely observing that X and Y
            move together. The&nbsp;2019 and 2021 Nobel Prizes recognized this
            work. A central concept is the{' '}
            <strong>Local Average Treatment Effect (LATE)</strong>: the causal
            effect only for the specific subpopulation whose treatment status
            was actually changed by the instrument.
          </p>
        ),
      },
      {
        title: 'Why correlation is not causation',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Confounding:</strong> A third variable may cause both X
              and Y. Wealth causes both ice cream purchases and better health,
              so the two correlate—yet ice cream does not cause health.
            </p>
            <p>
              <strong>Reverse causation:</strong> The arrow may point the other
              way. Stress and long work hours correlate, but which causes which?
            </p>
            <p>
              <strong>Selection bias:</strong> The people we observe were not
              randomly assigned. Those who choose a treatment differ from those
              who don&rsquo;t in ways that confound the comparison—this is why
              naive comparisons of treated and untreated groups are misleading.
            </p>
          </div>
        ),
      },
      {
        title: 'Core methods',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Randomized controlled trials:</strong> The gold standard.
              Random assignment balances confounders on average, so the
              difference in outcomes is attributable to treatment.
            </p>
            <p>
              <strong>Regression discontinuity:</strong> Compare units just
              above and just below a cutoff (e.g., a test threshold for a
              scholarship). Those near the threshold are nearly identical, so
              any outcome jump reveals the treatment effect.
            </p>
            <p>
              <strong>Difference-in-differences:</strong> Compare the change
              over time for a treated group against the change for an untreated
              comparison group, netting out common trends.
            </p>
            <p>
              <strong>Instrumental variables:</strong> Use an exogenous variable
              (the instrument) that affects treatment but not the outcome
              directly, isolating the causal path.
            </p>
          </div>
        ),
      },
      {
        title: 'LATE and its limits',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>What LATE measures:</strong> An instrumental-variable
              estimate recovers the effect only for the{' '}
              <strong>compliers</strong>—those induced to take treatment by the
              instrument. It is local, not global.
            </p>
            <p>
              <strong>Why it matters:</strong> The LATE for &ldquo;college
              attendance due to distance from campus&rdquo; may differ from the
              effect for the average person. The finding only generalizes with
              care.
            </p>
            <p>
              <strong>Interpretation:</strong> A LATE is the right answer to a
              precisely delimited question, but the wrong answer to a broad one
              (&ldquo;what&rsquo;s the effect of college for everyone?&rdquo;).
              Researchers must be explicit about which population they identify.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/economics/causal-inference/experiments',
        label: 'Causation Challenge',
        description:
          'Interactive quiz: classify six real-world correlations as causal or spurious, using an investigation budget of randomized trials and confounder controls.',
      },
    ]}
    references={[
      {
        href: 'https://en.wikipedia.org/wiki/Causal_inference',
        label: 'Wikipedia: Causal Inference',
        description:
          'Survey of methods for estimating cause and effect from observational and experimental data.',
      },
      {
        href: 'https://www.nobelprize.org/prizes/economic-sciences/2021/card-angrist-imbens/summary/',
        label: 'Nobel Prize: 2021 (Card, Angrist, Imbens)',
        description:
          'Nobel Prize page recognizing contributions to natural experiments and causal inference methods.',
      },
      {
        href: 'https://www.nobelprize.org/prizes/economic-sciences/2019/banerjee-duflo-kremer/summary/',
        label: 'Nobel Prize: 2019 (Banerjee, Duflo, Kremer)',
        description:
          'Nobel Prize page recognizing experimental approaches to alleviating global poverty.',
      },
    ]}
  />
);

export default CausalInferencePage;
