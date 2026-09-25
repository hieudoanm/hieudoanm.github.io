package mcp

import (
	"context"
	"encoding/base64"
	"encoding/json"
	"strings"
	"testing"
	"time"
)

// fakeRenderer returns canned outcomes and records what it was asked to render.
type fakeRenderer struct {
	scrape     ScrapeOutcome
	screenshot ScreenshotOutcome
	err        error
	lastURL    string
	lastLimit  time.Duration
}

func (f *fakeRenderer) Scrape(ctx context.Context, rawurl string) (ScrapeOutcome, error) {
	f.record(ctx, rawurl)
	if f.err != nil {
		return ScrapeOutcome{}, f.err
	}
	return f.scrape, nil
}

func (f *fakeRenderer) Screenshot(ctx context.Context, rawurl string) (ScreenshotOutcome, error) {
	f.record(ctx, rawurl)
	if f.err != nil {
		return ScreenshotOutcome{}, f.err
	}
	return f.screenshot, nil
}

// record captures the call so tests can assert on argument normalisation and on
// the deadline the tool layered onto the context.
func (f *fakeRenderer) record(ctx context.Context, rawurl string) {
	f.lastURL = rawurl
	f.lastLimit = 0
	if deadline, ok := ctx.Deadline(); ok {
		f.lastLimit = time.Until(deadline)
	}
}

func newFakeRenderer() *fakeRenderer {
	return &fakeRenderer{
		scrape: ScrapeOutcome{
			URL:        "https://example.com/",
			Title:      "Example",
			HTML:       "<html><body>hi</body></html>",
			DurationMS: 12,
			MemoryKB:   2048,
		},
		screenshot: ScreenshotOutcome{
			URL:        "https://example.com/",
			Title:      "Example",
			PNGBytes:   len([]byte{0x89, 'P', 'N', 'G'}),
			PNG:        []byte{0x89, 'P', 'N', 'G'},
			DurationMS: 30,
			MemoryKB:   4096,
		},
	}
}

func callToolFrame(name string, args any) string {
	frame := map[string]any{"name": name}
	if args != nil {
		frame["arguments"] = args
	}
	data, err := json.Marshal(frame)
	if err != nil {
		panic(err)
	}
	return `{"jsonrpc":"2.0","id":1,"method":"tools/call","params":` + string(data) + `}`
}

func TestScrapeToolReturnsHTML(t *testing.T) {
	renderer := newFakeRenderer()
	responses := driveServer(t, renderer,
		callToolFrame(ToolScrape, map[string]any{"url": "https://example.com"}))

	result := decodeToolResult(t, responses[0])
	if result.IsError {
		t.Fatalf("unexpected tool error: %s", result.Content[0].Text)
	}
	if renderer.lastURL != "https://example.com" {
		t.Errorf("rendered url = %q, want the argument verbatim", renderer.lastURL)
	}

	var outcome ScrapeOutcome
	decodeText(t, result, &outcome)
	if outcome.HTML != "<html><body>hi</body></html>" {
		t.Errorf("html = %q", outcome.HTML)
	}
	if outcome.Title != "Example" || outcome.DurationMS != 12 || outcome.MemoryKB != 2048 {
		t.Errorf("metrics not carried through: %+v", outcome)
	}
}

func TestScreenshotToolReturnsImageBlock(t *testing.T) {
	responses := driveServer(t, newFakeRenderer(),
		callToolFrame(ToolScreenshot, map[string]any{"url": "https://example.com"}))

	result := decodeToolResult(t, responses[0])
	if result.IsError {
		t.Fatalf("unexpected tool error: %s", result.Content[0].Text)
	}
	if len(result.Content) != 2 {
		t.Fatalf("want a text and an image block, got %d blocks", len(result.Content))
	}

	image := result.Content[1]
	if image.Type != "image" || image.MimeType != "image/png" {
		t.Fatalf("second block = %+v, want a png image", image)
	}
	decoded, err := base64.StdEncoding.DecodeString(image.Data)
	if err != nil {
		t.Fatalf("image data is not base64: %v", err)
	}
	if string(decoded) != string([]byte{0x89, 'P', 'N', 'G'}) {
		t.Errorf("decoded png = %v, want the rendered bytes", decoded)
	}

	var outcome ScreenshotOutcome
	decodeText(t, result, &outcome)
	if outcome.PNGBytes != 4 {
		t.Errorf("png_bytes = %d, want 4", outcome.PNGBytes)
	}
	if strings.Contains(result.Content[0].Text, "PNG") {
		t.Error("raw PNG bytes leaked into the text summary")
	}
}

func TestVersionToolReportsBinaryVersion(t *testing.T) {
	responses := driveServer(t, newFakeRenderer(), callToolFrame(ToolVersion, nil))

	result := decodeToolResult(t, responses[0])
	if result.IsError {
		t.Fatalf("unexpected tool error: %s", result.Content[0].Text)
	}
	var info versionInfo
	decodeText(t, result, &info)
	if info.Server != ServerName {
		t.Errorf("server = %q, want %q", info.Server, ServerName)
	}
	if info.Version == "" {
		t.Error("version is empty")
	}
}

func decodeToolResult(t *testing.T, response Response) ToolResult {
	t.Helper()

	if response.Error != nil {
		t.Fatalf("unexpected error response: %+v", response.Error)
	}
	data, err := json.Marshal(response.Result)
	if err != nil {
		t.Fatalf("marshal result: %v", err)
	}
	var result ToolResult
	if err := json.Unmarshal(data, &result); err != nil {
		t.Fatalf("decode tool result: %v", err)
	}
	if len(result.Content) == 0 {
		t.Fatal("tool result carried no content")
	}
	return result
}

// decodeText parses the first text block, which is where tools put their JSON
// payload.
func decodeText(t *testing.T, result ToolResult, target any) {
	t.Helper()

	if result.Content[0].Type != "text" {
		t.Fatalf("first block type = %q, want text", result.Content[0].Type)
	}
	if err := json.Unmarshal([]byte(result.Content[0].Text), target); err != nil {
		t.Fatalf("decode text block into %T: %v", target, err)
	}
}
