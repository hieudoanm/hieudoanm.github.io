import { FC } from 'react';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const FnirsPage: FC = () => (
  <TheoryTemplate
    title="Functional Near-Infrared Spectroscopy (fNIRS)"
    subtitle="The haemodynamic middle ground — millisecond sampling of a vascular signal through the skull, portable and affordable, with real but bounded limits."
    parentLink={{ href: '/neuroscience', label: 'Neuroscience' }}
    sections={[
      {
        title: 'What it measures',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              fNIRS infers the same haemodynamic signal as fMRI, but optically.
              Two wavelengths are shone into the scalp &mdash; typically{' '}
              <strong>760&nbsp;nm and 850&nbsp;nm</strong> &mdash; and the
              returned light is absorbed differently by oxy- and
              deoxyhaemoglobin. Because haemoglobin absorbs in the near
              infrared, light penetrates a few centimetres of tissue and carries
              a shallow-path <strong>cortical</strong> signal. Both signals
              combine into <strong>concentration changes</strong> in
              oxyhaemoglobin and deoxyhaemoglobin over time.
            </p>
            <p>
              It is a genuine haemodynamic measure, so it inherits the same
              vascular lag as fMRI; it is not a neural-time-resolution method.
              Its distinguishing features are portability, low cost, and
              tolerance of motion, which make it practical for developmental,
              clinical, and field studies where a scanner cannot go.
            </p>
          </div>
        ),
      },
      {
        title: 'Channels, haemodynamics, and confounds',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              Unlike fMRI, fNIRS does not sample a dense volume: it measures a
              limited set of <strong>source&ndash;detector channels</strong>,
              each sampling a banana-shaped path of tissue. Sensitivity
              therefore falls off with depth, and a channel is not a location
              &mdash; it is a weighted path. A change in one channel cannot
              localise a source without assumptions about the tissue it
              traverses.
            </p>
            <p>
              The short-separation channel technique exploits the fact that
              light passing through only scalp and skull is insensitive to brain
              activity, providing a regressor for systemic physiology. This is
              essential because <strong>systemic physiology</strong> &mdash;
              blood pressure, heart rate, systemic haemoglobin changes &mdash;
              otherwise masquerades as cortical activation and can dominate
              short tasks.
            </p>
          </div>
        ),
      },
      {
        title: 'Strengths and limits',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              Sampling rates of 10&nbsp;Hz and better, combined with no radio-
              frequency exclusion zone, make fNIRS the practical middle ground
              between EEG and fMRI. The trade-offs are real: spatial coverage is
              a few centimetres of cortex, optical penetration is shallow, the
              haemodynamic response is slower and more variable than in fMRI,
              and hair and skull thickness attenuate signal differently across
              individuals.
            </p>
            <p>
              The defensible claim from an fNIRS result is a{' '}
              <strong>
                change in haemoglobin concentration over a cortical path
              </strong>
              , inferred from an optical measurement. It is a real brain measure
              with a real vascular interpretation &mdash; just a coarser,
              shallower, and more physiologically-noisy one than fMRI.
            </p>
          </div>
        ),
      },
    ]}
    references={[
      {
        href: 'https://doi.org/10.1038/nn.3474',
        label: 'Boas et al. (2011) — Nature Neuroscience',
        description:
          'A review of the hemodynamic response to brain activation, grounding the physiology fNIRS and fMRI share.',
      },
      {
        href: 'https://doi.org/10.1016/j.neuroimage.2013.05.004',
        label: 'Scholkmann et al. (2014) — NeuroImage',
        description:
          'Functional brain imaging with near-infrared light: fNIRS principles, channels, and short-separation regression.',
      },
    ]}
  />
);

export default FnirsPage;
