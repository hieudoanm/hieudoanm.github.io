'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const NudgePage: NextPage = () => (
  <TheoryTemplate
    title="Nudge & Behavioral Economics"
    subtitle="Small changes in how choices are presented can dramatically change what people choose."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            <strong>Behavioral economics</strong> fuses psychology and economics
            to explain why people systematically deviate from rational choice. A{' '}
            <strong>nudge</strong>, as defined by Richard Thaler and Cass
            Sunstein (Nobel Prize 2017 for Thaler), is any aspect of choice
            architecture that alters behavior in a predictable way without
            forbidding any option or changing economic incentives. The default
            option, the order of items, and the framing of outcomes are all
            nudges.
          </p>
        ),
      },
      {
        title: 'Key concepts',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Libertarian paternalism:</strong> It is possible to steer
              people toward better decisions while preserving their freedom to
              choose otherwise. The architecture is paternalistic; the outcome
              is libertarian.
            </p>
            <p>
              <strong>Default effects:</strong> People overwhelmingly stick with
              whatever option is pre-selected. Organ donation rates jump from
              ~15% to ~90% when the default switches from opt-in to opt-out—even
              though the actual choice is identical.
            </p>
            <p>
              <strong>Framing effects:</strong> How a choice is presented
              changes what people pick. &ldquo;90% fat-free&rdquo; is more
              appealing than &ldquo;10% fat&rdquo;—same information, different
              response.
            </p>
            <p>
              <strong>Social norms:</strong> Telling people what others do is
              one of the most powerful nudges. Hotel towel reuse programs that
              say &ldquo;75% of guests reuse their towel&rdquo; outperform
              environmental appeals.
            </p>
          </div>
        ),
      },
      {
        title: 'Choice architecture',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Simplification:</strong> Reducing complexity and decision
              fatigue. Auto-enrollment in retirement plans with a simple opt-out
              is far more effective than requiring active sign-up.
            </p>
            <p>
              <strong>Salience:</strong> Making important information
              conspicuous. Placing healthy food at eye level in a cafeteria
              increases its selection without removing junk food.
            </p>
            <p>
              <strong>Timely feedback:</strong> Showing energy usage compared to
              neighbors (the Opower effect) nudges conservation without any
              price change.
            </p>
            <p>
              <strong>Commitment devices:</strong> Helping people lock in future
              good behavior—like savings apps that penalize withdrawal—addresses
              present bias.
            </p>
          </div>
        ),
      },
      {
        title: 'Criticisms and limits',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Manipulation concerns:</strong> Critics argue nudges are a
              form of soft paternalism that can be used to manipulate rather
              than help—especially when the choice architect has its own agenda.
            </p>
            <p>
              <strong>Scale and durability:</strong> Small nudges may produce
              small effects that fade over time. Structural changes (taxes,
              regulations) often have larger, more permanent impacts.
            </p>
            <p>
              <strong>Equity:</strong> Nudges can disproportionately affect less
              sophisticated decision-makers, potentially widening the gap
              between sophisticated and naive consumers.
            </p>
            <p>
              <strong>Replication:</strong> Some classic nudge effects have
              proven fragile or context-dependent, raising questions about
              generalizability.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/nudge-and-behavioral-economics/choice',
        label: 'Nudge Design Lab',
        description:
          'Design opt-in vs opt-out defaults and run an auto-enroll simulator to see default effects.',
      },
    ]}
    references={[
      {
        href: 'https://en.wikipedia.org/wiki/Nudge_theory',
        label: 'Wikipedia: Nudge Theory',
        description:
          'Overview of nudge theory, choice architecture, and libertarian paternalism.',
      },
      {
        href: 'https://www.investopedia.com/terms/b/behavioraleconomics.asp',
        label: 'Investopedia: Behavioral Economics',
        description:
          'Introduction to behavioral economics and how psychology shapes economic decisions.',
      },
      {
        href: 'https://www.nobelprize.org/prizes/economic-sciences/2017/thaler/facts/',
        label: 'Nobel Prize: Richard Thaler (2017)',
        description:
          'Nobel biography of Thaler, awarded for integrating psychology into economics.',
      },
    ]}
  />
);

export default NudgePage;
