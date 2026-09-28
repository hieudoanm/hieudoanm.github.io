import { FC } from 'react';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const LeakyCompetingAccumulatorPage: FC = () => (
  <TheoryTemplate
    title="Leaky Competing Accumulator (LCA)"
    subtitle=""
    parentLink={{ href: '/neuroscience', label: 'Neuroscience' }}
    sections={[
      {
        title: 'Overview',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              The <strong>Leaky Competing Accumulator (LCA)</strong> model,
              developed by Usher and McClelland (2001), offers a neurally
              plausible framework for human decision-making. Like race models,
              it uses separate accumulators for each choice alternative.
              However, it incorporates two critical biologically inspired
              mechanisms:
              <em>leakage</em> and <em>lateral inhibition</em>.
            </p>
          </div>
        ),
      },
      {
        title: 'Core Mechanisms: Leak & Inhibition',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              Unlike standard accumulation models where evidence builds up
              indefinitely, the LCA assumes that neural representations decay
              over time.
            </p>
            <ul className="ml-5 flex list-disc flex-col gap-2">
              <li>
                <strong>Leakage (λ):</strong> Accumulated evidence decays
                proportional to its current activation. This prevents runaway
                activation and naturally models forgetting or loss of context.
              </li>
              <li>
                <strong>Lateral Inhibition (β):</strong> Accumulators actively
                suppress each other. As one option gains evidence, it suppresses
                competing options, acting as a competitive
                &quot;winner-take-all&quot; mechanism.
              </li>
            </ul>
          </div>
        ),
      },
      {
        title: 'Neural Plausibility',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              The LCA is highly influential because it maps directly onto
              neurophysiological findings. Recordings in the posterior parietal
              cortex and frontal eye fields during choice tasks show precisely
              these dynamics: recurrent excitation (accumulation), decay (leak),
              and mutual suppression between neural populations encoding
              different targets.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/neuroscience/leaky-competing-accumulator/interactive',
        label: 'LCA Simulator',
        description:
          'Experiment with leak and inhibition parameters in a noisy accumulator network.',
      },
    ]}
    references={[
      {
        href: 'https://doi.org/10.1037/0033-295X.108.3.550',
        label: 'Usher & McClelland (2001) — Psychological Review',
        description:
          'The foundational paper detailing the LCA model and its neural inspiration.',
      },
    ]}
  />
);

export default LeakyCompetingAccumulatorPage;
