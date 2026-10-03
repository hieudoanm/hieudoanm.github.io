package landify

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"testing"
)

// writeTemp writes content to a scratch file in dir and returns its path.
func writeTemp(t *testing.T, name, content string) string {
	t.Helper()
	path := filepath.Join(t.TempDir(), name)
	if err := os.WriteFile(path, []byte(content), 0o644); err != nil {
		t.Fatalf("write %s: %v", name, err)
	}
	return path
}

const ogDoc = `
site:
  name: Landify
  mark: "🌄"
  description: A landing page.
  nav:
    - label: Features
      href: "#features"
  og:
    title: A flat page from one YAML.
    kicker: One YAML file
    tags:
      - Zero build step
      - 12 layouts
    description: One file, one page.
    image: https://example.com/og/og.png
    image_alt: The Landify social card.
    url: https://example.com/
hero:
  headline: Your headline goes here.
  subheadline: Describe what you offer.
  primary:
    label: Get started
    href: "#cta"
  image:
    src: "assets/hero.png"
features:
  items:
    - title: Zero build step
      body: Open index.html anywhere.
demo:
  video:
    src: "assets/demo.mp4"
cta:
  heading: Make your mark.
  body: Go live today.
  button:
    label: Get the template
    href: https://example.com
footer:
  copyright: "© 2026 Landify"
`

func TestSocialUsesConfiguredCard(t *testing.T) {
	cfg, err := Load([]byte(ogDoc))
	if err != nil {
		t.Fatal(err)
	}
	og := cfg.Social()
	if og.Title != "A flat page from one YAML." {
		t.Errorf("og.title = %q, want the configured title", og.Title)
	}
	if og.TwitterCard != "summary_large_image" {
		t.Errorf("og.twitter_card = %q, want the default card type", og.TwitterCard)
	}
}

func TestSocialFallsBackToSite(t *testing.T) {
	cfg, err := Load([]byte(validDoc))
	if err != nil {
		t.Fatal(err)
	}
	og := cfg.Social()
	for _, tc := range []struct{ field, got, want string }{
		{"title", og.Title, cfg.Site.Name},
		{"description", og.Description, cfg.Site.Description},
		{"site_name", og.SiteName, cfg.Site.Name},
		{"type", og.Type, "website"},
		{"twitter_card", og.TwitterCard, "summary_large_image"},
	} {
		if tc.got != tc.want {
			t.Errorf("og.%s = %q, want %q", tc.field, tc.got, tc.want)
		}
	}
	if og.Image != "" {
		t.Errorf("og.image = %q, want empty when the config sets none", og.Image)
	}
}

func TestRenderEmitsOpenGraphMeta(t *testing.T) {
	cfg, err := Load([]byte(ogDoc))
	if err != nil {
		t.Fatal(err)
	}
	html, err := Render(cfg)
	if err != nil {
		t.Fatal(err)
	}
	for _, want := range []string{
		`<meta property="og:title" content="A flat page from one YAML." />`,
		`<meta property="og:description" content="One file, one page." />`,
		`<meta property="og:type" content="website" />`,
		`<meta property="og:url" content="https://example.com/" />`,
		`<meta property="og:site_name" content="Landify" />`,
		`<meta property="og:image" content="https://example.com/og/og.png" />`,
		`<meta property="og:image:width" content="1200" />`,
		`<meta property="og:image:height" content="630" />`,
		`<meta property="og:image:alt" content="The Landify social card." />`,
		`<meta name="twitter:card" content="summary_large_image" />`,
		`<meta name="twitter:image" content="https://example.com/og/og.png" />`,
	} {
		if !strings.Contains(string(html), want) {
			t.Errorf("Render output missing %q", want)
		}
	}
}

func TestRenderEveryTypeCarriesOpenGraphMeta(t *testing.T) {
	for _, typ := range KnownTypes() {
		doc := "type: " + typ + "\n" + ogDoc
		cfg, err := Load([]byte(doc))
		if err != nil {
			t.Fatalf("Load %s: %v", typ, err)
		}
		html, err := Render(cfg)
		if err != nil {
			t.Fatalf("Render %s: %v", typ, err)
		}
		if !strings.Contains(string(html), `property="og:image"`) {
			t.Errorf("%s page is missing the og:image tag", typ)
		}
	}
}

func TestRenderOmitsImageMetaWithoutImage(t *testing.T) {
	cfg, err := Load([]byte(validDoc))
	if err != nil {
		t.Fatal(err)
	}
	html, err := Render(cfg)
	if err != nil {
		t.Fatal(err)
	}
	for _, unwanted := range []string{"og:image", "twitter:image", "og:url"} {
		if strings.Contains(string(html), unwanted) {
			t.Errorf("Render output should omit %q when the config sets none", unwanted)
		}
	}
	if !strings.Contains(string(html), `<meta property="og:title" content="Landify" />`) {
		t.Error("Render output should fall back to the site name for og:title")
	}
}

func TestSocialImageEscapedInMeta(t *testing.T) {
	doc := strings.Replace(ogDoc, `image: https://example.com/og/og.png`,
		`image: https://example.com/og.png?a=1&b=2`, 1)
	cfg, err := Load([]byte(doc))
	if err != nil {
		t.Fatal(err)
	}
	html, err := Render(cfg)
	if err != nil {
		t.Fatal(err)
	}
	if !strings.Contains(string(html), "og.png?a=1&amp;b=2") {
		t.Error("Render output should escape the ampersand in og:image")
	}
}

func TestRenderOGProducesCard(t *testing.T) {
	cfg, err := Load([]byte(ogDoc))
	if err != nil {
		t.Fatal(err)
	}
	svg, err := RenderOG(cfg)
	if err != nil {
		t.Fatal(err)
	}
	card := string(svg)
	for _, want := range []string{
		`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"`,
		`<title>A flat page from one YAML.</title>`,
		`<desc>One file, one page.</desc>`,
		`>LA</text>`, // monogram in the header tile
		`>Landify</text>`,
		`>example.com</text>`,
		`>ONE YAML FILE</text>`, // the kicker is upper-cased for the card
		`>One file, one page.</text>`,
		`>Zero build step</text>`,
		`>12 layouts</text>`,
	} {
		if !strings.Contains(card, want) {
			t.Errorf("card missing %q\ngot:\n%s", want, card)
		}
	}
	if !strings.Contains(card, `fill="#f7f8fa"`) {
		t.Error("card should use the page theme base color for its background")
	}
	// Wrapping may split the title, but it must not lose or reorder words.
	resolved, err := ogCard(cfg)
	if err != nil {
		t.Fatal(err)
	}
	if got := strings.Join(resolved.Lines, " "); got != resolved.Title {
		t.Errorf("wrapped title = %q, want %q", got, resolved.Title)
	}
}

func TestRenderOGEscapesCopy(t *testing.T) {
	doc := strings.Replace(ogDoc, `title: A flat page from one YAML.`,
		`title: "Ampersands & <angles>"`, 1)
	cfg, err := Load([]byte(doc))
	if err != nil {
		t.Fatal(err)
	}
	svg, err := RenderOG(cfg)
	if err != nil {
		t.Fatal(err)
	}
	if !strings.Contains(string(svg), "Ampersands &amp; &lt;angles&gt;") {
		t.Errorf("card should escape XML metacharacters, got:\n%s", svg)
	}
}

func TestRenderOGWrapsAndTruncates(t *testing.T) {
	doc := strings.Replace(ogDoc, "title: A flat page from one YAML.",
		"title: "+strings.Repeat("headline ", 40), 1)
	doc = strings.Replace(doc, "description: One file, one page.",
		"description: "+strings.Repeat("detail ", 60), 1)
	doc = strings.Replace(doc, "      - Zero build step",
		"      - "+strings.Repeat("tag ", 40), 1)
	cfg, err := Load([]byte(doc))
	if err != nil {
		t.Fatal(err)
	}
	svg, err := RenderOG(cfg)
	if err != nil {
		t.Fatal(err)
	}
	card := string(svg)
	// Title + description + kicker + two monograms + name + host + 2 pills.
	want := ogTitleLines + ogDescLines + 7
	if got := strings.Count(card, "<text "); got != want {
		t.Errorf("text elements = %d, want %d", got, want)
	}
	if got := strings.Count(card, "…"); got != 3 {
		t.Errorf("ellipsis count = %d, want 3 (title, description, tag)", got)
	}
}

func TestRenderOGKeepsCopyInsideItsColumn(t *testing.T) {
	for _, themeName := range []string{"", "midnight"} {
		cfg, err := Load([]byte(ogDoc))
		if err != nil {
			t.Fatal(err)
		}
		if themeName != "" {
			theme, ok := ThemeByName(themeName)
			if !ok {
				t.Fatalf("theme %q", themeName)
			}
			cfg.Theme = theme
		}
		card, err := ogCard(cfg)
		if err != nil {
			t.Fatal(err)
		}
		for _, line := range append(card.Lines, card.DescRuns...) {
			if width := ogTextWidth(line, ogTitleSize); width > ogColumn+1 {
				t.Errorf("theme %q: line %q estimates %.0fpx, wider than the %dpx column",
					themeName, line, width, ogColumn)
			}
		}
	}
}

func TestOGCenterTextKeepsBlockInsideFrame(t *testing.T) {
	for _, titleLines := range []int{1, 2, ogTitleLines} {
		for _, descriptionLines := range []int{0, 1, ogDescLines} {
			card := OGCard{
				Kicker:   "kicker",
				Lines:    make([]string, titleLines),
				DescRuns: make([]string, descriptionLines),
				Type: OGType{
					TitleStep: ogTitleStep, DescStep: ogDescStep,
				},
			}
			ogCenterText(&card)
			top := card.Type.KickerY - ogKickerCap
			bottom := card.Type.TitleY + (titleLines-1)*ogTitleStep + ogTitleDesc
			if descriptionLines > 0 {
				bottom = card.Type.DescriptionY + (descriptionLines-1)*ogDescStep + ogDescDepth
			}
			label := fmt.Sprintf("%d title lines / %d description lines", titleLines, descriptionLines)
			if top < ogTextTop {
				t.Errorf("%s: block starts at %d, above %d", label, top, ogTextTop)
			}
			if bottom > ogTextBottom {
				t.Errorf("%s: block ends at %d, below %d", label, bottom, ogTextBottom)
			}
		}
	}
}

func TestOGCenterTextCentresOneLineCards(t *testing.T) {
	card := OGCard{Lines: []string{"one"}, Type: OGType{TitleStep: ogTitleStep, DescStep: ogDescStep}}
	ogCenterText(&card)
	top := card.Type.TitleY - ogAscender
	bottom := card.Type.TitleY + ogTitleDesc
	want := float64(ogTextTop+ogTextBottom) / 2
	got := float64(top+bottom) / 2
	if diff := got - want; diff < -2 || diff > 2 {
		t.Errorf("one-line block centres at %.1f, want %.1f", got, want)
	}
}

func TestOGPillsFitThePanel(t *testing.T) {
	cfg, err := Load([]byte(ogDoc))
	if err != nil {
		t.Fatal(err)
	}
	cfg.Site.OpenGraph.Tags = []string{
		"Short",
		"A considerably longer tag that will not fit the panel width",
		strings.Repeat("wide ", 30),
		"third",
		"fourth",
	}
	card, err := ogCard(cfg)
	if err != nil {
		t.Fatal(err)
	}
	if len(card.Pills) != ogPillMax {
		t.Fatalf("pills = %d, want the cap of %d", len(card.Pills), ogPillMax)
	}
	inner := ogPanelX + ogPanelW - ogPanelPad
	stack := ogPanelTile + ogPanelGap
	for i, pill := range card.Pills {
		if pill.X < ogPanelX+ogPanelPad || pill.X+pill.W > inner {
			t.Errorf("pill %d spans %d..%d, outside the panel padding %d..%d",
				i, pill.X, pill.X+pill.W, ogPanelX+ogPanelPad, inner)
		}
		if pill.TextX >= pill.X+pill.W {
			t.Errorf("pill %d: label starts at %d, past the pill edge %d", i, pill.TextX, pill.X+pill.W)
		}
		stack += pill.H + ogPillGap
	}
	if bottom := card.Pills[len(card.Pills)-1].Y + ogPillH; bottom > ogPanelY+ogPanelH-ogPanelPad {
		t.Errorf("pill stack ends at %d, past the panel padding %d",
			bottom, ogPanelY+ogPanelH-ogPanelPad)
	}
	if stack-ogPillGap > ogPanelTile+ogPanelGap+ogPillMax*(ogPillH+ogPillGap) {
		t.Error("pill stack grew past the budget the panel height was sized for")
	}
}

// The monogram tile and the pills are one left-aligned column, so the tile has
// to sit on the panel's padding edge like the pills do — flush with the panel
// border reads as a bug, not as a bleed.
func TestOGPanelTileSharesThePillEdge(t *testing.T) {
	cfg, err := Load([]byte(ogDoc))
	if err != nil {
		t.Fatal(err)
	}
	cfg.Site.OpenGraph.Tags = []string{"one", "two"}
	card, err := ogCard(cfg)
	if err != nil {
		t.Fatal(err)
	}
	if len(card.Pills) == 0 {
		t.Fatal("no pills to align the tile against")
	}
	if card.Panel.TileX != ogPanelX+ogPanelPad {
		t.Errorf("tile starts at %d, want the panel padding edge %d",
			card.Panel.TileX, ogPanelX+ogPanelPad)
	}
	if card.Pills[0].X != card.Panel.TileX {
		t.Errorf("pills start at %d, tile at %d: the stack is not one column",
			card.Pills[0].X, card.Panel.TileX)
	}
	if card.Panel.MonogramX != card.Panel.TileX+card.Panel.Tile/2 {
		t.Errorf("monogram centre %d is not the tile centre %d",
			card.Panel.MonogramX, card.Panel.TileX+card.Panel.Tile/2)
	}
	if card.Panel.MonogramY-card.Panel.TileY != ogPanelTile/2+ogMonoLift {
		t.Errorf("monogram baseline %d is not centred in the tile at %d",
			card.Panel.MonogramY, card.Panel.TileY)
	}
	if top := card.Panel.TileY; top < ogPanelY+ogPanelPad {
		t.Errorf("tile starts at %d, past the panel padding %d", top, ogPanelY+ogPanelPad)
	}
}

func TestOGMonogram(t *testing.T) {
	for _, tc := range []struct{ in, want string }{
		{"Backbone", "BA"},
		{"Landify", "LA"},
		{"KeVIN", "KE"},
		{"Browserverless", "BR"},
		{"J.A.C.K.", "JA"},
		{"Astro Note", "AN"},
		{"3D Renderer", "3R"},
		{"🌄 Emoji Only", "EO"},
		{"", ""},
	} {
		if got := ogMonogram(tc.in); got != tc.want {
			t.Errorf("ogMonogram(%q) = %q, want %q", tc.in, got, tc.want)
		}
	}
}

func TestOGColorsMeetContrast(t *testing.T) {
	for _, themeName := range []string{"midnight", "ocean", "slate"} {
		theme, ok := ThemeByName(themeName)
		if !ok {
			t.Fatalf("theme %q", themeName)
		}
		tokens, err := Tokens(theme)
		if err != nil {
			t.Fatal(err)
		}
		colors, err := ogColors(tokens)
		if err != nil {
			t.Fatal(err)
		}
		for _, c := range []struct {
			name, fg, bg string
		}{
			{"kicker", colors.AccentInk, colors.Base},
			{"title", colors.Ink, colors.Base},
			{"description", colors.Muted, colors.Base},
			{"pill label", colors.Ink, colors.Pill},
			{"tile label", colors.AccentOnDark, colors.Accent},
		} {
			ratio, err := contrastRatio(c.fg, c.bg)
			if err != nil {
				t.Fatal(err)
			}
			if ratio < ogMinContrast {
				t.Errorf("%s on %s: %s on %s is %.2f:1, want %.1f:1",
					themeName, c.name, c.fg, c.bg, ratio, ogMinContrast)
			}
		}
	}
}

func TestOGHost(t *testing.T) {
	for _, tc := range []struct{ in, want string }{
		{"https://hieudoanm.github.io/packages/app/headless/vectify/public/", "hieudoanm.github.io"},
		{"https://www.example.com/page", "example.com"},
		{"/relative/path", "/relative/path"},
		{"", ""},
	} {
		if got := ogHost(tc.in); got != tc.want {
			t.Errorf("ogHost(%q) = %q, want %q", tc.in, got, tc.want)
		}
	}
}

func TestBuildFileWritesOGCardOnlyWhenConfigured(t *testing.T) {
	dir := t.TempDir()
	withOG := dir + "/with/index.html"
	if _, err := BuildFile(writeTemp(t, "og.yaml", ogDoc), withOG, ""); err != nil {
		t.Fatalf("BuildFile: %v", err)
	}
	if _, err := os.Stat(OGCardPath(withOG)); err != nil {
		t.Fatalf("card beside the page: %v", err)
	}
	withoutOG := dir + "/without/index.html"
	doc := strings.Replace(ogDoc, `image: https://example.com/og/og.png`, `image: ""`, 1)
	plain := strings.SplitN(doc, "  og:\n", 2)[0] + "hero:\n" + strings.SplitN(doc, "hero:\n", 2)[1]
	if _, err := BuildFile(writeTemp(t, "plain.yaml", plain), withoutOG, ""); err != nil {
		t.Fatalf("BuildFile: %v", err)
	}
	if _, err := os.Stat(OGCardPath(withoutOG)); !os.IsNotExist(err) {
		t.Errorf("a config without site.og should not write a card, stat err = %v", err)
	}
}
