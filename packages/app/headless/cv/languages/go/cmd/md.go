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
	buf.WriteString("# " + data.Personal.FullName + "\n\n")
	if data.Personal.JobTitle != "" {
		buf.WriteString("**" + data.Personal.JobTitle + "**\n\n")
	}
	if data.Personal.Email != "" {
		buf.WriteString("Email: " + data.Personal.Email + "\n")
	}
	if data.Personal.Phone != "" {
		buf.WriteString("Phone: " + data.Personal.Phone + "\n")
	}
	if data.Personal.Address != "" {
		buf.WriteString("Address: " + data.Personal.Address + "\n")
	}
	if data.Personal.Website != "" {
		buf.WriteString("Website: [" + data.Personal.Website + "](" + data.Personal.Website + ")\n")
	}
	if data.Personal.Linkedin != "" {
		buf.WriteString("LinkedIn: [" + data.Personal.Linkedin + "](" + data.Personal.Linkedin + ")\n")
	}
	if data.Personal.Github != "" {
		buf.WriteString("GitHub: [" + data.Personal.Github + "](" + data.Personal.Github + ")\n")
	}
	buf.WriteString("\n## Professional Summary\n\n" + data.Summary + "\n\n")

	if len(data.Experience) > 0 {
		buf.WriteString("## Experience\n\n")
		for _, exp := range data.Experience {
			buf.WriteString("### " + exp.Role + " at " + exp.Company + "\n")
			buf.WriteString("- **Period:** " + exp.StartDate + " - " + exp.EndDate + "\n")
			if exp.Location != "" {
				buf.WriteString("- **Location:** " + exp.Location + "\n")
			}
			if exp.Description != "" {
				buf.WriteString(exp.Description + "\n")
			}
			buf.WriteString("\n")
		}
	}

	if len(data.Education) > 0 {
		buf.WriteString("## Education\n\n")
		for _, edu := range data.Education {
			buf.WriteString("### " + edu.Degree)
			if edu.Field != "" {
				buf.WriteString(" in " + edu.Field)
			}
			buf.WriteString(" - " + edu.School + "\n")
			buf.WriteString("- **Period:** " + edu.StartDate + " - " + edu.EndDate + "\n")
			if edu.Description != "" {
				buf.WriteString(edu.Description + "\n")
			}
			buf.WriteString("\n")
		}
	}

	if len(data.Skills) > 0 {
		buf.WriteString("## Skills\n\n")
		for _, s := range data.Skills {
			buf.WriteString("- **" + s.Category + ":** " + s.Items + "\n")
		}
		buf.WriteString("\n")
	}

	if len(data.Languages) > 0 {
		buf.WriteString("## Languages\n\n")
		for _, l := range data.Languages {
			buf.WriteString("- **" + l.Name + ":** " + l.Proficiency + "\n")
		}
		buf.WriteString("\n")
	}

	if data.Interests != "" {
		buf.WriteString("## Interests\n\n" + data.Interests + "\n")
	}

	dir := filepath.Dir(output)
	if dir != "." && dir != "" {
		if err := os.MkdirAll(dir, 0755); err != nil {
			return err
		}
	}
	return os.WriteFile(output, []byte(buf.String()), 0644)
}

func init() {
	mdCmd.Flags().StringP("input", "i", "cv.yaml", "input YAML file")
	mdCmd.Flags().StringP("output", "o", "cv.md", "output Markdown file")
	rootCmd.AddCommand(mdCmd)
}
