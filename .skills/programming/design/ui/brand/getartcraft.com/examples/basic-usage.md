# ArtCraft design system: Worked Scenario

Design system and page-building guide for the ArtCraft (getartcraft.com) look: near-black dark UI, editorial numbered sections, mono-style labels, confident short copy aimed at artists. Use whenever the user asks to build, mock up, restyle or write copy for a page, landing page, app screen, deck or component "in the ArtCraft style", "like getartcraft.com", or for a Craft app (PhotoCraft, VectorCraft, FilmCraft, etc.), even if they only say "match the ArtCraft site".

## Scenario

A project needs to apply **artcraft-design** to a real design or implementation decision. Start from this context: A skill for reproducing the visual and verbal style of getartcraft.com, the marketing site for ArtCraft, an open-source desktop and web studio for controllable AI image and video. This skill was written from the site's rendered text and metadata only. The stylesheet could not be retrieved. So:

## Apply the guidance

- **Verified** (seen on the site): page structure, section order, numbering scheme, component inventory, copy tone, nav and footer content, the theme color `#0b0b0c`, that the site is dark, that feature demos are looping `.webm` videos, that community proof uses YouTube thumbnails with a Play affordance.
- **Proposed** (not measured): every other color, font, size, radius and spacing value in `references/tokens.css`. They are chosen to be consistent with the verified facts. Treat them as sensible defaults, not as a pixel-accurate clone.
- **Dark only.** Background is `--bg`. Do not introduce a light theme unless asked.
- **Hierarchy through type, not color.** Headlines are large, tight and sentence-case, ending with a period. Labels are small, uppercase or monospaced, and muted.

## Expected outcome

Choose an approach that follows the skill’s recommendations, fits the project constraints, and can be reviewed against its quality and safety requirements.

## Source

Based on the guidance in [SKILL.md](../SKILL.md).
