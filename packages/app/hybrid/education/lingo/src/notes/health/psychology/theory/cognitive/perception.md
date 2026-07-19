---
"title": "Perception"
"subtitle":
  "From raw sensation to a stable world: what the eye and ear report, what the
  brain fills in, and where the filling-in goes wrong."
"parentLink":
  "href": "/psychology/cognitive/"
  "label": "Cognitive Psychology"
"links":
  - "href": "/ophthalmology/vision/snellen"
    "label": "Snellen Chart"
    "description":
      "Measure the resolving power of the eye itself, separate from what the
      brain makes of it."
  - "href": "/ophthalmology/vision/logmar"
    "label": "LogMAR Chart"
    "description":
      "Per-letter scoring on logarithmic spacing for precise acuity tracking."
"references":
  - "href": "https://en.wikipedia.org/wiki/Perception_(psychology)"
    "label": "Wikipedia: Perception (Psychology)"
    "description":
      "Definitions of perception, the perception–action cycle, and the
      constructive programmes."
  - "href": "https://en.wikipedia.org/wiki/Gestalt_principles"
    "label": "Wikipedia: Gestalt Principles"
    "description":
      "The grouping laws that make fragmented input read as organised wholes."
  - "href": "https://en.wikipedia.org/wiki/Colour_blindness"
    "label": "Wikipedia: Colour Blindness"
    "description":
      "Cone types, the common dichromacies, and why hue alone is a poor carrier
      of meaning."
  - "href": "https://en.wikipedia.org/wiki/Auditory_perception"
    "label": "Wikipedia: Auditory Perception"
    "description":
      "Cochlear frequency analysis, masking, and the limits of hearing."
---

## Perception is inference, not copying

The senses do not deliver a picture. They deliver a small, noisy, ambiguous set
of responses to contrast, wavelength, position, and timing, and perception is
the work of inferring the world that would have produced them.

The **inverse projection problem** names the difficulty: many different scenes
project to the same retinal image, so the visual system must commit to one
interpretation and discard the rest. It commits using **regularity** — the
statistical structure of natural scenes — which is why camouflage works, why
unfamiliar layouts read slowly, and why you stop seeing a visual defect in your
own living room within a day.

Two broad programmes describe what the brain does with that input. In the
**bottom-up** account, construction proceeds from the stimulus outward. In the
**top-down** account, perception is guided by knowledge, expectation, and goals,
and the stimulus constrains rather than determines it. Modern accounts combine
them: the goal sets what to look for, the stimulus decides what is found.

## From sensation to perception

The distinction is functional, not anatomical. **Sensation** is the registration
of a stimulus — light of a given wavelength, sound of a given frequency. It is
measurable without interpretation, which is exactly why clinical acuity tests
are sensory in structure: they ask _can this eye resolve this_, not _what does
this mean_.

**Perception** is the organised, interpreted, stable object. It adds edges,
surfaces, objects, and their relations — none of which are present in the
sensory signal, all of which are added by the system doing the perceiving.

Two properties of the perceptual result are worth stating separately because
they fail independently. **Stability** is holding the world still despite eye
movements, blinks, and head motion. **Constancy** is perceiving an object as
unchanged when the retinal image changes drastically — a door looks the same
shape from an angle that stretches it, and a white shirt looks white in dim
light because lightness is inferred from the ratio of light to its surround
rather than from absolute brightness.

## Organisation and grouping

Gestalt psychology asked why a collection of dots reads as a line, a triangle,
or a face rather than as dots, and its answers are still the working vocabulary
of perceptual organisation.

**Proximity** groups what is near, **similarity** groups what looks alike, and
**continuity** makes us follow the smoothest path. **Closure** fills gaps — an
outline with a hole is still read as a complete shape. **Figure and ground**
separates object from background, and it is decided by factors like convexity,
symmetry, and lower region, not by anything in the image that says _this one_.

**Connectedness** and **common region** do much of the heavy lifting in real
displays: elements joined by a line, or enclosed in the same box or region, are
read as a group regardless of how similar they look. This is why well-grouped
interfaces feel simpler — the grouping reduces the number of things you have to
hold as separate items.

## Depth and size

Binocular disparity and **retinal disparity** give the visual system distance
information for free, and they are the strongest cue at close range. Everything
else is inference from a flat image.

**Monocular cues** include interposition (nearer objects interrupt farther
ones), relative size, texture gradient, linear perspective, aerial perspective,
motion parallax, and shadows. Every one of them is a regularity of the world
that can be violated, and picture makers violate them deliberately — which is
why impossible figures and the Ames room exist at all.

Size constancy completes the account: a person further away projects a smaller
image but is still perceived as the same size, because perceived size is derived
from apparent distance. When distance cues are removed or contradicted, the
inference breaks down — Ponzo and moon illusions are the same arithmetic done
with contradictory depth cues.

## Vision is not colour

Colour is three separable dimensions. **Hue** is roughly the dominant
wavelength. **Saturation** is purity. **Lightness** is position on the
black-to-white axis, which is genuinely a fourth dimension beyond the three cone
responses and has its own opponent channel.

Two practical consequences follow for anything built to be read. First, roughly
one in twelve men has some colour vision deficiency — typically a missing or
shifted cone type — so a pair of colours that separates cleanly for most viewers
can collapse for someone else. **Never encode meaning in hue alone**; pair it
with position, shape, size, or text. Second, colour naming is approximately
categorical: the boundary between two colour terms is sharper than the physical
stimulus warrants, which is why _blue_ and _green_ read as different qualities
from almost any amount of light.

The visual system also adapts, and adaptation cuts both ways. Constant
illumination shifts white point; a uniform scene removes all contrast and the
image disappears; and afterimages are the sensory trace of that adaptation.

## Hearing

Hearing is a frequency analysis problem. The cochlea is a mechanical
spectrometer: the basilar membrane is stiff and narrow at the base, resonating
to high frequencies, and floppy and wide at the apex, resonating to low ones.
Place of maximal displacement encodes frequency, and the auditory nerve reports
which fibres fire.

Two consequences shape everyday listening. **Masking**: a loud sound at one
frequency raises the threshold for neighbouring frequencies, which is why a
noisy room is not uniformly bad for speech — it is bad in bands, and speech
intelligibility falls where the mask overlaps it. **Critical bands**:
frequencies within a band are resolved as a group rather than separately, so
pitch and timbre discrimination fail below a certain frequency separation.

Hearing is more robust than vision in one respect that matters constantly: it is
binaural by default. Interaural time differences locate a sound horizontally in
the sub-millisecond range, which is why a phone call and a live conversation are
localised in quite different ways.

## Illusions worth knowing

The Ponzo illusion (parallel lines seem to diverge over a converging context)
and the Müller-Lyer one (line lengths altered by arrowheads at the ends) are
usually described as errors about size. They are better described as the system
doing exactly what it should — correctly resolving depth and applying size
constancy — in a scene that violates the regularities it depends on.

The **afterimage** is not an error at all: it is adaptation working as designed.
The **hollow mask** — a face presented concave reads as convex — shows how
strongly prior knowledge overrides contradictory sensory detail: you know which
way faces go, so a concave rendering of one is not perceived at all.
