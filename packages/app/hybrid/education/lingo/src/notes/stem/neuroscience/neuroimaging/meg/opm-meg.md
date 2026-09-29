---
{
  'title': 'OPM-MEG (Optically Pumped Magnetometer)',
  'subtitle':
    "Room-temperature, on-scalp magnetoencephalography — MEG timing
    and\n    localization without the cryogenics or the fixed helmet.",
  'parentLink': { 'href': '/neuroscience', 'label': 'Neuroscience' },
  'links':
    [
      {
        'href': '/neuroscience/opm-meg/interactive',
        'label': 'OPM Field & Noise Simulator',
        'description':
          "Quantify why 1/r³ makes a 0.5 cm on-scalp sensor incomparable to a
          4\n          cm cryogenic helmet, once the ambient field is shielded.",
      },
    ],
  'references':
    [
      {
        'href': 'https://doi.org/10.1038/nn.4374',
        'label': 'Brooks et al. (2016) — Nature Neuroscience',
        'description':
          "First in-vivo demonstration of on-scalp OPM measurement of
          human\n          evoked fields.",
      },
      {
        'href': 'https://doi.org/10.1016/j.jneumeth.2018.03.019',
        'label': 'Widmer et al. (2018) — Journal of Neuroscience Methods',
        'description':
          "Review of wearable, on-scalp, optically pumped magnetometers
          and\n          their practical operating regimes.",
      },
      {
        'href': 'https://doi.org/10.1111/ejn.13520',
        'label': 'Hämäläinen et al. (2017) — European Journal of Neuroscience',
        'description':
          "Fifty years of MEG, including the sensor physics that
          made\n          room-temperature devices possible.",
      },
    ],
}
---

## What it is

An optically pumped magnetometer measures a magnetic field by polarising a
vapour of rubidium, caesium, or potassium atoms with laser light and reading the
change in their polarisation. Nothing needs cooling to a few kelvin. The first
convincing on-scalp evoked-field recordings appeared in **2016**, and the
technology has since moved from a physics curiosity to a shipping product line.

The critical property is where the sensor sits. A SQUID MEG system measures from
a fixed helmet position several centimetres outside the scalp; an OPM array
places **sensors directly on the scalp**. Since a dipolar field falls off as the
inverse cube of distance, moving from helmet to scalp is a large SNR gain rather
than a detail — a sensor 1 cm from the cortex sees far more of the field than
one 4 cm away.

## The helmet problem, solved

Cryogenic MEG requires matching a rigid, heavy dewar to each subject’s head, and
the head-shape template used in the forward model is a significant error source.
OPM arrays are **constructed on the head itself**: sensors on a flexible,
custom-fitted frame, individually positioned, with _individual digitisation_
folded into the measurement rather than estimated afterwards.

A consequence people miss: the array stays on the head during the run, so the
subject can **move** — head rotations, natural posture, even a bit of fidgeting.
Cryogenic systems require a dewar that tracks the head within millimetres, which
is precisely what a participant cannot guarantee. This is what makes OPM-MEG
viable in paediatric cohorts and in movement experiments.

## Why on-scalp arrays work with EEG

The most valuable consequence of on-scalp is **genuine co-registration**. A
modular helmet carries MEG gradiometers and dense EEG electrodes in one fixture,
so both are sampled by the same hardware, digitised in the same coordinate
frame, and cannot drift relative to each other. Combined MEG/EEG reconstruction
becomes a well-posed measurement rather than a cross-modal registration
exercise.

The sensor density follows the same logic. Fit for a child’s head at a few
centimetres spacing, the same sensor can be repositioned and regapped for an
adult — 300+ channels over a full adult scalp is now routine. Recording density
is a data variable, not a hardware decision made years in advance.

## The unresolved trade

OPMs do _not_ make shielding optional in the way the hype suggests. Their
sensitivity to field is comparable to good SQUID systems, so ambient field at
the tens of microtesla level is still the binding constraint. Three responses
are in use: a **passive shield** (heavy copper or mu-metal enclosure), an
**active compensation** field generated inside the room, or **gradiometric
cancellation** — measuring the difference between a sensor and a nearby
reference to reject common-mode field, which lets a compact portable shield
suffice for many applications.

Open questions remain around **noise as a function of head motion** (field
gradients across a non-rigid sensor array break the common-mode assumption),
sensor **saturation** near strong sources, and long-term **drift** of the
optical readout. Good pipelines handle motion correction and field prediction
explicitly; treating OPM as a drop-in SQUID replacement is how artefacts get
into the literature.

## Choosing between the modalities

- **OPM-MEG** for children, clinical and bedside settings, dense arrays,
  high-movement or natural-posture paradigms, and simultaneous high-density EEG.
- **Cryogenic SQUID MEG** where the highest achievable sensitivity and a decade
  of accumulated methodological validation matter more than flexibility.
- **Either is the wrong instrument** if you need sub-second time resolution —
  that is fMRI, and the two are better combined than chosen between.
