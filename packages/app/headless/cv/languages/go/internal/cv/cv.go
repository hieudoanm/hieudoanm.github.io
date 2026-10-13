package cv

import (
	"context"
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"text/template"

	gwkhtmltopdf "github.com/chinmay-sawant/gowkhtmltopdf"
	"gopkg.in/yaml.v3"
)

func LoadCV(path string) (*CVData, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, err
	}
	var cv CVData
	if err := yaml.Unmarshal(data, &cv); err != nil {
		return nil, err
	}
	return &cv, nil
}

func WriteDefaultCV(path string) error {
	defaultCV := `personal:
  fullName: John Doe
  jobTitle: Software Engineer
  email: john.doe@example.com
  phone: +1 123 456 7890
  address: 123 Main St, City, Country
  website: https://johndoe.com
  linkedin: https://linkedin.com/in/johndoe
  github: https://github.com/johndoe

summary: |
  Experienced software engineer with a passion for building scalable applications.

experience:
  - id: exp-1
    company: Example Corp
    role: Software Engineer
    location: City, Country
    startDate: 2020-01
    endDate: Present
    description: |
      - Built and maintained web applications
      - Improved performance by 50%

education:
  - id: edu-1
    school: University Name
    degree: Bachelor of Science
    field: Computer Science
    startDate: 2016-09
    endDate: 2020-06
    description: Graduated with honors

projects:
  - id: proj-1
    name: Project Name
    link: https://example.com
    description: A brief description of the project
    technologies: Go, React, PostgreSQL

skills:
  - id: skill-1
    category: Programming Languages
    items: Go, Python, JavaScript

certifications:
  - id: cert-1
    name: Certification Name
    issuer: Issuing Organization
    date: 2021-01

languages:
  - id: lang-1
    name: English
    proficiency: Native

interests: Reading, Hiking
`
	return os.WriteFile(path, []byte(defaultCV), 0644)
}

func ListTemplates() []string {
	var templates []string
	filepath.Walk("templates", func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return nil
		}
		if strings.HasSuffix(path, ".html") {
			rel, _ := filepath.Rel("templates", path)
			templates = append(templates, strings.TrimSuffix(rel, ".html"))
		}
		return nil
	})
	if len(templates) == 0 {
		templates = []string{"classic/classic"}
	}
	return templates
}

func GeneratePDF(data *CVData, templateName string, output string) error {
	htmlContent, err := renderTemplate(data, templateName)
	if err != nil {
		return err
	}

	doc := gwkhtmltopdf.NewDocument(gwkhtmltopdf.Page{
		Source: gwkhtmltopdf.HTML([]byte(htmlContent)),
	})
	doc.PageSize = "A4"
	doc.Margin = gwkhtmltopdf.Margin{
		Top:    0,
		Right:  0,
		Bottom: 0,
		Left:   0,
	}

	out, err := os.Create(output)
	if err != nil {
		return err
	}
	defer out.Close()

	if err := doc.WritePDF(context.Background(), out); err != nil {
		return err
	}
	return nil
}

func renderTemplate(data *CVData, templateName string) (string, error) {
	tmplPath := filepath.Join("templates", templateName+".html")
	if _, err := os.Stat(tmplPath); os.IsNotExist(err) {
		// Try to find the template by walking the directory
		found := ""
		filepath.Walk("templates", func(path string, info os.FileInfo, err error) error {
			if err != nil {
				return nil
			}
			if strings.HasSuffix(path, ".html") {
				rel, _ := filepath.Rel("templates", path)
				if strings.TrimSuffix(rel, ".html") == templateName {
					found = path
					return filepath.SkipDir
				}
			}
			return nil
		})
		if found != "" {
			tmplPath = found
		} else {
			tmplPath = filepath.Join("templates", "classic", "classic.html")
			if _, err := os.Stat(tmplPath); os.IsNotExist(err) {
				return getDefaultHTML(data), nil
			}
		}
	}

	tmpl, err := template.ParseFiles(tmplPath)
	if err != nil {
		return "", err
	}

	var buf strings.Builder
	if err := tmpl.Execute(&buf, data); err != nil {
		return "", err
	}
	return buf.String(), nil
}

func getDefaultHTML(data *CVData) string {
	return fmt.Sprintf(`<html><head><meta charset="utf-8"></head><body><h1>%s</h1><p>%s</p></body></html>`, data.Personal.FullName, data.Personal.JobTitle)
}
