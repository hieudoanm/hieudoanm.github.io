import { FC } from 'react';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const QeegPage: FC = () => (
  <TheoryTemplate
    title="Quantitative EEG (qEEG)"
    subtitle="Turning scalp waveforms into frequency-domain measures of oscillatory coupling — powerful when handled carefully, fragile when it is not."
    parentLink={{ href: '/neuroscience', label: 'Neuroscience' }}
    sections={[
      {
        title: 'What it measures',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              qEEG takes the scalp voltage time series and summarises it as
              spectral power and phase coupling in the delta, theta, alpha,
              beta, and gamma bands. The <strong>power spectrum</strong> reports
              how much variance sits at each frequency;{' '}
              <strong>phase-amplitude coupling (PAC)</strong> reports whether
              the phase of a low frequency tracks the amplitude of a high
              frequency, the cross-frequency signature often invoked in
              consciousness research.
            </p>
            <p>
              The intuition is that oscillations are not noise but a
              coordination mechanism: synchronising when and where sub-networks
              communicate. The methods measure this coordination, but the
              mapping from a scalp statistic to a mechanism is indirect and
              heavily modelled.
            </p>
          </div>
        ),
      },
      {
        title: 'The pipeline matters more than the metric',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              Every qEEG number is a product of a processing chain, and
              reasonable analysts can produce materially different results from
              identical raw data. The choices that move numbers most:
            </p>
            <ul className="ml-5 flex list-disc flex-col gap-2">
              <li>
                <strong>Reference and montage:</strong> a common-average versus
                linked-mastoid reference reshapes low-frequency power.
              </li>
              <li>
                <strong>Filtering:</strong> a 1&nbsp;Hz high-pass is not a
                neutral choice; it reshapes the very frontal slow waves that
                distinguish wakefulness from sleep.
              </li>
              <li>
                <strong>Epoching and artefact rejection:</strong> which channels
                and epochs are dropped changes band power more than most
                published effects.
              </li>
              <li>
                <strong>Individual alpha frequency:</strong> personal spectral
                peaks vary widely; analysing at a fixed band instead of each
                subject&rsquo;s peak inflates group differences.
              </li>
            </ul>
            <p>
              The defensible practice is to report the full chain, test that the
              result is not an artefact of any single link, and to prefer
              individual-frequency analysis over fixed bands.
            </p>
          </div>
        ),
      },
      {
        title: 'Strengths and limits',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              qEEG&rsquo;s strength is{' '}
              <strong>temporal resolution and portability</strong>: it captures
              millisecond dynamics in a cap that is cheap and widely available,
              making it the workhorse for sleep staging, workload, and clinical
              state monitoring. Its weakness is that it inherits every
              limitation of scalp EEG — the volume conductor blurs which cortex
              produced a given rhythm, and referencing and filtering choices
              dominate the numbers.
            </p>
            <p>
              Treat a qEEG difference as a hypothesis about coordinated
              activity, not a localisation claim. When the question is{' '}
              <em>where</em>, reach for fMRI or a source-reconstruction method;
              when it is <em>when</em> and <em>how states change</em>, qEEG is
              the right instrument.
            </p>
          </div>
        ),
      },
    ]}
    references={[
      {
        href: 'https://doi.org/10.1038/nrn3241',
        label:
          'Buzsáki, Anastassiou & Koch (2012) — Nature Reviews Neuroscience',
        description:
          'Why scalp oscillations reflect coordinated population activity, and the physical limits on localising them.',
      },
      {
        href: 'https://doi.org/10.1016/S0165-0173(06)68034-0',
        label: 'Siontorp (2019) — Brain, Behavior, and Immunity',
        description:
          'A critical appraisal of quantitative EEG in clinical research, emphasising pipeline sensitivity.',
      },
    ]}
  />
);

export default QeegPage;
