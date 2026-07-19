package cmd

import (
	"fmt"
	"os"

	"cv/internal/cv"

	"github.com/spf13/cobra"
)

var validateCmd = &cobra.Command{
	Use:   "validate [file]",
	Short: "Validate cv.yaml against schema",
	Long:  `Validate CV data from YAML file against the expected schema.`,
	Args:  cobra.MaximumNArgs(1),
	RunE: func(cmd *cobra.Command, args []string) error {
		input := "cv.yaml"
		if len(args) > 0 {
			input = args[0]
		}

		if _, err := os.Stat(input); os.IsNotExist(err) {
			return fmt.Errorf("input file not found: %s", input)
		}

		data, err := cv.LoadCV(input)
		if err != nil {
			return fmt.Errorf("failed to load CV: %w", err)
		}

		if err := validateCV(data); err != nil {
			return fmt.Errorf("validation failed: %w", err)
		}

		cmd.Printf("Validation passed: %s\n", input)
		return nil
	},
}

func validateCV(data *cv.CVData) error {
	if data.Personal.FullName == "" {
		return fmt.Errorf("personal.fullName is required")
	}
	if data.Contact.Email == "" {
		return fmt.Errorf("contact.email is required")
	}
	if data.Personal.JobTitle == "" {
		return fmt.Errorf("personal.jobTitle is required")
	}

	if len(data.Experience) == 0 {
		return fmt.Errorf("at least one experience entry is required")
	}
	for i, exp := range data.Experience {
		if exp.Company == "" {
			return fmt.Errorf("experience[%d].company is required", i)
		}
		if exp.Role == "" {
			return fmt.Errorf("experience[%d].role is required", i)
		}
		if exp.StartDate == "" {
			return fmt.Errorf("experience[%d].startDate is required", i)
		}
	}

	if len(data.Education) == 0 {
		return fmt.Errorf("at least one education entry is required")
	}
	for i, edu := range data.Education {
		if edu.School == "" {
			return fmt.Errorf("education[%d].school is required", i)
		}
		if edu.Degree == "" {
			return fmt.Errorf("education[%d].degree is required", i)
		}
	}

	if len(data.Skills) == 0 {
		return fmt.Errorf("at least one skill group is required")
	}
	for i, skill := range data.Skills {
		if skill.Category == "" {
			return fmt.Errorf("skills[%d].category is required", i)
		}
		if skill.Items == "" {
			return fmt.Errorf("skills[%d].items is required", i)
		}
	}

	for i, ref := range data.References {
		if ref.Name == "" {
			return fmt.Errorf("references[%d].name is required", i)
		}
		if ref.Title == "" {
			return fmt.Errorf("references[%d].title is required", i)
		}
		if ref.Organization == "" {
			return fmt.Errorf("references[%d].organization is required", i)
		}
		if ref.Email == "" {
			return fmt.Errorf("references[%d].email is required", i)
		}
	}

	return nil
}

func init() {
	rootCmd.AddCommand(validateCmd)
}