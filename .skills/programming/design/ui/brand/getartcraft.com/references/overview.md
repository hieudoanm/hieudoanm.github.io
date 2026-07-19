# Overview

Focused reference for **artcraft-design**, excerpted from SKILL.md. The skill file remains the canonical guide.

# ArtCraft design system

A skill for reproducing the visual and verbal style of getartcraft.com, the marketing site for ArtCraft, an open-source desktop and web studio for controllable AI image and video.

## Read this first: what is verified and what is not

This skill was written from the site's rendered text and metadata only. The stylesheet could not be retrieved. So:

- **Verified** (seen on the site): page structure, section order, numbering scheme, component inventory, copy tone, nav and footer content, the theme color `#0b0b0c`, that the site is dark, that feature demos are looping `.webm` videos, that community proof uses YouTube thumbnails with a Play affordance.
- **Proposed** (not measured): every other color, font, size, radius and spacing value in `references/tokens.css`. They are chosen to be consistent with the verified facts. Treat them as sensible defaults, not as a pixel-accurate clone.

If the user can supply a screenshot, the CSS from DevTools, or computed styles for the hero, a button and a card, replace the proposed values in `tokens.css` and delete this section. Say plainly in your answer when output relies on proposed values.

## The look in one paragraph

A near-black canvas (`#0b0b0c`) with almost no chroma. Content is organized as an editorial sequence of numbered sections ("01 / Crafting features", "02 / Ownership", "03 / Proof"), each with a small label, a large sentence-case headline that ends in a period, and one line of supporting copy. Visual weight comes from video and imagery, not from decoration. Controls are few and obvious: one primary action, one secondary. The page feels like a film-tool credit sequence: quiet, confident, tool-first.

## Page anatomy (in order)
