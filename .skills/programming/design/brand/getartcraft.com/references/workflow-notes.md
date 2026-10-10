# Workflow notes

Focused reference for **artcraft-design**, excerpted from SKILL.md. The skill file remains the canonical guide.

1. **Header**: icon + wordmark left; links Home, Image, Video, Resources (dropdown: Download, Support, Craft Apps); right side Pricing, Discord icon link, "Launch App" button. Collapses to "Open main menu" on mobile.
2. **Hero**: oversized wordmark, then headline "Capable tools for artists." with one sentence below. Two buttons (primary "Download free", secondary "Use on web"), a text link "Open source on GitHub", and a small meta line "macOS · Windows · Web" and "No subscription required".
3. **Ticker**: a duplicated, endlessly scrolling row of feature/model names, each prefixed with `▪` (Seedance 2.5, Nano Banana 2, Image to Location, 3D Compositing, ...). Duplicate the list so the loop is seamless.
4. **Section 01, feature list**: headline, intro line, then seven rows. Each row: small category tag, index `01`-`07`, h3 title, 1-2 sentence description, and a looping muted video demo. Ends with a "More in the app" strip linking to the web app.
5. **Section 02, ownership**: headline "Stop renting from websites." and three cards labelled A, B, C (Open source, Yours forever, No middleman); the first has a "View source" link.
6. **Section 03, proof**: "Made with ArtCraft." Three video thumbnails with an italic "Community film" caption, index, and Play button.
7. **Closing CTA**: eyebrow "Free to start · No subscription", headline "Start crafting.", the same two buttons.
8. **Footer**: icon, one-line product description, contact email, then link columns (Product, Craft Apps, Resources, Community), copyright, and the sign-off "Made by artists, for artists".

## Design rules

- **Dark only.** Background is `--bg`. Do not introduce a light theme unless asked.
- **Hierarchy through type, not color.** Headlines are large, tight and sentence-case, ending with a period. Labels are small, uppercase or monospaced, and muted.
- **Numbering is a signature.** Section eyebrows use `NN / Name`; features use `01`-`07`; ownership cards use letters `A`, `B`, `C`. Keep this device whenever there are 3+ parallel items.
- **One primary button per view.** Primary is a high-contrast filled button, secondary is outlined or ghost. Never more than two side by side.
- **Media carries the page.** Show real product footage (muted, looping, autoplay, `playsinline`) in rounded frames with a hairline border. If you have no footage, use a dark placeholder frame with a CSS gradient and a caption, never stock art.
- **Hairlines over shadows.** Separate regions with 1px low-contrast borders. Avoid heavy drop shadows and glows.
- **Icons.** Prefer text glyphs (`▪`, `→`, `↗`) and CSS shapes. Do not inline SVG in generated code. Reference the logo as an external file (`artcraft-icon.svg`) or render a text wordmark.
- **Motion.** Slow, linear marquee; subtle opacity or translate on reveal; respect `prefers-reduced-motion`.
- **Responsive.** Single column below ~768px, feature rows stack with the video under the text, nav collapses.

## Voice

Direct, confident, artist-centric, short. Contrast "prompting" with "control" and "renting" with "owning". Sentences are declarative; headlines are complete thoughts ending in a period. Examples to imitate: "The control that mere words cannot buy." / "Stop renting from websites." / "Compose the shot yourself — then let the model render it." / "Made by artists, for artists." Avoid hype words ("revolutionary", "supercharge") and exclamation marks. Product naming pattern for sub-apps: `[Noun]Craft` (PhotoCraft, VectorCraft, FilmCraft, LightCraft, PdfCraft, EffectCraft, DesignCraft).

## How to use this skill

1. Read `references/tokens.css` and copy it into the project as the single source of styling values. Reference variables, never hard-coded colors.
2. Start from `assets/template.html` (a complete single-file page covering every section above) and replace copy and media.
3. For individual components, read `references/components.md` for markup and behavior notes.
4. When finished, check the page against the **Design rules** list and say which values were proposed rather than measured.

## Files

- `references/tokens.css`: color, type, spacing, radius, motion variables plus base styles.
- `references/components.md`: component-by-component recipes.
- `assets/template.html`: full landing page template, no inline SVG, no external dependencies.
