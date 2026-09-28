import { FC } from 'react';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const HierarchicalDriftDiffusionModelPage: FC = () => (
  <TheoryTemplate
    title="Hierarchical Drift Diffusion Model (HDDM)"
    subtitle=""
    parentLink={{ href: '/neuroscience', label: 'Neuroscience' }}
    sections={[
      {
        title: 'Overview',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              The <strong>Hierarchical Drift Diffusion Model (HDDM)</strong>,
              popularized by Wiecki, Sofer, and Frank (2013), is a statistical
              framework for estimating the parameters of the Drift Diffusion
              Model (DDM) across a group of subjects or conditions.
            </p>
            <p>
              Rather than fitting the DDM to each subject independently (which
              is noisy and requires hundreds of trials per subject) or pooling
              all data together (which ignores individual differences), the HDDM
              uses Bayesian hierarchical modeling. It assumes that individual
              subject parameters are drawn from an overarching population
              distribution.
            </p>
          </div>
        ),
      },
      {
        title: 'Shrinkage and Statistical Power',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              The defining mathematical feature of the HDDM is{' '}
              <em>shrinkage</em>. Because the model knows that subjects belong
              to a group, it &quot;shrinks&quot; extreme, noisy individual
              estimates toward the group mean.
            </p>
            <ul className="ml-5 flex list-disc flex-col gap-2">
              <li>
                Subjects with lots of consistent data strongly influence their
                own parameter estimates.
              </li>
              <li>
                Subjects with very few trials rely heavily on the group prior,
                preventing wildly inaccurate estimates.
              </li>
            </ul>
            <p>
              This allows researchers to reliably estimate DDM parameters (like
              drift rate and decision boundary) even when they only have 20–40
              trials per participant—something completely impossible with
              traditional Maximum Likelihood fitting methods.
            </p>
          </div>
        ),
      },
      {
        title: 'Clinical and Cognitive Applications',
        body: (
          <div className="flex flex-col gap-3">
            <p>
              The HDDM is widely used in clinical neuroscience and psychology to
              detect subtle differences between groups:
            </p>
            <ul className="ml-5 flex list-disc flex-col gap-2">
              <li>
                <strong>Parkinson&apos;s Disease:</strong> HDDM analyses have
                shown that deep brain stimulation alters the decision threshold
                (boundary) rather than the rate of information processing.
              </li>
              <li>
                <strong>ADHD:</strong> HDDM reveals differences in drift rate
                and non-decision time compared to neurotypical controls.
              </li>
              <li>
                <strong>Pharmacological Interventions:</strong> Tracking how
                specific drugs (like L-DOPA) affect distinct cognitive
                sub-processes.
              </li>
            </ul>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/neuroscience/hierarchical-drift-diffusion-model/interactive',
        label: 'HDDM Simulator',
        description:
          'Simulate a group of 50 subjects. Adjust the population variance to see how tightly the individuals cluster around the group mean.',
      },
    ]}
    references={[
      {
        href: 'https://doi.org/10.3389/fninf.2013.00014',
        label: 'Wiecki, Sofer, & Frank (2013) — Frontiers in Neuroinformatics',
        description:
          'HDDM: Hierarchical Bayesian estimation of the Drift-Diffusion Model in Python.',
      },
    ]}
  />
);

export default HierarchicalDriftDiffusionModelPage;
