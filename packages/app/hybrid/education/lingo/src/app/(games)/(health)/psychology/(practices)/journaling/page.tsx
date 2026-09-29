import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const JournalingTheoryPage: NextPage = () => (
  <TheoryTemplate
    title="Journaling"
    subtitle="Writing as a thinking tool — what changes when experience is put on paper."
    parentLink={{ href: '/psychology/', label: 'Psychology' }}
    sections={[
      {
        title: 'Why writing helps',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              Writing is a <strong>cognitive-emotional rehearsal</strong>.
              Verbalising an experience moves it from implicit, fast, emotional
              processing into explicit, slower, language-based processing, which
              is associated with weaker emotional reactivity to the memory
              afterwards.
            </p>
            <p>
              It also externalises working memory. Offloading a worry onto a
              page frees the limited-capacity store for other tasks — the effect
              people report as &ldquo;getting it out of my head&rdquo;.
            </p>
            <p>
              Because writing is slow, it also{' '}
              <strong>interferes with rumination</strong>. Undisturbed recall
              lets a mood reinforce itself; putting a sequence of events in
              order forces the alternative of narrative, which requires facts,
              causes and a next step.
            </p>
          </div>
        ),
      },
      {
        title: 'Expressive versus analytic writing',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              The two dominant forms produce different effects.{' '}
              <strong>Expressive writing</strong> is descriptive and
              unstructured: what happened, how it felt, without editing or
              interpretation. <strong>Analytic writing</strong> states a claim
              and then tests it against evidence.
            </p>
            <p>
              Trials comparing them find the expressive form is associated with
              reduced intrusion of traumatic memories, while the analytic form
              is associated with improved marks and with greater insight into an
              illness. The mechanism differs: one regulates emotion, the other
              produces understanding.
            </p>
            <p>
              Structured templates generally outperform free-form writing when
              the goal is specific — mood tracking, a gratitude column, or a
              list of what is within and outside one&apos;s control.
            </p>
          </div>
        ),
      },
      {
        title: 'A workable routine',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              Fifteen minutes most days beats an occasional long session. Two
              minutes — one page, unedited — is enough to start, and the
              consistency is what produces the effect.
            </p>
            <p>
              The most useful prompt is usually not open-ended. Something like
              &ldquo;what is taking up the most space today, and what would one
              small step be&rdquo; turns a mood into a decision. Writing to an
              imagined reader is also a standard technique for building empathy:
              it forces you to supply what the other person knows that you do
              not.
            </p>
            <p>
              One caution: mood-tracking scales can become a source of
              rumination if used only to record distress. Pair tracking with
              something generative, and treat a bad run as data rather than a
              verdict.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/psychology/patient-health-questionnaire/',
        label: 'Patient Health Questionnaire (PHQ-9)',
        description: 'Structured symptom tracking over two weeks',
      },
      {
        href: '/psychology/beck-depression-inventory/',
        label: 'Beck Depression Inventory (BDI-II)',
        description: 'Mood, sleep and energy across three weeks',
      },
      {
        href: '/psychology/satisfaction-with-life/',
        label: 'Satisfaction With Life Scale',
        description: 'A five-item snapshot to revisit periodically',
      },
    ]}
  />
);

export default JournalingTheoryPage;
