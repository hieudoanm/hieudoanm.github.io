'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const CoordinationGamesPage: NextPage = () => (
  <TheoryTemplate
    title="Coordination Games"
    subtitle="When the best choice depends on what everyone else chooses—and the challenge is just to agree."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            A <strong>coordination game</strong> is one where players benefit
            most from matching the same action, rather than from beating rivals.
            Unlike a Prisoner&rsquo;s Dilemma, there is little conflict of
            interest—everyone prefers to coordinate. The problem is choosing
            <em>which</em> of several equally fine outcomes to land on. Driving
            on the left or right, adopting a standard, and using a common
            language are all coordination games.
          </p>
        ),
      },
      {
        title: 'Multiple equilibria',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Shared interest:</strong> In a pure coordination game,
              players prefer to do the same thing. Both driving-on-the-right and
              driving-on-the-left are orderly; mixing them is the disaster.
            </p>
            <p>
              <strong>Which one wins is arbitrary:</strong> Multiple equilibria
              can exist, and which is selected may be arbitrary—history, habit,
              or a focal point determines it, not intrinsic superiority.
            </p>
            <p>
              <strong>Pareto-ranked options:</strong> Sometimes one coordinated
              outcome is better for everyone than another. Players then face a
              shared desire to select the superior equilibrium, but may be
              trapped in a worse one.
            </p>
          </div>
        ),
      },
      {
        title: 'Focal points and the stag hunt',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Focal points (Schelling points):</strong> Thomas Schelling
              showed that people coordinate on salient, obvious outcomes even
              without communication—a landmark time and place stands out.
              Salience breaks the tie between equilibria.
            </p>
            <p>
              <strong>The stag hunt:</strong> A coordination game where two
              hunters can together catch a stag (big reward) but risk failing,
              while each can safely catch a hare alone. Everyone prefers the
              stag, but risk-aversion can trap them in the safe-but-worse hare
              equilibrium.
            </p>
            <p>
              <strong>Trust is central:</strong> Unlike the Prisoner&rsquo;s
              Dilemma, the stag hunt rewards mutual trust—the problem is
              coordinating on the risky but better outcome.
            </p>
          </div>
        ),
      },
      {
        title: 'Real-world applications',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Standards:</strong> Keyboard layouts (QWERTY), video
              formats, and measurement systems are coordination
              outcomes—everyone benefits from matching the standard, even if
              another might be marginally better.
            </p>
            <p>
              <strong>Currency and language:</strong> A common currency and a
              shared language have value precisely because everyone uses them.
            </p>
            <p>
              <strong>Technology adoption:</strong> Network effects make
              platform choices coordination games—everyone joins the platform
              others are on.
            </p>
            <p>
              <strong>Social conventions:</strong> Norms, etiquette, and traffic
              rules are self-enforcing coordination outcomes with no one in
              charge.
            </p>
          </div>
        ),
      },
    ]}
  />
);

export default CoordinationGamesPage;
