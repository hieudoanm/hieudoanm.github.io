'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const MoralHazardPage: NextPage = () => (
  <TheoryTemplate
    title="Moral Hazard"
    subtitle="When insurance changes behavior—and someone else pays the price."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            <strong>Moral hazard</strong> occurs when one party changes their
            behavior after a deal is made because they do not bear the full
            consequences of their actions. The classic setting is insurance:
            once insured, a person takes fewer precautions because the cost of
            loss falls largely on the insurer. It arises whenever someone is
            shielded from risk.
          </p>
        ),
      },
      {
        title: 'How it works',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Before the deal:</strong> An uninsured homeowner installs
              a security system and checks for fire hazards. The full cost of
              loss is theirs, so they take care.
            </p>
            <p>
              <strong>After the deal:</strong> Once fully insured, the incentive
              to maintain security weakens. The insurer bears most of the
              loss—so the homeowner is less careful. That shift in behavior is
              moral hazard.
            </p>
            <p>
              <strong>Asymmetric information:</strong> The insured party knows
              their own behavior; the insurer cannot observe it directly. This
              information gap is what makes moral hazard hard to eliminate.
            </p>
          </div>
        ),
      },
      {
        title: 'Real-world examples',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Health insurance:</strong> Insured patients may visit
              doctors more often or choose costlier treatments because they pay
              only a copay—the insurer covers the rest.
            </p>
            <p>
              <strong>Bank bailouts:</strong> Banks that expect to be rescued by
              the government take larger risks. The implicit guarantee shifts
              potential losses to taxpayers.
            </p>
            <p>
              <strong>Corporate expense accounts:</strong> Employees spending
              company money have less incentive to economize than when spending
              their own.
            </p>
          </div>
        ),
      },
      {
        title: 'The solutions',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Deductibles and copays:</strong> Making the insured party
              pay part of every claim keeps skin in the game and reduces
              careless behavior.
            </p>
            <p>
              <strong>Monitoring and audits:</strong> Insurers and employers
              observe behavior—driving telematics, expense receipts—to catch and
              deter excessive risk-taking.
            </p>
            <p>
              <strong>Contractual incentives:</strong> Performance bonuses,
              clawback clauses, and aligned compensation structures reduce the
              gap between private and social costs.
            </p>
            <p>
              <strong>Screening and selection:</strong> Offering different
              policy tiers forces agents to self-select, revealing their true
              risk level.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/moral-hazard/insurance',
        label: 'Hidden Effort',
        description:
          'Insure your home, choose how hard to guard it, and watch full cover quietly destroy your incentive to try.',
      },
    ]}
    references={[
      {
        href: 'https://en.wikipedia.org/wiki/Moral_hazard',
        label: 'Wikipedia: Moral Hazard',
        description:
          'Overview of moral hazard, asymmetric information, and principal-agent problems.',
      },
      {
        href: 'https://www.investopedia.com/terms/m/moralhazard.asp',
        label: 'Investopedia: Moral Hazard',
        description:
          'Entry explaining how insurance and guarantees change behavior.',
      },
      {
        href: 'https://www.britannica.com/topic/moral-hazard',
        label: 'Encyclopedia Britannica: Moral Hazard',
        description:
          'Encyclopedia entry on moral hazard in economics and finance.',
      },
    ]}
  />
);

export default MoralHazardPage;
