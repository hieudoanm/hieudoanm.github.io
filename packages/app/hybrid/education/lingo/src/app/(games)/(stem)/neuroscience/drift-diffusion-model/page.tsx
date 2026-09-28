'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const DriftDiffusionModelPage: NextPage = () => (
  <TheoryTemplate
    title="Drift Diffusion Model"
    subtitle="How the brain accumulates noisy evidence over time to reach a binary decision — and why speed and accuracy trade off."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            The <strong>Drift Diffusion Model (DDM)</strong>, formalised by
            Roger Ratcliff (1978), is the dominant computational account of
            two-choice decision-making. It treats a decision as a{' '}
            <strong>noisy evidence-accumulation process</strong>: a particle
            drifts from a starting point toward one of two boundaries while
            being buffeted by random noise. The first boundary reached
            determines the response; the time taken determines the reaction
            time. The DDM simultaneously explains choice accuracy <em>and</em>{' '}
            the full shape of reaction-time distributions in a single coherent
            framework.
          </p>
        ),
      },
      {
        title: 'Core parameters',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Drift rate (v):</strong> The average speed and direction
              of evidence accumulation. High |v| means strong, reliable evidence
              — fast correct responses and few errors. Low |v|, near zero, means
              ambiguous evidence — slow responses with many errors. Negative v
              biases accumulation toward the wrong boundary.
            </p>
            <p>
              <strong>Boundary separation (a):</strong> The total distance
              between the two decision thresholds. Wide boundaries (high a)
              require more evidence before committing — slower but more
              accurate. Narrow boundaries (low a) are fast but error-prone. This
              parameter captures the <strong>speed–accuracy trade-off</strong>{' '}
              directly.
            </p>
            <p>
              <strong>Starting point (z):</strong> Where the evidence
              accumulator begins relative to the two boundaries. A bias toward
              one boundary (z ≠ a/2) produces faster responses for that option —
              modelling prior expectation or response bias.
            </p>
            <p>
              <strong>Non-decision time (t₀):</strong> Time attributable to
              peripheral processes — sensory encoding and motor execution — that
              do not involve the decision itself. It shifts the whole RT
              distribution without affecting accuracy.
            </p>
          </div>
        ),
      },
      {
        title: 'The speed–accuracy trade-off',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>
                Why people can be fast or accurate, but rarely both:
              </strong>{' '}
              Lowering the boundary separation (a) speeds up every decision
              because less evidence is needed, but the accumulator is more
              likely to be caught by noise on the wrong side — increasing
              errors. Raising a has the opposite effect. Crucially, the same
              change in task difficulty (changing v) affects both speed{' '}
              <em>and</em> accuracy simultaneously, which is the hallmark
              prediction that separates DDM from simpler threshold models.
            </p>
            <p>
              <strong>Urgency signals:</strong> In deadline paradigms, decision
              boundaries often collapse over time, trading accuracy for speed as
              time pressure increases — a dynamic extension of the standard
              model called the <strong>collapsing-boundary DDM</strong>.
            </p>
          </div>
        ),
      },
      {
        title: 'Neurobiological basis',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Cortical ramping activity:</strong> Neurons in areas such
              as the lateral intraparietal cortex (LIP) and dorsomedial frontal
              cortex show firing rates that rise gradually toward a fixed
              threshold before a saccade decision — a neural signature of
              evidence accumulation that maps directly onto the DDM accumulator.
            </p>
            <p>
              <strong>Basal ganglia and boundaries:</strong> The striatum and
              subthalamic nucleus influence the boundary separation, providing a
              biological substrate for speed–accuracy adjustments. Parkinson's
              disease, which damages these circuits, typically narrows
              boundaries — faster but more error-prone decisions.
            </p>
            <p>
              <strong>BOLD signals and DDM parameters:</strong> fMRI studies
              correlate trial-by-trial drift-rate estimates with BOLD activity
              in sensory cortex, and boundary-separation estimates with
              prefrontal and ACC activity — linking model parameters to distinct
              neural systems.
            </p>
          </div>
        ),
      },
      {
        title: 'Classic experiments modelled by DDM',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Random Dot Motion:</strong> Varying dot coherence changes
              drift rate while boundary and non-decision time stay constant —
              the cleanest laboratory manipulation of v.
            </p>
            <p>
              <strong>Flanker Task:</strong> Incongruent flankers reduce drift
              rate (conflicting evidence) and may widen boundaries (increased
              caution) — decomposing the congruency effect into distinct
              cognitive mechanisms.
            </p>
            <p>
              <strong>Stroop Task:</strong> Colour–word conflict reduces drift
              rate toward the correct colour response, and elevated non-decision
              time reflects additional processing overhead from word reading.
            </p>
            <p>
              <strong>Lexical Decision:</strong> High-frequency words produce
              higher drift rates than low-frequency words or non-words,
              capturing lexical access speed within the DDM framework.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/neuroscience/drift-diffusion-model/interactive',
        label: 'DDM Simulator',
        description:
          'Tune drift rate, boundary, and noise in real time and watch evidence accumulate toward a decision.',
      },
      {
        href: '/neuroscience/drift-diffusion-model/random-dot-motion',
        label: 'Random Dot Motion',
        description:
          'Judge the direction of coherent motion at four difficulty levels and observe how coherence scales drift rate.',
      },
      {
        href: '/neuroscience/drift-diffusion-model/flanker-task',
        label: 'Flanker Task',
        description:
          'Respond to the central arrow while ignoring flankers — measure the congruency cost on RT and accuracy.',
      },
      {
        href: '/neuroscience/drift-diffusion-model/stroop-task',
        label: 'Stroop Task',
        description:
          'Name the ink colour while ignoring the printed colour word — observe the Stroop interference effect.',
      },
      {
        href: '/neuroscience/drift-diffusion-model/lexical-decision',
        label: 'Lexical Decision',
        description:
          'Decide if each letter string is a real word — compare RTs for words vs non-words.',
      },
      {
        href: '/neuroscience/drift-diffusion-model/numerical-comparison',
        label: 'Numerical Comparison',
        description:
          'Choose the larger of two digits and experience the distance effect on speed and accuracy.',
      },
      {
        href: '/neuroscience/drift-diffusion-model/memory-recognition',
        label: 'Memory Recognition',
        description:
          'Study a word list, then judge Old vs New probes — measure hit rate and false alarms.',
      },
      {
        href: '/neuroscience/drift-diffusion-model/visual-search',
        label: 'Visual Search',
        description:
          'Find the red circle among distractors across three set sizes — observe the set-size effect on RT.',
      },
    ]}
    references={[
      {
        href: 'https://en.wikipedia.org/wiki/Diffusion_model',
        label: 'Wikipedia: Diffusion model',
        description:
          'Overview of the DDM, its parameters, and key experimental applications.',
      },
      {
        href: 'https://www.annualreviews.org/doi/10.1146/annurev.psych.51.1.481',
        label: 'Ratcliff & Rouder (2000) — Annual Review of Psychology',
        description:
          'Foundational review of the diffusion model applied to recognition memory and choice RT.',
      },
      {
        href: 'https://www.jneurosci.org/content/28/26/6655',
        label: 'Forstmann et al. (2008) — Journal of Neuroscience',
        description:
          'fMRI evidence linking striatal BOLD signal to boundary-separation adjustments during speed stress.',
      },
    ]}
  />
);

export default DriftDiffusionModelPage;
