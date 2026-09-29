import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const CounsellingTheoryPage: NextPage = () => (
  <TheoryTemplate
    title="Counselling Psychology"
    subtitle="Theories that guide therapy, what the common approaches share, and where a counsellor stops."
    parentLink={{ href: '/psychology/', label: 'Psychology' }}
    sections={[
      {
        title: 'What counselling is',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              Counselling psychology is the applied study of{' '}
              <strong>assessment and intervention</strong> in mental health,
              practised by psychologists trained to a recognised ethical and
              regulatory standard. The working alliance — the collaborative
              relationship between client and practitioner — is the{' '}
              <strong>best-supported predictor of outcome</strong> across
              essentially every approach.
            </p>
            <p>
              Assessment is not incidental to therapy. A thorough formulation
              links the presenting difficulty to predisposing, precipitating and
              perpetuating factors, and it is what makes a treatment choice
              rational rather than habitual.
            </p>
            <p>
              Counselling and psychotherapy overlap heavily; in practice the
              distinction is mostly one of emphasis, training length and
              professional regulation rather than method.
            </p>
          </div>
        ),
      },
      {
        title: 'The main approaches',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Psychodynamic</strong> work looks beneath the presenting
              problem to recurring patterns, often traced to early
              relationships, and understands symptom as meaningful rather than
              merely defective.
            </p>
            <p>
              <strong>Cognitive-behavioural</strong> approaches treat thought
              and behaviour as causally linked to distress, and work on
              reappraisal, behavioural activation and exposure. They are the
              most widely researched and tend to be short-term and structured.
            </p>
            <p>
              <strong>Humanistic</strong> and person-centred work supplies the
              conditions for change — unconditional positive regard, congruence,
              empathy — and trusts the client&apos;s own capacity to grow.{' '}
              <strong>Third-wave</strong> approaches such as ACT and DBT accept
              thoughts without requiring their content to change, focusing
              instead on values and distress tolerance.
            </p>
          </div>
        ),
      },
      {
        title: 'What the evidence actually says',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              The honest summary is that{' '}
              <strong>
                no single approach is clearly superior for most conditions
              </strong>
              . Comparative trials find differences small enough that they
              rarely justify choosing a modality over another on outcome grounds
              alone.
            </p>
            <p>
              What is well established is stronger: therapies beat waitlists,
              most specific treatments beat nonspecific attention controls, and
              the common factors — alliance, empathy, a coherent model, homework
              and a shared rationale — account for a substantial share of
              variance.
            </p>
            <p>
              Where a treatment <em>is</em> notably effective, it is usually
              condition-specific: exposure for anxiety disorders and PTSD,
              behavioural activation for depression, and structured family-based
              work for adolescent eating disorders and conduct problems.
            </p>
          </div>
        ),
      },
      {
        title: 'Limits, ethics and scope',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              Counselling is not a replacement for medical assessment. Symptoms
              of depression, anxiety or attention difficulty can arise from
              thyroid dysfunction, medication effects, sleep apnoea, substance
              use or neurological conditions, and those need a doctor, not a
              therapist.
            </p>
            <p>
              Risk assessment is a core professional duty. Any concern about
              self-harm, harm to others, abuse, or an eating disorder severe
              enough to be medically risky requires escalation rather than
              continued therapy alone, and confidentiality has explicit
              exceptions for exactly these cases — which should be discussed
              before the first session.
            </p>
            <p>
              Access remains the binding constraint. Waiting times, cost and
              shortages of trained practitioners mean the theory here is
              consistently ahead of what people can actually obtain, and the
              scales linked below exist partly to help someone judge whether
              help is warranted before they reach a clinic.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/psychology/patient-health-questionnaire/',
        label: 'Patient Health Questionnaire (PHQ-9)',
        description: 'Common first step in screening for depression',
      },
      {
        href: '/psychology/generalized-anxiety-disorder/',
        label: 'Generalized Anxiety Disorder (GAD-7)',
        description: 'Screening for generalised anxiety symptoms',
      },
      {
        href: '/psychology/dyadic-adjustment-scale/',
        label: 'Dyadic Adjustment Scale',
        description: 'Relationship functioning, a common therapy focus',
      },
    ]}
  />
);

export default CounsellingTheoryPage;
