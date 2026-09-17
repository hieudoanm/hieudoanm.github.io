package mcp

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/backbone/internal/id"
	"github.com/hieudoanm/backbone/internal/store"
)

func recordsCreateTool() Tool {
	return Tool{
		Name:        "backbone_records_create",
		Description: "Create a record, generating an id when none is given",
		InputSchema: Schema{
			Type: "object",
			Properties: map[string]PropertySchema{
				"collection": {Type: "string", Description: "Collection name"},
				"id":         {Type: "string", Description: "Optional record id; generated when absent"},
				"data":       {Type: "object", Description: "Record body as a JSON object"},
			},
			Required: []string{"collection", "data"},
		},
	}
}

func recordsDeleteTool() Tool {
	return Tool{
		Name:        "backbone_records_delete",
		Description: "Delete one record by id",
		InputSchema: Schema{
			Type: "object",
			Properties: map[string]PropertySchema{
				"collection": {Type: "string", Description: "Collection name"},
				"id":         {Type: "string", Description: "Record id"},
			},
			Required: []string{"collection", "id"},
		},
	}
}

func recordsGetTool() Tool {
	return Tool{
		Name:        "backbone_records_get",
		Description: "Fetch one record by id",
		InputSchema: Schema{
			Type: "object",
			Properties: map[string]PropertySchema{
				"collection": {Type: "string", Description: "Collection name"},
				"id":         {Type: "string", Description: "Record id"},
			},
			Required: []string{"collection", "id"},
		},
	}
}

func recordsListTool() Tool {
	return Tool{
		Name:        "backbone_records_list",
		Description: "List records in a collection, with search and paging",
		InputSchema: Schema{
			Type: "object",
			Properties: map[string]PropertySchema{
				"collection": {Type: "string", Description: "Collection name"},
				"page":       {Type: "integer", Description: "1-based page number; default 1"},
				"per_page":   {Type: "integer", Description: "Records per page, 1-200; default 50"},
				"search":     {Type: "string", Description: "Free-text filter over record fields"},
			},
			Required: []string{"collection"},
		},
	}
}

func recordsUpdateTool() Tool {
	return Tool{
		Name:        "backbone_records_update",
		Description: "Replace the body of an existing record",
		InputSchema: Schema{
			Type: "object",
			Properties: map[string]PropertySchema{
				"collection": {Type: "string", Description: "Collection name"},
				"id":         {Type: "string", Description: "Record id"},
				"data":       {Type: "object", Description: "The new record body as a JSON object"},
			},
			Required: []string{"collection", "id", "data"},
		},
	}
}

type recordArgs struct {
	Collection string `json:"collection"`
	ID         string `json:"id"`
}

type createRecordArgs struct {
	Collection string          `json:"collection"`
	ID         string          `json:"id"`
	Data       json.RawMessage `json:"data"`
}

type updateRecordArgs struct {
	Collection string          `json:"collection"`
	ID         string          `json:"id"`
	Data       json.RawMessage `json:"data"`
}

type listRecordsArgs struct {
	Collection string `json:"collection"`
	Page       int    `json:"page"`
	PerPage    int    `json:"per_page"`
	Search     string `json:"search"`
}

// handleRecordsCreate inserts a record, generating an id when none is given.
func handleRecordsCreate(deps ServerDeps) ToolHandler {
	return func(args json.RawMessage) *ToolResult {
		parsed, err := parseArgs[createRecordArgs](args)
		if err != nil {
			return errorResult(err)
		}
		if err := requireObject(parsed.Data, "create record"); err != nil {
			return errorResult(err)
		}
		db, err := deps.db()
		if err != nil {
			return errorResult(err)
		}

		recordID := parsed.ID
		if recordID == "" {
			recordID = id.Generate()
		}
		record, err := store.CreateRecord(db, parsed.Collection, recordID, parsed.Data)
		if err != nil {
			return errorResult(fmt.Errorf("create record: %w", err))
		}
		return jsonResult(record)
	}
}

// handleRecordsGet returns one record by id.
func handleRecordsGet(deps ServerDeps) ToolHandler {
	return func(args json.RawMessage) *ToolResult {
		parsed, err := parseArgs[recordArgs](args)
		if err != nil {
			return errorResult(err)
		}
		db, err := deps.db()
		if err != nil {
			return errorResult(err)
		}

		record, err := store.GetRecord(db, parsed.Collection, parsed.ID)
		if err != nil {
			return errorResult(fmt.Errorf("get record: %w", err))
		}
		if record == nil {
			return errorResult(fmt.Errorf("record %q not found", parsed.ID))
		}
		return jsonResult(record)
	}
}

// handleRecordsUpdate replaces a record's body.
func handleRecordsUpdate(deps ServerDeps) ToolHandler {
	return func(args json.RawMessage) *ToolResult {
		parsed, err := parseArgs[updateRecordArgs](args)
		if err != nil {
			return errorResult(err)
		}
		if err := requireObject(parsed.Data, "update record"); err != nil {
			return errorResult(err)
		}
		db, err := deps.db()
		if err != nil {
			return errorResult(err)
		}

		record, err := store.UpdateRecord(db, parsed.Collection, parsed.ID, parsed.Data)
		if err != nil {
			return errorResult(fmt.Errorf("update record: %w", err))
		}
		return jsonResult(record)
	}
}

// handleRecordsDelete removes one record.
func handleRecordsDelete(deps ServerDeps) ToolHandler {
	return func(args json.RawMessage) *ToolResult {
		parsed, err := parseArgs[recordArgs](args)
		if err != nil {
			return errorResult(err)
		}
		db, err := deps.db()
		if err != nil {
			return errorResult(err)
		}

		if err := store.DeleteRecord(db, parsed.Collection, parsed.ID); err != nil {
			return errorResult(fmt.Errorf("delete record: %w", err))
		}
		return jsonResult(map[string]any{"id": parsed.ID, "deleted": true})
	}
}

// handleRecordsList returns one page of records.
func handleRecordsList(deps ServerDeps) ToolHandler {
	return func(args json.RawMessage) *ToolResult {
		db, err := deps.db()
		if err != nil {
			return errorResult(err)
		}
		parsed, err := parseArgs[listRecordsArgs](args)
		if err != nil {
			return errorResult(err)
		}

		page, perPage := parsed.Page, parsed.PerPage
		if page == 0 {
			page = 1
		}
		if perPage == 0 {
			perPage = 50
		}
		if page < 1 {
			return errorResult(fmt.Errorf("page must be 1 or greater"))
		}
		if perPage < 1 || perPage > maxPerPage {
			return errorResult(fmt.Errorf("per_page must be between 1 and %d", maxPerPage))
		}

		records, err := store.ListRecords(db, parsed.Collection, page, perPage, nil, "", nil, parsed.Search)
		if err != nil {
			return errorResult(fmt.Errorf("list records: %w", err))
		}
		return jsonResult(records)
	}
}
