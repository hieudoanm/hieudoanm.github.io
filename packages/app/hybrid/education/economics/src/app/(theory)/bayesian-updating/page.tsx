'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const BayesianUpdatingPage: NextPage = () => (
  <TheoryTemplate
    title="Bayesian Updating"
    subtitle="How rational agents revise beliefs when they observe new evidence."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            <strong>Bayesian updating</strong> is the process of revising a
            belief in light of new evidence. Starting from a{' '}
            <strong>prior</strong> belief about how likely something is, you
            observe data, and combine the two using Bayes&rsquo; rule to produce
            an updated <strong>posterior</strong> belief. It is the formal
            framework for learning under uncertainty—how an ideal rational agent
            should think.
          </p>
        ),
      },
      {
        title: 'The core idea',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Prior:</strong> What you believe before seeing any
              evidence. &ldquo;I think there is a 10% chance it will rain
              today.&rdquo;
            </p>
            <p>
              <strong>Likelihood:</strong> How probable the evidence would be if
              the hypothesis were true. &ldquo;If it were going to rain, dark
              clouds would be very likely.&rdquo;
            </p>
            <p>
              <strong>Posterior:</strong> Your updated belief after combining
              prior and evidence. &ldquo;Given the dark clouds, I now think
              there is a 70% chance of rain.&rdquo;
            </p>
            <p>
              <strong>Bayes&rsquo; rule:</strong> The mathematical formula that
              performs this update. It weights the prior by how well the
              evidence fits each possible explanation.
            </p>
          </div>
        ),
      },
      {
        title: 'Why it matters',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Learning from experience:</strong> Each new observation
              shifts beliefs gradually. After enough consistent evidence, even a
              skeptic updates to the correct answer.
            </p>
            <p>
              <strong>Prior sensitivity:</strong> With little evidence, the
              prior dominates. With abundant evidence, the data overwhelms the
              prior. This explains why experts and novices can disagree
              initially but converge over time.
            </p>
            <p>
              <strong>Base rates matter:</strong> Ignoring the prior leads to
              the base-rate fallacy. A medical test that is 99% accurate still
              produces mostly false positives if the disease is extremely rare.
            </p>
          </div>
        ),
      },
      {
        title: 'Real-world applications',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Medical diagnosis:</strong> Doctors update disease
              probabilities as test results, symptoms, and patient history
              accumulate—each piece of evidence shifts the posterior.
            </p>
            <p>
              <strong>Spam filtering:</strong> Email filters start with a prior
              about whether a message is spam, then update as they observe
              words, sender reputation, and link patterns.
            </p>
            <p>
              <strong>Criminal investigations:</strong> Detectives begin with
              priors about suspects and update as forensic evidence, alibis, and
              witness testimony emerge.
            </p>
            <p>
              <strong>Machine learning:</strong> Bayesian models update
              parameter beliefs as training data arrives—producing not just
              predictions but calibrated uncertainty estimates.
            </p>
          </div>
        ),
      },
    ]}
    references={[
      {
        href: 'https://en.wikipedia.org/wiki/Bayesian_inference',
        label: 'Wikipedia: Bayesian Inference',
        description:
          'Overview of Bayes theorem and its application to updating beliefs from evidence.',
      },
      {
        href: 'https://www.khanacademy.org/computing/computer-science/probability/bayes-theorem/v/bayes-theorem',
        label: 'Khan Academy: Bayes Theorem',
        description:
          'Video explanation of Bayes rule and how prior beliefs update with new data.',
      },
      {
        href: 'https://plato.stanford.edu/entries/bayes-theorem/',
        label: 'Stanford Encyclopedia: Bayes Theorem',
        description:
          'Philosophical entry on Bayes theorem, its justifications, and its role in rational belief revision.',
      },
    ]}
  />
);

export default BayesianUpdatingPage;
