# Quantitative EEG (qEEG)

> Turning scalp waveforms into frequency-domain measures of oscillatory coupling
> — powerful when handled carefully, fragile when it is not.

App route: `/neuroscience/qeeg/` · back to [Neuroscience](/neuroscience)

## What it measures

qEEG takes the scalp voltage time series and summarises it as spectral power and
phase coupling in the delta, theta, alpha, beta, and gamma bands. The **power
spectrum** reports how much variance sits at each frequency; **phase-amplitude
coupling (PAC)** reports whether the phase of a low frequency tracks the
amplitude of a high frequency, the cross-frequency signature often invoked in
consciousness research.

The intuition is that oscillations are not noise but a coordination mechanism:
synchronising when and where sub-networks communicate. The methods measure this
coordination, but the mapping from a scalp statistic to a mechanism is indirect
and heavily modelled.

## The pipeline matters more than the metric

Every qEEG number is a product of a processing chain, and reasonable analysts
can produce materially different results from identical raw data. The choices
that move numbers most:

- **Reference and montage:** a common-average versus linked-mastoid reference
  reshapes low-frequency power.
- **Filtering:** a 1 Hz high-pass is not a neutral choice; it reshapes the very
  frontal slow waves that distinguish wakefulness from sleep.
- **Epoching and artefact rejection:** which channels and epochs are dropped
  changes band power more than most published effects.
- **Individual alpha frequency:** personal spectral peaks vary widely; analysing
  at a fixed band instead of each subject’s peak inflates group differences.

The defensible practice is to report the full chain, test that the result is not
an artefact of any single link, and to prefer individual-frequency analysis over
fixed bands.

## Strengths and limits

qEEG’s strength is **temporal resolution and portability**: it captures
millisecond dynamics in a cap that is cheap and widely available, making it the
workhorse for sleep staging, workload, and clinical state monitoring. Its
weakness is that it inherits every limitation of scalp EEG — the volume
conductor blurs which cortex produced a given rhythm, and referencing and
filtering choices dominate the numbers.

Treat a qEEG difference as a hypothesis about coordinated activity, not a
localisation claim. When the question is _where_, reach for fMRI or a
source-reconstruction method; when it is _when_ and _how states change_, qEEG is
the right instrument.

## References

1. [Buzsáki, Anastassiou & Koch (2012) — Nature Reviews Neuroscience](https://doi.org/10.1038/nrn3241)
   — Why scalp oscillations reflect coordinated population activity, and the
   physical limits on localising them.
2. [Gudmundsson et al. (2007) — Clinical Neurophysiology](https://doi.org/10.1016/j.clinph.2007.06.018)
   — A critical appraisal of quantitative EEG in clinical research, emphasising
   pipeline sensitivity.
