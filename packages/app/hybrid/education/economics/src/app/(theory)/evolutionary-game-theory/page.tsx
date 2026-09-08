'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const EvolutionaryGameTheoryPage: NextPage = () => (
  <TheoryTemplate
    title="Evolutionary Game Theory"
    subtitle="When strategies spread not by rationality, but by who reproduces—the biology of games."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            <strong>Evolutionary game theory</strong> applies game theory to
            populations where strategies spread by reproduction and selection
            rather than by deliberate rational choice. Pioneered by John Maynard
            Smith, it explains how behaviors like cooperation, altruism, and
            aggression can persist. It explains why certain strategies survive
            in a population, even when individual players are not consciously
            optimizing.
          </p>
        ),
      },
      {
        title: 'Evolutionarily stable strategies',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Definition:</strong> An{' '}
              <strong>evolutionarily stable strategy (ESS)</strong> is one that,
              once established in a population, cannot be invaded by a rare
              mutant playing a different strategy—because the incumbent performs
              at least as well against the mutant as the mutant performs against
              it.
            </p>
            <p>
              <strong>No rationality required:</strong> Strategies spread
              because they are successful, not because players calculate. A
              successful behavior reproduces and displaces weaker ones.
            </p>
            <p>
              <strong>Hawks and doves:</strong> A classic model where aggressive
              hawks and pacifist doves interact. The stable outcome is often a
              mix, balancing the gains of aggression against its costs.
            </p>
          </div>
        ),
      },
      {
        title: 'Explaining cooperation',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>The puzzle:</strong> Why would altruism and cooperation
              evolve when selfish behavior seems more fit? Evolutionary game
              theory shows circumstances under which cooperation thrives.
            </p>
            <p>
              <strong>Reciprocity:</strong> In repeated interactions,
              cooperative strategies like Tit-for-Tat outperform and spread
              because they mimic the behavior of partners (see Repeated Games).
            </p>
            <p>
              <strong>Kin selection:</strong> Helping relatives passes on shared
              genes, so apparent selflessness can be individually adaptive.
            </p>
            <p>
              <strong>Group effects:</strong> Cooperative groups may outcompete
              selfish ones, sustaining norms even when individuals would prefer
              to free-ride.
            </p>
          </div>
        ),
      },
      {
        title: 'Applications and relevance',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Biology:</strong> Explains animal behavior—fighting,
              mating, and territoriality—as the outcome of population dynamics
              rather than conscious strategy.
            </p>
            <p>
              <strong>Human norms and culture:</strong> Cooperation, fairness,
              and punishment can be modeled as evolving behaviors, shedding
              light on why these instincts are widespread.
            </p>
            <p>
              <strong>Economics and markets:</strong> Behaviors that persist in
              markets—trust, reciprocity, reputation—can be understood as stable
              evolutionary outcomes.
            </p>
            <p>
              <strong>Network dynamics:</strong> Evolutionary modeling shows how
              strategies spread through connected populations, useful for
              understanding the diffusion of behavior and technology.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/evolutionary-game-theory/replicator',
        label: 'Replicator Dynamics Lab',
        description:
          'Tune payoffs and step generations to watch hawk–dove population shares converge on an evolutionarily stable strategy.',
      },
    ]}
    references={[
      {
        href: 'https://en.wikipedia.org/wiki/Evolutionary_game_theory',
        label: 'Wikipedia: Evolutionary Game Theory',
        description:
          'Overview of evolutionary game theory, ESS, and applications in biology and economics.',
      },
      {
        href: 'https://www.nature.com/scitable/topicpage/evolutionary-game-theory-14246140/',
        label: 'Nature Scitable: Evolutionary Game Theory',
        description:
          'Accessible introduction to evolutionary game theory and its biological foundations.',
      },
      {
        href: 'https://en.wikipedia.org/wiki/Evolutionarily_stable_strategy',
        label: 'Wikipedia: Evolutionarily Stable Strategy',
        description:
          'Definition and analysis of ESS, the hawk-dove game, and stability conditions.',
      },
    ]}
  />
);

export default EvolutionaryGameTheoryPage;
