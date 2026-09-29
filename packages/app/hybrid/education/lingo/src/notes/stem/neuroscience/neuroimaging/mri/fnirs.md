---
{
  'title': 'Functional Near-Infrared Spectroscopy (fNIRS)',
  'subtitle':
    'The haemodynamic middle ground — millisecond sampling of a vascular signal
    through the skull, portable and affordable, with real but bounded limits.',
  'parentLink': { 'href': '/neuroscience', 'label': 'Neuroscience' },
  'references':
    [
      {
        'href': 'https://doi.org/10.1038/nn.3474',
        'label': 'Boas et al. (2011) — Nature Neuroscience',
        'description':
          'A review of the hemodynamic response to brain activation, grounding
          the physiology fNIRS and fMRI share.',
      },
      {
        'href': 'https://doi.org/10.1016/j.neuroimage.2013.05.004',
        'label': 'Scholkmann et al. (2014) — NeuroImage',
        'description':
          'Functional brain imaging with near-infrared light: fNIRS principles,
          channels, and short-separation regression.',
      },
    ],
}
---

## What it measures

fNIRS infers the same haemodynamic signal as fMRI, but optically. Two
wavelengths are shone into the scalp — typically **760 nm and 850 nm** — and the
returned light is absorbed differently by oxy- and deoxyhaemoglobin. Because
haemoglobin absorbs in the near infrared, light penetrates a few centimetres of
tissue and carries a shallow-path **cortical** signal. Both signals combine into
**concentration changes** in oxyhaemoglobin and deoxyhaemoglobin over time.

It is a genuine haemodynamic measure, so it inherits the same vascular lag as
fMRI; it is not a neural-time-resolution method. Its distinguishing features are
portability, low cost, and tolerance of motion, which make it practical for
developmental, clinical, and field studies where a scanner cannot go.

## Channels, haemodynamics, and confounds

Unlike fMRI, fNIRS does not sample a dense volume: it measures a limited set of
**source–detector channels**, each sampling a banana-shaped path of tissue.
Sensitivity therefore falls off with depth, and a channel is not a location — it
is a weighted path. A change in one channel cannot localise a source without
assumptions about the tissue it traverses.

The short-separation channel technique exploits the fact that light passing
through only scalp and skull is insensitive to brain activity, providing a
regressor for systemic physiology. This is essential because **systemic
physiology** — blood pressure, heart rate, systemic haemoglobin changes —
otherwise masquerades as cortical activation and can dominate short tasks.

## Strengths and limits

Sampling rates of 10 Hz and better, combined with no radio- frequency exclusion
zone, make fNIRS the practical middle ground between EEG and fMRI. The
trade-offs are real: spatial coverage is a few centimetres of cortex, optical
penetration is shallow, the haemodynamic response is slower and more variable
than in fMRI, and hair and skull thickness attenuate signal differently across
individuals.

The defensible claim from an fNIRS result is a **change in haemoglobin
concentration over a cortical path** , inferred from an optical measurement. It
is a real brain measure with a real vascular interpretation — just a coarser,
shallower, and more physiologically-noisy one than fMRI.
