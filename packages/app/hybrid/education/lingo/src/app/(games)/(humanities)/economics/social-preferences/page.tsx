'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const SocialPreferencesPage: NextPage = () => (
  <TheoryTemplate
    title="Social Preferences"
    subtitle="People care about fairness and others&rsquo; outcomes—not just their own payoff."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            <strong>Social preferences</strong> describe how people&rsquo;s
            choices are shaped by concerns for fairness, reciprocity, and the
            welfare of others, in addition to their own material payoff.
            Standard theory assumes people are purely self-interested; social
            preferences show they are also driven by altruism, fairness, and a
            desire to punish unfairness—even at a cost to themselves.
          </p>
        ),
      },
      {
        title: 'The evidence',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>The ultimatum game:</strong> A proposer splits a sum; if
              the responder rejects, both get nothing. Responders routinely
              reject small, unfair offers, forgoing free money to punish
              unfairness—pure self-interest predicts accepting any offer.
            </p>
            <p>
              <strong>The dictator game:</strong> Contrary to pure selfishness,
              people give substantial amounts to strangers when given the
              chance, revealing pure altruism.
            </p>
            <p>
              <strong>The public goods game:</strong> People contribute to
              shared pools and punish free-riders even at personal cost,
              sustaining cooperation where selfish play would unravel it.
            </p>
          </div>
        ),
      },
      {
        title: 'The motives',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Altruism:</strong> Caring about others&rsquo; welfare for
              its own sake, even without reciprocation.
            </p>
            <p>
              <strong>Fairness/inequity aversion:</strong> Disliking unequal
              outcomes—both when disadvantaged and, often, when advantaged—
              motivating redistribution and resistance to unfair bargains.
            </p>
            <p>
              <strong>Reciprocity:</strong> Responding to kindness with kindness
              and to hostility with hostility, even when it costs the responder.
            </p>
          </div>
        ),
      },
      {
        title: 'Why it matters',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Better predictions:</strong> Incorporating social
              preferences explains behavior—rejections, cooperation, giving—that
              purely selfish models cannot.
            </p>
            <p>
              <strong>Market design:</strong> Understanding fairness motives
              improves contracts, auctions, and workplace incentives where trust
              and reciprocity affect outcomes.
            </p>
            <p>
              <strong>Foundation of economics:</strong> It links individual
              choice to social outcomes, informing how institutions and norms
              shape cooperation and conflict (see Evolutionary Game Theory).
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/economics/social-preferences/dictator',
        label: 'Dictator Game',
        description:
          'Decide how much of your endowment to give when nobody can punish you.',
      },
    ]}
    references={[
      {
        href: 'https://en.wikipedia.org/wiki/Social_preferences',
        label: 'Wikipedia: Social preferences',
        description:
          'Overview of fairness, reciprocity, and altruism as social preferences in economic experiments.',
      },
      {
        href: 'https://en.wikipedia.org/wiki/Ultimatum_game',
        label: 'Wikipedia: Ultimatum game',
        description:
          'The ultimatum game and experimental evidence against pure self-interest.',
      },
      {
        href: 'https://books.core-econ.org/the-economy/microeconomics/04-strategic-interactions-11-ultimatum-game.html',
        label: 'CORE Econ: The ultimatum game',
        description:
          'Interactive CORE Economics textbook treatment of the ultimatum game and fairness.',
      },
    ]}
  />
);

export default SocialPreferencesPage;
