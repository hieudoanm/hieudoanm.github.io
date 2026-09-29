---
{
  'title': 'Magnetic Resonance Imaging (MRI)',
  'subtitle':
    'Anatomy, tissue microstructure, and blood-oxygenation-level contrast —
    millimetre spatial resolution in exchange for the poorest temporal
    resolution of any method here.',
  'parentLink': { 'href': '/neuroscience', 'label': 'Neuroscience' },
  'links':
    [
      {
        'href': '/neuroscience/mri/interactive',
        'label': 'Haemodynamic Response Simulator',
        'description':
          'Convolve a neural drive with the vascular response and see the 4–6
          second lag that sets fMRI temporal resolution.',
      },
    ],
  'references':
    [
      {
        'href': 'https://doi.org/10.1073/pnas.87.24.9868',
        'label':
          'Ogawa, Honda, Kawai et al. (1990) — Proceedings of the National
          Academy of Sciences',
        'description':
          'The original demonstration of intrinsic BOLD contrast in the human
          brain during activation.',
      },
      {
        'href': 'https://doi.org/10.1038/nrn2348',
        'label': 'Logothetis (2008) — Nature Reviews Neuroscience',
        'description':
          'What we can and cannot do with fMRI: the physiology of the BOLD
          signal and the limits of the inferences it supports.',
      },
      {
        'href': 'https://doi.org/10.1016/j.tics.2006.05.004',
        'label': 'Poldrack (2006) — Trends in Cognitive Sciences',
        'description':
          'Why activation maps do not license the reverse inference, with a
          concrete predictive-code framing.',
      },
      {
        'href': 'https://doi.org/10.1002/ar.10048',
        'label': 'Beaulieu (2002) — The Anatomical Record',
        'description':
          'Diffusion-weighted imaging as a neuroanatomical tool, including what
          tractography can and cannot establish.',
      },
    ],
}
---

## The signal

MRI works by aligning hydrogen nuclei in a static field B₀ (typically **1.5 T, 3
T, or 7 T**), perturbing them with radiofrequency pulses, and listening to how
they relax. Two time constants define the contrast: **T1** (spin lattice,
tissue-specific) and **T2** (spin-spin, always shorter than T1). Grey and white
matter differ in the ratio of the two, which is why nearly every sequence is a
variation on the same physics.

The practical consequence is that the signal is _inferred_: a voxel value is a
fitted parameter, not a measurement. That is why sequence parameters, field
homogeneity, and the statistical threshold belong in a methods section alongside
the claims they support.

## Structural contrasts

- **T1-weighted (MPRAGE):** grey matter brighter than white; the workhorse for
  segmentation, cortical surface reconstruction, and volume measurement.
- **T2 and FLAIR:** fluid-bright; FLAIR nulls CSF to reveal periventricular
  lesions and oedema.
- **Diffusion-weighted imaging (DWI/DTI):** the contrast is Brownian motion of
  water, giving white-matter tractography, fractional anisotropy, and mean
  diffusivity. This is the modality that makes _structural connectivity_
  measurable.
- **T2\*/SWI:** sensitive to paramagnetic substances — iron, deoxyhaemoglobin,
  veins, microbleeds.
- **MR spectroscopy:** metabolite concentrations (N-acetylaspartate, choline,
  creatine, GABA) as markers of integrity and metabolism.

## BOLD fMRI

Functional MRI does not measure neural activity. It measures the
**blood-oxygenation-level-dependent** signal: the relaxation time of water
protons in and around capillary beds. Neural activity drives local blood flow
that overshoots oxygen extraction, raising local oxyhaemoglobin and shifting
T2\*.

Every step of that chain is a compromise. The signal change is only **1–2%**
against a noisy baseline. Spatial resolution is excellent (1–3 mm), but that
resolution is bought with the capillary blurring that makes any precise
_cytoarchitectonic_ claim implausible. Temporal resolution is around a 1 s
repetition time, and the underlying **haemodynamic response** rises over ~4–6 s
and lags the neural event by 4–8 s. BOLD is a slow, blurred shadow of a fast
electrical event.

This does not weaken fMRI — it defines its claims. BOLD is well suited to
sustained state differences and to timing _relative to_ other BOLD signals, and
poorly suited to single-neuron firing, millisecond latency, or differences in
amplitude between two small regions.

## What can go wrong

- **Head motion** dominates variance and is correlated with task conditions by
  design (stimulus onsets move heads). It is the first thing to check when a
  result fails to replicate.
- **Reverse inference:** activation in a region does not establish that region's
  function. A region lights up for a consequence of a process, not the process
  itself.
- **Vascular reactivity varies** across regions and with age, drugs,
  anaesthetic, and vascular disease, which can change the BOLD signal without
  changing neural activity. A drug that alters the coupling between neural
  activity and blood flow can produce a pharmacologically induced BOLD change
  with no neural effect at all.
- **Multiplicity:** a whole-brain analysis tests hundreds of thousands of
  voxels. Uncorrected thresholds report false positives by design; report the
  correction method alongside the map.

## Why MRI anchors the other modalities

EEG and MEG both need a **template head** built from a structural MRI, defining
each subject’s cortical folding, and MRI supplies the priors that make the
ill-posed inverse problem tractable. Simultaneous EEG-fMRI and MEG-fMRI work for
exactly this reason: each constrains the other’s weaknesses, trading a shared
acquisition cost for a much stronger inference.

Structural MRI also provides the ground truth for lesion studies and the anatomy
behind tractography, where diffusion constrains a _macroscopic connectivity_
hypothesis and not a monosynaptic one.
