package markdown

import "testing"

func TestSplitFrontmatter(t *testing.T) {
	tests := []struct {
		name        string
		input       string
		wantFound   bool
		wantTitle   string
		wantBody    string
		wantOrder   int
		wantHasOrd  bool
		wantDescrip string
	}{
		{
			name:      "no frontmatter",
			input:     "# Title\n",
			wantFound: false,
			wantBody:  "# Title\n",
		},
		{
			name:      "title only",
			input:     "---\ntitle: Hello\n---\n# Title\n",
			wantFound: true,
			wantTitle: "Hello",
			wantBody:  "# Title\n",
		},
		{
			name:        "all fields",
			input:       "---\ntitle: Hello\ndescription: A page\norder: 4\nlabel: Short\ndraft: true\n---\nBody\n",
			wantFound:   true,
			wantTitle:   "Hello",
			wantDescrip: "A page",
			wantOrder:   4,
			wantHasOrd:  true,
			wantBody:    "Body\n",
		},
		{
			name:      "unterminated fence is markdown",
			input:     "---\n# Not frontmatter\n",
			wantFound: false,
			wantBody:  "---\n# Not frontmatter\n",
		},
		{
			name:      "thematic break is not frontmatter",
			input:     "Intro\n\n---\n\nMore\n",
			wantFound: false,
			wantBody:  "Intro\n\n---\n\nMore\n",
		},
		{
			name:      "fence not at the start is markdown",
			input:     "Intro\n---\ntitle: Hello\n---\n",
			wantFound: false,
			wantBody:  "Intro\n---\ntitle: Hello\n---\n",
		},
		{
			name:      "empty block",
			input:     "---\n---\nBody\n",
			wantFound: true,
			wantBody:  "Body\n",
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			fm, body, found, err := SplitFrontmatter([]byte(test.input))
			if err != nil {
				t.Fatalf("SplitFrontmatter: %v", err)
			}
			if found != test.wantFound {
				t.Fatalf("found = %v, want %v", found, test.wantFound)
			}
			if string(body) != test.wantBody {
				t.Errorf("body = %q, want %q", body, test.wantBody)
			}
			if fm.Title != test.wantTitle {
				t.Errorf("title = %q, want %q", fm.Title, test.wantTitle)
			}
			if fm.Description != test.wantDescrip {
				t.Errorf("description = %q, want %q", fm.Description, test.wantDescrip)
			}
			if test.wantHasOrd && (fm.Order == nil || *fm.Order != test.wantOrder) {
				t.Errorf("order = %v, want %d", fm.Order, test.wantOrder)
			}
			if !test.wantHasOrd && fm.Order != nil {
				t.Errorf("order = %v, want unset", *fm.Order)
			}
		})
	}
}

func TestSplitFrontmatterRejectsInvalidYAML(t *testing.T) {
	_, _, _, err := SplitFrontmatter([]byte("---\ntitle: [unclosed\n---\nBody\n"))
	if err == nil {
		t.Fatal("SplitFrontmatter accepted invalid YAML, want an error")
	}
}

func TestTitleOr(t *testing.T) {
	if got := (Frontmatter{Title: "Set"}).TitleOr("Fallback"); got != "Set" {
		t.Errorf("TitleOr = %q, want %q", got, "Set")
	}
	if got := (Frontmatter{}).TitleOr("Fallback"); got != "Fallback" {
		t.Errorf("TitleOr = %q, want %q", got, "Fallback")
	}
}

func TestEncodeFrontmatterRoundTrips(t *testing.T) {
	order := 2
	encoded, err := EncodeFrontmatter(Frontmatter{Title: "Hello", Order: &order})
	if err != nil {
		t.Fatalf("EncodeFrontmatter: %v", err)
	}

	source := append(encoded, []byte("# Heading\n")...)
	fm, body, found, err := SplitFrontmatter(source)
	if err != nil {
		t.Fatalf("SplitFrontmatter: %v", err)
	}
	if !found {
		t.Fatal("found = false, want true for encoded frontmatter")
	}
	if fm.Title != "Hello" || fm.Order == nil || *fm.Order != 2 {
		t.Errorf("round trip = %+v, want title Hello and order 2", fm)
	}
	if string(body) != "# Heading\n" {
		t.Errorf("body = %q, want %q", body, "# Heading\n")
	}
}
