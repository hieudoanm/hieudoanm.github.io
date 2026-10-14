package cmd

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"

	"cv/internal/cv"

	"github.com/spf13/cobra"
)

var mdCmd = &cobra.Command{
	Use:   "md",
	Short: "Convert cv.yaml to cv.md",
	Long:  `Convert CV data from YAML to Markdown format.`,
	Args:  cobra.NoArgs,
	RunE: func(cmd *cobra.Command, args []string) error {
		input := "cv.yaml"
		if i, err := cmd.Flags().GetString("input"); err == nil && i != "" {
			input = i
		}
		output := "cv.md"
		if o, err := cmd.Flags().GetString("output"); err == nil && o != "" {
			output = o
		}

		if _, err := os.Stat(input); os.IsNotExist(err) {
			return fmt.Errorf("%s not found", input)
		}

		data, err := cv.LoadCV(input)
		if err != nil {
			return err
		}

		if err := generateMarkdown(data, output); err != nil {
			return err
		}

		cmd.Printf("Generated %s\n", output)
		return nil
	},
}

func generateMarkdown(data *cv.CVData, output string) error {
	var buf strings.Builder

	writePersonal(&buf, data.Personal, data.Contact, data.Websites)
	writeSummary(&buf, data.Summary)
	writeExperience(&buf, data.Experience)
	writeEducation(&buf, data.Education)
	writeProjects(&buf, data.Projects)
	writeSkills(&buf, data.Skills)
	writeCertifications(&buf, data.Certifications)
	writeLanguages(&buf, data.Languages)
	writeInterests(&buf, data.Interests)

	if dir := filepath.Dir(output); dir != "." && dir != "" {
		if err := os.MkdirAll(dir, 0755); err != nil {
			return err
		}
	}
	return os.WriteFile(output, []byte(buf.String()), 0644)
}

// heading writes an ATX heading followed by a blank line so block content
// that follows (lists, paragraphs) always starts on its own line.
func heading(buf *strings.Builder, level int, text string) {
	buf.WriteString(strings.Repeat("#", level) + " " + text + "\n\n")
}

func bullet(buf *strings.Builder, label, value string) {
	buf.WriteString("- **" + label + ":** " + value + "\n")
}

func writePersonal(buf *strings.Builder, p cv.Personal, c cv.Contact, w cv.Websites) {
	heading(buf, 1, p.FullName)
	writePersonalDetails(buf, p)
	writeContact(buf, c)
	writeWebsites(buf, w)
}

func writePersonalDetails(buf *strings.Builder, p cv.Personal) {
	if p.JobTitle == "" {
		return
	}
	heading(buf, 2, "Personal")
	bullet(buf, "Job Title", p.JobTitle)
	buf.WriteString("\n")
}

func writeContact(buf *strings.Builder, c cv.Contact) {
	writeEntries(buf, "Contact", []entry{
		{"Email", c.Email, false},
		{"Phone", c.Phone, false},
		{"Address", c.Address, false},
	})
}

func writeWebsites(buf *strings.Builder, w cv.Websites) {
	writeEntries(buf, "Websites", []entry{
		{"Website", w.Website, true},
		{"LinkedIn", w.Linkedin, true},
		{"GitHub", w.Github, true},
	})
}

// entry is a labelled value in a contact or website list. Links render as
// Markdown links so the address stays clickable while the label stays readable.
type entry struct {
	label  string
	value  string
	isLink bool
}

func writeEntries(buf *strings.Builder, title string, entries []entry) {
	present := 0
	for _, e := range entries {
		if e.value != "" {
			present++
		}
	}
	if present == 0 {
		return
	}

	heading(buf, 2, title)
	for _, e := range entries {
		if e.value == "" {
			continue
		}
		if e.isLink {
			bullet(buf, e.label, "["+e.value+"]("+e.value+")")
		} else {
			bullet(buf, e.label, e.value)
		}
	}
	buf.WriteString("\n")
}

func writeSummary(buf *strings.Builder, summary string) {
	if summary == "" {
		return
	}
	heading(buf, 2, "Professional Summary")
	buf.WriteString(strings.TrimRight(summary, "\n") + "\n\n")
}

func writeExperience(buf *strings.Builder, items []cv.Experience) {
	if len(items) == 0 {
		return
	}
	heading(buf, 2, "Experience")
	for _, e := range items {
		heading(buf, 3, e.Role+" at "+e.Company)
		bullet(buf, "Period", dateRange(e.StartDate, e.EndDate))
		if e.Location != "" {
			bullet(buf, "Location", e.Location)
		}
		writeText(buf, e.Description)
		buf.WriteString("\n")
	}
}

func writeEducation(buf *strings.Builder, items []cv.Education) {
	if len(items) == 0 {
		return
	}
	heading(buf, 2, "Education")
	for _, e := range items {
		heading(buf, 3, educationTitle(e))
		bullet(buf, "Period", dateRange(e.StartDate, e.EndDate))
		if e.Location != "" {
			bullet(buf, "Location", e.Location)
		}
		if e.GPA != "" {
			bullet(buf, "GPA", e.GPA)
		}
		writeParagraph(buf, e.Description)
		buf.WriteString("\n")
	}
}

func educationTitle(e cv.Education) string {
	title := e.Degree
	if e.Field != "" {
		title += " in " + e.Field
	}
	if e.School != "" {
		title += " - " + e.School
	}
	return title
}

func writeProjects(buf *strings.Builder, items []cv.Project) {
	if len(items) == 0 {
		return
	}
	heading(buf, 2, "Projects")
	for _, p := range items {
		heading(buf, 3, projectTitle(p))
		if p.Technologies != "" {
			bullet(buf, "Technologies", p.Technologies)
			writeParagraph(buf, p.Description)
		} else {
			writeText(buf, p.Description)
		}
		buf.WriteString("\n")
	}
}

// projectTitle pairs the project name with its organisation, mirroring how
// experience headings read "Role at Company".
func projectTitle(p cv.Project) string {
	if p.Organization == "" {
		return p.Name
	}
	return p.Name + " at " + p.Organization
}

func writeSkills(buf *strings.Builder, skills []cv.SkillGroup) {
	if len(skills) == 0 {
		return
	}
	heading(buf, 2, "Skills")
	for _, s := range skills {
		bullet(buf, s.Category, s.Items)
	}
	buf.WriteString("\n")
}

func writeCertifications(buf *strings.Builder, certs []cv.Certification) {
	if len(certs) == 0 {
		return
	}
	heading(buf, 2, "Certifications")
	for _, c := range certs {
		buf.WriteString("- " + certificationLine(c) + "\n")
	}
	buf.WriteString("\n")
}

// certificationLine renders a certification as "**Name** — Issuer (Date)",
// omitting whichever of issuer and date the entry leaves empty.
func certificationLine(c cv.Certification) string {
	line := "**" + c.Name + "**"
	if c.Issuer != "" {
		line += " — " + c.Issuer
	}
	if c.Date != "" {
		line += " (" + c.Date + ")"
	}
	return line
}

func writeLanguages(buf *strings.Builder, langs []cv.Language) {
	if len(langs) == 0 {
		return
	}
	heading(buf, 2, "Languages")
	for _, l := range langs {
		bullet(buf, l.Name, l.Proficiency)
	}
	buf.WriteString("\n")
}

func writeInterests(buf *strings.Builder, interests string) {
	if interests == "" {
		return
	}
	heading(buf, 2, "Interests")
	buf.WriteString(strings.TrimRight(interests, "\n") + "\n")
}

// writeText appends pre-formatted block text, trimming the trailing newline so
// the caller owns the surrounding blank lines. Used for a description that is
// either a bullet list (experience) or a paragraph (projects).
func writeText(buf *strings.Builder, text string) {
	text = strings.TrimRight(text, "\n")
	if text == "" {
		return
	}
	buf.WriteString(text + "\n")
}

// writeParagraph appends text as its own paragraph, separated from any list
// above it by a blank line so it is not swallowed as a lazy continuation.
func writeParagraph(buf *strings.Builder, text string) {
	text = strings.TrimRight(text, "\n")
	if text == "" {
		return
	}
	buf.WriteString("\n" + text + "\n")
}

// dateRange renders a start/end pair, tolerating an empty end date (some CVs
// fold the whole range into the start field).
func dateRange(start, end string) string {
	if end == "" {
		return start
	}
	return start + " - " + end
}

func init() {
	mdCmd.Flags().StringP("input", "i", "cv.yaml", "input YAML file")
	mdCmd.Flags().StringP("output", "o", "cv.md", "output Markdown file")
	rootCmd.AddCommand(mdCmd)
}
