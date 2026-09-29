import { FC } from 'react';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const RaceModelsPage: FC = () => (
  <TheoryTemplate
    title="Race Models"
    subtitle=""
    parentLink={{ href: '/neuroscience', label: 'Neuroscience' }}
    sections={[
      {
        title: 'Overview',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              <strong>Race Models</strong> represent a broad class of
              decision-making frameworks where different response options are
              modeled as entirely independent accumulators. Rather than evidence
              for one choice subtracting from another (as in the Drift Diffusion
              Model), each alternative &quot;races&quot; toward its own
              threshold. The first accumulator to cross its threshold determines
              both the choice made and the response time.
            </p>
          </div>
        ),
      },
      {
        title: 'Independent Accumulation',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              The defining feature of a pure race model is <em>independence</em>
              . Evidence supporting Option A does not interact with evidence
              supporting Option B. This architecture easily scales to
              multiple-choice decisions (e.g., 3, 4, or 10 options) simply by
              adding more accumulators.
            </p>
            <p>
              Classic examples include the Vickers Accumulator Model and various
              Poisson counter models. Unlike the LBA, standard race models often
              incorporate within-trial noise (diffusion), and unlike the LCA,
              they lack lateral inhibition.
            </p>
          </div>
        ),
      },
      {
        title: 'Statistical Facilitation',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              Race models naturally predict a phenomenon known as{' '}
              <em>statistical facilitation</em> (or the redundant targets
              effect). If a task presents two redundant targets that can both
              trigger a response, the overall response time is faster than the
              response time to either target alone. This occurs because you are
              taking the minimum completion time of two independent racing
              processes.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/neuroscience/race-models/interactive',
        label: 'Race Model Simulator',
        description:
          'Run a classic independent race and observe how multiple choices affect decision speed.',
      },
    ]}
    references={[
      {
        href: 'https://doi.org/10.1080/00140137008931117',
        label: 'Vickers (1970) — Ergonomics',
        description:
          'Evidence for an accumulator model of psychophysical discrimination.',
      },
      {
        href: 'https://doi.org/10.1037/0033-295X.85.2.59',
        label: 'Ratcliff (1978) — Psychological Review',
        description:
          'Statistical facilitation and the classic race model formulation.',
      },
    ]}
  />
);

export default RaceModelsPage;
