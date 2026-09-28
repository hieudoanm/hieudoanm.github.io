import { FC } from 'react';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const AttentionalDriftDiffusionModelPage: FC = () => (
  <TheoryTemplate
    title="Attentional Drift Diffusion Model (aDDM)"
    subtitle=""
    parentLink={{ href: '/neuroscience', label: 'Neuroscience' }}
    sections={[
      {
        title: 'Overview',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              The <strong>Attentional Drift Diffusion Model (aDDM)</strong>,
              introduced by Krajbich et al. (2010), is an extension of the
              standard Drift Diffusion Model that explicitly incorporates visual
              attention (eye movements or fixations) into the evidence
              accumulation process.
            </p>
            <p>
              In traditional models, the drift rate is constant. In the aDDM,
              the drift rate changes dynamically within a single trial depending
              on where the subject is currently looking. Specifically, the model
              assumes that attention biases the accumulation process in favor of
              the attended item.
            </p>
          </div>
        ),
      },
      {
        title: 'The Discount Parameter (θ)',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              The core innovation of the aDDM is the attentional discount
              factor, <strong>θ</strong> (theta), which ranges from 0 to 1.
            </p>
            <ul className="ml-5 flex list-disc flex-col gap-2">
              <li>
                When looking at the <strong>Left</strong> item, the drift rate
                is proportional to <code>Value_Left - (θ * Value_Right)</code>.
              </li>
              <li>
                When looking at the <strong>Right</strong> item, the drift rate
                is proportional to <code>(θ * Value_Left) - Value_Right</code>.
              </li>
            </ul>
            <p>
              If θ = 1, attention has no effect (the model reduces to a standard
              DDM). If θ &lt; 1, the value of the unattended item is discounted,
              creating a systematic bias toward choosing the item that is looked
              at longer.
            </p>
          </div>
        ),
      },
      {
        title: 'Empirical Success',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              The aDDM successfully explains several widespread empirical
              phenomena in consumer choice and neuroeconomics:
            </p>
            <ul className="ml-5 flex list-disc flex-col gap-2">
              <li>
                <strong>Gaze Bias:</strong> People are more likely to choose an
                item they spend more time looking at, even if it has a slightly
                lower objective value.
              </li>
              <li>
                <strong>Last Fixation Bias:</strong> The chosen item is highly
                likely to be the item that was fixated immediately prior to the
                decision.
              </li>
            </ul>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/neuroscience/attentional-drift-diffusion-model/interactive',
        label: 'aDDM Simulator',
        description:
          'Simulate fixations and see how alternating visual attention dynamically shifts the drift rate.',
      },
    ]}
    references={[
      {
        href: 'https://doi.org/10.1038/nn.2635',
        label: 'Krajbich, Armel, & Rangel (2010) — Nature Neuroscience',
        description:
          'Visual fixations and the computation and comparison of value in simple choice.',
      },
    ]}
  />
);

export default AttentionalDriftDiffusionModelPage;
