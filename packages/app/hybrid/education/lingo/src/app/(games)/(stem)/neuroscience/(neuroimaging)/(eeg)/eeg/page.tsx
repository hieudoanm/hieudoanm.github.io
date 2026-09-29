import { FC } from 'react';
import Link from 'next/link';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const EegPage: FC = () => (
  <TheoryTemplate
    title="Electroencephalography (EEG)"
    subtitle="Scalp voltage from millisecond-scale cortical synchrony — the cheapest, most portable, and most widely used window into human brain dynamics."
    parentLink={{ href: '/neuroscience', label: 'Neuroscience' }}
    sections={[
      {
        title: 'What it measures',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              EEG electrodes on the scalp pick up voltage differences produced
              by <strong>synchronous postsynaptic currents</strong> in cortical
              pyramidal neurons, not the action potentials themselves. Pyramidal
              cells are arranged in near-parallel sheets, so thousands of them
              firing together sum to a field that escapes the skull. That
              synchrony is the signal: a single neuron is invisible, a coherent
              population is not.
            </p>
            <p>
              The resulting waveforms are on the order of{' '}
              <strong>10&ndash;100 &micro;V</strong>. The dynamic range matters
              more than the amplitude: since the same range carries the signal,
              it also sets the noise floor that amplifier quality and
              referencing must beat.
            </p>
          </div>
        ),
      },
      {
        title: 'Acquisition',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              The international <strong>10&ndash;20 system</strong> places
              electrodes at 10% and 20% distances from nasion, inion, and the
              preauricular points, giving a reproducible whole-scalp montage.
              Sample rates of 250&ndash;2048&nbsp;Hz are typical, with a
              practical passband near 0.1&ndash;40&nbsp;Hz after filtering.
            </p>
            <p>
              <strong>
                Referencing is a modelling decision, not a detail.
              </strong>{' '}
              EEG records a potential <em>difference</em> between sites, so
              every voltage is stated relative to something. A common average
              reference, a linked-mastoid reference, and a single-electrode
              reference all produce different-looking data from the same brain.
              Report the reference, and re-reference when comparing across
              montages.
            </p>
          </div>
        ),
      },
      {
        title: 'The volume conductor problem',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              Scalp EEG has no principled inverse solution. The skull is roughly{' '}
              <strong>80&times; less conductive than the brain</strong> and the
              cerebrospinal fluid far more conductive, so the field smears
              spatially as it passes outward. Activity is blurred, deep sources
              are attenuated, and there is no unique set of sources producing a
              given scalp map.
            </p>
            <p>
              Practical tools exist, none of which manufacture resolution that
              was never there. A <strong>surface Laplacian</strong> estimates
              the field's second derivative to sharpen topography.{' '}
              <strong>sLORETA and eLORETA</strong> normalise minimum-norm
              estimates for the expected variance of each voxel.{' '}
              <strong>Independent component analysis</strong> removes eye and
              muscle components as sources before averaging. The defensible
              conclusion from scalp EEG alone is a <em>statistical map</em> of
              relative synchrony &mdash; not a picture of the cortex.
            </p>
          </div>
        ),
      },
      {
        title: 'Artefacts',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              Artefacts are large and mostly identifiable, which makes EEG
              unusually transparent once you know what to look for.
            </p>
            <ul className="ml-5 flex list-disc flex-col gap-2">
              <li>
                <strong>Eye blinks and saccades:</strong> large, slow, frontal
                polarised signals from the corneoretinal dipole. EOG channels
                and ICA usually remove them, but they overlap frontal slow waves
                that researchers actually want.
              </li>
              <li>
                <strong>Muscle:</strong> broadband high-frequency activity from
                temporalis and frontalis. It worsens with effort and tension, so
                it is also a signal &mdash; a confound for one analysis and a
                variable of interest for another.
              </li>
              <li>
                <strong>Electrode pop and drift:</strong> instantaneous jumps or
                slow baseline wander from a bad contact or sweat bridge.
              </li>
              <li>
                <strong>Mains hum:</strong> 50 or 60&nbsp;Hz and its harmonics.
                A notch filter handles it; a room that removes the need does
                better.
              </li>
            </ul>
          </div>
        ),
      },
      {
        title: 'What ERPs reveal',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              Averaging to the event, time-locked to a stimulus or response,
              cancels activity that varies in timing and leaves the response
              that does not. The result is the{' '}
              <strong>event-related potential</strong>
              &mdash; a component measured in microvolts, at a latency in
              milliseconds, relative to an explicit baseline.
            </p>
            <p>
              The standard inventory: <strong>P1/N1</strong> (early sensory),{' '}
              <strong>N170</strong> (face-selective processing,
              occipitotemporal, ~170&nbsp;ms), <strong>MMN</strong> (automatic
              deviance detection, ~150&ndash;250&nbsp;ms), <strong>N2pc</strong>{' '}
              (target discrimination, ~200&ndash;300&nbsp;ms), and{' '}
              <strong>P300</strong> (context updating, ~300&ndash;500&nbsp;ms).
              Latencies and amplitudes scale with stimulus evidence, so ERP
              effects map cleanly onto the drift rate <em>v</em> in a{' '}
              <Link
                href="/neuroscience/drift-diffusion-model"
                className="text-primary hover:underline">
                Drift Diffusion Model
              </Link>
              .
            </p>
            <p>
              P300 amplitude is largest for rare, task-relevant, attended events
              &mdash; the three factors in the <em>novelty P3</em> account. A
              large P300 to a frequent, ignored stimulus usually signals that
              the task was not attended to as designed, which is a finding about
              the experiment, not the brain.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/neuroscience/eeg/interactive',
        label: 'ERP & Averaging Simulator',
        description:
          'Build a trial, inject blink, muscle, hum, and drift, then watch averaging cancel noise but keep artefacts.',
      },
    ]}
    references={[
      {
        href: 'https://doi.org/10.1016/S0013-4694(58)80099-8',
        label:
          'Jasper (1958) — Electroencephalography and Clinical Neurophysiology',
        description:
          'The original 10–20 electrode system that made scalp recording reproducible across laboratories.',
      },
      {
        href: 'https://doi.org/10.1016/j.clinph.2004.06.001',
        label: 'Michel et al. (2004) — Clinical Neurophysiology',
        description:
          'EEG source imaging review: the forward model, the ill-posed inverse problem, and the standard reconstruction families.',
      },
      {
        href: 'https://mitpress.mit.edu/9780262611863/an-introduction-to-the-event-related-potential-method/',
        label:
          'Luck (2014) — An Introduction to the Event-Related Potential Method, MIT Press',
        description:
          'The reference treatment of ERP methodology: nomenclature, polarity conventions, baseline choice, and component inference.',
      },
    ]}
  />
);

export default EegPage;
