// packages/cli/cmd/root.go
package cmd

import (
	"fmt"
	"go/ast"
	"go/parser"
	"go/token"
	"io"
	"os"
	"path/filepath"
	"strings"

	"github.com/spf13/cobra"
)

// ── AST Parsing ──────────────────────────────────────────────────────────────

type flagDoc struct {
	Name    string
	Short   string
	Type    string
	Default string
	Usage   string
}

type commandDoc struct {
	FullName    string
	Short       string
	Long        string
	Usage       string
	Example     string
	Flags       []flagDoc
	SubCommands []commandDoc
}

func getStringField(lit *ast.CompositeLit, field string) string {
	for _, elt := range lit.Elts {
		kv, ok := elt.(*ast.KeyValueExpr)
		if !ok {
			continue
		}
		key, ok := kv.Key.(*ast.Ident)
		if !ok || key.Name != field {
			continue
		}
		switch v := kv.Value.(type) {
		case *ast.BasicLit:
			return strings.Trim(v.Value, "`\"")
		case *ast.CallExpr:
			if len(v.Args) > 0 {
				if bl, ok := v.Args[0].(*ast.BasicLit); ok {
					return strings.Trim(bl.Value, "`\"")
				}
			}
		}
	}
	return ""
}

func parseCommands(dir string) ([]commandDoc, error) {
	fset := token.NewFileSet()
	pkgs, err := parser.ParseDir(fset, dir, nil, parser.ParseComments)
	if err != nil {
		return nil, fmt.Errorf("failed to parse %s: %w", dir, err)
	}

	// varName → commandDoc
	cmdMap := map[string]*commandDoc{}
	// parentVar → []childVar
	childMap := map[string][]string{}

	skipNames := map[string]bool{
		"completion": true,
		"help":       true,
		"docs":       true,
	}

	for _, pkg := range pkgs {
		for _, file := range pkg.Files {
			ast.Inspect(file, func(n ast.Node) bool {
				switch node := n.(type) {

				// ── var xxxCmd = &cobra.Command{...} ──
				case *ast.GenDecl:
					for _, spec := range node.Specs {
						vs, ok := spec.(*ast.ValueSpec)
						if !ok {
							continue
						}
						for i, val := range vs.Values {
							unary, ok := val.(*ast.UnaryExpr)
							if !ok {
								continue
							}
							lit, ok := unary.X.(*ast.CompositeLit)
							if !ok {
								continue
							}
							sel, ok := lit.Type.(*ast.SelectorExpr)
							if !ok || sel.Sel.Name != "Command" {
								continue
							}
							use := getStringField(lit, "Use")
							if use == "" {
								continue
							}
							name := strings.Fields(use)[0]
							if skipNames[name] {
								continue
							}
							varName := vs.Names[i].Name
							cmdMap[varName] = &commandDoc{
								FullName: use,
								Short:    getStringField(lit, "Short"),
								Long:     getStringField(lit, "Long"),
								Example:  getStringField(lit, "Example"),
								Usage:    use,
							}
						}
					}

				// ── xxxCmd.AddCommand(yyyCmd, zzzCmd) ──
				case *ast.ExprStmt:
					call, ok := node.X.(*ast.CallExpr)
					if !ok {
						break
					}
					sel, ok := call.Fun.(*ast.SelectorExpr)
					if !ok || sel.Sel.Name != "AddCommand" {
						break
					}
					parentIdent, ok := sel.X.(*ast.Ident)
					if !ok {
						break
					}
					for _, arg := range call.Args {
						childIdent, ok := arg.(*ast.Ident)
						if !ok {
							continue
						}
						childMap[parentIdent.Name] = append(
							childMap[parentIdent.Name],
							childIdent.Name,
						)
					}
				}
				return true
			})
		}
	}

	// ── Wire children into parents ────────────────────────────────────────
	var wire func(varName string) commandDoc
	wire = func(varName string) commandDoc {
		doc := cmdMap[varName]
		if doc == nil {
			return commandDoc{}
		}
		for _, childVar := range childMap[varName] {
			if _, exists := cmdMap[childVar]; exists {
				child := wire(childVar)
				doc.SubCommands = append(doc.SubCommands, child)
			}
		}
		return *doc
	}

	// ── Find root command (not a child of anything) ───────────────────────
	childSet := map[string]bool{}
	for _, children := range childMap {
		for _, c := range children {
			childSet[c] = true
		}
	}

	var roots []commandDoc
	for varName := range cmdMap {
		if !childSet[varName] {
			roots = append(roots, wire(varName))
		}
	}

	return roots, nil
}

// ── Rendering ────────────────────────────────────────────────────────────────

func renderFlags(flags []flagDoc, w io.Writer) {
	fmt.Fprintf(w, "| Flag | Shorthand | Type | Default | Description |\n")
	fmt.Fprintf(w, "|------|-----------|------|---------|-------------|\n")
	for _, f := range flags {
		shorthand := ""
		if f.Short != "" {
			shorthand = "-" + f.Short
		}
		fmt.Fprintf(w, "| --%s | %s | %s | %s | %s |\n",
			f.Name, shorthand, f.Type, f.Default, f.Usage)
	}
	fmt.Fprintf(w, "\n")
}

func renderCommand(doc commandDoc, level int, parentName string, w io.Writer) {
	// Build full usage from parent chain + current Use field
	baseName := strings.Fields(doc.FullName)[0]
	fullUsage := parentName + " " + baseName
	useParts := strings.Fields(doc.FullName)
	if len(useParts) > 1 {
		fullUsage += " " + strings.Join(useParts[1:], " ")
	}
	fullUsage = strings.TrimSpace(fullUsage)

	heading := strings.Repeat("#", level)
	fmt.Fprintf(w, "%s `%s`\n\n", heading, baseName)
	if doc.Short != "" {
		fmt.Fprintf(w, "%s\n\n", doc.Short)
	}
	if doc.Long != "" && doc.Long != doc.Short {
		fmt.Fprintf(w, "%s\n\n", strings.TrimSpace(doc.Long))
	}
	fmt.Fprintf(w, "### 📋 Usage\n\n```bash\n%s\n```\n\n", fullUsage)
	if doc.Example != "" {
		fmt.Fprintf(w, "### 💡 Example\n\n```bash\n%s\n```\n\n", strings.TrimSpace(doc.Example))
	}
	if len(doc.Flags) > 0 {
		fmt.Fprintf(w, "### 🚩 Flags\n\n")
		renderFlags(doc.Flags, w)
	}
	fmt.Fprintf(w, "---\n\n")
	for _, sub := range doc.SubCommands {
		renderCommand(sub, level+1, fullUsage, w)
	}
}

func generateDocs(projectPath string, w io.Writer) error {
	// Find cmd/ or src/cmd/
	cmdDir := ""
	for _, candidate := range []string{"cmd", "src/cmd"} {
		path := filepath.Join(projectPath, candidate)
		if _, err := os.Stat(path); err == nil {
			cmdDir = path
			break
		}
	}
	if cmdDir == "" {
		return fmt.Errorf("cmd/ or src/cmd/ directory not found in %s", projectPath)
	}

	roots, err := parseCommands(cmdDir)
	if err != nil {
		return err
	}

	// Derive project name from folder
	name := filepath.Base(projectPath)
	if name == "." {
		abs, err := filepath.Abs(projectPath)
		if err == nil {
			name = filepath.Base(abs)
		}
	}

	// Use root command if found, otherwise fall back to project name
	var root commandDoc
	if len(roots) > 0 {
		root = roots[0]
	} else {
		root = commandDoc{FullName: name}
	}

	rootName := strings.Fields(root.FullName)[0]

	fmt.Fprintf(w, "# 📦 %s\n\n", rootName)
	if root.Short != "" {
		fmt.Fprintf(w, "%s\n\n", root.Short)
	}
	if root.Long != "" && root.Long != root.Short {
		fmt.Fprintf(w, "%s\n\n", strings.TrimSpace(root.Long))
	}
	fmt.Fprintf(w, "---\n\n")

	if len(root.SubCommands) > 0 {
		fmt.Fprintf(w, "## 📚 Commands\n\n")
		for _, sub := range root.SubCommands {
			fmt.Fprintf(w, "- `%s`\n", strings.Fields(sub.FullName)[0])
		}
		fmt.Fprintf(w, "\n")
	}

	if len(root.Flags) > 0 {
		fmt.Fprintf(w, "## 🚩 Global Flags\n\n")
		renderFlags(root.Flags, w)
		fmt.Fprintf(w, "---\n\n")
	}

	for _, sub := range root.SubCommands {
		renderCommand(sub, 2, rootName, w)
	}

	return nil
}

// ── Root Command ─────────────────────────────────────────────────────────────

var rootCmd = &cobra.Command{
	Use:   "cobra-md [path/to/cobra/project]",
	Short: "Generate README.md documentation from a Cobra CLI project",
	Long:  `cobra-md reads the cmd/ folder of a Cobra project and generates a single README.md documenting all commands, flags, and examples.`,
	Args:  cobra.ExactArgs(1),
	RunE: func(cmd *cobra.Command, args []string) error {
		projectPath := args[0]
		output, _ := cmd.Flags().GetString("output")

		out, err := os.Create(output)
		if err != nil {
			return err
		}
		defer out.Close()

		if err := generateDocs(projectPath, out); err != nil {
			return err
		}

		cmd.Printf("📄 Docs written to %s\n", output)
		return nil
	},
}

func Execute() {
	err := rootCmd.Execute()
	if err != nil {
		os.Exit(1)
	}
}

func init() {
	rootCmd.CompletionOptions.DisableDefaultCmd = true
	rootCmd.Flags().StringP("output", "o", "README.md", "Output file path")
}
