import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const BiologyTheoryPage: NextPage = () => (
  <TheoryTemplate
    title="Biological Psychology"
    subtitle="How neurons, brains and bodies produce behaviour — and why the body is never out of the loop."
    parentLink={{ href: '/psychology/', label: 'Psychology' }}
    sections={[
      {
        title: 'Neurons and their electricity',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              A neuron maintains a resting potential of roughly{' '}
              <strong>−70 mV</strong> across its membrane, held there by the
              sodium–potassium pump and potassium leak channels. A stimulus that
              crosses threshold depolarises the cell, and voltage-gated sodium
              channels open in a regenerative <strong>all-or-none</strong>{' '}
              spike.
            </p>
            <p>
              Because the spike is all-or-none, intensity cannot be encoded by
              spike size. It is encoded by <strong>frequency</strong> and by{' '}
              <strong>how many cells</strong> respond — a principle called
              population coding. Stronger stimulus, faster firing.
            </p>
            <p>
              At the synapse, most neurotransmitters cross a{' '}
              <strong>chemical</strong> gap, adding a delay of milliseconds. The
              exception is electrical synapses, which are faster and rarer.
            </p>
          </div>
        ),
      },
      {
        title: 'Where signals go',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              Sensory pathways relay information from receptors toward the
              cortex, and motor pathways run the other way. The longest of
              these, the <strong>corpus callosum</strong>, links the two
              hemispheres across some 200 million axons.
            </p>
            <p>
              Not all cortex does one job. The visual cortex in the occipital
              lobe, the motor cortex in the frontal lobe, and the{' '}
              <strong>hippocampus</strong> in the medial temporal lobe are
              anatomically separate, and separating them — as in the patient
              H.M. — separates their functions too.
            </p>
            <p>
              The thalamus acts as a relay hub, gating which signals reach
              awareness, while the cerebellum tunes timing and coordination on a
              millisecond scale.
            </p>
          </div>
        ),
      },
      {
        title: 'Learning changes the wiring',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              Experience alters synaptic strength. At the molecular level,
              <strong> long-term potentiation</strong> (LTP) — persistent
              strengthening after repeated co-activation — inserts extra AMPA
              receptors into the postsynaptic membrane, so the same input later
              produces a larger response.
            </p>
            <p>
              Hebb summarised it: neurons that fire together wire together. This
              is how a short-lived experience becomes a durable skill or memory,
              and it is why sleep, rest and spacing out study sessions matter —
              consolidation is biological work, not a metaphor.
            </p>
          </div>
        ),
      },
      {
        title: 'The body shapes the mind',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              Brain and body are one system, not two. The{' '}
              <strong>hypothalamus</strong> drives the autonomic nervous system
              and the endocrine system, and endocrine hormones feed straight
              back into the brain.
            </p>
            <p>
              That feedback runs in both directions. Stress releases cortisol
              and adrenaline, which sharpens short-term memory and impairs
              retrieval; regular aerobic exercise increases BDNF and supports
              neuroplasticity. The vagus nerve carries roughly 80% of autonomic
              afferent traffic, so the body reports constantly — and the brain
              listens.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/psychology/generalized-anxiety-disorder/',
        label: 'Generalized Anxiety Disorder (GAD-7)',
        description: 'Arousal and worry measured on a validated scale',
      },
      {
        href: '/psychology/beck-depression-inventory/',
        label: 'Beck Depression Inventory (BDI-II)',
        description: 'Mood symptoms screened over the last two weeks',
      },
      {
        href: '/psychology/patient-health-questionnaire/',
        label: 'Patient Health Questionnaire (PHQ-9)',
        description: 'A brief screen for depressive symptom severity',
      },
    ]}
  />
);

export default BiologyTheoryPage;
