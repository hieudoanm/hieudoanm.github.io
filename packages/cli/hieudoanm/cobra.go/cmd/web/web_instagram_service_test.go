package web

import (
	"testing"
)

func Test_extractShortcode(t *testing.T) {
	tests := []struct {
		name    string
		input   string
		want    string
		wantErr bool
	}{
		{"full URL", "https://www.instagram.com/p/CLI7qRNhI_o/", "CLI7qRNhI_o", false},
		{"reel URL", "https://www.instagram.com/reel/CLI7qRNhI_o/", "CLI7qRNhI_o", false},
		{"reels URL", "https://www.instagram.com/reels/CLI7qRNhI_o/", "CLI7qRNhI_o", false},
		{"tv URL", "https://www.instagram.com/tv/CLI7qRNhI_o/", "CLI7qRNhI_o", false},
		{"raw shortcode", "CLI7qRNhI_o", "CLI7qRNhI_o", false},
		{"raw shortcode trimmed", "  CLI7qRNhI_o  ", "CLI7qRNhI_o", false},
		{"empty input", "", "", true},
		{"path without shortcode", "/p/", "", true},
		{"invalid URL no shortcode", "https://instagram.com/p/", "", true},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := extractShortcode(tt.input)
			if (err != nil) != tt.wantErr {
				t.Errorf("extractShortcode() error = %v, wantErr = %v", err, tt.wantErr)
				return
			}
			if got != tt.want {
				t.Errorf("extractShortcode() = %q, want %q", got, tt.want)
			}
		})
	}
}

func Test_scrapeIGImages_displayURL(t *testing.T) {
	html := `
<html><body>
<script>
window.__INITIAL_STATE__ = {};
</script>
<a href="https://instagram.com/p/abc/">post</a>
</body></html>
`
	got := scrapeIGImages(html)
	if len(got) != 0 {
		t.Errorf("expected no images from plain HTML, got %d", len(got))
	}
}

func Test_scrapeIGImages_withDisplayURL(t *testing.T) {
	html := `"display_url":"https://cdn.instagram.com/v/t1.jpg","display_url":"https://cdn.instagram.com/v/t2.jpg"`
	got := scrapeIGImages(html)
	if len(got) != 2 {
		t.Errorf("expected 2 images, got %d: %v", len(got), got)
	}
}

func Test_scrapeIGImages_withOgImage(t *testing.T) {
	html := `<meta property="og:image" content="https://cdn.instagram.com/v/og-image.jpg"/>`
	got := scrapeIGImages(html)
	if len(got) != 1 {
		t.Errorf("expected 1 image from og:image, got %d: %v", len(got), got)
	}
	want := "https://cdn.instagram.com/v/og-image.jpg"
	if got[0] != want {
		t.Errorf("got %q, want %q", got[0], want)
	}
}

func Test_scrapeIGImages_dedup(t *testing.T) {
	html := `"display_url":"https://example.com/1.jpg","display_url":"https://example.com/1.jpg","display_url":"https://example.com/2.jpg"`
	got := scrapeIGImages(html)
	if len(got) != 2 {
		t.Errorf("expected 2 unique images, got %d: %v", len(got), got)
	}
}

func Test_scrapeIGImages_unescapeAmpersand(t *testing.T) {
	html := `"display_url":"https://example.com/image.jpg\u0026w=1080"`
	got := scrapeIGImages(html)
	if len(got) != 1 {
		t.Fatalf("expected 1 image, got %d", len(got))
	}
	if got[0] != "https://example.com/image.jpg&w=1080" {
		t.Errorf("expected unescaped ampersand, got %q", got[0])
	}
}

func Test_scrapeIGImages_emptyHTML(t *testing.T) {
	got := scrapeIGImages("")
	if len(got) != 0 {
		t.Errorf("expected 0 images from empty HTML, got %d", len(got))
	}
}
