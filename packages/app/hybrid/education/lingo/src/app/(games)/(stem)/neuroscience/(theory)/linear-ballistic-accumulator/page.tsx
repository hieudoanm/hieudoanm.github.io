import { FC } from 'react';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const LinearBallisticAccumulatorPage: FC = () => (
  <TheoryTemplate
    title="Linear Ballistic Accumulator (LBA)"
    subtitle=""
    parentLink={{ href: '/neuroscience', label: 'Neuroscience' }}
    sections={[
      {
        title: 'Overview',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              The <strong>Linear Ballistic Accumulator (LBA)</strong> model,
              introduced by Brown and Heathcote (2008), is a prominent framework
              in cognitive psychology for modelling decision-making and response
              times. Unlike the Drift Diffusion Model (DDM), which relies on a
              single accumulator tracking relative evidence, the LBA assumes
              independent accumulators for each response option that race toward
              a common decision threshold.
            </p>
            <p>
              Crucially, the LBA is &quot;ballistic&quot;, meaning that once
              evidence accumulation begins, it proceeds at a constant linear
              rate without within-trial noise. The variability in decision times
              and accuracy arises entirely from between-trial variability in the
              starting point of accumulation and the drift rate.
            </p>
          </div>
        ),
      },
      {
        title: 'Core Mechanisms & Parameters',
        body: (
          <div className="flex flex-col gap-3">
            <p>The LBA is defined by the following key parameters:</p>
            <ul className="ml-5 flex list-disc flex-col gap-2">
              <li>
                <strong>Drift Rate (v):</strong> The mean rate at which evidence
                accumulates for a given accumulator.
              </li>
              <li>
                <strong>Drift Rate Variability (s):</strong> Between-trial
                variability in the drift rate, typically drawn from a normal
                distribution.
              </li>
              <li>
                <strong>Starting Point Variability (A):</strong> Evidence
                accumulation begins at a random point drawn from a uniform
                distribution [0, A].
              </li>
              <li>
                <strong>Decision Threshold (b):</strong> The amount of evidence
                required to trigger a decision. The distance from the top of the
                starting distribution to the threshold is b - A.
              </li>
              <li>
                <strong>Non-Decision Time (t0):</strong> The time taken for
                perceptual encoding and motor execution, independent of the
                decision process.
              </li>
            </ul>
          </div>
        ),
      },
      {
        title: 'Why Use the LBA?',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              The LBA offers several advantages over other accumulation models.
              Its primary strength lies in its mathematical tractability.
              Because there is no within-trial noise, the LBA has closed-form
              analytic solutions for both response times and accuracy, making it
              extremely fast to fit to empirical data.
            </p>
            <p>
              Additionally, its multi-accumulator architecture makes it
              naturally suited for tasks with more than two response options,
              whereas the standard DDM is strictly limited to binary choices.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/neuroscience/linear-ballistic-accumulator/interactive',
        label: 'LBA Simulator',
        description:
          'Simulate the race between two ballistic accumulators and see how between-trial variability shapes choices.',
      },
    ]}
    references={[
      {
        href: 'https://doi.org/10.1016/j.cogpsych.2007.12.002',
        label: 'Brown & Heathcote (2008) — Cognitive Psychology',
        description:
          'The seminal paper introducing the Linear Ballistic Accumulator model.',
      },
    ]}
  />
);

export default LinearBallisticAccumulatorPage;
