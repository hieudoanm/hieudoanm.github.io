package dbml

import (
	"bufio"
	"fmt"
	"io"
	"os"
	"regexp"
	"strings"
)

type Column struct {
	Name      string
	Type      string
	Settings  []string
	Comment   string
	IsPrimary bool
	IsUnique  bool
	IsNotNull bool
	Default   string
	RefTable  string
	RefColumn string
}

type Table struct {
	Name    string
	Columns []Column
	Indexes []Index
	Comment string
}

type Index struct {
	Name    string
	Columns []string
	Unique  bool
	Type    string
}

type Reference struct {
	Name     string
	Table1   string
	Column1  string
	Table2   string
	Column2  string
	OnDelete string
	OnUpdate string
}

type Enum struct {
	Name   string
	Values []string
}

type Project struct {
	Name       string
	Tables     []Table
	Enums      []Enum
	References []Reference
	Comments   map[string]string
}

func ParseFile(path string) (*Project, error) {
	file, err := os.Open(path)
	if err != nil {
		return nil, fmt.Errorf("open file: %w", err)
	}
	defer file.Close()

	return Parse(file)
}

func Parse(r io.Reader) (*Project, error) {
	scanner := bufio.NewScanner(r)
	project := &Project{
		Tables:     []Table{},
		Enums:      []Enum{},
		References: []Reference{},
		Comments:   make(map[string]string),
	}

	var currentTable *Table
	var currentEnum *Enum
	inTable := false
	inEnum := false

	tableBlockRegex := regexp.MustCompile(`^Table\s+(\w+)\s*\{`)
	enumBlockRegex := regexp.MustCompile(`^Enum\s+(\w+)\s*\{`)
	refRegex := regexp.MustCompile(`^Ref:\s*(\w+)\s+(\w+)\.(\w+)\s*([<>]+)\s*(\w+)\.(\w+)`)
	projectRegex := regexp.MustCompile(`^Project\s+(\w+)\s*\{`)

	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())

		if line == "" || strings.HasPrefix(line, "//") {
			continue
		}

		if strings.HasPrefix(line, "Project") {
			matches := projectRegex.FindStringSubmatch(line)
			if len(matches) > 1 {
				project.Name = matches[1]
			}
			continue
		}

		if matches := tableBlockRegex.FindStringSubmatch(line); matches != nil {
			if inTable {
				project.Tables = append(project.Tables, *currentTable)
			}
			currentTable = &Table{
				Name:    matches[1],
				Columns: []Column{},
				Indexes: []Index{},
			}
			inTable = true
			inEnum = false
			continue
		}

		if matches := enumBlockRegex.FindStringSubmatch(line); matches != nil {
			if inEnum {
				project.Enums = append(project.Enums, *currentEnum)
			}
			currentEnum = &Enum{
				Name:   matches[1],
				Values: []string{},
			}
			inEnum = true
			inTable = false
			continue
		}

		if line == "}" {
			if inTable && currentTable != nil {
				project.Tables = append(project.Tables, *currentTable)
				inTable = false
				currentTable = nil
			} else if inEnum && currentEnum != nil {
				project.Enums = append(project.Enums, *currentEnum)
				inEnum = false
				currentEnum = nil
			}
			continue
		}

		if inTable && currentTable != nil {
			parseTableLine(line, currentTable)
			continue
		}

		if inEnum && currentEnum != nil {
			parseEnumLine(line, currentEnum)
			continue
		}

		if matches := refRegex.FindStringSubmatch(line); matches != nil {
			direction := matches[4]
			var table1, col1, table2, col2 string
			if strings.Contains(direction, "<") {
				table1 = matches[2]
				col1 = matches[3]
				table2 = matches[5]
				col2 = matches[6]
			} else {
				table1 = matches[5]
				col1 = matches[6]
				table2 = matches[2]
				col2 = matches[3]
			}
			ref := Reference{
				Name:    matches[1],
				Table1:  table1,
				Column1: col1,
				Table2:  table2,
				Column2: col2,
			}
			project.References = append(project.References, ref)
			continue
		}

		if strings.HasPrefix(line, "Note:") {
			parts := strings.SplitN(line, ":", 2)
			if len(parts) == 2 {
				key := strings.TrimSpace(parts[0])
				key = strings.TrimPrefix(key, "Note")
				key = strings.TrimSpace(key)
				value := strings.Trim(strings.TrimSpace(parts[1]), "'\"")
				project.Comments[key] = value
			}
			continue
		}
	}

	if err := scanner.Err(); err != nil {
		return nil, fmt.Errorf("scan error: %w", err)
	}

	return project, nil
}

func parseTableLine(line string, table *Table) {
	line = strings.TrimSpace(line)
	if line == "" || strings.HasPrefix(line, "//") {
		return
	}

	if strings.HasPrefix(line, "Note:") {
		parts := strings.SplitN(line, ":", 2)
		if len(parts) == 2 {
			table.Comment = strings.Trim(strings.TrimSpace(parts[1]), "'\"")
		}
		return
	}

	if strings.HasPrefix(line, "indexes") {
		return
	}

	if strings.HasPrefix(line, "Index") {
		parseIndexLine(line, table)
		return
	}

	col := parseColumnLine(line)
	if col.Name != "" {
		table.Columns = append(table.Columns, col)
	}
}

func parseColumnLine(line string) Column {
	line = strings.TrimSpace(line)

	bracketStart := strings.Index(line, "[")
	bracketEnd := strings.LastIndex(line, "]")

	var settingsStr string
	if bracketStart != -1 && bracketEnd != -1 && bracketEnd > bracketStart {
		settingsStr = line[bracketStart+1 : bracketEnd]
		line = line[:bracketStart] + line[bracketEnd+1:]
	}

	parts := strings.Fields(line)
	if len(parts) < 2 {
		return Column{}
	}

	col := Column{
		Name: parts[0],
		Type: parts[1],
	}

	if settingsStr != "" {
		settings := strings.Split(settingsStr, ",")
		for _, setting := range settings {
			setting = strings.TrimSpace(setting)
			lower := strings.ToLower(setting)

			switch {
			case lower == "pk" || lower == "primary":
				col.IsPrimary = true
			case lower == "unique":
				col.IsUnique = true
			case lower == "not_null" || lower == "notnull":
				col.IsNotNull = true
			case lower == "null":
				col.IsNotNull = false
			case strings.HasPrefix(lower, "default:"):
				col.Default = strings.TrimSpace(strings.TrimPrefix(setting, "default:"))
				col.Default = strings.Trim(col.Default, "'\"`")
			case strings.HasPrefix(lower, "ref:"):
				refParts := strings.Split(strings.TrimPrefix(setting, "ref:"), ".")
				if len(refParts) == 2 {
					col.RefTable = strings.TrimSpace(refParts[0])
					col.RefColumn = strings.TrimSpace(refParts[1])
					col.RefTable = strings.Trim(col.RefTable, ">< ")
					col.RefColumn = strings.Trim(col.RefColumn, ">< ")
				}
			case strings.HasPrefix(lower, "note:"):
				col.Comment = strings.Trim(strings.TrimPrefix(setting, "note:"), "'\"")
			case lower == "increment":
				col.Settings = append(col.Settings, "increment")
			default:
				if setting != "" {
					col.Settings = append(col.Settings, setting)
				}
			}
		}
	}

	return col
}

func parseIndexLine(line string, table *Table) {
	line = strings.TrimSpace(line)
	line = strings.TrimPrefix(line, "Index")
	line = strings.TrimSpace(line)

	unique := false
	if strings.HasPrefix(line, "unique") {
		unique = true
		line = strings.TrimSpace(strings.TrimPrefix(line, "unique"))
	}

	indexType := ""
	if strings.HasPrefix(line, "hash") || strings.HasPrefix(line, "btree") {
		parts := strings.Fields(line)
		if len(parts) > 0 {
			indexType = parts[0]
			line = strings.TrimSpace(strings.TrimPrefix(line, indexType))
		}
	}

	name := ""
	columnsStr := line
	if idx := strings.Index(line, "("); idx != -1 {
		name = strings.TrimSpace(line[:idx])
		columnsStr = line[idx:]
	} else {
		columnsStr = ""
	}

	columnsStr = strings.Trim(columnsStr, "()")
	colNames := []string{}
	for _, c := range strings.Split(columnsStr, ",") {
		c = strings.TrimSpace(c)
		if c != "" {
			colNames = append(colNames, c)
		}
	}

	if len(colNames) > 0 {
		table.Indexes = append(table.Indexes, Index{
			Name:    name,
			Columns: colNames,
			Unique:  unique,
			Type:    indexType,
		})
	}
}

func parseEnumLine(line string, enum *Enum) {
	line = strings.TrimSpace(line)
	if line == "" || strings.HasPrefix(line, "//") {
		return
	}

	if strings.HasPrefix(line, "Note:") {
		return
	}

	value := strings.Trim(line, "'\"")
	if value != "" {
		enum.Values = append(enum.Values, value)
	}
}

func (p *Project) GetTable(name string) *Table {
	for i := range p.Tables {
		if p.Tables[i].Name == name {
			return &p.Tables[i]
		}
	}
	return nil
}

func (p *Project) GetColumn(tableName, columnName string) *Column {
	table := p.GetTable(tableName)
	if table == nil {
		return nil
	}
	for i := range table.Columns {
		if table.Columns[i].Name == columnName {
			return &table.Columns[i]
		}
	}
	return nil
}

func (c *Column) SQLType() string {
	typeMap := map[string]string{
		"int":         "INTEGER",
		"integer":     "INTEGER",
		"bigint":      "BIGINT",
		"smallint":    "SMALLINT",
		"tinyint":     "SMALLINT",
		"serial":      "SERIAL",
		"bigserial":   "BIGSERIAL",
		"varchar":     "VARCHAR(255)",
		"text":        "TEXT",
		"char":        "CHAR(1)",
		"boolean":     "BOOLEAN",
		"bool":        "BOOLEAN",
		"float":       "REAL",
		"double":      "DOUBLE PRECISION",
		"decimal":     "DECIMAL",
		"numeric":     "NUMERIC",
		"date":        "DATE",
		"time":        "TIME",
		"timestamp":   "TIMESTAMP",
		"timestamptz": "TIMESTAMPTZ",
		"uuid":        "UUID",
		"json":        "JSON",
		"jsonb":       "JSONB",
		"blob":        "BLOB",
		"bytea":       "BYTEA",
	}

	if sqlType, ok := typeMap[strings.ToLower(c.Type)]; ok {
		return sqlType
	}

	if strings.Contains(strings.ToLower(c.Type), "(") {
		return strings.ToUpper(c.Type)
	}

	return strings.ToUpper(c.Type)
}

func (c *Column) SQLConstraints() string {
	var constraints []string

	if c.IsPrimary {
		constraints = append(constraints, "PRIMARY KEY")
	}
	if c.IsUnique && !c.IsPrimary {
		constraints = append(constraints, "UNIQUE")
	}
	if c.IsNotNull {
		constraints = append(constraints, "NOT NULL")
	}
	if c.Default != "" {
		defaultVal := c.Default
		if strings.Contains(strings.ToLower(c.Type), "char") ||
			strings.Contains(strings.ToLower(c.Type), "text") ||
			strings.Contains(strings.ToLower(c.Type), "enum") {
			if !strings.HasPrefix(defaultVal, "'") && !strings.HasPrefix(defaultVal, "`") {
				defaultVal = "'" + defaultVal + "'"
			}
		}
		constraints = append(constraints, "DEFAULT "+defaultVal)
	}

	return strings.Join(constraints, " ")
}

func (p *Project) ToSQL() string {
	var sb strings.Builder

	sb.WriteString("-- Generated by dbml CLI\n\n")

	for _, table := range p.Tables {
		sb.WriteString(fmt.Sprintf("CREATE TABLE %s (\n", table.Name))

		colDefs := []string{}
		for _, col := range table.Columns {
			colDef := fmt.Sprintf("    %s %s", col.Name, col.SQLType())
			if constraints := col.SQLConstraints(); constraints != "" {
				colDef += " " + constraints
			}
			colDefs = append(colDefs, colDef)
		}

		for _, idx := range table.Indexes {
			if idx.Unique {
				colNames := strings.Join(idx.Columns, ", ")
				colDefs = append(colDefs, fmt.Sprintf("    UNIQUE (%s)", colNames))
			}
		}

		sb.WriteString(strings.Join(colDefs, ",\n"))
		sb.WriteString("\n);\n\n")
	}

	for _, ref := range p.References {
		sb.WriteString(fmt.Sprintf(
			"ALTER TABLE %s ADD CONSTRAINT %s FOREIGN KEY (%s) REFERENCES %s(%s);\n",
			ref.Table2, ref.Name, ref.Column2, ref.Table1, ref.Column1,
		))
	}

	return sb.String()
}

func (p *Project) ToMermaid() string {
	var sb strings.Builder

	sb.WriteString("erDiagram\n\n")

	for _, table := range p.Tables {
		sb.WriteString(fmt.Sprintf("    %s {\n", table.Name))
		for _, col := range table.Columns {
			key := ""
			if col.IsPrimary {
				key = "PK "
			} else if col.IsUnique {
				key = "UK "
			}
			notNull := ""
			if col.IsNotNull {
				notNull = "NOT NULL "
			}
			sb.WriteString(fmt.Sprintf("        %s%s%s %s\n", key, notNull, col.SQLType(), col.Name))
		}
		sb.WriteString("    }\n\n")
	}

	for _, ref := range p.References {
		sb.WriteString(fmt.Sprintf("    %s ||--o{ %s : \"%s\"\n",
			ref.Table1, ref.Table2, ref.Name))
	}

	return sb.String()
}

func escapeXML(s string) string {
	s = strings.ReplaceAll(s, "&", "&amp;")
	s = strings.ReplaceAll(s, "<", "&lt;")
	s = strings.ReplaceAll(s, ">", "&gt;")
	s = strings.ReplaceAll(s, "'", "&apos;")
	s = strings.ReplaceAll(s, "\"", "&quot;")
	return s
}
