'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const PublicGoodsDilemmaPage: NextPage = () => (
  <TheoryTemplate
    title="Public Goods Dilemma"
    subtitle="Why things everyone needs are so hard to fund—and how we solve it."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            A <strong>public good</strong> is something that is both{' '}
            <strong>non-excludable</strong> (you can&rsquo;t stop people from
            using it) and <strong>non-rivalrous</strong> (one person&rsquo;s use
            doesn&rsquo;t reduce availability for others). Because no one can be
            excluded, individuals have an incentive to{' '}
            <strong>free-ride</strong>—benefit from the good without paying for
            it. When too many people free-ride, the good is under-provided or
            fails to exist at all. That is the public goods dilemma.
          </p>
        ),
      },
      {
        title: 'Core properties',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Non-excludable:</strong> Once provided, it is practically
              impossible to exclude anyone from benefiting. National defense
              protects everyone in the country, whether or not they pay taxes.
            </p>
            <p>
              <strong>Non-rivalrous:</strong> One person&rsquo;s consumption
              does not diminish what is available for others. Your listening to
              a radio broadcast doesn&rsquo;t prevent anyone else from
              listening.
            </p>
            <p>
              <strong>The free-rider problem:</strong> Since nobody can be
              charged for using the good, markets have little incentive to
              supply it, and voluntary contribution typically falls short of the
              socially optimal level.
            </p>
          </div>
        ),
      },
      {
        title: 'Real-world examples',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Clean air:</strong> Everyone benefits, but no individual
              is personally rewarded for reducing pollution.
            </p>
            <p>
              <strong>Public broadcasting and open-source software:</strong>{' '}
              Rely on voluntary donations and contributions even though millions
              use them free of charge.
            </p>
            <p>
              <strong>Lighthouses and streetlights:</strong> Help every passing
              ship or pedestrian regardless of who paid.
            </p>
            <p>
              <strong>Scientific knowledge:</strong> Research findings benefit
              everyone once published, which is why public funding and
              open-access publishing matter.
            </p>
          </div>
        ),
      },
      {
        title: 'The solutions',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Government provision through taxation:</strong> The
              clearest fix—everyone pays taxes, and the state supplies the good
              so it is funded even if no one would volunteer.
            </p>
            <p>
              <strong>Compulsory membership:</strong> Groups make funding
              mandatory (association dues, mandatory contributions) to prevent
              free-riding within the group.
            </p>
            <p>
              <strong>Exclusion mechanisms:</strong> Find ways to make the good
              partly excludable, such as subscription tiers for otherwise public
              digital content.
            </p>
            <p>
              <strong>Reputation and altruism:</strong> Recognition, social
              norms, and warm-glow giving motivate enough voluntary contribution
              to sustain open-source projects and crowdfunded goods.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/public-goods-dilemma/contribute',
        label: 'Contribute!',
        description:
          'Play a public goods game and watch free riding trump the group optimum.',
      },
    ]}
    references={[
      {
        href: 'https://en.wikipedia.org/wiki/Public_good',
        label: 'Wikipedia: Public good',
        description:
          'Definition of public goods and their characteristics of non-rivalry and non-excludability.',
      },
      {
        href: 'https://www.investopedia.com/terms/p/public-good.asp',
        label: 'Investopedia: Public Good',
        description:
          'Explanation of public goods with examples and their implications for provision.',
      },
      {
        href: 'https://www.investopedia.com/terms/f/free_rider_problem.asp',
        label: 'Investopedia: Free-Rider Problem',
        description:
          'How free riding arises with public goods and leads to under-provision.',
      },
    ]}
  />
);

export default PublicGoodsDilemmaPage;
