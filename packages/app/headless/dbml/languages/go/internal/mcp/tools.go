package mcp

import (
	"encoding/json"
	"fmt"
	"strings"

	"dbml/internal/dbml"
)

func listTools() []map[string]any {
	return []map[string]any{
		{
			"name":        "dbml_sql",
			"description": "Convert DBML source to a PostgreSQL SQL schema",
			"inputSchema": dbmlInputSchema(),
		},
		{
			"name":        "dbml_mermaid",
			"description": "Convert DBML source to a Mermaid ER diagram",
			"inputSchema": dbmlInputSchema(),
		},
		{
			"name":        "dbml_svg",
			"description": "Render DBML source as an SVG ER diagram",
			"inputSchema": dbmlInputSchema(),
		},
		{
			"name":        "dbml_parse",
			"description": "Parse DBML source and return a JSON summary of the schema",
			"inputSchema": dbmlInputSchema(),
		},
	}
}

func dbmlInputSchema() map[string]any {
	return map[string]any{
		"type": "object",
		"properties": map[string]any{
			"dbml": map[string]any{
				"type":        "string",
				"description": "DBML source content",
			},
		},
		"required": []string{"dbml"},
	}
}

func runTool(name string, args map[string]interface{}) (string, error) {
	source, _ := args["dbml"].(string)
	if strings.TrimSpace(source) == "" {
		return "", fmt.Errorf("dbml argument is required")
	}

	project, err := dbml.Parse(strings.NewReader(source))
	if err != nil {
		return "", fmt.Errorf("parse DBML: %w", err)
	}

	switch name {
	case "dbml_sql":
		return project.ToSQL(), nil
	case "dbml_mermaid":
		return project.ToMermaid(), nil
	case "dbml_svg":
		return project.ToSVG(), nil
	case "dbml_parse":
		return summarize(project)
	default:
		return "", fmt.Errorf("unknown tool: %s", name)
	}
}

type tableSummary struct {
	Name    string   `json:"name"`
	Columns []string `json:"columns"`
}

func summarize(project *dbml.Project) (string, error) {
	tables := make([]tableSummary, 0, len(project.Tables))
	for _, table := range project.Tables {
		columns := make([]string, 0, len(table.Columns))
		for _, column := range table.Columns {
			columns = append(columns, column.Name)
		}
		tables = append(tables, tableSummary{Name: table.Name, Columns: columns})
	}

	data, err := json.MarshalIndent(map[string]any{
		"name":       project.Name,
		"tables":     tables,
		"enums":      project.Enums,
		"references": project.References,
	}, "", "  ")
	if err != nil {
		return "", err
	}
	return string(data), nil
}
