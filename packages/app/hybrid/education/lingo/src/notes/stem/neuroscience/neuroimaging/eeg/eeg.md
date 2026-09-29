---
{
  'title': 'Electroencephalography (EEG)',
  'subtitle':
    'Scalp voltage from millisecond-scale cortical synchrony — the cheapest,
    most portable, and most widely used window into human brain dynamics.',
  'parentLink': { 'href': '/neuroscience', 'label': 'Neuroscience' },
  'links':
    [
      {
        'href': '/neuroscience/eeg/interactive',
        'label': 'ERP & Averaging Simulator',
        'description':
          'Build a trial, inject blink, muscle, hum, and drift, then watch
          averaging cancel noise but keep artefacts.',
      },
    ],
  'references':
    [
      {
        'href': 'https://doi.org/10.1016/0013-4694(58)90053-1',
        'label':
          'Jasper (1958) — Electroencephalography and Clinical Neurophysiology',
        'description':
          'The original 10–20 electrode system that made scalp recording
          reproducible across laboratories.',
      },
      {
        'href': 'https://doi.org/10.1016/j.clinph.2004.06.001',
        'label': 'Michel et al. (2004) — Clinical Neurophysiology',
        'description':
          'EEG source imaging review: the forward model, the ill-posed inverse
          problem, and the standard reconstruction families.',
      },
      {
        'href': 'https://mitpress.mit.edu/9780262611863/an-introduction-to-the-event-related-potential-method/',
        'label':
          'Luck (2014) — An Introduction to the Event-Related Potential Method,
          MIT Press',
        'description':
          'The reference treatment of ERP methodology: nomenclature, polarity
          conventions, baseline choice, and component inference.',
      },
    ],
}
---

## What it measures

EEG electrodes on the scalp pick up voltage differences produced by
**synchronous postsynaptic currents** in cortical pyramidal neurons, not the
action potentials themselves. Pyramidal cells are arranged in near-parallel
sheets, so thousands of them firing together sum to a field that escapes the
skull. That synchrony is the signal: a single neuron is invisible, a coherent
population is not.

The resulting waveforms are on the order of **10–100 µV**. The dynamic range
matters more than the amplitude: since the same range carries the signal, it
also sets the noise floor that amplifier quality and referencing must beat.

## Acquisition

The international **10–20 system** places electrodes at 10% and 20% distances
from nasion, inion, and the preauricular points, giving a reproducible
whole-scalp montage. Sample rates of 250–2048 Hz are typical, with a practical
passband near 0.1–40 Hz after filtering.

**Referencing is a modelling decision, not a detail.** EEG records a potential
_difference_ between sites, so every voltage is stated relative to something. A
common average reference, a linked-mastoid reference, and a single-electrode
reference all produce different-looking data from the same brain. Report the
reference, and re-reference when comparing across montages.

## The volume conductor problem

Scalp EEG has no principled inverse solution. The skull is roughly **80× less
conductive than the brain** and the cerebrospinal fluid far more conductive, so
the field smears spatially as it passes outward. Activity is blurred, deep
sources are attenuated, and there is no unique set of sources producing a given
scalp map.

Practical tools exist, none of which manufacture resolution that was never
there. A **surface Laplacian** estimates the field's second derivative to
sharpen topography. **sLORETA and eLORETA** normalise minimum-norm estimates for
the expected variance of each voxel. **Independent component analysis** removes
eye and muscle components as sources before averaging. The defensible conclusion
from scalp EEG alone is a _statistical map_ of relative synchrony — not a
picture of the cortex.

## Artefacts

Artefacts are large and mostly identifiable, which makes EEG unusually
transparent once you know what to look for.

- **Eye blinks and saccades:** large, slow, frontal polarised signals from the
  corneoretinal dipole. EOG channels and ICA usually remove them, but they
  overlap frontal slow waves that researchers actually want.
- **Muscle:** broadband high-frequency activity from temporalis and frontalis.
  It worsens with effort and tension, so it is also a signal — a confound for
  one analysis and a variable of interest for another.
- **Electrode pop and drift:** instantaneous jumps or slow baseline wander from
  a bad contact or sweat bridge.
- **Mains hum:** 50 or 60 Hz and its harmonics. A notch filter handles it; a
  room that removes the need does better.

## What ERPs reveal

Averaging to the event, time-locked to a stimulus or response, cancels activity
that varies in timing and leaves the response that does not. The result is the
**event-related potential** — a component measured in microvolts, at a latency
in milliseconds, relative to an explicit baseline.

The standard inventory: **P1/N1** (early sensory), **N170** (face-selective
processing, occipitotemporal, ~170 ms), **MMN** (automatic deviance detection,
~150–250 ms), **N2pc** (target discrimination, ~200–300 ms), and **P300**
(context updating, ~300–500 ms). Latencies and amplitudes scale with stimulus
evidence, so ERP effects map cleanly onto the drift rate _v_ in a
[Drift Diffusion Model](/neuroscience/drift-diffusion-model) .

P300 amplitude is largest for rare, task-relevant, attended events — the three
factors in the _novelty P3_ account. A large P300 to a frequent, ignored
stimulus usually signals that the task was not attended to as designed, which is
a finding about the experiment, not the brain.
