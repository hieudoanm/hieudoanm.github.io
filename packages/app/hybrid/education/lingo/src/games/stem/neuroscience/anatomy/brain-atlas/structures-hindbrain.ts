import type { BrainRegion } from './types';

/** The diencephalon, the cerebellum, and the brainstem. */
export const HINDBRAIN_REGIONS: BrainRegion[] = [
  {
    id: 'diencephalon',
    name: 'Diencephalon',
    parentId: null,
    depth: 0.75,
    summary:
      'The deep central core of the brain, sitting between the cerebrum above and the brainstem below.',
    function:
      'Relays and regulates traffic on its way to and from the cortex, and drives endocrine and autonomic output.',
    note: 'Almost nothing here is visible from the cortical surface. Every structure in it was found by sectioning the brain or by functional imaging, not by looking at it.',
  },
  {
    id: 'thalamus',
    name: 'Thalamus',
    parentId: 'diencephalon',
    depth: 0.8,
    summary:
      'A pair of egg-shaped masses of grey matter at the exact centre of the brain.',
    function:
      'Relays nearly all sensory and motor traffic to the cortex, and gates what is allowed to reach awareness.',
    note: 'Each relay is a separate nucleus with its own rhythm. Thalamic alpha bursts in the low-frequency band are the same event that shows up as the thalamic rhythm in EEG.',
    seeAlso: { href: '/neuroscience/qeeg/', label: 'Quantitative EEG (qEEG)' },
  },
  {
    id: 'hypothalamus',
    name: 'Hypothalamus',
    parentId: 'diencephalon',
    depth: 0.85,
    summary:
      'A small region below the thalamus, lying against the third ventricle.',
    function:
      'Homeostasis: temperature, hunger, thirst, circadian timing, and the control of pituitary hormone release.',
    note: 'A few thousand neurons here run the systems that keep a body alive without conscious effort, so damage here is disproportionately severe for its size.',
  },
  {
    id: 'epithalamus',
    name: 'Epithalamus',
    parentId: 'diencephalon',
    depth: 0.8,
    summary: 'The roof of the diencephalon, which contains the pineal gland.',
    function: 'Secretes melatonin to signal darkness and set circadian phase.',
    note: 'Its projection to the suprachiasmatic nucleus is the route by which light detected at the retina reaches the body clock and organises everything downstream of it.',
  },
  {
    id: 'subthalamus',
    name: 'Subthalamus',
    parentId: 'diencephalon',
    depth: 0.8,
    summary:
      'A small lens-shaped nucleus below the thalamus and above the substantia nigra.',
    function:
      'Excites the basal ganglia’s own output as part of the indirect pathway.',
    note: 'Overactivity here produces hemiballismus, a violent flinging of one side of the body. A tiny structure with an outsized and unusually legible clinical effect.',
  },
  {
    id: 'cerebellum',
    name: 'Cerebellum',
    parentId: null,
    depth: 0.9,
    summary:
      'The densely folded “little brain” tucked beneath the occipital lobe, behind the brainstem.',
    function:
      'Times and smooths movement, and recalibrates predictions from the errors it has already made.',
    note: 'Its folds give it roughly 80% of the brain’s neurons in about 10% of its volume — a startling mismatch against the cortical sheet, and the reason lesion work found so much of it surprisingly silent.',
    anchor: { x: 0.74, y: 0.7 },
  },
  {
    id: 'brainstem',
    name: 'Brainstem',
    parentId: null,
    depth: 0.95,
    summary: 'The stalk connecting the brain to the spinal cord.',
    function:
      'Carries every long tract between brain and body, and hosts the centres for arousal, breathing, and cardiovascular control.',
    note: 'Damage is graded along its length: midbrain lesions disturb arousal, pontine ones disturb breathing and horizontal gaze, and medullary ones are often fatal.',
    anchor: { x: 0.55, y: 0.66 },
  },
  {
    id: 'midbrain',
    name: 'Midbrain',
    parentId: 'brainstem',
    depth: 0.95,
    summary:
      'The upper brainstem, containing the cerebral peduncles and the tectum.',
    function:
      'Carries the corticospinal tract, houses the superior and inferior colliculi, and holds the rostral part of the arousal system.',
    note: 'The superior colliculus is a second, older visual pathway that orients the eyes and head towards a visual or acoustic event — orientation before recognition.',
    anchor: { x: 0.55, y: 0.6 },
  },
  {
    id: 'pons',
    name: 'Pons',
    parentId: 'brainstem',
    depth: 0.9,
    summary:
      'The bulging middle of the brainstem, sitting in front of the cerebellum.',
    function:
      'Relays cortical input into the cerebellum and holds the nuclei for horizontal gaze and arousal.',
    note: 'The corticospinal tract is most compact at this level, so pons width on a mid-sagittal MRI is used as a practical marker of pontine atrophy.',
    anchor: { x: 0.54, y: 0.7 },
  },
  {
    id: 'medulla-oblongata',
    name: 'Medulla Oblongata',
    parentId: 'brainstem',
    depth: 0.85,
    summary:
      'The lowest part of the brainstem, blending into the spinal cord at the foramen magnum.',
    function:
      'Holds the cardiovascular, respiratory, and swallowing centres that sustain a body without conscious effort.',
    note: 'The dorsal medulla is the one region where even a small lesion is routinely fatal — a stark limit on how neatly function can be localised along the stalk.',
    anchor: { x: 0.53, y: 0.78 },
  },
];
