import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const SocialTheoryPage: NextPage = () => (
  <TheoryTemplate
    title="Social Psychology"
    subtitle="How other people change what you think, feel and do — including when you are not aware of it."
    parentLink={{ href: '/psychology/', label: 'Psychology' }}
    sections={[
      {
        title: 'The situation does more work than you think',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              Social psychology studies how the environment shapes behaviour.
              Its central correction is to intuition: people consistently
              <strong> overstate the role of disposition</strong> and understate
              the role of the situation. Observing someone shout, we infer
              anger; often the situation simply demanded it.
            </p>
            <p>
              The same bias runs through fundamental attribution error — we
              explain our own behaviour by circumstance and other people&apos;s
              by character. Correcting for it is not discounting people&apos;s
              choices, but adding the situational information that was always
              there.
            </p>
            <p>
              Two classic experiments show how far authority and pressure can
              go. In Asch&apos;s line-judgement studies, participants conformed
              to an obviously wrong majority roughly a third of the time, and
              almost everyone conformed at least once. In Milgram&apos;s
              obedience studies a large majority continued further than they
              expected when instructed by an authority figure.
            </p>
          </div>
        ),
      },
      {
        title: 'Social cognition',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              We interpret other people quickly, and not always accurately. The
              <strong> fundamental attribution error</strong> describes the
              asymmetry above. Biases such as the halo effect — one positive
              trait colouring judgement of everything else — and the just-world
              hypothesis, which assumes people get what they deserve, shape what
              we expect of strangers.
            </p>
            <p>
              Stereotyping serves a real function: it saves cognitive effort.
              The cost is that it can override evidence about an individual,
              which is why contact under equal, cooperative conditions — not
              merely exposure — is what reduces prejudice.
            </p>
          </div>
        ),
      },
      {
        title: 'Conformity and influence',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              Norms are enforced by real consequences. Complying publicly to
              gain approval or avoid rejection is{' '}
              <strong>normative social influence</strong>; believing the group
              is right because their information is better is{' '}
              <strong>informational</strong>. Which one operates depends on
              whether the situation is ambiguous.
            </p>
            <p>
              Compliance also depends on whether the target feels free to say
              no. Keeping the exit visible and the cost of refusal low — a small
              ask, an opt-out option, a genuine alternative — is what separates
              cooperation from coercion in any setting.
            </p>
          </div>
        ),
      },
      {
        title: 'Groups, identity and cooperation',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              Group membership changes how people think about themselves.
              Minimal group experiments showed that even arbitrary assignment to
              &ldquo;groups&rdquo; produces in-group favouritism and out-group
              bias, which suggests the drive to belong is basic rather than
              ideological.
            </p>
            <p>
              The <strong> bystander effect</strong> explains why helping gets
              less likely as the number of witnesses rises: responsibility
              diffuses, and each person uses the others as evidence that help is
              unnecessary. Being visibly designated as responsible reliably
              increases intervention.
            </p>
            <p>
              Relationships are measured across dimensions like closeness,
              commitment, and mutual support. These scales map the same
              territory this page describes, from dyadic attachment to overall
              life satisfaction.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/psychology/relationship-closeness-inventory/',
        label: 'Relationship Closeness Inventory',
        description: 'Rate a specific relationship across ten dimensions',
      },
      {
        href: '/psychology/experiences-in-close-relationships/',
        label: 'Experiences in Close Relationships (ECR-R)',
        description: 'Attachment anxiety and avoidance in adult bonds',
      },
      {
        href: '/psychology/dyadic-adjustment-scale/',
        label: 'Dyadic Adjustment Scale',
        description: 'How well two people are working together',
      },
    ]}
  />
);

export default SocialTheoryPage;
