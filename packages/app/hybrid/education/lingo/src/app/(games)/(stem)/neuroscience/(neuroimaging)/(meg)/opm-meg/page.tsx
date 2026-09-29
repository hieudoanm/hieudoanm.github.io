import { FC } from 'react';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const OpmMegPage: FC = () => (
  <TheoryTemplate
    title="OPM-MEG (Optically Pumped Magnetometer)"
    subtitle="Room-temperature, on-scalp magnetoencephalography — MEG timing and localization without the cryogenics or the fixed helmet."
    parentLink={{ href: '/neuroscience', label: 'Neuroscience' }}
    sections={[
      {
        title: 'What it is',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              An optically pumped magnetometer measures a magnetic field by
              polarising a vapour of rubidium, caesium, or potassium atoms with
              laser light and reading the change in their polarisation. Nothing
              needs cooling to a few kelvin. The first convincing on-scalp
              evoked-field recordings appeared in <strong>2016</strong>, and the
              technology has since moved from a physics curiosity to a shipping
              product line.
            </p>
            <p>
              The critical property is where the sensor sits. A SQUID MEG system
              measures from a fixed helmet position several centimetres outside
              the scalp; an OPM array places{' '}
              <strong>sensors directly on the scalp</strong>. Since a dipolar
              field falls off as the inverse cube of distance, moving from
              helmet to scalp is a large SNR gain rather than a detail &mdash; a
              sensor 1&nbsp;cm from the cortex sees far more of the field than
              one 4&nbsp;cm away.
            </p>
          </div>
        ),
      },
      {
        title: 'The helmet problem, solved',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              Cryogenic MEG requires matching a rigid, heavy dewar to each
              subject&rsquo;s head, and the head-shape template used in the
              forward model is a significant error source. OPM arrays are{' '}
              <strong>constructed on the head itself</strong>: sensors on a
              flexible, custom-fitted frame, individually positioned, with
              <em> individual digitisation</em> folded into the measurement
              rather than estimated afterwards.
            </p>
            <p>
              A consequence people miss: the array stays on the head during the
              run, so the subject can <strong>move</strong> &mdash; head
              rotations, natural posture, even a bit of fidgeting. Cryogenic
              systems require a dewar that tracks the head within millimetres,
              which is precisely what a participant cannot guarantee. This is
              what makes OPM-MEG viable in paediatric cohorts and in movement
              experiments.
            </p>
          </div>
        ),
      },
      {
        title: 'Why on-scalp arrays work with EEG',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              The most valuable consequence of on-scalp is{' '}
              <strong>genuine co-registration</strong>. A modular helmet carries
              MEG gradiometers and dense EEG electrodes in one fixture, so both
              are sampled by the same hardware, digitised in the same coordinate
              frame, and cannot drift relative to each other. Combined MEG/EEG
              reconstruction becomes a well-posed measurement rather than a
              cross-modal registration exercise.
            </p>
            <p>
              The sensor density follows the same logic. Fit for a child&rsquo;s
              head at a few centimetres spacing, the same sensor can be
              repositioned and regapped for an adult &mdash; 300+ channels over
              a full adult scalp is now routine. Recording density is a data
              variable, not a hardware decision made years in advance.
            </p>
          </div>
        ),
      },
      {
        title: 'The unresolved trade',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              OPMs do <em>not</em> make shielding optional in the way the hype
              suggests. Their sensitivity to field is comparable to good SQUID
              systems, so ambient field at the tens of microtesla level is still
              the binding constraint. Three responses are in use: a
              <strong> passive shield</strong> (heavy copper or mu-metal
              enclosure), an <strong> active compensation</strong> field
              generated inside the room, or{' '}
              <strong>gradiometric cancellation</strong> &mdash; measuring the
              difference between a sensor and a nearby reference to reject
              common-mode field, which lets a compact portable shield suffice
              for many applications.
            </p>
            <p>
              Open questions remain around{' '}
              <strong>noise as a function of head motion</strong> (field
              gradients across a non-rigid sensor array break the common-mode
              assumption), sensor <strong>saturation</strong> near strong
              sources, and long-term <strong>drift</strong> of the optical
              readout. Good pipelines handle motion correction and field
              prediction explicitly; treating OPM as a drop-in SQUID replacement
              is how artefacts get into the literature.
            </p>
          </div>
        ),
      },
      {
        title: 'Choosing between the modalities',
        body: (
          <ul className="ml-5 flex list-disc flex-col gap-2">
            <li>
              <strong>OPM-MEG</strong> for children, clinical and bedside
              settings, dense arrays, high-movement or natural-posture
              paradigms, and simultaneous high-density EEG.
            </li>
            <li>
              <strong>Cryogenic SQUID MEG</strong> where the highest achievable
              sensitivity and a decade of accumulated methodological validation
              matter more than flexibility.
            </li>
            <li>
              <strong>Either is the wrong instrument</strong> if you need
              sub-second time resolution &mdash; that is fMRI, and the two are
              better combined than chosen between.
            </li>
          </ul>
        ),
      },
    ]}
    links={[
      {
        href: '/neuroscience/opm-meg/interactive',
        label: 'OPM Field & Noise Simulator',
        description:
          'Quantify why 1/r³ makes a 0.5 cm on-scalp sensor incomparable to a 4 cm cryogenic helmet, once the ambient field is shielded.',
      },
    ]}
    references={[
      {
        href: 'https://doi.org/10.1038/nn.4374',
        label: 'Brooks et al. (2016) — Nature Neuroscience',
        description:
          'First in-vivo demonstration of on-scalp OPM measurement of human evoked fields.',
      },
      {
        href: 'https://doi.org/10.1016/j.jneumeth.2018.03.019',
        label: 'Widmer et al. (2018) — Journal of Neuroscience Methods',
        description:
          'Review of wearable, on-scalp, optically pumped magnetometers and their practical operating regimes.',
      },
      {
        href: 'https://doi.org/10.1111/ejn.13520',
        label: 'Hämäläinen et al. (2017) — European Journal of Neuroscience',
        description:
          'Fifty years of MEG, including the sensor physics that made room-temperature devices possible.',
      },
    ]}
  />
);

export default OpmMegPage;
