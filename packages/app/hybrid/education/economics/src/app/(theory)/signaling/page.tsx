'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const SignalingPage: NextPage = () => (
  <TheoryTemplate
    title="Signaling"
    subtitle="How you prove something about yourself when others can't see it directly."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            <strong>Signaling</strong> is the theory of how people convey hidden
            qualities to others. Michael Spence (Nobel Prize 2001) showed that a
            signal only works if it is <strong>costly to fake</strong>—
            otherwise everyone could send it and it would convey nothing. The
            classic example is education as a signal of ability: getting a
            degree is costly, so it credibly separates high-ability from
            low-ability workers.
          </p>
        ),
      },
      {
        title: 'What makes a credible signal',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Costly to fake:</strong> A signal must be harder or more
              expensive to produce for people who don&rsquo;t possess the hidden
              quality. If everyone could fake it, it would carry no information.
            </p>
            <p>
              <strong>Differentiating cost:</strong> The signal works when it is
              easier (cheaper) for the &ldquo;good&rdquo; type to produce than
              the &ldquo;bad&rdquo; type—so the good type invests in it and the
              bad type rationally declines.
            </p>
            <p>
              <strong>Observable:</strong> A signal must be visible to the other
              party for it to influence their behavior.
            </p>
          </div>
        ),
      },
      {
        title: 'Real-world examples',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Education:</strong> A degree signals perseverance,
              intelligence, and trainability. Even if it teaches little, its
              scarcity and cost make it a credible signal of ability in the job
              market.
            </p>
            <p>
              <strong>Brands and warranties:</strong> A money-back guarantee
              signals product quality because a poor product would be costly for
              the firm to back—low-quality firms can&rsquo;t profitably offer
              it.
            </p>
            <p>
              <strong>Certifications:</strong> Professional licenses and
              industry certifications (CPA, CFA) signal competence because they
              require costly effort and testing.
            </p>
            <p>
              <strong>Animal and human display:</strong> The peacock&rsquo;s
              tail and a firm handshake both signal fitness because they are
              costly to produce—evolutionary signaling.
            </p>
          </div>
        ),
      },
      {
        title: 'Signaling vs screening',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Signaling:</strong> The informed party moves first,
              voluntarily revealing their type through a costly action—the job
              applicant invests in a degree.
            </p>
            <p>
              <strong>Screening:</strong> The uninformed party moves first,
              designing a mechanism that sorts participants—the employer sets a
              test or a credential requirement that candidates self-select
              against.
            </p>
            <p>
              <strong>Why it matters:</strong> Together these solve the adverse
              selection and hidden-information problems that can otherwise
              collapse markets (the market for lemons). Understanding which is
              happening tells us who bears the effort of overcoming the
              information gap.
            </p>
          </div>
        ),
      },
    ]}
  />
);

export default SignalingPage;
