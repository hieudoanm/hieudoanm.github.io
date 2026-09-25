import type { BrainRegion } from './types';

/** The cerebrum and everything hanging off it. */
export const CEREBRUM_REGIONS: BrainRegion[] = [
  {
    id: 'cerebrum',
    name: 'Cerebrum',
    parentId: null,
    depth: 0.2,
    summary:
      'The two large folded hemispheres that make up most of the human brain — roughly four-fifths of its volume.',
    function:
      'Integrates sensation, issues voluntary action, and carries the computations we recognise as thought.',
    note: 'Its convolutions are a packaging solution: a smooth sheet of the same area would need a skull several times wider to fit.',
    seeAlso: {
      href: '/neuroscience/mri/',
      label: 'Magnetic Resonance Imaging (MRI)',
    },
  },
  {
    id: 'cerebral-cortex',
    name: 'Cerebral Cortex',
    parentId: 'cerebrum',
    depth: 0.05,
    summary:
      'The outer few millimetres of grey matter, folded into ridges called gyri and grooves called sulci.',
    function:
      'Six stacked layers of neurons wired into vertical columns, performing perception, control, and association.',
    note: 'The sheet’s outline is the least informative part of it. An area is defined by its microarchitecture and connectivity — which is why Brodmann mapped cell types rather than boundaries.',
    seeAlso: {
      href: '/neuroscience/eeg/',
      label: 'Electroencephalography (EEG)',
    },
  },
  {
    id: 'frontal-lobe',
    name: 'Frontal Lobe',
    parentId: 'cerebral-cortex',
    depth: 0.1,
    summary:
      'Anterior cortex, running from the frontal pole back to the central sulcus.',
    function:
      'Voluntary motor control, planning, rule-based decision-making, and the maintenance of information in working memory.',
    note: 'Dorsolateral prefrontal activity is the usual imaging signature of working-memory load, and is what a 2-back block reliably recruits.',
    anchor: { x: 0.24, y: 0.34 },
    seeAlso: {
      href: '/neuroscience/numerical-comparison/',
      label: 'Numerical Comparison',
    },
  },
  {
    id: 'parietal-lobe',
    name: 'Parietal Lobe',
    parentId: 'cerebral-cortex',
    depth: 0.1,
    summary:
      'Cortex behind the central sulcus, ending at the parieto-occipital sulcus.',
    function:
      'Somatosensation, spatial attention, and the binding of touch to the body’s position and movement.',
    note: 'Right inferior parietal damage produces hemispatial neglect: the left half of the world stops being reported even though the eyes still move towards it.',
    anchor: { x: 0.46, y: 0.22 },
  },
  {
    id: 'temporal-lobe',
    name: 'Temporal Lobe',
    parentId: 'cerebral-cortex',
    depth: 0.1,
    summary:
      'Lateral and medial cortex below the lateral sulcus, reaching forward into the temporal pole.',
    function:
      'Auditory processing, recognition of objects and faces, and memory via its medial temporal structures.',
    note: 'The medial temporal lobe holds the hippocampus. Damage there yields severe anterograde amnesia while leaving older memories largely intact.',
    anchor: { x: 0.44, y: 0.6 },
  },
  {
    id: 'occipital-lobe',
    name: 'Occipital Lobe',
    parentId: 'cerebral-cortex',
    depth: 0.1,
    summary: 'Posterior cortex, behind the parieto-occipital sulcus.',
    function:
      'Visual reception, branching from primary visual cortex into a dorsal “where” and a ventral “what” stream.',
    note: 'The ventral occipitotemporal stream is the route the N170 face effect travels, and the substrate the visual-search task probes.',
    anchor: { x: 0.8, y: 0.3 },
    seeAlso: { href: '/neuroscience/visual-search/', label: 'Visual Search' },
  },
  {
    id: 'insular-lobe',
    name: 'Insular Lobe',
    parentId: 'cerebral-cortex',
    depth: 0.35,
    summary:
      'Cortex buried deep within the lateral sulcus, visible only when the surrounding opercula are pulled apart.',
    function:
      'Interoception, taste, and a hub role linking bodily state to emotion and motivation.',
    note: 'Its hidden position is a methodological story: no one could map it from the cortical surface until sulcal-depth imaging made the fold reachable.',
    anchor: { x: 0.36, y: 0.44 },
  },
  {
    id: 'white-matter',
    name: 'White Matter',
    parentId: 'cerebrum',
    depth: 0.5,
    summary:
      'Myelinated axon tracts running beneath the cortex, a little under half of cerebral volume.',
    function:
      'Carries signals between areas, and between the hemispheres, at far higher bandwidth than grey matter alone.',
    note: 'Diffusion MRI reconstructs these tracts, which is the basis for structural connectivity and for the tractography half of the MRI story.',
    seeAlso: {
      href: '/neuroscience/mri/',
      label: 'Magnetic Resonance Imaging (MRI)',
    },
  },
  {
    id: 'basal-ganglia',
    name: 'Basal Ganglia',
    parentId: 'cerebrum',
    depth: 0.6,
    summary:
      'A set of deep nuclei — caudate, putamen, globus pallidus, substantia nigra — that loop back to the cortex.',
    function:
      'Selects and scales movement and reinforcement signals, gating which cortical programme is allowed to run.',
    note: 'Degeneration of the dopaminergic neurons in the substantia nigra is the pathology of Parkinson’s disease, and the reason the indirect pathway gets so much modelling attention.',
  },
  {
    id: 'limbic-structures',
    name: 'Limbic Structures',
    parentId: 'cerebrum',
    depth: 0.55,
    summary:
      'A ring of cortex and deep nuclei along the medial edge of the brain.',
    function:
      'Emotion, motivation, memory formation, and homeostatic regulation.',
    note: 'The limbic lobe is a surface landmark; “limbic system” is a functional grouping rather than one discrete structure, and different fields carve it differently.',
  },
  {
    id: 'hippocampus',
    name: 'Hippocampus',
    parentId: 'limbic-structures',
    depth: 0.6,
    summary:
      'A curved structure in the medial temporal lobe, belonging to the allocortex.',
    function:
      'Binds context and episodes together into new long-term declarative memory.',
    note: 'It is what the Old/New judgement in a recognition-memory task is actually testing — and the first structure to fail in hippocampal damage.',
    seeAlso: {
      href: '/neuroscience/memory-recognition/',
      label: 'Memory Recognition',
    },
  },
  {
    id: 'amygdala',
    name: 'Amygdala',
    parentId: 'limbic-structures',
    depth: 0.55,
    summary:
      'An almond-shaped nucleus sitting just anterior to the hippocampus.',
    function:
      'Assigns emotional salience to a cue and triggers the autonomic and endocrine response that follows.',
    note: 'In the dual-route account of fear, its response is fast enough to begin before the stimulus has been fully processed — which is why a low road exists at all.',
  },
  {
    id: 'cingulate-cortex',
    name: 'Cingulate Cortex',
    parentId: 'limbic-structures',
    depth: 0.4,
    summary:
      'Cortex arching over the corpus callosum, usually split into anterior, midcingulate, and posterior parts.',
    function:
      'Conflict monitoring, error detection, and the regulation of affect and effort.',
    note: 'The anterior midcingulate supplies the error-related negativity, the most reliable conflict signal in the flanker and Stroop tasks.',
    seeAlso: { href: '/neuroscience/flanker-task/', label: 'Flanker Task' },
  },
  {
    id: 'corpus-callosum',
    name: 'Corpus Callosum',
    parentId: 'cerebrum',
    depth: 0.5,
    summary:
      'The largest commissural tract in the brain, a bundle of some 200 million axons crossing the midline.',
    function: 'Connects corresponding cortical areas of the two hemispheres.',
    note: 'Its complete absence is survivable, which is the cleanest evidence that hemispheres can specialise independently — and that they still need shared vocabulary to cooperate.',
  },
];
