---
{
  'title': 'Functional MRI (fMRI)',
  'subtitle':
    "Mapping the brain by the blood it spends — high spatial resolution
    bought\n    with poor temporal resolution and an indirect signal.",
  'parentLink': { 'href': '/neuroscience', 'label': 'Neuroscience' },
  'references':
    [
      {
        'href': 'https://doi.org/10.1073/pnas.87.24.9868',
        'label': 'Ogawa et al. (1990) — PNAS',
        'description':
          "The original observation that deoxyhaemoglobin changes T2*
          and\n          produces the BOLD contrast.",
      },
      {
        'href': 'https://doi.org/10.1016/j.neuroimage.2012.01.022',
        'label': 'Buzsáki, Ulkau, McKenzie (2006) — Cerebral Cortex',
        'description':
          "The origins of the BOLD signal: the physiology linking
          neural\n          activity to local blood flow.",
      },
    ],
}
---

## What it measures

fMRI is not a direct measure of neural activity. It measures the **BOLD
(blood-oxygen-level-dependent) contrast**: as neurons fire, they consume oxygen,
local blood flow rises to compensate, and the ratio of deoxy- to oxyhaemoglobin
shifts. The magnet is tuned to that shift. A task-related BOLD increase
therefore reports where blood is being delivered, which is a proxy for where
neurons are active — a two-step inference, not a measurement.

The other name for the effect, _deoxyhaemoglobin overshoot_ , is a reminder of
its mechanism: paramagnetic deoxyhaemoglobin shortens T2*, so more of it means
less signal. The overshoot in a typical block is only a few percent, which is
why the effect needs noise-averse acquisition and averaging across trials.

## Acquisition and the cost of the signal

Spatial resolution of about 1–3 mm comes at the price of a **repetition time
(TR)** of 0.5–2 s per volume: the scanner must collect each echo before the next
slice of the volume, so the full brain is sampled only every TR. That is the
physical floor on temporal resolution, independent of any analysis choice.

Physiological noise — respiration, cardiac pulsation, scanner drift — lives in
the same low-frequency band as the BOLD effect, which is why **physiological
noise regression** and careful design are unavoidable. Head motion between scans
is a common confounder: it decorrelates signal from anatomy and inflates
apparent effects, so motion must be measured and modelled, not ignored.

## Design and what it can conclude

Because the vascular response lags and undershoots, event-related fMRI is
analysed with **general linear models** over slow block or event regressors, not
trial-by-trial averaging the way EEG is. That framing makes fMRI a test of
_where_ sustained engagement differs between conditions, not a millisecond
timeline.

The right claim from an fMRI result is a **statistical map of relative
blood-flow change** under a task, not a picture of a neuron. Absent a causal
manipulation or a converging source measure, a BOLD difference is correlational
evidence about which regions engaged, not proof that they performed the mental
operation attributed to them.
