import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const DevelopmentalTheoryPage: NextPage = () => (
  <TheoryTemplate
    title="Developmental Psychology"
    subtitle="How people change across a lifetime — and why the earliest years are not simply a runway to adulthood."
    parentLink={{ href: '/psychology/', label: 'Psychology' }}
    sections={[
      {
        title: 'Infancy: built for attachment',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              Newborns arrive with preferences already in place: they track
              faces, prefer a mother&apos;s voice to a stranger&apos;s, and turn
              toward novel stimuli. The <strong>visual cliff</strong> experiment
              showed that depth perception is present early: infants crawl
              toward a mother across a shallow surface but refuse at the
              apparent drop.
            </p>
            <p>
              Bowlby framed this as an evolved attachment system. Ainsworth
              observed how infants use a caregiver as a base for exploring —
              approaching when frightened, retreating to comfort, then returning
              to play. The security of that base predicts later exploration,
              more than any other early measure.
            </p>
            <p>
              Object permanence — understanding that people and objects continue
              to exist when unseen — arrives around eight months, and marks the
              shift from perceptual to symbolic thought.
            </p>
          </div>
        ),
      },
      {
        title: 'Childhood: thinking changes shape',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              Piaget described development as qualitatively staged rather than
              gradual. Pre-operational children are egocentric: they cannot
              easily take another person&apos;s viewpoint, which is why the
              three-mountain task is so hard for them. Concrete operational
              children can reason logically about things they can handle but
              falter on hypotheticals; formal operations arrive in adolescence.
            </p>
            <p>
              Vygotsky disagreed that stages are universal, and introduced the{' '}
              <strong>zone of proximal development</strong>: what a child can do
              today with guidance is a better predictor of future growth than
              what they can do unaided. Teaching is the mechanism — a good
              instructor works inside that zone rather than at the level the
              child already reaches alone.
            </p>
            <p>
              Early language is statistical learning: infants track how often
              sound pairs occur and infer word boundaries without being taught
              them. The <strong>word gap</strong> effect — better discrimination
              across a pause between words — is one of the clearest signs of
              prelinguistic statistical learning.
            </p>
          </div>
        ),
      },
      {
        title: 'Adolescence: a second opening',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              Adolescence is not simply childhood at a larger scale. The brain
              remodels: limbic and reward systems mature earlier than prefrontal
              control, which peaks in the mid-twenties. That gap between
              motivation and regulation explains risk-taking as well as genuine
              gains in abstract and social reasoning.
            </p>
            <p>
              Identity takes centre stage. Exploring commitments and then
              committing to them is the developmental work, and a context that
              permits safe experimentation supports it better than one that
              demands early certainty.
            </p>
          </div>
        ),
      },
      {
        title: 'Adulthood and later life',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              Adult development is driven less by stages than by{' '}
              <strong>continuity</strong>. Crystallised intelligence —
              vocabulary and accumulated knowledge — keeps rising well into
              later life, while fluid intelligence, which depends on processing
              speed, declines earlier. Expertise and experience partly offset
              the loss, which is why older adults are slower on unfamiliar tasks
              yet more accurate within their domain.
            </p>
            <p>
              Erikson called the late-life task{' '}
              <strong>integrity versus despair</strong>: reviewing a life with
              enough coherence to accept it. In research, the strongest
              predictor of later wellbeing is often the quality of close
              relationships, above health or income.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/psychology/relationship-closeness-inventory/',
        label: 'Relationship Closeness Inventory',
        description: 'Measure a bond across a graded set of dimensions',
      },
      {
        href: '/psychology/experiences-in-close-relationships/',
        label: 'Experiences in Close Relationships (ECR-R)',
        description: 'Adult attachment style and its developmental roots',
      },
      {
        href: '/psychology/satisfaction-with-life/',
        label: 'Satisfaction With Life Scale',
        description: 'Wellbeing across the lifespan in five short items',
      },
    ]}
  />
);

export default DevelopmentalTheoryPage;
