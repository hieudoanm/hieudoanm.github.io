package cmd

import (
	"os"
	"path/filepath"
	"strings"
	"testing"

	"cv/internal/cv"
)

func TestGenerateMarkdownFormatsHeadingsAndLists(t *testing.T) {
	data := &cv.CVData{
		Personal: cv.Personal{
			FullName: "Jane Doe",
			JobTitle: "Engineer",
		},
		Contact: cv.Contact{
			Email: "jane@example.com",
		},
		Websites: cv.Websites{
			Website: "https://example.com",
		},
		Summary: "A summary.",
		Experience: []cv.Experience{{
			Company:     "Acme",
			Role:        "Staff Engineer",
			Location:    "Remote",
			StartDate:   "2020",
			EndDate:     "2024",
			Description: "- Did a thing.\n- Did another.\n",
		}},
		Education: []cv.Education{{
			School:      "MIT",
			Degree:      "BSc",
			Field:       "CS",
			StartDate:   "2010 - 2014",
			Description: "Thesis on things.\n",
		}},
		Certifications: []cv.Certification{{
			Name:   "AWS Certified Solutions Architect - Associate",
			Issuer: "Amazon Web Services (AWS)",
			Date:   "2021-09-11",
		}},
		Projects: []cv.Project{{
			Name:         "House Pricing Prediction",
			Organization: "Acme",
			Description:  "Automated valuation.\n",
		}},
	}

	path := filepath.Join(t.TempDir(), "cv.md")
	if err := generateMarkdown(data, path); err != nil {
		t.Fatalf("generateMarkdown: %v", err)
	}
	got, err := os.ReadFile(path)
	if err != nil {
		t.Fatal(err)
	}
	md := string(got)

	wants := []string{
		"# Jane Doe\n\n",
		"## Personal\n\n",
		"- **Job Title:** Engineer\n",
		"## Contact\n\n",
		"- **Email:** jane@example.com\n",
		"## Websites\n\n",
		"- **Website:** [https://example.com](https://example.com)\n",
		"## Experience\n\n",
		"### Staff Engineer at Acme\n\n",
		"- **Period:** 2020 - 2024\n",
		"- Did a thing.\n",
		"## Education\n\n",
		"### BSc in CS - MIT\n\n",
		"- **Period:** 2010 - 2014\n",
		"\nThesis on things.\n",
		"## Projects\n\n",
		"### House Pricing Prediction at Acme\n\n",
		"Automated valuation.\n",
		"## Certifications\n\n",
		"- **AWS Certified Solutions Architect - Associate** — Amazon Web Services (AWS) (2021-09-11)\n",
	}
	for _, want := range wants {
		if !strings.Contains(md, want) {
			t.Errorf("markdown missing %q\n---\n%s", want, md)
		}
	}

	if strings.Contains(md, "2010 - 2014 - ") {
		t.Errorf("empty end date left a trailing separator:\n%s", md)
	}
}

func TestDateRange(t *testing.T) {
	tests := []struct {
		name       string
		start, end string
		want       string
	}{
		{"both dates", "2020", "2024", "2020 - 2024"},
		{"empty end keeps start", "2010 - 2014", "", "2010 - 2014"},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := dateRange(tt.start, tt.end); got != tt.want {
				t.Errorf("dateRange(%q, %q) = %q, want %q", tt.start, tt.end, got, tt.want)
			}
		})
	}
}
