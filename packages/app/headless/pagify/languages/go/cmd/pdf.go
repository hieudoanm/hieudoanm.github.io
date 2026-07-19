package cmd

import (
	"fmt"
	"io"
	"os"
	"path/filepath"
	"strings"

	"github.com/carlos7ags/folio/document"
	"github.com/carlos7ags/folio/layout"
	"github.com/spf13/cobra"

	"pagify/internal/build"
	"pagify/internal/markdown"
	"pagify/internal/site"
)

// newPdfCommand builds the pdf subcommand.
func newPdfCommand(stdout io.Writer) *cobra.Command {
	var outputDir string

	command := &cobra.Command{
		Use:   "pdf [content]",
		Short: "Convert Markdown to PDF",
		Long: `Convert Markdown files to PDF in A4 format.

The content directory defaults to ./docs and the output to ./dist:
  pagify pdf
  pagify pdf ./docs --output ./dist

The PDF is generated with A4 page layout (210 × 297 mm), 25 mm margins,
and 10-11 pt body text for optimal readability.`,
		Args:      cobra.MaximumNArgs(1),
		ValidArgs: []string{"docs"},
		RunE: func(command *cobra.Command, args []string) error {
			contentDir := defaultContentDir
			if len(args) == 1 {
				contentDir = args[0]
			}
			return runPdf(stdout, contentDir, outputDir)
		},
	}
	command.Flags().StringVarP(&outputDir, "output", "o", defaultOutputDir, "directory to write PDF files to")
	return command
}

// runPdf performs the PDF conversion and prints a summary.
func runPdf(stdout io.Writer, contentDir, outputDir string) error {
	// Create output directory
	if err := os.MkdirAll(outputDir, 0o755); err != nil {
		return fmt.Errorf("create output directory: %w", err)
	}

	// Load the content
	content, err := site.Discover(contentDir)
	if err != nil {
		return fmt.Errorf("discover content: %w", err)
	}

	config, err := build.LoadConfig(contentDir, content.IndexFrontmatter)
	if err != nil {
		return fmt.Errorf("load config: %w", err)
	}

	// Create prefixer for base path
	prefixer := func(url string) string {
		if config.BasePath == "" || config.BasePath == "/" {
			return url
		}
		return config.BasePath + url
	}

	resolver := site.LinkResolverFor(content.Pages, content.Assets, prefixer)
	renderer := markdown.NewRenderer()

	// Convert each page to PDF
	count := 0
	for _, page := range content.Pages {
		document, err := renderer.Render(page.Content, resolver(page.Dir))
		if err != nil {
			return fmt.Errorf("render %s: %w", page.Source, err)
		}
		html := string(document.HTML)
		title := document.Title
		if title == "" {
			title = page.Title
		}

		pdfPath := strings.TrimSuffix(page.Source, ".md") + ".pdf"
		if page.Source == "index.md" || page.Source == "README.md" {
			pdfPath = filepath.Join(filepath.Dir(page.Source), "index.pdf")
		}

		if err := convertHTMLToPDF(title, html, outputDir, pdfPath); err != nil {
			return fmt.Errorf("convert %s to PDF: %w", page.Source, err)
		}
		count++
	}

	fmt.Fprintf(stdout, "Converted %d page(s) to PDF in %s\n", count, outputDir)
	return nil
}

// convertHTMLToPDF converts HTML content to PDF.
func convertHTMLToPDF(title, html, outputDir, pdfPath string) error {
	doc := document.NewDocument(document.PageSizeA4)
	doc.Info.Title = title

	// Add CSS for A4 layout with specified margins
	css := `
		@page {
			size: A4;
			margin: 25mm;
		}
		body {
			font-family: serif;
			font-size: 11pt;
			line-height: 1.4;
			color: #000;
		}
		h1, h2, h3, h4, h5, h6 {
			page-break-after: avoid;
		}
		table {
			width: 100%;
			border-collapse: collapse;
			page-break-inside: avoid;
		}
		td, th {
			padding: 6pt 8pt;
		}
		pre, code {
			page-break-inside: avoid;
		}
	`

	// Add title
	doc.Add(layout.NewHeading(title, layout.H1))

	// Add content
	if err := doc.AddHTML("<style>"+css+"</style><body>"+html+"</body>", nil); err != nil {
		return fmt.Errorf("add HTML to document: %w", err)
	}

	// Save PDF
	targetPath := filepath.Join(outputDir, filepath.FromSlash(pdfPath))
	if err := os.MkdirAll(filepath.Dir(targetPath), 0o755); err != nil {
		return fmt.Errorf("create directory for PDF: %w", err)
	}

	return doc.Save(targetPath)
}
