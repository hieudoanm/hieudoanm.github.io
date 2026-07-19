package dbml

import (
	"encoding/xml"
	"io"
	"strings"
	"testing"
)

func TestToSVGEmptyProject(t *testing.T) {
	svg := (&Project{}).ToSVG()

	if !strings.HasPrefix(svg, "<?xml") {
		t.Errorf("expected XML declaration, got %q", firstLine(svg))
	}
	if !strings.Contains(svg, "<svg ") || !strings.Contains(svg, "</svg>") {
		t.Errorf("expected svg root element in output")
	}
	if err := assertWellFormedXML(t, svg); err != nil {
		t.Errorf("output is not well-formed XML: %v", err)
	}
}

func TestToSVGRendersTablesAndColumns(t *testing.T) {
	project := &Project{
		Tables: []Table{{
			Name: "users",
			Columns: []Column{
				{Name: "id", Type: "integer", IsPrimary: true},
				{Name: "email", Type: "varchar(255)", IsUnique: true, IsNotNull: true},
				{Name: "name <div>", Type: "text", Comment: "escaped"},
			},
		}},
		Enums: []Enum{{Name: "post_status", Values: []string{"draft", "published"}}},
	}

	svg := project.ToSVG()

	for _, want := range []string{
		"users", "id", "email", "name &lt;div&gt;",
		"PK", "UK", "VARCHAR(255) NOT NULL",
		"enum post_status", "draft", "published",
	} {
		if !strings.Contains(svg, want) {
			t.Errorf("generated SVG missing %q", want)
		}
	}
	if err := assertWellFormedXML(t, svg); err != nil {
		t.Errorf("output is not well-formed XML: %v", err)
	}
}

func TestToSVGRendersReferences(t *testing.T) {
	project := &Project{
		Tables: []Table{
			{Name: "users", Columns: []Column{{Name: "id", Type: "int", IsPrimary: true}}},
			{Name: "posts", Columns: []Column{{Name: "user_id", Type: "int", IsNotNull: true}}},
		},
		References: []Reference{{
			Name: "fk_users_posts", Table1: "users", Column1: "id",
			Table2: "posts", Column2: "user_id",
		}},
	}

	svg := project.ToSVG()

	if !strings.Contains(svg, `marker-end="url(#arrow)"`) {
		t.Errorf("expected relation paths with arrow marker")
	}
	if !strings.Contains(svg, `stroke="#7c3aed"`) {
		t.Errorf("expected relation stroke in output")
	}
	if err := assertWellFormedXML(t, svg); err != nil {
		t.Errorf("output is not well-formed XML: %v", err)
	}
}

func TestToSVGSkipsUnknownReferenceTargets(t *testing.T) {
	project := &Project{
		Tables: []Table{{Name: "users", Columns: []Column{{Name: "id", Type: "int"}}}},
		References: []Reference{{
			Name: "ghost", Table1: "missing", Column1: "id",
			Table2: "users", Column2: "id",
		}},
	}
	svg := project.ToSVG()
	if strings.Contains(svg, `marker-start="url(#dot)"`) {
		t.Errorf("expected unknown reference to be skipped")
	}
}

func assertWellFormedXML(t *testing.T, s string) error {
	t.Helper()
	dec := xml.NewDecoder(strings.NewReader(s))
	for {
		if _, err := dec.Token(); err != nil {
			if err == io.EOF {
				return nil
			}
			return err
		}
	}
}

func firstLine(s string) string {
	if i := strings.IndexByte(s, '\n'); i != -1 {
		return s[:i]
	}
	return s
}
