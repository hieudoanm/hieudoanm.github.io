package cmd

import (
	"context"
	"fmt"
	"io"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"time"

	"github.com/mark3labs/mcp-go/mcp"
	"github.com/mark3labs/mcp-go/server"
	"github.com/spf13/cobra"
)

// newMCPCommand builds the mcp subcommand.
func newMCPCommand(stdout io.Writer) *cobra.Command {
	command := &cobra.Command{
		Use:   "mcp",
		Short: "Run MCP server for pagify",
		Long: `Run an MCP (Model Context Protocol) server that provides tools and resources
for working with pagify sites.

The server exposes tools for building, serving, initializing, and validating
pagify sites, plus resources for Markdown features, frontmatter, and configuration.`,
		RunE: func(command *cobra.Command, args []string) error {
			return runMCP(stdout, command.ErrOrStderr())
		},
	}
	return command
}

// runMCP runs the MCP server over stdio.
func runMCP(stdout, stderr io.Writer) error {
	s := server.NewMCPServer(
		"pagify",
		version,
		server.WithToolCapabilities(true),
		server.WithResourceCapabilities(true, true),
	)

	// Register tools
	s.AddTool(mcp.NewTool("pagify_build",
		mcp.WithDescription("Build a pagify site from Markdown files"),
		mcp.WithString("content_dir",
			mcp.Required(),
			mcp.Description("Path to the content directory containing Markdown files"),
		),
		mcp.WithString("output_dir",
			mcp.Description("Output directory for the built site (default: ./dist)"),
		),
		mcp.WithString("base_path",
			mcp.Description("Base path for the site (e.g., /my-repo for GitHub Pages)"),
		),
	), handleMCPBuild)

	s.AddTool(mcp.NewTool("pagify_serve",
		mcp.WithDescription("Get command to serve a pagify site locally with live rebuild"),
		mcp.WithString("content_dir",
			mcp.Required(),
			mcp.Description("Path to the content directory containing Markdown files"),
		),
		mcp.WithNumber("port",
			mcp.Description("Port to serve on (default: 8080)"),
		),
		mcp.WithString("host",
			mcp.Description("Host to bind to (default: 127.0.0.1)"),
		),
	), handleMCPServe)

	s.AddTool(mcp.NewTool("pagify_init",
		mcp.WithDescription("Initialize a new pagify project with starter content"),
		mcp.WithString("dir",
			mcp.Required(),
			mcp.Description("Directory to initialize the project in"),
		),
	), handleMCPInit)

	s.AddTool(mcp.NewTool("pagify_validate",
		mcp.WithDescription("Validate a pagify site (check links, frontmatter, structure)"),
		mcp.WithString("content_dir",
			mcp.Required(),
			mcp.Description("Path to the content directory"),
		),
	), handleMCPValidate)

	// Register resources
	s.AddResource(mcp.NewResource(
		"pagify://docs/markdown-features",
		"pagify Markdown Features",
		mcp.WithResourceDescription("Documentation of supported Markdown features"),
		mcp.WithMIMEType("text/markdown"),
	), handleMCPMarkdownFeaturesResource)

	s.AddResource(mcp.NewResource(
		"pagify://docs/frontmatter",
		"pagify Frontmatter Reference",
		mcp.WithResourceDescription("Reference for frontmatter fields"),
		mcp.WithMIMEType("text/markdown"),
	), handleMCPFrontmatterResource)

	s.AddResource(mcp.NewResource(
		"pagify://docs/config",
		"pagify Configuration",
		mcp.WithResourceDescription("Configuration options"),
		mcp.WithMIMEType("text/markdown"),
	), handleMCPConfigResource)

	// Run server over stdio
	return server.ServeStdio(s)
}

func handleMCPBuild(ctx context.Context, request mcp.CallToolRequest) (*mcp.CallToolResult, error) {
	args := request.Params.Arguments
	contentDir, _ := args["content_dir"].(string)
	if contentDir == "" {
		return mcp.NewToolResultError("content_dir is required"), nil
	}

	outputDir, _ := args["output_dir"].(string)
	if outputDir == "" {
		outputDir = "dist"
	}
	basePath, _ := args["base_path"].(string)

	cmdArgs := []string{"build", contentDir, "--output", outputDir}
	if basePath != "" {
		cmdArgs = append(cmdArgs, "--base-path", basePath)
	}

	cmd := exec.Command(os.Args[0], cmdArgs...)
	cmd.Dir = "/"
	output, err := cmd.CombinedOutput()

	if err != nil {
		return mcp.NewToolResultError(fmt.Sprintf("Build failed: %v\n%s", err, string(output))), nil
	}

	return mcp.NewToolResultText(fmt.Sprintf("Site built successfully to %s\n%s", outputDir, string(output))), nil
}

func handleMCPServe(ctx context.Context, request mcp.CallToolRequest) (*mcp.CallToolResult, error) {
	args := request.Params.Arguments
	contentDir, _ := args["content_dir"].(string)
	if contentDir == "" {
		return mcp.NewToolResultError("content_dir is required"), nil
	}

	port := 8080
	if p, ok := args["port"].(float64); ok {
		port = int(p)
	}
	host, _ := args["host"].(string)
	if host == "" {
		host = "127.0.0.1"
	}

	cmdArgs := []string{"serve", contentDir, "--port", fmt.Sprintf("%d", port), "--host", host}

	return mcp.NewToolResultText(fmt.Sprintf("To serve the site, run:\n%s %s\n\nThis will start a server at http://%s:%d", os.Args[0], strings.Join(cmdArgs, " "), host, port)), nil
}

func handleMCPInit(ctx context.Context, request mcp.CallToolRequest) (*mcp.CallToolResult, error) {
	args := request.Params.Arguments
	dir, _ := args["dir"].(string)
	if dir == "" {
		return mcp.NewToolResultError("dir is required"), nil
	}

	cmd := exec.Command(os.Args[0], "init", dir)
	cmd.Dir = "/"
	output, err := cmd.CombinedOutput()

	if err != nil {
		return mcp.NewToolResultError(fmt.Sprintf("Init failed: %v\n%s", err, string(output))), nil
	}

	return mcp.NewToolResultText(fmt.Sprintf("Project initialized in %s\n%s", dir, string(output))), nil
}

func handleMCPValidate(ctx context.Context, request mcp.CallToolRequest) (*mcp.CallToolResult, error) {
	args := request.Params.Arguments
	contentDir, _ := args["content_dir"].(string)
	if contentDir == "" {
		return mcp.NewToolResultError("content_dir is required"), nil
	}

	tmpDir := filepath.Join(os.TempDir(), fmt.Sprintf("pagify-validate-%d", time.Now().UnixNano()))
	cmd := exec.Command(os.Args[0], "build", contentDir, "--output", tmpDir)
	cmd.Dir = "/"
	output, err := cmd.CombinedOutput()

	if err != nil {
		return mcp.NewToolResultError(fmt.Sprintf("Validation failed: %v\n%s", err, string(output))), nil
	}

	os.RemoveAll(tmpDir)

	return mcp.NewToolResultText(fmt.Sprintf("Validation passed\n%s", string(output))), nil
}

func handleMCPMarkdownFeaturesResource(ctx context.Context, request mcp.ReadResourceRequest) ([]mcp.ResourceContents, error) {
	content := "# pagify Markdown Features\n\n" +
		"## Standard Features (GitHub Flavored Markdown)\n\n" +
		"- **Headings**: `# H1` through `###### H6`\n" +
		"- **Emphasis**: `*italic*`, `**bold**`, `~~strikethrough~~`\n" +
		"- **Lists**: Ordered, unordered, and task lists (`- [x] done`)\n" +
		"- **Links**: `[text](url)` and reference-style links\n" +
		"- **Images**: `![alt](path)` - copied to `assets/`\n" +
		"- **Code**: Inline `code` and fenced blocks with syntax highlighting\n" +
		"- **Tables**: Full GFM table syntax with alignment\n" +
		"- **Blockquotes**: `> quote` with nesting\n" +
		"- **Horizontal rules**: `---`, `***`, `___`\n" +
		"- **Autolinks**: `https://example.com` auto-linked\n" +
		"- **Footnotes**: `[^1]` with `[^1]: note` at bottom\n\n" +
		"## pagify Extensions\n\n" +
		"### Callouts (GitHub-style)\n\n" +
		"```markdown\n" +
		"> [!NOTE]\n" +
		"> Useful information.\n\n" +
		"> [!TIP]\n" +
		"> A helpful shortcut.\n\n" +
		"> [!WARNING]\n" +
		"> Something to watch out for.\n\n" +
		"> [!DANGER]\n" +
		"> Critical issue that can break things.\n" +
		"```\n\n" +
		"Aliases: `info`, `success`, `check`, `caution`, `attention`, `error`\n\n" +
		"### Frontmatter\n\n" +
		"```yaml\n" +
		"---\n" +
		"title: Page Title\n" +
		"description: SEO meta description\n" +
		"order: 1\n" +
		"label: Short nav label\n" +
		"draft: false\n" +
		"---\n" +
		"```\n\n" +
		"### Cross-page Links\n\n" +
		"Links to `.md` files are rewritten to clean URLs:\n\n" +
		"```markdown\n" +
		"[Guide](guide/installation.md)  \u2192  /guide/installation/\n" +
		"```\n\n" +
		"### Heading Anchors\n\n" +
		"All headings get automatic `id` attributes for linking.\n\n" +
		"## Unsupported\n\n" +
		"- Raw HTML (enabled but not recommended)\n" +
		"- Custom extensions beyond what's listed\n"
	return []mcp.ResourceContents{
		mcp.TextResourceContents{
			URI:      "pagify://docs/markdown-features",
			MIMEType: "text/markdown",
			Text:     content,
		},
	}, nil
}

func handleMCPFrontmatterResource(ctx context.Context, request mcp.ReadResourceRequest) ([]mcp.ResourceContents, error) {
	content := "# pagify Frontmatter Reference\n\n" +
		"## Page-Level Fields (any page)\n\n" +
		"| Field | Type | Description |\n" +
		"|-------|------|-------------|\n" +
		"| `title` | string | Page title (overrides first `# Heading`) |\n" +
		"| `description` | string | SEO meta description |\n" +
		"| `order` | integer | Sort order in navigation (lower first) |\n" +
		"| `label` | string | Custom navigation label |\n" +
		"| `draft` | boolean | Set `true` to exclude from build |\n\n" +
		"## Site-Level Fields (index.md only)\n\n" +
		"| Field | Type | Default | Description |\n" +
		"|-------|------|---------|-------------|\n" +
		"| `title` | string | Dir name | Site title in header/meta |\n" +
		"| `language` | string | `en` | HTML `lang` attribute |\n" +
		"| `basePath` | string | `/` | URL prefix for GitHub Pages project sites |\n" +
		"| `theme` | string | `light` | Initial color scheme: `light`, `dark`, `auto` |\n" +
		"| `footer` | string | \u2014 | Footer text (supports Markdown) |\n\n" +
		"## Example: Complete index.md\n\n" +
		"```yaml\n" +
		"---\n" +
		"title: My Documentation\n" +
		"language: en\n" +
		"basePath: /my-repo\n" +
		"theme: auto\n" +
		"footer: \"\u00a9 2024 My Project\"\n" +
		"---\n" +
		"```\n\n" +
		"## Notes\n\n" +
		"- All fields are optional\n" +
		"- `basePath` applies to all URLs (navigation, assets, search, links)\n" +
		"- `theme` only sets initial preference; user toggle persists in localStorage\n" +
		"- `footer` accepts Markdown (links, formatting)\n"
	return []mcp.ResourceContents{
		mcp.TextResourceContents{
			URI:      "pagify://docs/frontmatter",
			MIMEType: "text/markdown",
			Text:     content,
		},
	}, nil
}

func handleMCPConfigResource(ctx context.Context, request mcp.ReadResourceRequest) ([]mcp.ResourceContents, error) {
	content := "# pagify Configuration\n\n" +
		"## Zero Configuration\n\n" +
		"pagify works without any config file. The directory structure IS the configuration:\n\n" +
		"```text\n" +
		"docs/\n" +
		"├── index.md                 # \u2192 /\n" +
		"├── getting-started.md       # \u2192 /getting-started/\n" +
		"├── guide/\n" +
		"│   ├── index.md             # \u2192 /guide/\n" +
		"│   ├── installation.md      # \u2192 /guide/installation/\n" +
		"│   └── configuration.md     # \u2192 /guide/configuration/\n" +
		"└── reference/\n" +
		"    └── cli.md               # \u2192 /reference/cli/\n" +
		"```\n\n" +
		"## Site Config (index.md frontmatter)\n\n" +
		"Preferred over `pagify.yaml`. Add to your `index.md`:\n\n" +
		"```yaml\n" +
		"---\n" +
		"title: My Docs\n" +
		"language: en\n" +
		"basePath: /my-repo      # For GitHub Pages project sites\n" +
		"theme: auto             # light | dark | auto\n" +
		"footer: \"\u00a9 2024 Example\"\n" +
		"---\n" +
		"```\n\n" +
		"## Legacy: pagify.yaml (optional)\n\n" +
		"Create at content root for backward compatibility:\n\n" +
		"```yaml\n" +
		"title: My Documentation\n" +
		"language: en\n" +
		"basePath: /my-repo\n" +
		"theme: light\n" +
		"footer: \"\u00a9 2024 Example\"\n" +
		"```\n\n" +
		"## CLI Options\n\n" +
		"```bash\n" +
		"pagify build [content] [--output dir] [--base-path path]\n" +
		"pagify serve [content] [--port N] [--host H]\n" +
		"pagify init [dir]\n" +
		"```\n\n" +
		"| Flag | Build | Serve | Init | Description |\n" +
		"|------|-------|-------|------|-------------|\n" +
		"| `--output` | \u2713 | | | Output directory (default: `./dist`) |\n" +
		"| `--base-path` | \u2713 | \u2713 | | URL prefix for project pages |\n" +
		"| `--port` | | \u2713 | | Server port (default: 8080) |\n" +
		"| `--host` | | \u2713 | | Bind address (default: 127.0.0.1) |\n\n" +
		"## Environment Variables\n\n" +
		"| Variable | Description |\n" +
		"|----------|-------------|\n" +
		"| `PAGIFY_CONTENT_DIR` | Default content directory |\n" +
		"| `PAGIFY_OUTPUT_DIR` | Default output directory |\n\n" +
		"## Output Structure\n\n" +
		"```text\n" +
		"dist/\n" +
		"├── index.html\n" +
		"├── guide/\n" +
		"│   ├── index.html\n" +
		"│   └── installation/\n" +
		"│       └── index.html\n" +
		"└── assets/\n" +
		"    ├── styles.css\n" +
		"    ├── script.js\n" +
		"    ├── search.js\n" +
		"    ├── favicon.svg\n" +
		"    ├── favicon-light.svg\n" +
		"    ├── favicon-dark.svg\n" +
		"    └── search-index.json\n" +
		"```\n\n" +
		"Deploy `dist/` to any static host (GitHub Pages, Netlify, Vercel, Cloudflare Pages, etc.)\n"
	return []mcp.ResourceContents{
		mcp.TextResourceContents{
			URI:      "pagify://docs/config",
			MIMEType: "text/markdown",
			Text:     content,
		},
	}, nil
}
