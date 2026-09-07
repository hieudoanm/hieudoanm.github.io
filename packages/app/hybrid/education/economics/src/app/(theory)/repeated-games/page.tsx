'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const RepeatedGamesPage: NextPage = () => (
  <TheoryTemplate
    title="Repeated Games & Tit-for-Tat"
    subtitle="Why playing the same game over and over unlocks cooperation that a single round never could."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            A <strong>repeated game</strong> is a game played over multiple
            rounds, where players remember past actions. Repetition changes
            everything: a one-shot Prisoner&rsquo;s Dilemma ends in mutual
            defection, but when the same players meet again, cooperation becomes
            sustainable because cheaters can be punished in future rounds. The
            most famous strategy is <strong>Tit-for-Tat</strong>: cooperate
            first, then mirror whatever your opponent did last round.
          </p>
        ),
      },
      {
        title: 'Why repetition changes behavior',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Shadow of the future:</strong> When a game continues,
              today&rsquo;s choice affects tomorrow&rsquo;s rewards. Defecting
              now brings a quick gain but forfeits future cooperation—so the
              long-run value of the relationship outweighs the one-time cheat.
            </p>
            <p>
              <strong>Reciprocity:</strong> Being able to reward cooperation and
              punish defection gives players a way to sustain good behavior
              without any central authority.
            </p>
            <p>
              <strong>The Folk Theorem:</strong> With enough patience, almost
              any payoff profile above the punishment level can be sustained as
              an equilibrium—cooperation is rarely the only possibility, but it
              is achievable.
            </p>
          </div>
        ),
      },
      {
        title: 'Tit-for-Tat',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>The rule:</strong> Cooperate on the first move, then copy
              your opponent&rsquo;s previous move. It is <em>nice</em> (never
              the first to defect), <em>retaliatory</em> (punishes defection),{' '}
              <em>forgiving</em> (returns to cooperation if the opponent does),
              and <em>clear</em> (easy to read).
            </p>
            <p>
              <strong>The tournament win:</strong> In Robert Axelrod&rsquo;s
              famous computer tournaments among strategies for the iterated
              Prisoner&rsquo;s Dilemma, the simple Tit-for-Tat beat every
              sophisticated competitor—using reciprocity to sustain cooperation.
            </p>
            <p>
              <strong>Limits:</strong> Tit-for-Tat can get locked into
              retaliation cycles if a single mistake goes unpunished; variants
              like generous or forgetful versions exist to dampen this.
            </p>
          </div>
        ),
      },
      {
        title: 'Real-world applications',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Business relationships:</strong> Suppliers and buyers
              build trust through repeated dealings, allowing cooperation
              (reliable quality, fair pricing) that a one-off transaction
              couldn&rsquo;t support.
            </p>
            <p>
              <strong>Cartels and collusion:</strong> Oligopolists sustain
              high-price collusion partly because deviation is punished in
              future rounds—the flip side of repeated-game cooperation.
            </p>
            <p>
              <strong>International relations:</strong> Arms control treaties
              are sustained by the threat of retaliation if a partner cheats,
              making repeated interaction a tool for peace.
            </p>
            <p>
              <strong>Psychology:</strong> Trust in friendships and teams is
              built and maintained through observed responsiveness to past
              behavior.
            </p>
          </div>
        ),
      },
    ]}
  />
);

export default RepeatedGamesPage;
