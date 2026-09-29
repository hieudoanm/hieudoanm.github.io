import { FC } from 'react';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const FmriPage: FC = () => (
  <TheoryTemplate
    title="Functional MRI (fMRI)"
    subtitle="Mapping the brain by the blood it spends — high spatial resolution bought with poor temporal resolution and an indirect signal."
    parentLink={{ href: '/neuroscience', label: 'Neuroscience' }}
    sections={[
      {
        title: 'What it measures',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              fMRI is not a direct measure of neural activity. It measures the{' '}
              <strong>BOLD (blood-oxygen-level-dependent) contrast</strong>: as
              neurons fire, they consume oxygen, local blood flow rises to
              compensate, and the ratio of deoxy- to oxyhaemoglobin shifts. The
              magnet is tuned to that shift. A task-related BOLD increase
              therefore reports where blood is being delivered, which is a proxy
              for where neurons are active &mdash; a two-step inference, not a
              measurement.
            </p>
            <p>
              The other name for the effect, <em>deoxyhaemoglobin overshoot</em>
              , is a reminder of its mechanism: paramagnetic deoxyhaemoglobin
              shortens T2*, so more of it means less signal. The overshoot in a
              typical block is only a few percent, which is why the effect needs
              noise-averse acquisition and averaging across trials.
            </p>
          </div>
        ),
      },
      {
        title: 'Acquisition and the cost of the signal',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              Spatial resolution of about 1&ndash;3&nbsp;mm comes at the price
              of a <strong>repetition time (TR)</strong> of 0.5&ndash;2&nbsp;s
              per volume: the scanner must collect each echo before the next
              slice of the volume, so the full brain is sampled only every TR.
              That is the physical floor on temporal resolution, independent of
              any analysis choice.
            </p>
            <p>
              Physiological noise &mdash; respiration, cardiac pulsation,
              scanner drift &mdash; lives in the same low-frequency band as the
              BOLD effect, which is why{' '}
              <strong>physiological noise regression</strong> and careful design
              are unavoidable. Head motion between scans is a common confounder:
              it decorrelates signal from anatomy and inflates apparent effects,
              so motion must be measured and modelled, not ignored.
            </p>
          </div>
        ),
      },
      {
        title: 'Design and what it can conclude',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              Because the vascular response lags and undershoots, event-related
              fMRI is analysed with <strong>general linear models</strong> over
              slow block or event regressors, not trial-by-trial averaging the
              way EEG is. That framing makes fMRI a test of <em>where</em>{' '}
              sustained engagement differs between conditions, not a millisecond
              timeline.
            </p>
            <p>
              The right claim from an fMRI result is a{' '}
              <strong>statistical map of relative blood-flow change</strong>{' '}
              under a task, not a picture of a neuron. Absent a causal
              manipulation or a converging source measure, a BOLD difference is
              correlational evidence about which regions engaged, not proof that
              they performed the mental operation attributed to them.
            </p>
          </div>
        ),
      },
    ]}
    references={[
      {
        href: 'https://doi.org/10.1073/pnas.87.15.5678',
        label: 'Ogawa et al. (1990) — PNAS',
        description:
          'The original observation that deoxyhaemoglobin changes T2* and produces the BOLD contrast.',
      },
      {
        href: 'https://doi.org/10.1016/j.neuroimage.2012.01.022',
        label: 'Buzsáki, Ulkau, McKenzie (2006) — Cerebral Cortex',
        description:
          'The origins of the BOLD signal: the physiology linking neural activity to local blood flow.',
      },
    ]}
  />
);

export default FmriPage;
