package landify

import (
	"os"
	"strings"
	"testing"
)

func TestRenderContainsContent(t *testing.T) {
	cfg, err := Load([]byte(validDoc))
	if err != nil {
		t.Fatal(err)
	}
	html, err := Render(cfg)
	if err != nil {
		t.Fatalf("Render: %v", err)
	}
	for _, want := range []string{
		"<title>Landify</title>",
		">Features</a>",
		"Your headline goes here.",
		"Get started</a>",
		"Zero build step",
		"Make your mark.</h2>",
		"© 2026 Landify",
	} {
		if !strings.Contains(string(html), want) {
			t.Errorf("Render output missing %q", want)
		}
	}
}

func TestRenderHeroAlwaysUsesImage(t *testing.T) {
	cfg, err := Load([]byte(validDoc))
	if err != nil {
		t.Fatal(err)
	}
	html, err := Render(cfg)
	if err != nil {
		t.Fatal(err)
	}
	if !strings.Contains(string(html), `<img class="hero-media" src="assets/hero.png"`) {
		t.Error("Render output should render the hero image")
	}
	if strings.Contains(string(html), `class="hm-icon"`) {
		t.Error("Render output should not contain the old hero placeholder")
	}
}

func TestRenderDemoUsesVideo(t *testing.T) {
	cfg, err := Load([]byte(validDoc))
	if err != nil {
		t.Fatal(err)
	}
	html, err := Render(cfg)
	if err != nil {
		t.Fatal(err)
	}
	for _, want := range []string{
		`<video class="demo-media" controls`,
		`poster="assets/demo.jpg"`,
		`src="assets/demo.mp4"`,
		`type="video/mp4"`,
	} {
		if !strings.Contains(string(html), want) {
			t.Errorf("Render output missing %q", want)
		}
	}
}

func TestRenderVideoWithoutPoster(t *testing.T) {
	doc := strings.Replace(validDoc, `poster: "assets/demo.jpg"`, `poster: ""`, 1)
	cfg, err := Load([]byte(doc))
	if err != nil {
		t.Fatal(err)
	}
	html, err := Render(cfg)
	if err != nil {
		t.Fatal(err)
	}
	if strings.Contains(string(html), "poster=\"\"") {
		t.Error("Render output should omit the poster attribute when empty")
	}
}

func TestRenderThemeOverride(t *testing.T) {
	doc := "theme:\n  primary: \"#ff00aa\"\n  radius: \"12px\"\n" + validDoc
	cfg, err := Load([]byte(doc))
	if err != nil {
		t.Fatal(err)
	}
	html, err := Render(cfg)
	if err != nil {
		t.Fatal(err)
	}
	for _, want := range []string{
		"--primary: #ff00aa;",
		"--radius: 12px;",
		"--base-100: #f7f8fa;",
		"--primary-content: #ffffff;",
		"--border:",
		"--primary-soft:",
	} {
		if !strings.Contains(string(html), want) {
			t.Errorf("Render output missing %q", want)
		}
	}
	if strings.Contains(string(html), "color-mix") {
		t.Error("Render output should not contain color-mix; derived tokens are plain hex")
	}
}

func TestRenderUsesConfigMark(t *testing.T) {
	doc := strings.Replace(validDoc, `mark: "🌄"`, `mark: "🚀"`, 1)
	cfg, err := Load([]byte(doc))
	if err != nil {
		t.Fatal(err)
	}
	html, err := Render(cfg)
	if err != nil {
		t.Fatal(err)
	}
	if !strings.Contains(string(html), `<span class="mark">🚀</span>`) {
		t.Error("Render output should contain the config-driven site mark")
	}
}

func TestRenderOmitsMarkWhenEmpty(t *testing.T) {
	doc := strings.Replace(validDoc, `mark: "🌄"`, `mark: ""`, 1)
	cfg, err := Load([]byte(doc))
	if err != nil {
		t.Fatal(err)
	}
	html, err := Render(cfg)
	if err != nil {
		t.Fatal(err)
	}
	if strings.Contains(string(html), `class="mark"`) {
		t.Error("Render output should omit the mark span when site.mark is empty")
	}
}

func TestBuildFileWritesOutput(t *testing.T) {
	dir := t.TempDir()
	in := dir + "/in.yaml"
	if err := os.WriteFile(in, []byte(validDoc), 0o644); err != nil {
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
	if !strings.Contains(string(html), "Landify") {
		t.Error("built page should contain the site name")
	}
}

func TestBuildFileRejectsUnknownTheme(t *testing.T) {
	dir := t.TempDir()
	in := dir + "/in.yaml"
	if err := os.WriteFile(in, []byte(validDoc), 0o644); err != nil {
		t.Fatalf("write input: %v", err)
	}
	err := BuildFile(in, dir+"/index.html", "not-a-theme")
	if err == nil || !strings.Contains(err.Error(), "unknown theme") {
		t.Fatalf("BuildFile with unknown theme: want error, got %v", err)
	}
}

func TestBuildFileAppliesThemePreset(t *testing.T) {
	dir := t.TempDir()
	in := dir + "/in.yaml"
	if err := os.WriteFile(in, []byte(validDoc), 0o644); err != nil {
		t.Fatalf("write input: %v", err)
	}
	out := dir + "/index.html"
	if err := BuildFile(in, out, "midnight"); err != nil {
		t.Fatalf("BuildFile: %v", err)
	}
	html, err := os.ReadFile(out)
	if err != nil {
		t.Fatalf("read output: %v", err)
	}
	if !strings.Contains(string(html), "--primary: #22d3ee;") {
		t.Error("built page should carry the midnight primary color")
	}
}
