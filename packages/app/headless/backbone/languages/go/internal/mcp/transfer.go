package mcp

import (
	"database/sql"
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/backbone/internal/store"
)

func healthTool() Tool {
	return Tool{
		Name:        "backbone_health",
		Description: "Check if the backbone MCP server is operational",
		InputSchema: Schema{Type: "object"},
	}
}

func exportTool() Tool {
	return Tool{
		Name:        "backbone_export",
		Description: "Export every collection, record, bucket and file as JSON",
		InputSchema: Schema{
			Type: "object",
			Properties: map[string]PropertySchema{
				"format": {Type: "string", Description: "Export format", Enum: []string{"json"}},
			},
			Required: []string{"format"},
		},
	}
}

func importTool() Tool {
	return Tool{
		Name:        "backbone_import",
		Description: "Import a previously exported JSON payload",
		InputSchema: Schema{
			Type: "object",
			Properties: map[string]PropertySchema{
				"format": {Type: "string", Description: "Import format", Enum: []string{"json"}},
				"data":   {Type: "string", Description: "The export payload as JSON text"},
			},
			Required: []string{"format", "data"},
		},
	}
}

type exportArgs struct {
	Format string `json:"format"`
}

type importArgs struct {
	Format string `json:"format"`
	Data   string `json:"data"`
}

// transferPayload is the shape the HTTP /export route returns, so a payload
// moves between the REST API and MCP unchanged.
type transferPayload struct {
	Collections []store.Collection        `json:"collections"`
	Records     map[string][]store.Record `json:"records"`
	Buckets     []store.Bucket            `json:"buckets"`
	Files       []store.FileRecord        `json:"files"`
}

// handleHealth reports the server is running and can reach its database.
func handleHealth(deps ServerDeps) ToolHandler {
	return func(json.RawMessage) *ToolResult {
		db, err := deps.db()
		if err != nil {
			return errorResult(err)
		}
		var one int
		if err := db.QueryRow("SELECT 1").Scan(&one); err != nil {
			return errorResult(fmt.Errorf("the database is not reachable: %w", err))
		}
		return textResult("backbone-mcp is operational and the database is reachable")
	}
}

// handleExport returns every collection, record, bucket and file.
func handleExport(deps ServerDeps) ToolHandler {
	return func(args json.RawMessage) *ToolResult {
		parsed, err := parseArgs[exportArgs](args)
		if err != nil {
			return errorResult(err)
		}
		if parsed.Format != "json" {
			// Reported rather than silently substituted, so a caller asking for
			// another format learns why it did not get one.
			return errorResult(fmt.Errorf(
				"backbone_export supports only the json format in this build, not %q", parsed.Format))
		}
		db, err := deps.db()
		if err != nil {
			return errorResult(err)
		}
		payload, err := collectPayload(db)
		if err != nil {
			return errorResult(fmt.Errorf("export: %w", err))
		}
		return jsonResult(payload)
	}
}

// handleImport applies an export payload, the inverse of backbone_export.
// Existing collections and records are left alone and counted, so re-importing
// the same payload is safe.
func handleImport(deps ServerDeps) ToolHandler {
	return func(args json.RawMessage) *ToolResult {
		parsed, err := parseArgs[importArgs](args)
		if err != nil {
			return errorResult(err)
		}
		if parsed.Format != "json" {
			return errorResult(fmt.Errorf(
				"backbone_import supports only the json format in this build, not %q", parsed.Format))
		}

		var payload transferPayload
		if err := json.Unmarshal([]byte(parsed.Data), &payload); err != nil {
			return errorResult(fmt.Errorf("parse data: %w", err))
		}
		db, err := deps.db()
		if err != nil {
			return errorResult(err)
		}
		summary, err := applyPayload(db, payload)
		if err != nil {
			return errorResult(fmt.Errorf("import: %w", err))
		}
		return jsonResult(summary)
	}
}

// collectPayload reads the whole database into the export shape.
func collectPayload(db *sql.DB) (transferPayload, error) {
	collections, err := store.ListCollections(db)
	if err != nil {
		return transferPayload{}, err
	}

	records := make(map[string][]store.Record, len(collections))
	for _, collection := range collections {
		page, err := store.ListRecords(db, collection.Name, 1, 1000000, nil, "", nil, "")
		if err != nil {
			return transferPayload{}, err
		}
		records[collection.Name] = page.Records
	}

	buckets, err := store.ListBuckets(db)
	if err != nil {
		return transferPayload{}, err
	}
	files := []store.FileRecord{}
	for _, bucket := range buckets {
		page, err := store.ListFiles(db, bucket.Name, 1, 1000000)
		if err != nil {
			return transferPayload{}, err
		}
		files = append(files, page.Files...)
	}

	return transferPayload{
		Collections: collections,
		Records:     records,
		Buckets:     buckets,
		Files:       files,
	}, nil
}

// applyPayload creates what the payload names and reports how much of each kind
// it added.
func applyPayload(db *sql.DB, payload transferPayload) (map[string]int, error) {
	summary := map[string]int{
		"created_collections": 0,
		"created_records":     0,
		"created_buckets":     0,
		"created_files":       0,
	}

	for _, collection := range payload.Collections {
		existing, err := store.GetCollection(db, collection.Name)
		if err != nil {
			return nil, err
		}
		if existing != nil {
			continue
		}
		if err := store.CreateCollection(db, collection.Name, collection.Schema); err != nil {
			return nil, err
		}
		summary["created_collections"]++
	}

	for name, records := range payload.Records {
		for _, record := range records {
			existing, err := store.GetRecord(db, name, record.ID)
			if err != nil {
				return nil, err
			}
			if existing != nil {
				continue
			}
			if _, err := store.CreateRecord(db, name, record.ID, record.Data); err != nil {
				return nil, err
			}
			summary["created_records"]++
		}
	}

	for _, bucket := range payload.Buckets {
		existing, err := store.GetBucket(db, bucket.Name)
		if err != nil {
			return nil, err
		}
		if existing != nil {
			continue
		}
		if _, err := store.CreateBucket(db, bucket.Name, bucket.IsPublic); err != nil {
			return nil, err
		}
		summary["created_buckets"]++
	}

	for _, file := range payload.Files {
		existing, err := store.GetFile(db, file.ID)
		if err != nil {
			return nil, err
		}
		if existing != nil {
			continue
		}
		if _, err := store.InsertFile(db, file.Bucket, file.ID, file.Filename, file.MimeType, file.Size); err != nil {
			return nil, err
		}
		summary["created_files"]++
	}

	return summary, nil
}
