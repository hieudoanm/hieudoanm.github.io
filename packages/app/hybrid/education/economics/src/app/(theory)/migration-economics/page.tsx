'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const MigrationPage: NextPage = () => (
  <TheoryTemplate
    title="Migration Economics"
    subtitle="Why people move, what they gain, and how migration reshapes sending and receiving economies."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            <strong>Migration economics</strong> studies the causes and
            consequences of people moving across borders. At its core, migration
            is a <strong>human capital investment</strong>: individuals move
            when the expected gains—higher wages, better opportunities—outweigh
            the costs of moving, including adjustment and foregone income. It is
            one of the largest flows in the global economy and a powerful engine
            of both individual and aggregate gains.
          </p>
        ),
      },
      {
        title: 'Why people move',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Wage differentials:</strong> Large wage gaps between
              countries create powerful incentives to relocate where labor is
              paid more.
            </p>
            <p>
              <strong>Opportunity and safety:</strong> People migrate for jobs,
              education, family, and to escape conflict, insecurity, or
              disaster.
            </p>
            <p>
              <strong>Networks:</strong> Family and community connections in the
              destination lower the cost and risk of migrating, so migration
              often builds on itself along established corridors.
            </p>
          </div>
        ),
      },
      {
        title: 'The gains',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>For migrants:</strong> Earnings often rise enormously upon
              moving, making migration one of the largest income gains an
              individual can realize.
            </p>
            <p>
              <strong>For receiving economies:</strong> Migrants fill labor
              shortages, contribute skills and taxes, and add to output and
              innovation. The long-run fiscal effect is generally small or
              positive.
            </p>
            <p>
              <strong>For sending economies:</strong>{' '}
              <strong>Remittances</strong> sent home support families and can
              fuel development, while skills and experience gained abroad may
              return.
            </p>
          </div>
        ),
      },
      {
        title: 'Costs and policy',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Short-run adjustment:</strong> In receiving areas, rapid
              new arrivals can put pressure on wages and public services in
              specific regions or groups, though effects are often small for the
              overall economy.
            </p>
            <p>
              <strong>Brain drain:</strong> The departure of highly skilled
              workers can deprive sending countries of talent they invested in.
            </p>
            <p>
              <strong>Policy design:</strong> Balancing openness with
              integration—language, labor markets, housing—determines how widely
              the gains from migration are shared.
            </p>
          </div>
        ),
      },
    ]}
    references={[
      {
        href: 'https://en.wikipedia.org/wiki/Economics_of_immigration',
        label: 'Wikipedia: Economics of Immigration',
        description:
          'Overview of migration economics, wage gains, and remittance flows.',
      },
      {
        href: 'https://www.investopedia.com/terms/r/remittance.asp',
        label: 'Investopedia: Remittance',
        description:
          'Entry explaining remittances and their role in migration economics.',
      },
      {
        href: 'https://www.britannica.com/topic/brain-drain',
        label: 'Encyclopedia Britannica: Brain Drain',
        description:
          'Encyclopedia entry on the emigration of skilled workers and its effects.',
      },
    ]}
  />
);

export default MigrationPage;
