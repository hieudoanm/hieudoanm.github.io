# Landify

A flat, dependency-free landing page generated from a single YAML file.
Write the content in `landify.yaml`, pick one of sixty-four built-in color
themes, and the CLI emits one self-contained HTML page — CSS inlined, emoji
icons, no JavaScript, nothing to build.

## How it works

- **One YAML file** (`landify.yaml`) feeds a Go template and produces a single
  `index.html`. Open it in a browser or drop it on any static host.
- **Eight colors in, every token out.** You author 8 base colors (and an
  optional corner radius); surfaces (`base-100/200/300`), hairlines
  (`border`/`border-soft`), and text-on-accent colors are all derived (shades,
  tints, WCAG contrast) — never `color-mix()`, plain hex only.
- **Consistent media.** The `product` layout always renders a hero image and
  a demo video, both in the same 16:9 (1280 × 720) frame.

## Page types

The top-level `type:` field selects the page layout (`product` is the
default); each type has its own required fields, checked by
`landify validate`.

| No. | Screenshot                                                                              | Type        | Layout                                                                               |
| --- | --------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------ |
| 1   | ![product](/packages/app/headless/landify/examples/templates/product/product.png)       | `product`   | Original: centered hero, feature grid, demo video, closing CTA.                      |
| 2   | ![waitlist](/packages/app/headless/landify/examples/templates/waitlist/waitlist.png)    | `waitlist`  | Email-capture panel with launch date and social links (no video needed).             |
| 3   | ![event](/packages/app/headless/landify/examples/templates/event/event.png)             | `event`     | Date/venue strip, agenda timeline, speaker grid, tickets button.                     |
| 4   | ![download](/packages/app/headless/landify/examples/templates/download/download.png)    | `download`  | Version/license badges, per-OS download buttons, install snippet, feature grid, CTA. |
| 5   | ![app](/packages/app/headless/landify/examples/templates/app/app.png)                   | `app`       | Store badges, ratings line, portrait screenshot gallery, feature grid.               |
| 6   | ![pricing](/packages/app/headless/landify/examples/templates/pricing/pricing.png)       | `pricing`   | Tier cards with a tagged "most popular" plan, perks lists, footnote.                 |
| 7   | ![portfolio](/packages/app/headless/landify/examples/templates/portfolio/portfolio.png) | `portfolio` | Avatar, role and location chips, skills, project card grid, contact CTA.             |
| 8   | ![docs](/packages/app/headless/landify/examples/templates/docs/docs.png)                | `docs`      | Topic card links, optional code sample, hero actions.                                |

Every type reuses the same header, footer, buttons, and 64 themes. The template
gallery lives in `examples/templates/<type>/`: the `<type>.yaml` source, its
built `<type>.html`, and the captured `<type>.png` (all rendered with the
`slate` preset), sharing `media/` for the 16:9 demo artwork.

## Built-in themes

`landify build --theme <name>` overrides the YAML's `theme:` section with a
preset. Without the flag, the colors in `landify.yaml` are used as-is.
`landify themes` lists all sixty-four presets; captures of all sixty-four are
shown below.

| No. | Screenshot                                                                              | Name         | Description                                      |
| --- | --------------------------------------------------------------------------------------- | ------------ | ------------------------------------------------ |
| 1   | ![abyss](/packages/app/headless/landify/examples/themes/abyss/abyss.png)                | `abyss`      | Black-blue abyss with amber sparks.              |
| 2   | ![amber](/packages/app/headless/landify/examples/themes/amber/amber.png)                | `amber`      | Amber gold with chocolate accents.               |
| 3   | ![apricot](/packages/app/headless/landify/examples/themes/apricot/apricot.png)          | `apricot`    | Apricot warmth with a peach blush.               |
| 4   | ![arctic](/packages/app/headless/landify/examples/themes/arctic/arctic.png)             | `arctic`     | Cool blue-white with a glacier-teal accent.      |
| 5   | ![blush](/packages/app/headless/landify/examples/themes/blush/blush.png)                | `blush`      | Gentle blush neutral with a dusty rose.          |
| 6   | ![burgundy](/packages/app/headless/landify/examples/themes/burgundy/burgundy.png)       | `burgundy`   | Old burgundy with champagne.                     |
| 7   | ![caramel](/packages/app/headless/landify/examples/themes/caramel/caramel.png)          | `caramel`    | Caramel tones with burnt sugar.                  |
| 8   | ![carnation](/packages/app/headless/landify/examples/themes/carnation/carnation.png)    | `carnation`  | Soft carnation pink with a rose accent.          |
| 9   | ![chartreuse](/packages/app/headless/landify/examples/themes/chartreuse/chartreuse.png) | `chartreuse` | Chartreuse kick with charcoal.                   |
| 10  | ![cherry](/packages/app/headless/landify/examples/themes/cherry/cherry.png)             | `cherry`     | Cherry red with cream neutrals.                  |
| 11  | ![cobalt](/packages/app/headless/landify/examples/themes/cobalt/cobalt.png)             | `cobalt`     | Deep cobalt blue with warm amber highlights.     |
| 12  | ![coffee](/packages/app/headless/landify/examples/themes/coffee/coffee.png)             | `coffee`     | Rich coffee brown with cream.                    |
| 13  | ![concrete](/packages/app/headless/landify/examples/themes/concrete/concrete.png)       | `concrete`   | Warm concrete gray with terracotta accents.      |
| 14  | ![crimson](/packages/app/headless/landify/examples/themes/crimson/crimson.png)          | `crimson`    | Deep crimson with burgundy tones.                |
| 15  | ![eclipse](/packages/app/headless/landify/examples/themes/eclipse/eclipse.png)          | `eclipse`    | Near-black canvas lit by electric mint.          |
| 16  | ![emerald](/packages/app/headless/landify/examples/themes/emerald/emerald.png)          | `emerald`    | Deep emerald with minty support.                 |
| 17  | ![fern](/packages/app/headless/landify/examples/themes/fern/fern.png)                   | `fern`       | Forest-quiet greens with stone gray.             |
| 18  | ![fog](/packages/app/headless/landify/examples/themes/fog/fog.png)                      | `fog`        | Foggy blue-gray with a soft azure.               |
| 19  | ![forest](/packages/app/headless/landify/examples/themes/forest/forest.png)             | `forest`     | Moss-and-pine greens with a warm leaf accent.    |
| 20  | ![frost](/packages/app/headless/landify/examples/themes/frost/frost.png)                | `frost`      | Frosty white with an ice-blue accent.            |
| 21  | ![fuchsia](/packages/app/headless/landify/examples/themes/fuchsia/fuchsia.png)          | `fuchsia`    | Bright fuchsia with a violet support.            |
| 22  | ![glacier](/packages/app/headless/landify/examples/themes/glacier/glacier.png)          | `glacier`    | Pale icy blue with a slate-cobalt accent.        |
| 23  | ![gold](/packages/app/headless/landify/examples/themes/gold/gold.png)                   | `gold`       | Metallic gold with an ivory neutral.             |
| 24  | ![graphite](/packages/app/headless/landify/examples/themes/graphite/graphite.png)       | `graphite`   | Neutral graphite with cool silver tones.         |
| 25  | ![honey](/packages/app/headless/landify/examples/themes/honey/honey.png)                | `honey`      | Honey yellow with warm brown.                    |
| 26  | ![indigo](/packages/app/headless/landify/examples/themes/indigo/indigo.png)             | `indigo`     | Deep indigo with a coral flare.                  |
| 27  | ![iris](/packages/app/headless/landify/examples/themes/iris/iris.png)                   | `iris`       | Soft iris blues with a dark periwinkle.          |
| 28  | ![iron](/packages/app/headless/landify/examples/themes/iron/iron.png)                   | `iron`       | Monochrome iron with a hard black accent.        |
| 29  | ![jade](/packages/app/headless/landify/examples/themes/jade/jade.png)                   | `jade`       | Jade green with oyster neutrals.                 |
| 30  | ![lagoon](/packages/app/headless/landify/examples/themes/lagoon/lagoon.png)             | `lagoon`     | Aqua-green calm with a crisp cyan secondary.     |
| 31  | ![lavender](/packages/app/headless/landify/examples/themes/lavender/lavender.png)       | `lavender`   | Pale lavender with a deep purple accent.         |
| 32  | ![lime](/packages/app/headless/landify/examples/themes/lime/lime.png)                   | `lime`       | Lime green with deep green accents.              |
| 33  | ![magenta](/packages/app/headless/landify/examples/themes/magenta/magenta.png)          | `magenta`    | Punchy magenta with a deep fuchsia.              |
| 34  | ![marigold](/packages/app/headless/landify/examples/themes/marigold/marigold.png)       | `marigold`   | Marigold orange-gold with a rose support.        |
| 35  | ![midnight](/packages/app/headless/landify/examples/themes/midnight/midnight.png)       | `midnight`   | Inverted dark canvas lit by cyan and violet.     |
| 36  | ![mint](/packages/app/headless/landify/examples/themes/mint/mint.png)                   | `mint`       | Cool mint with a deep evergreen accent.          |
| 37  | ![mocha](/packages/app/headless/landify/examples/themes/mocha/mocha.png)                | `mocha`      | Mocha brown with caramel warmth.                 |
| 38  | ![moss](/packages/app/headless/landify/examples/themes/moss/moss.png)                   | `moss`       | Organic green with ochre highlights.             |
| 39  | ![nebula](/packages/app/headless/landify/examples/themes/nebula/nebula.png)             | `nebula`     | Deep space with violet-cyan glows.               |
| 40  | ![noir](/packages/app/headless/landify/examples/themes/noir/noir.png)                   | `noir`       | High-contrast noir white with ink.               |
| 41  | ![obsidian](/packages/app/headless/landify/examples/themes/obsidian/obsidian.png)       | `obsidian`   | Obsidian slate with an ember glow.               |
| 42  | ![ocean](/packages/app/headless/landify/examples/themes/ocean/ocean.png)                | `ocean`      | Cool blue-cyan accent on a misty slate canvas.   |
| 43  | ![olive](/packages/app/headless/landify/examples/themes/olive/olive.png)                | `olive`      | Olive green with a warm khaki.                   |
| 44  | ![orchid](/packages/app/headless/landify/examples/themes/orchid/orchid.png)             | `orchid`     | Orchid pink-violet with a teal counterpoint.     |
| 45  | ![pearl](/packages/app/headless/landify/examples/themes/pearl/pearl.png)                | `pearl`      | Warm pearl white with soft taupe.                |
| 46  | ![peony](/packages/app/headless/landify/examples/themes/peony/peony.png)                | `peony`      | Peony blush with a coral-rose accent.            |
| 47  | ![periwinkle](/packages/app/headless/landify/examples/themes/periwinkle/periwinkle.png) | `periwinkle` | Airy periwinkle with a slate support.            |
| 48  | ![plum](/packages/app/headless/landify/examples/themes/plum/plum.png)                   | `plum`       | Deep plum with a warm berry.                     |
| 49  | ![pumpkin](/packages/app/headless/landify/examples/themes/pumpkin/pumpkin.png)          | `pumpkin`    | Spiced pumpkin with a cream neutral.             |
| 50  | ![rose](/packages/app/headless/landify/examples/themes/rose/rose.png)                   | `rose`       | Soft blush neutrals with a deep pink accent.     |
| 51  | ![royal](/packages/app/headless/landify/examples/themes/royal/royal.png)                | `royal`      | Violet-led palette with a teal counterpoint.     |
| 52  | ![sand](/packages/app/headless/landify/examples/themes/sand/sand.png)                   | `sand`       | Warm clay and golden-ochre earthy palette.       |
| 53  | ![sapphire](/packages/app/headless/landify/examples/themes/sapphire/sapphire.png)       | `sapphire`   | Jewel blue with violet notes.                    |
| 54  | ![seafoam](/packages/app/headless/landify/examples/themes/seafoam/seafoam.png)          | `seafoam`    | Soft foam greens with a deep sea accent.         |
| 55  | ![silver](/packages/app/headless/landify/examples/themes/silver/silver.png)             | `silver`     | Cool silver with a slate-blue accent.            |
| 56  | ![sky](/packages/app/headless/landify/examples/themes/sky/sky.png)                      | `sky`        | Bright sky-blue with azure support.              |
| 57  | ![slate](/packages/app/headless/landify/examples/themes/slate/slate.png)                | `slate`      | Monochrome graphite with a blue-tinted coolness. |
| 58  | ![steel](/packages/app/headless/landify/examples/themes/steel/steel.png)                | `steel`      | Blue-gray steel with amber accents.              |
| 59  | ![sunset](/packages/app/headless/landify/examples/themes/sunset/sunset.png)             | `sunset`     | Warm orange-to-rose glow for bold branding.      |
| 60  | ![tangerine](/packages/app/headless/landify/examples/themes/tangerine/tangerine.png)    | `tangerine`  | Bright tangerine with a citrus lime.             |
| 61  | ![teal](/packages/app/headless/landify/examples/themes/teal/teal.png)                   | `teal`       | Rich teal on a pale aqua canvas.                 |
| 62  | ![tomato](/packages/app/headless/landify/examples/themes/tomato/tomato.png)             | `tomato`     | Warm tomato red with a sage support.             |
| 63  | ![violet](/packages/app/headless/landify/examples/themes/violet/violet.png)             | `violet`     | Violet with plum notes.                          |
| 64  | ![wine](/packages/app/headless/landify/examples/themes/wine/wine.png)                   | `wine`       | Wine red with a mauve touch.                     |

The gallery lives in `examples/themes/`: one folder per theme
(`themes/<name>/<name>.html` built from `themes/showcase.yaml`, plus the
`<name>.png` capture), sharing `demo.png`/`demo.mp4`/`demo.svg` at its root.

## Quick start

```sh
cd go
make build

./bin/landify new                     # write an annotated landify.yaml
./bin/landify validate                # check it, then:
./bin/landify build --theme ocean     # ocean-colored index.html
./bin/landify serve                   # preview on http://localhost:8080
```

## Commands

| Command                                              | What it does                                                                                                 |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `landify new`                                        | Generate a commented `landify.yaml` placeholder (refuses to overwrite without `-F`).                         |
| `landify validate -f <file>`                         | Check the schema; lists every problem and exits 1 on failure.                                                |
| `landify build -f <file> -o <output> --theme <name>` | Validate and render the page (defaults: `landify.yaml` → `index.html`; `--theme` applies a built-in preset). |
| `landify themes`                                     | List the sixty-four built-in theme presets.                                                                  |
| `landify serve -d <dir> -p <port>`                   | Serve a directory of static files over HTTP (default `.` and port `8080`); stops on Ctrl+C.                  |
