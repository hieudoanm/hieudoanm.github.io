'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const PublicChoicePage: NextPage = () => (
  <TheoryTemplate
    title="Public Choice Theory"
    subtitle="What happens when we treat politicians, bureaucrats, and voters as self-interested—just like everyone else."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            <strong>Public choice</strong> applies the methods of economics to
            politics. Instead of assuming policymakers selflessly serve the
            public good, it treats politicians, bureaucrats, and voters as
            self-interested actors responding to incentives. Pioneered by James
            Buchanan (Nobel Prize 1986) and Gordon Tullock, it explains why
            government can fail as surely as markets can—often called the
            &ldquo;economics of politics.&rdquo;
          </p>
        ),
      },
      {
        title: 'Self-interest in politics',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Politicians:</strong> Seek re-election and power. Policy
              choices are shaped by what wins votes, not just what is efficient.
            </p>
            <p>
              <strong>Bureaucrats:</strong> Seek budget growth, prestige, and
              job security. Agencies may pursue expansion even beyond what the
              public interest requires.
            </p>
            <p>
              <strong>Voters:</strong> Are rationally ignorant because a single
              vote rarely decides an election, so they invest little effort in
              becoming informed—leading to poorly-considered outcomes.
            </p>
          </div>
        ),
      },
      {
        title: 'Government failure',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Logrolling:</strong> Politicians trade votes to pass
              legislation. Each legislator&rsquo;s pet projects pass, but the
              accumulated package benefits a few at the expense of many.
            </p>
            <p>
              <strong>Rent seeking:</strong> Special interests spend resources
              lobbying for favors, subsidies, and protection—diverting effort
              from productive activity to influence the state.
            </p>
            <p>
              <strong>Concentrated benefits, diffuse costs:</strong> Small
              groups (subsidized farmers, protected industries) are politically
              powerful because they care intensely, while the broad public each
              pays a little and doesn&rsquo;t organize. This biases policy
              toward the few.
            </p>
          </div>
        ),
      },
      {
        title: 'Constitutional design',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Rules matter:</strong> Buchanan emphasized that the rules
              of the political game—the constitution—are as important as the
              moves players make within them. Well-designed rules channel
              self-interest toward good outcomes.
            </p>
            <p>
              <strong>Checks and balances:</strong> Separating powers, requiring
              supermajorities, and constraining government limit the damage that
              self-interested officials can do.
            </p>
            <p>
              <strong>Decentralization:</strong> Federalism and local control
              let citizens &ldquo;vote with their feet,&rdquo; forcing
              governments to compete and limiting abuse of power.
            </p>
            <p>
              <strong>Transparency:</strong> Open government and public scrutiny
              raise the cost of self-dealing and align officials&rsquo; behavior
              with the public interest.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/economics/public-choice/voting',
        label: 'Voting Power Lab',
        description:
          'Simulate median-voter convergence, the voting paradox with agenda control, and rent-seeking contests.',
      },
    ]}
    references={[
      {
        href: 'https://en.wikipedia.org/wiki/Public_choice',
        label: 'Wikipedia: Public choice',
        description:
          'Overview of public choice theory, applying economic analysis to political decision-making.',
      },
      {
        href: 'https://www.nobelprize.org/prizes/economic-sciences/1986/buchanan/facts/',
        label: 'Nobel Prize: James M. Buchanan Jr.',
        description:
          'Official Nobel Prize biography of James Buchanan, founder of public choice theory.',
      },
      {
        href: 'https://www.investopedia.com/terms/j/james-m-buchanan-jr.asp',
        label: 'Investopedia: James M. Buchanan',
        description:
          'Introduction to James Buchanan and the public choice school of economics.',
      },
    ]}
  />
);

export default PublicChoicePage;
