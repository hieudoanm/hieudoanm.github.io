import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const MindfulnessTheoryPage: NextPage = () => (
  <TheoryTemplate
    title="Mindfulness"
    subtitle="Attention trained toward present-moment experience — what the evidence supports, and what it does not."
    parentLink={{ href: '/psychology/', label: 'Psychology' }}
    sections={[
      {
        title: 'What the practice is',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              Mindfulness is a family of practices that cultivate{' '}
              <strong>non-judgmental present-moment awareness</strong>. That
              definition matters: the target is not a particular posture or
              mantra but a particular relationship to whatever is happening
              right now.
            </p>
            <p>
              It is usually described in terms of two components —{' '}
              <strong>attention</strong> sustained on the present, and{' '}
              <strong>orientation</strong> toward experience rather than
              reacting to it. The second is what separates mindfulness from
              simple concentration.
            </p>
            <p>
              It is an ancient practice that arrived in clinical settings in the
              late 1970s, where Jon Kabat-Zinn adapted a Buddhist sitting
              practice into a stress-reduction programme. What is modern is the
              manualised, eight-week, group-delivered format rather than the
              sitting itself.
            </p>
          </div>
        ),
      },
      {
        title: 'What mindfulness is not',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              Mindfulness is{' '}
              <strong>not relaxation in a different chair</strong>. Some
              practices like progressive muscle relaxation reduce physiological
              arousal; mindfulness practice is more often mildly uncomfortable,
              and the discomfort is the point.
            </p>
            <p>
              It is not a cure, not a replacement for therapy where therapy is
              indicated, and not a method of suppressing difficult thoughts. The
              goal is noticing a thought clearly, not preventing it.
            </p>
            <p>
              Nor is it uniformly beneficial. Some people report{' '}
              <strong> adverse effects</strong> — increased distress, anxiety,
              or dissociation — particularly after intensive practice, in trauma
              survivors, or in people with a history of dissociation. The
              practice is best learned with guidance rather than solo.
            </p>
          </div>
        ),
      },
      {
        title: 'The evidence',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              Meta-analyses of randomised controlled trials find{' '}
              <strong>small to moderate effects</strong> on anxiety, depression
              and pain, with effect sizes typically around d = 0.3 to 0.5 —
              real, but modest, and comparable to several other active
              treatments.
            </p>
            <p>
              The mechanism is not settled. Proposed accounts include{' '}
              <strong> attentional regulation</strong> (reorienting to present
              experience after distraction), <strong> decentering</strong>{' '}
              (observing thoughts as events rather than facts), and changes in{' '}
              <strong> reactivity</strong> — the gap between feeling a state and
              acting on it.
            </p>
            <p>
              Effects on attention are more consistent than effects on any
              single symptom, and a practice that helps is one you keep doing.
              Adherence, not intensity, is usually the limiting factor.
            </p>
          </div>
        ),
      },
      {
        title: 'Practising it',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              Ten minutes daily is enough to begin, and a shorter practice done
              consistently outperforms a long one done occasionally. A workable
              start: sit, note where attention goes, and return it to the breath
              when it strays — the returning <em>is</em> the practice, not a
              failure of it.
            </p>
            <p>
              The scales linked below measure the outcomes people are usually
              trying to shift, and can be used to track whether a practice is
              making a difference over weeks rather than days.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/psychology/generalized-anxiety-disorder/',
        label: 'Generalized Anxiety Disorder (GAD-7)',
        description: 'Anxiety symptoms, the most-studied outcome',
      },
      {
        href: '/psychology/satisfaction-with-life/',
        label: 'Satisfaction With Life Scale',
        description: 'Broad wellbeing rather than symptom reduction',
      },
      {
        href: '/psychology/patient-health-questionnaire/',
        label: 'Patient Health Questionnaire (PHQ-9)',
        description: 'Depressive symptom severity over two weeks',
      },
    ]}
  />
);

export default MindfulnessTheoryPage;
