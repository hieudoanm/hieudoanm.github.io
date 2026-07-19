package cmd

import (
	"fmt"
	"os"

	"cv/internal/cv"

	"github.com/spf13/cobra"
)

var (
	templateName string
	output       string
	input        string
)

var pdfCmd = &cobra.Command{
	Use:   "pdf",
	Short: "Convert cv.yaml to cv.pdf",
	Long:  `Convert CV data from YAML to PDF using a template.`,
	Args:  cobra.NoArgs,
	RunE: func(cmd *cobra.Command, args []string) error {
		if input == "" {
			input = "cv.yaml"
		}
		if output == "" {
			output = "cv.pdf"
		}

		if _, err := os.Stat(input); os.IsNotExist(err) {
			return fmt.Errorf("cv.yaml not found. Run 'cv init' first")
		}

		data, err := cv.LoadCV(input)
		if err != nil {
			return err
		}

		if templateName == "" {
			templates := cv.ListTemplates()
			if len(templates) == 0 {
				return fmt.Errorf("no templates found")
			}
			templateName = templates[0]
		}

		if err := cv.GeneratePDF(data, templateName, output); err != nil {
			return err
		}

		cmd.Printf("Generated %s using template %s\n", output, templateName)
		return nil
	},
}

func init() {
	pdfCmd.Flags().StringVarP(&templateName, "template", "t", "", "template name")
	pdfCmd.Flags().StringVarP(&output, "output", "o", "cv.pdf", "output PDF file")
	pdfCmd.Flags().StringVarP(&input, "input", "i", "cv.yaml", "input YAML file")
}
