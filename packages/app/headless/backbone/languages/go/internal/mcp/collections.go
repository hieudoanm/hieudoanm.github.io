package mcp

import (
	"encoding/json"
	"fmt"
	"strings"

	"github.com/hieudoanm/backbone/internal/store"
)

func collectionsCreateTool() Tool {
	return Tool{
		Name:        "backbone_collections_create",
		Description: "Create a collection with an optional JSON schema",
		InputSchema: Schema{
			Type: "object",
			Properties: map[string]PropertySchema{
				"name":   {Type: "string", Description: "Collection name"},
				"schema": {Type: "string", Description: "Optional JSON schema for record fields"},
			},
			Required: []string{"name"},
		},
	}
}

func collectionsDeleteTool() Tool {
	return Tool{
		Name:        "backbone_collections_delete",
		Description: "Delete a collection and every record it holds",
		InputSchema: Schema{
			Type: "object",
			Properties: map[string]PropertySchema{
				"name": {Type: "string", Description: "Collection name"},
			},
			Required: []string{"name"},
		},
	}
}

func collectionsListTool() Tool {
	return Tool{
		Name:        "backbone_collections_list",
		Description: "List all collections in the backbone database",
		InputSchema: Schema{Type: "object"},
	}
}

type nameArgs struct {
	Name string `json:"name"`
}

type createCollectionArgs struct {
	Name   string `json:"name"`
	Schema string `json:"schema"`
}

// handleCollectionsCreate creates a collection and its backing table.
func handleCollectionsCreate(deps ServerDeps) ToolHandler {
	return func(args json.RawMessage) *ToolResult {
		parsed, err := parseArgs[createCollectionArgs](args)
		if err != nil {
			return errorResult(err)
		}
		name := strings.TrimSpace(parsed.Name)
		if name == "" {
			return errorResult(fmt.Errorf("collection name must not be empty"))
		}
		db, err := deps.db()
		if err != nil {
			return errorResult(err)
		}

		existing, err := store.GetCollection(db, name)
		if err != nil {
			return errorResult(fmt.Errorf("create collection: %w", err))
		}
		if existing != nil {
			return errorResult(fmt.Errorf("collection %q already exists", name))
		}
		if err := store.CreateCollection(db, name, parsed.Schema); err != nil {
			return errorResult(fmt.Errorf("create collection: %w", err))
		}
		return jsonResult(map[string]any{
			"name": name, "schema": parsed.Schema, "created": true,
		})
	}
}

// handleCollectionsDelete drops a collection and its data table.
func handleCollectionsDelete(deps ServerDeps) ToolHandler {
	return func(args json.RawMessage) *ToolResult {
		parsed, err := parseArgs[nameArgs](args)
		if err != nil {
			return errorResult(err)
		}
		db, err := deps.db()
		if err != nil {
			return errorResult(err)
		}

		existing, err := store.GetCollection(db, parsed.Name)
		if err != nil {
			return errorResult(fmt.Errorf("delete collection: %w", err))
		}
		if existing == nil {
			return errorResult(fmt.Errorf("collection %q not found", parsed.Name))
		}
		if err := store.DeleteCollection(db, parsed.Name); err != nil {
			return errorResult(fmt.Errorf("delete collection: %w", err))
		}
		return jsonResult(map[string]any{"name": parsed.Name, "deleted": true})
	}
}

// handleCollectionsList returns every collection and its schema.
func handleCollectionsList(deps ServerDeps) ToolHandler {
	return func(json.RawMessage) *ToolResult {
		db, err := deps.db()
		if err != nil {
			return errorResult(err)
		}
		collections, err := store.ListCollections(db)
		if err != nil {
			return errorResult(fmt.Errorf("list collections: %w", err))
		}
		return jsonResult(map[string]any{"collections": collections})
	}
}
