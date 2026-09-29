import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const CognitiveTheoryPage: NextPage = () => (
  <TheoryTemplate
    title="Cognitive Psychology"
    subtitle="The architecture of thought: attention, memory, language and the limits of each."
    parentLink={{ href: '/psychology/', label: 'Psychology' }}
    sections={[
      {
        title: 'Attention is a filter, not a spotlight',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              At any moment far more information reaches the senses than the
              brain can process, so attention selects. Selective attention means
              focusing on one channel while suppressing others — the reason a
              conversation you are not in becomes hard to follow.
            </p>
            <p>
              The <strong>cocktail party effect</strong> is the classic
              demonstration: your name spoken across a noisy room pulls
              attention to you without you consciously choosing it, and the
              effect survives even when the same words are played backwards.
            </p>
            <p>
              Attention is also capacity-limited. Divided attention costs
              accuracy and reaction time, which is why phone use while driving
              degrades performance even though people rate it as safe.
            </p>
          </div>
        ),
      },
      {
        title: 'Working memory holds the present',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              Working memory is a small, temporary store — able to hold roughly
              four items, not the seven Miller famously reported. Miller&apos;s
              magic number was about the span of{' '}
              <strong>absolute judgement</strong> under ideal conditions;
              real-world chunking usually yields closer to three or four chunks.
            </p>
            <p>
              Baddeley&apos;s model separates it into a{' '}
              <strong>central executive</strong> that directs attention, a{' '}
              <strong>phonological loop</strong> for speech and sound, a{' '}
              <strong>visuospatial sketchpad</strong> for images and locations,
              and an <strong>episodic buffer</strong> that binds them into a
              coherent scene.
            </p>
            <p>
              Change one component and the pattern of errors changes. Ask people
              to repeat digits and they fail on length; ask them to match
              columns of letters while reciting words and they succeed at both.
            </p>
          </div>
        ),
      },
      {
        title: 'Long-term memory is many systems',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              Long-term memory is not one store. It divides at least three ways:
              by <strong>content</strong> (declarative facts and episodes versus
              procedural skills), by <strong>consciousness</strong> (explicit
              recall versus implicit priming), and by <strong>stage</strong>{' '}
              (encoding, consolidation, retrieval).
            </p>
            <p>
              The serial position curve is a reliable finding: items at the
              start and end of a list are recalled best, the middle worst. The
              <strong> spacing effect</strong> — long gaps between study
              attempts outperforming massed ones — is among the most robust
              findings in all of memory research.
            </p>
            <p>
              Retrieval is reconstructive, not a replay. Each act of recall
              slightly rewrites the memory, which is why confident eyewitnesses
              can be wrong and why repeated retelling can introduce errors.
            </p>
          </div>
        ),
      },
      {
        title: 'Language and executive control',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              Language processing is largely automatic and unconscious. We
              rarely notice the work behind parsing a sentence until it fails —
              garden-path sentences such as &ldquo;the old man the boats&rdquo;
              initially commit you to the wrong reading and then force a
              reanalysis.
            </p>
            <p>
              Executive function coordinates working memory, attention,
              inhibition and planning, and keeps goals active over time. Damage
              to the prefrontal cortex degrades it while leaving vocabulary and
              general knowledge largely intact, which is the dissociation
              clearest evidence that they are separate systems.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/psychology/big-five-inventory/',
        label: 'Big Five Inventory',
        description: 'Trait structure underlying stable cognitive style',
      },
      {
        href: '/psychology/satisfaction-with-life/',
        label: 'Satisfaction With Life Scale',
        description: 'A validated measure of cognitive appraisal of life',
      },
      {
        href: '/psychology/patient-health-questionnaire/',
        label: 'Patient Health Questionnaire (PHQ-9)',
        description: 'Attention and memory symptoms screened clinically',
      },
    ]}
  />
);

export default CognitiveTheoryPage;
