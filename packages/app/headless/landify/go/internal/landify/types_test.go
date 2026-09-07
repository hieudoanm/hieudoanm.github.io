package landify

import (
	"os"
	"strings"
	"testing"
)

const waitlistDoc = `
type: waitlist
site:
  name: Hype App
  description: Join the waitlist.
  nav:
    - label: Join
      href: "#join"
hero:
  badge: "🪄 Now building"
  headline: The tool the internet asked for.
  subheadline: A flat, dependency-free page generated from YAML.
waitlist:
  launches: "🧡 Open to the first 1,000 on November 1"
  heading: Join the waitlist.
  body: Leave your email and we will send one note when seats open.
  form:
    action: https://forms.example.com/signup
    button: Notify me
  social:
    - label: "𝕏"
      href: https://twitter.com
footer:
  copyright: "© 2026 Hype App"
`

const eventDoc = `
type: event
site:
  name: Shape Guild
  description: A one-day conference.
  nav:
    - label: Agenda
      href: "#agenda"
hero:
  badge: "🎟️ CFD"
  headline: Shaping the future of forms.
  subheadline: A one-day conference on accessible, flat web pages.
  secondary:
    label: Venue
    href: "#speakers"
event:
  date: "March 14, 2026"
  time: "9:00 – 17:00"
  venue:
    name: Civic Hall
    city: Paris
  primary:
    label: Get tickets
    href: https://tickets.example.com
  speakers_heading: Speakers
  speakers_sub: The folks up on stage.
  agenda:
    - time: "09:30"
      title: Keynote
      speaker: Ana
      body: A look at where forms go next.
    - time: "11:00"
      title: Hands-on lab
      body: Build your first themed page.
  speakers:
    - name: Ana
      role: Principal Engineer
      avatar: "🦊"
    - name: Sam
      role: Product Designer
cta:
  icon: "🎟️"
  heading: See you in March.
  body: Get a ticket before they sell out.
  button:
    label: Get tickets
    href: https://tickets.example.com
footer:
  copyright: "© 2026 Shape Guild"
`

const downloadDoc = `
type: download
site:
  name: landify
  description: A static-site generator.
  nav:
    - label: Features
      href: "#features"
hero:
  badge: "📦 Release"
  headline: Ship a landing page in minutes.
  subheadline: One YAML file in, one flat HTML page out.
  secondary:
    label: Changelog
    href: https://example.com/changelog
download:
  version: "0.4.2"
  license: MIT
  repo: https://github.com/hieudoanm/hieudoanm.github.io
  install: brew install landify
  platforms:
    - name: macOS
      icon: "🍎"
      href: https://example.com/landify.dmg
    - name: Linux
      icon: "🐧"
      href: https://example.com/landify-linux.tar.gz
features:
  heading: Features
  items:
    - icon: "📄"
      title: One flat file
      body: HTML and CSS only.
cta:
  icon: "🚀"
  heading: Get started.
  body: Download and build your first page.
  button:
    label: Download now
    href: https://example.com/landify.dmg
footer:
  copyright: "© 2026 Landify"
`

const pricingDoc = `
type: pricing
site:
  name: Landify Pro
  description: Simple pricing.
  nav:
    - label: Pricing
      href: "#pricing"
hero:
  badge: "💳 Simple pricing"
  headline: Pay for what you build.
  subheadline: Three plans, no surprises, cancel anytime.
pricing:
  heading: Pick a plan
  sub: Every plan includes a gallery of 64 themes.
  note: Prices in USD. Cancel anytime.
  tiers:
    - name: Starter
      price: "$0"
      period: forever
      perks:
        - One flat page
        - 64 themes
      cta:
        label: Start free
        href: "https://example.com/start"
    - name: Pro
      price: "$12"
      period: month
      tag: Most popular
      perks:
        - Eight page types
        - Header and footer remixes
      cta:
        label: Go Pro
        href: "https://example.com/pro"
    - name: Studio
      price: "$29"
      period: month
      perks:
        - Unlimited pages
        - Priority build
      cta:
        label: Contact us
        href: "https://example.com/studio"
cta:
  icon: "🚀"
  heading: Ready to build?
  body: Start free, switch plans anytime.
  button:
    label: Start free
    href: "https://example.com/start"
footer:
  copyright: "© 2026 Landify Pro"
`

const appDoc = `
type: app
site:
  name: Landify Pocket
  description: A tiny reader app.
  nav:
    - label: Screenshots
      href: "#screenshots"
hero:
  badge: "📱 Now on iOS"
  headline: Read the whole web in one pocket.
  subheadline: A flat, fast, offline-first reader.
app:
  stores:
    - name: App Store
      icon: "🍎"
      href: "https://example.com/app-store"
    - name: Google Play
      icon: "▶️"
      href: "https://example.com/play"
  ratings: "4.9"
  reviews: "12,400 reviews"
  shots:
    - title: Library
      src: "media/shot1.png"
    - title: Article
      src: "media/shot2.png"
    - title: Focus mode
      src: "media/shot3.png"
features:
  heading: Why readers switch
  items:
    - icon: "⚡"
      title: Instant
      body: Pages open before you blink.
    - icon: "📴"
      title: Offline
      body: Every article cached by default.
    - icon: "🔒"
      title: Private
      body: No trackers, no accounts required.
cta:
  icon: "📱"
  heading: Available now.
  body: Download today and read without the noise.
  button:
    label: Get the app
    href: "https://example.com/app-store"
footer:
  copyright: "© 2026 Landify Pocket"
`

const portfolioDoc = `
type: portfolio
site:
  name: Ana Ruiz
  description: Design engineer.
  nav:
    - label: Work
      href: "#work"
portfolio:
  name: Ana Ruiz
  role: Design engineer and YAML evangelist.
  location: Lisbon
  avatar: "🦊"
  about: I build flat, accessible pages and the tiny tools behind them.
  skills:
    - HTML
    - CSS
    - Go
    - Design systems
  projects:
    - icon: "📐"
      title: Tokens
      body: Derive a full design system from eight colors.
      href: "https://example.com/tokens"
    - icon: "🎨"
      title: Themes
      body: Sixty-four curated color presets.
      href: "https://example.com/themes"
    - icon: "🧪"
      title: Specs
      body: Contract tests that guard YAML pages.
      href: "https://example.com/specs"
features:
  heading: Selected work
cta:
  icon: "💌"
  heading: Let's make something flat.
  body: Open to freelance, talks, and side projects.
  button:
    label: Say hello
    href: "mailto:ana@example.com"
footer:
  copyright: "© 2026 Ana Ruiz"
`

const docsDoc = `
type: docs
site:
  name: Landify Docs
  description: Documentation.
  nav:
    - label: Guides
      href: "#docs"
hero:
  badge: "📚 Docs"
  headline: Build a page in five minutes.
  subheadline: Everything you need to go from YAML to a deployed page.
  primary:
    label: Quickstart
    href: "#docs"
  secondary:
    label: GitHub
    href: "https://example.com/gh"
docs:
  heading: Start here
  sub: Pick a guide, or jump straight into the reference.
  packages:
    - icon: "⚡"
      title: Quickstart
      body: Your first landify.yaml in sixty seconds.
      href: "https://example.com/quickstart"
    - icon: "🎨"
      title: Themes
      body: The sixty-four presets and how to write your own.
      href: "https://example.com/themes"
    - icon: "📄"
      title: Page types
      body: product, waitlist, event, download, and more.
      href: "https://example.com/types"
  sample: |
    type: product
    theme:
      primary: "#0d9488"
    landify build
cta:
  icon: "🧭"
  heading: Still exploring?
  body: See the full reference or open the repository.
  button:
    label: Open GitHub
    href: "https://example.com/gh"
footer:
  copyright: "© 2026 Landify Docs"
`

func TestPricingLoadsAndRenders(t *testing.T) {
	cfg, err := Load([]byte(pricingDoc))
	if err != nil {
		t.Fatal(err)
	}
	if !Valid(cfg) {
		t.Fatalf("Valid = false, want true: %v", Errors(cfg))
	}
	html, err := Render(cfg)
	if err != nil {
		t.Fatalf("Render: %v", err)
	}
	for _, want := range []string{
		`<div class="tier featured">`,
		`<span class="tier-name">Starter</span>`,
		`<div class="tier-price">$12<span class="tier-period"> / month</span></div>`,
		`<li><span class="tick" aria-hidden="true">✓</span> Eight page types</li>`,
		`<a class="btn btn-primary" href="https://example.com/pro">Go Pro</a>`,
		`<p class="pricing-note">Prices in USD. Cancel anytime.</p>`,
	} {
		if !strings.Contains(string(html), want) {
			t.Errorf("pricing render missing %q", want)
		}
	}
}

func TestAppLoadsAndRenders(t *testing.T) {
	cfg, err := Load([]byte(appDoc))
	if err != nil {
		t.Fatal(err)
	}
	if !Valid(cfg) {
		t.Fatalf("Valid = false, want true: %v", Errors(cfg))
	}
	html, err := Render(cfg)
	if err != nil {
		t.Fatalf("Render: %v", err)
	}
	for _, want := range []string{
		`<a class="store-badge" href="https://example.com/app-store">`,
		`<span class="stars" aria-hidden="true">★★★★★</span>`,
		"4.9 · 12,400 reviews",
		`<img src="media/shot1.png" alt="Library"`,
		`<div class="feature">`,
	} {
		if !strings.Contains(string(html), want) {
			t.Errorf("app render missing %q", want)
		}
	}
}

func TestPortfolioLoadsAndRenders(t *testing.T) {
	cfg, err := Load([]byte(portfolioDoc))
	if err != nil {
		t.Fatal(err)
	}
	if !Valid(cfg) {
		t.Fatalf("Valid = false, want true: %v", Errors(cfg))
	}
	html, err := Render(cfg)
	if err != nil {
		t.Fatalf("Render: %v", err)
	}
	for _, want := range []string{
		`<span class="avatar-lg" aria-hidden="true">🦊</span>`,
		`<h1>Ana Ruiz</h1>`,
		`<span class="loc">📍 Lisbon</span>`,
		`<span class="skill">Design systems</span>`,
		`<a class="project" href="https://example.com/tokens">`,
		`<h2>Selected work</h2>`,
	} {
		if !strings.Contains(string(html), want) {
			t.Errorf("portfolio render missing %q", want)
		}
	}
}

func TestDocsLoadsAndRenders(t *testing.T) {
	cfg, err := Load([]byte(docsDoc))
	if err != nil {
		t.Fatal(err)
	}
	if !Valid(cfg) {
		t.Fatalf("Valid = false, want true: %v", Errors(cfg))
	}
	html, err := Render(cfg)
	if err != nil {
		t.Fatalf("Render: %v", err)
	}
	for _, want := range []string{
		`<a class="doc-card" href="https://example.com/quickstart">`,
		`<h3>Themes</h3>`,
		"Page types",
		"landify build",
		`<div class="docs-sample install-block">`,
	} {
		if !strings.Contains(string(html), want) {
			t.Errorf("docs render missing %q", want)
		}
	}
}

func TestWaitlistLoadsAndRenders(t *testing.T) {
	cfg, err := Load([]byte(waitlistDoc))
	if err != nil {
		t.Fatal(err)
	}
	if !Valid(cfg) {
		t.Fatalf("Valid = false, want true: %v", Errors(cfg))
	}
	html, err := Render(cfg)
	if err != nil {
		t.Fatalf("Render: %v", err)
	}
	for _, want := range []string{
		`<form class="waitlist-form" method="post" action="https://forms.example.com/signup">`,
		`<button type="submit" class="btn btn-primary">Notify me</button>`,
		`<input type="email" name="email" placeholder=`,
		"Open to the first 1,000 on November 1",
		`href="https://twitter.com" class="social">𝕏</a>`,
	} {
		if !strings.Contains(string(html), want) {
			t.Errorf("waitlist render missing %q", want)
		}
	}
}

func TestEventLoadsAndRenders(t *testing.T) {
	cfg, err := Load([]byte(eventDoc))
	if err != nil {
		t.Fatal(err)
	}
	if !Valid(cfg) {
		t.Fatalf("Valid = false, want true: %v", Errors(cfg))
	}
	html, err := Render(cfg)
	if err != nil {
		t.Fatalf("Render: %v", err)
	}
	for _, want := range []string{
		"March 14, 2026",
		"Civic Hall, Paris",
		`<a class="btn btn-primary" href="https://tickets.example.com">Get tickets</a>`,
		`<span class="time">09:30</span>`,
		"Keynote",
		"Speakers",
		"Principal Engineer",
		`class="avatar">🦊</span>`,
		`<section id="cta"`,
	} {
		if !strings.Contains(string(html), want) {
			t.Errorf("event render missing %q", want)
		}
	}
}

func TestDownloadLoadsAndRenders(t *testing.T) {
	cfg, err := Load([]byte(downloadDoc))
	if err != nil {
		t.Fatal(err)
	}
	if !Valid(cfg) {
		t.Fatalf("Valid = false, want true: %v", Errors(cfg))
	}
	html, err := Render(cfg)
	if err != nil {
		t.Fatalf("Render: %v", err)
	}
	for _, want := range []string{
		"⛁ v0.4.2",
		"🪪 MIT",
		`<a class="dl-platform" href="https://example.com/landify.dmg">🍎 macOS</a>`,
		"brew install landify",
		"⭐ View source",
	} {
		if !strings.Contains(string(html), want) {
			t.Errorf("download render missing %q", want)
		}
	}
}

func TestProductDefaultTypeRendersOriginal(t *testing.T) {
	cfg, err := Load([]byte(validDoc))
	if err != nil {
		t.Fatal(err)
	}
	if NormalizeType(cfg.Type) != "product" {
		t.Fatalf("NormalizeType(%q) = %q, want product", cfg.Type, NormalizeType(cfg.Type))
	}
	html, err := Render(cfg)
	if err != nil {
		t.Fatalf("Render: %v", err)
	}
	if !strings.Contains(string(html), `class="hero-media"`) || !strings.Contains(string(html), `class="demo-media"`) {
		t.Error("product render should include hero image and demo video")
	}
}

func TestUnknownTypeRejected(t *testing.T) {
	doc := "type: brochure\n" + validDoc
	cfg, err := Load([]byte(doc))
	if err != nil {
		t.Fatal(err)
	}
	if !containsErr(Errors(cfg), `type "brochure" is not supported`) {
		t.Fatalf("Errors = %v, want unknown-type message", Errors(cfg))
	}
}

func TestWaitlistRequiresFormAction(t *testing.T) {
	doc := strings.Replace(waitlistDoc, "    action: https://forms.example.com/signup", "", 1)
	cfg, err := Load([]byte(doc))
	if err != nil {
		t.Fatal(err)
	}
	if !containsErr(Errors(cfg), "waitlist.form.action") {
		t.Fatalf("Errors = %v, want waitlist.form.action", Errors(cfg))
	}
}

func TestEventRequiresAgendaItems(t *testing.T) {
	cfg, err := Load([]byte(eventDoc))
	if err != nil {
		t.Fatal(err)
	}
	cfg.Event.Agenda = nil
	if !containsErr(Errors(cfg), "event.agenda must contain at least one item") {
		t.Fatalf("Errors = %v, want agenda error", Errors(cfg))
	}
}

func TestDownloadRequiresPlatforms(t *testing.T) {
	cfg, err := Load([]byte(downloadDoc))
	if err != nil {
		t.Fatal(err)
	}
	cfg.Download.Platforms = nil
	if !containsErr(Errors(cfg), "download.platforms must contain at least one platform") {
		t.Fatalf("Errors = %v, want platforms error", Errors(cfg))
	}
}

func TestPricingRequiresTiers(t *testing.T) {
	cfg, err := Load([]byte(pricingDoc))
	if err != nil {
		t.Fatal(err)
	}
	cfg.Pricing.Tiers = nil
	if !containsErr(Errors(cfg), "pricing.tiers must contain at least one tier") {
		t.Fatalf("Errors = %v, want tiers error", Errors(cfg))
	}
}

func TestAppRequiresStores(t *testing.T) {
	cfg, err := Load([]byte(appDoc))
	if err != nil {
		t.Fatal(err)
	}
	cfg.App.Stores = nil
	if !containsErr(Errors(cfg), "app.stores must contain at least one store") {
		t.Fatalf("Errors = %v, want stores error", Errors(cfg))
	}
}

func TestPortfolioRequiresProjects(t *testing.T) {
	cfg, err := Load([]byte(portfolioDoc))
	if err != nil {
		t.Fatal(err)
	}
	cfg.Portfolio.Projects = nil
	if !containsErr(Errors(cfg), "portfolio.projects must contain at least one project") {
		t.Fatalf("Errors = %v, want projects error", Errors(cfg))
	}
}

func TestDocsRequiresPackages(t *testing.T) {
	cfg, err := Load([]byte(docsDoc))
	if err != nil {
		t.Fatal(err)
	}
	cfg.Docs.Packages = nil
	if !containsErr(Errors(cfg), "docs.packages must contain at least one card") {
		t.Fatalf("Errors = %v, want packages error", Errors(cfg))
	}
}

func TestBuildFileWaitlistWritesPage(t *testing.T) {
	dir := t.TempDir()
	in := dir + "/in.yaml"
	if err := os.WriteFile(in, []byte(waitlistDoc), 0o644); err != nil {
		t.Fatalf("write input: %v", err)
	}
	out := dir + "/index.html"
	if err := BuildFile(in, out, ""); err != nil {
		t.Fatalf("BuildFile: %v", err)
	}
	html, err := os.ReadFile(out)
	if err != nil {
		t.Fatalf("read output: %v", err)
	}
	if !strings.Contains(string(html), "waitlist-form") {
		t.Error("built waitlist page should include the form")
	}
}

func containsErr(errs []string, want string) bool {
	for _, e := range errs {
		if strings.Contains(e, want) {
			return true
		}
	}
	return false
}
