package docsify

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

type commandDoc struct {
	FullName    string
	Short       string
	Long        string
	Example     string
	SubCommands []commandDoc
}

type cmdRef struct {
	doc      commandDoc
	varName  string
	funcName string
	children []string
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

func extractCmd(lit *ast.CompositeLit) commandDoc {
	return commandDoc{
		FullName: getStringField(lit, "Use"),
		Short:    getStringField(lit, "Short"),
		Long:     getStringField(lit, "Long"),
		Example:  getStringField(lit, "Example"),
	}
}

func funcHasCmdReturn(fn *ast.FuncDecl) bool {
	if fn.Type.Results == nil || len(fn.Type.Results.List) != 1 {
		return false
	}
	sel, ok := fn.Type.Results.List[0].Type.(*ast.StarExpr)
	if !ok {
		return false
	}
	px, ok := sel.X.(*ast.SelectorExpr)
	if !ok {
		return false
	}
	return px.Sel.Name == "Command"
}

func identName(e ast.Expr) string {
	switch v := e.(type) {
	case *ast.Ident:
		return v.Name
	case *ast.CallExpr:
		return identName(v.Fun)
	case *ast.SelectorExpr:
		return v.Sel.Name
	}
	return ""
}

func findCmds(dir string) (map[string]*cmdRef, error) {
	refs := map[string]*cmdRef{}
	skipNames := map[string]bool{"completion": true, "help": true, "docs": true}

	err := filepath.Walk(dir, func(path string, fi os.FileInfo, err error) error {
		if err != nil || fi.IsDir() || !strings.HasSuffix(path, ".go") {
			return nil
		}

		fset := token.NewFileSet()
		f, err := parser.ParseFile(fset, path, nil, parser.ParseComments)
		if err != nil {
			return nil
		}

		ast.Inspect(f, func(n ast.Node) bool {
			switch node := n.(type) {

			// var xxxCmd = &cobra.Command{...}
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
						name := strings.Fields(getStringField(lit, "Use"))[0]
						if name == "" || skipNames[name] {
							continue
						}
						vn := vs.Names[i].Name
						refs[vn] = &cmdRef{
							doc:     extractCmd(lit),
							varName: vn,
						}
					}
				}

			// func newXxxCmd() *cobra.Command { ... }
			case *ast.FuncDecl:
				if !funcHasCmdReturn(node) {
					break
				}
				// Try AssignStmt pattern first: x := &cobra.Command{...}
				found := false
				ast.Inspect(node.Body, func(n ast.Node) bool {
					stmt, ok := n.(*ast.AssignStmt)
					if !ok || len(stmt.Lhs) != 1 || len(stmt.Rhs) != 1 {
						return true
					}
					unary, ok := stmt.Rhs[0].(*ast.UnaryExpr)
					if !ok {
						return true
					}
					lit, ok := unary.X.(*ast.CompositeLit)
					if !ok {
						return true
					}
					sel, ok := lit.Type.(*ast.SelectorExpr)
					if !ok || sel.Sel.Name != "Command" {
						return true
					}
					name := strings.Fields(getStringField(lit, "Use"))[0]
					if name == "" || skipNames[name] {
						return true
					}
					fnName := node.Name.Name
					refs[fnName] = &cmdRef{
						doc:      extractCmd(lit),
						funcName: fnName,
					}
					found = true
					return false
				})
				if found {
					break
				}
				// Try ReturnStmt pattern: return &cobra.Command{...}
				ast.Inspect(node.Body, func(n ast.Node) bool {
					ret, ok := n.(*ast.ReturnStmt)
					if !ok || len(ret.Results) != 1 {
						return true
					}
					unary, ok := ret.Results[0].(*ast.UnaryExpr)
					if !ok {
						return true
					}
					lit, ok := unary.X.(*ast.CompositeLit)
					if !ok {
						return true
					}
					sel, ok := lit.Type.(*ast.SelectorExpr)
					if !ok || sel.Sel.Name != "Command" {
						return true
					}
					name := strings.Fields(getStringField(lit, "Use"))[0]
					if name == "" || skipNames[name] {
						return true
					}
					fnName := node.Name.Name
					refs[fnName] = &cmdRef{
						doc:      extractCmd(lit),
						funcName: fnName,
					}
					return false
				})
			}
			return true
		})
		return nil
	})

	if err != nil {
		return nil, fmt.Errorf("walk %s: %w", dir, err)
	}
	return refs, nil
}

func findAddCalls(dir string, refs map[string]*cmdRef) {
	filepath.Walk(dir, func(path string, fi os.FileInfo, err error) error {
		if err != nil || fi.IsDir() || !strings.HasSuffix(path, ".go") {
			return nil
		}

		fset := token.NewFileSet()
		f, err := parser.ParseFile(fset, path, nil, parser.ParseComments)
		if err != nil {
			return nil
		}

		ast.Inspect(f, func(n ast.Node) bool {
			stmt, ok := n.(*ast.ExprStmt)
			if !ok {
				return true
			}
			call, ok := stmt.X.(*ast.CallExpr)
			if !ok {
				return true
			}
			sel, ok := call.Fun.(*ast.SelectorExpr)
			if !ok || sel.Sel.Name != "AddCommand" {
				return true
			}

			parentName := identName(sel.X)
			parent, ok := refs[parentName]
			if !ok {
				return true
			}

			for _, arg := range call.Args {
				childName := identName(arg)
				if _, exists := refs[childName]; exists {
					parent.children = append(parent.children, childName)
				}
			}
			return true
		})
		return nil
	})
}

func buildTree(refs map[string]*cmdRef) []commandDoc {
	childSet := map[string]bool{}
	for _, ref := range refs {
		for _, c := range ref.children {
			childSet[c] = true
		}
	}

	var roots []commandDoc
	for name := range refs {
		if childSet[name] {
			continue
		}
		roots = append(roots, wireTree(name, refs, map[string]bool{}))
	}
	return roots
}

func wireTree(name string, refs map[string]*cmdRef, visited map[string]bool) commandDoc {
	if visited[name] {
		return commandDoc{}
	}
	visited[name] = true

	ref := refs[name]
	if ref == nil {
		return commandDoc{}
	}

	doc := ref.doc
	for _, c := range ref.children {
		child := wireTree(c, refs, visited)
		if child.FullName != "" {
			doc.SubCommands = append(doc.SubCommands, child)
		}
	}
	return doc
}

func renderFlags(w io.Writer) {
	fmt.Fprintf(w, "| Flag | Description |\n")
	fmt.Fprintf(w, "|------|-------------|\n")
	fmt.Fprintf(w, "\n")
}

func renderCommand(doc commandDoc, level int, parentName string, w io.Writer) {
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
	fmt.Fprintf(w, "```\n%s\n```\n\n", fullUsage)
	if doc.Example != "" {
		fmt.Fprintf(w, "Example:\n```\n%s\n```\n\n", strings.TrimSpace(doc.Example))
	}
	fmt.Fprintf(w, "---\n\n")
	for _, sub := range doc.SubCommands {
		renderCommand(sub, level+1, fullUsage, w)
	}
}

func generateDocs(projectPath string, w io.Writer) error {
	cmdDir := filepath.Join(projectPath, "cmd")
	if _, err := os.Stat(cmdDir); err != nil {
		return fmt.Errorf("cmd/ directory not found in %s", projectPath)
	}

	refs, err := findCmds(cmdDir)
	if err != nil {
		return err
	}

	findAddCalls(cmdDir, refs)

	roots := buildTree(refs)
	if len(roots) == 0 {
		return fmt.Errorf("no cobra commands found in %s", cmdDir)
	}

	root := roots[0]
	rootName := strings.Fields(root.FullName)[0]

	fmt.Fprintf(w, "# `%s`\n\n", rootName)
	if root.Short != "" {
		fmt.Fprintf(w, "%s\n\n", root.Short)
	}
	if root.Long != "" && root.Long != root.Short {
		fmt.Fprintf(w, "%s\n\n", strings.TrimSpace(root.Long))
	}
	fmt.Fprintf(w, "---\n\n")

	if len(root.SubCommands) > 0 {
		fmt.Fprintf(w, "## Commands\n\n")
		for _, sub := range root.SubCommands {
			name := strings.Fields(sub.FullName)[0]
			short := sub.Short
			fmt.Fprintf(w, "- [`%s`](#%s) — %s\n", name, name, short)
		}
		fmt.Fprintf(w, "\n")
	}

	for _, sub := range root.SubCommands {
		renderCommand(sub, 2, rootName, w)
	}

	return nil
}

func newCobraCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "cobra [path/to/cobra/project]",
		Short: "Generate README.md documentation from a Cobra CLI project",
		Long:  `docsify cobra reads the cmd/ folder of a Cobra project and generates a single README.md documenting all commands, flags, and examples.`,
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

	cmd.CompletionOptions.DisableDefaultCmd = true
	cmd.Flags().StringP("output", "o", "README.md", "Output file path")

	return cmd
}
