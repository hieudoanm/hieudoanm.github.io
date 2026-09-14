// Package store implements the SQLite persistence layer and data models.
package store

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/hieudoanm/backbone/internal/id"
	_ "modernc.org/sqlite"
)

// OpenDB opens the SQLite database located under BACKBONE_DATA (or ~/.backbone).
func OpenDB() (*sql.DB, error) {
	dir := os.Getenv("BACKBONE_DATA")
	if dir == "" {
		home, err := os.UserHomeDir()
		if err != nil {
			return nil, fmt.Errorf("get home dir: %w", err)
		}
		dir = filepath.Join(home, ".backbone")
	}
	if err := os.MkdirAll(dir, 0755); err != nil {
		return nil, fmt.Errorf("create data dir: %w", err)
	}
	db, err := sql.Open("sqlite", filepath.Join(dir, "data.db"))
	if err != nil {
		return nil, fmt.Errorf("open db: %w", err)
	}
	db.SetMaxOpenConns(1)
	return db, nil
}

// MigrateDB ensures all application tables exist.
func MigrateDB(db *sql.DB) error {
	schema := `
	CREATE TABLE IF NOT EXISTS _collections (
		name       TEXT PRIMARY KEY,
		schema     TEXT NOT NULL DEFAULT '{}',
		created_at TEXT NOT NULL DEFAULT (datetime('now')),
		updated_at TEXT NOT NULL DEFAULT (datetime('now'))
	);
	CREATE TABLE IF NOT EXISTS _users (
		id         TEXT PRIMARY KEY,
		email      TEXT UNIQUE NOT NULL,
		password   TEXT NOT NULL,
		created_at TEXT NOT NULL DEFAULT (datetime('now')),
		updated_at TEXT NOT NULL DEFAULT (datetime('now'))
	);
	CREATE TABLE IF NOT EXISTS _buckets (
		name       TEXT PRIMARY KEY,
		is_public  INTEGER NOT NULL DEFAULT 0,
		created_at TEXT NOT NULL DEFAULT (datetime('now')),
		updated_at TEXT NOT NULL DEFAULT (datetime('now'))
	);
	CREATE TABLE IF NOT EXISTS _files (
		id         TEXT PRIMARY KEY,
		bucket     TEXT NOT NULL,
		filename   TEXT NOT NULL,
		mime_type  TEXT NOT NULL DEFAULT 'application/octet-stream',
		size       INTEGER NOT NULL DEFAULT 0,
		created_at TEXT NOT NULL DEFAULT (datetime('now')),
		updated_at TEXT NOT NULL DEFAULT (datetime('now'))
	);
	CREATE TABLE IF NOT EXISTS _webhooks (
		id         TEXT PRIMARY KEY,
		name       TEXT NOT NULL,
		url        TEXT NOT NULL,
		events     TEXT NOT NULL DEFAULT '[]',
		secret     TEXT NOT NULL DEFAULT '',
		is_active  INTEGER NOT NULL DEFAULT 1,
		created_at TEXT NOT NULL DEFAULT (datetime('now')),
		updated_at TEXT NOT NULL DEFAULT (datetime('now'))
	);
	CREATE TABLE IF NOT EXISTS _webhook_logs (
		id              TEXT PRIMARY KEY,
		webhook_id      TEXT NOT NULL,
		event           TEXT NOT NULL,
		url             TEXT NOT NULL,
		request_body    TEXT NOT NULL DEFAULT '',
		response_status INTEGER,
		response_body   TEXT NOT NULL DEFAULT '',
		error           TEXT NOT NULL DEFAULT '',
		status          TEXT NOT NULL DEFAULT 'pending',
		created_at      TEXT NOT NULL DEFAULT (datetime('now'))
	);
	CREATE TABLE IF NOT EXISTS _secrets (
		id         TEXT PRIMARY KEY,
		name       TEXT NOT NULL,
		value      TEXT NOT NULL,
		scope      TEXT NOT NULL DEFAULT 'general',
		created_at TEXT NOT NULL DEFAULT (datetime('now')),
		updated_at TEXT NOT NULL DEFAULT (datetime('now'))
	);
	CREATE TABLE IF NOT EXISTS _cronjobs (
		id              TEXT PRIMARY KEY,
		name            TEXT NOT NULL,
		schedule        TEXT NOT NULL,
		command         TEXT NOT NULL,
		method          TEXT NOT NULL DEFAULT 'GET',
		headers         TEXT NOT NULL DEFAULT '',
		body            TEXT NOT NULL DEFAULT '',
		is_active       INTEGER NOT NULL DEFAULT 1,
		last_run_at     TEXT NOT NULL DEFAULT '',
		last_run_status TEXT NOT NULL DEFAULT '',
		created_at      TEXT NOT NULL DEFAULT (datetime('now')),
		updated_at      TEXT NOT NULL DEFAULT (datetime('now'))
	);
	CREATE TABLE IF NOT EXISTS _cronjob_logs (
		id          TEXT PRIMARY KEY,
		cronjob_id  TEXT NOT NULL,
		started_at  TEXT NOT NULL,
		finished_at TEXT NOT NULL,
		duration_ms INTEGER NOT NULL DEFAULT 0,
		status      TEXT NOT NULL DEFAULT '',
		output      TEXT NOT NULL DEFAULT '',
		error       TEXT NOT NULL DEFAULT ''
	);
	CREATE TABLE IF NOT EXISTS _ws_connections (
		id              TEXT PRIMARY KEY,
		remote_addr     TEXT NOT NULL,
		path            TEXT NOT NULL DEFAULT '/',
		user_agent      TEXT NOT NULL DEFAULT '',
		connected_at    TEXT NOT NULL,
		disconnected_at TEXT NOT NULL DEFAULT '',
		is_active       INTEGER NOT NULL DEFAULT 1,
		created_at      TEXT NOT NULL DEFAULT (datetime('now'))
	);
	CREATE TABLE IF NOT EXISTS _ws_messages (
		id            TEXT PRIMARY KEY,
		connection_id TEXT,
		direction     TEXT NOT NULL,
		content       TEXT NOT NULL,
		created_at    TEXT NOT NULL DEFAULT (datetime('now'))
	);
	CREATE TABLE IF NOT EXISTS _cache (
		key        TEXT PRIMARY KEY,
		value      TEXT NOT NULL,
		ttl        INTEGER NOT NULL DEFAULT 0,
		expires_at TEXT NOT NULL DEFAULT '',
		created_at TEXT NOT NULL DEFAULT (datetime('now')),
		updated_at TEXT NOT NULL DEFAULT (datetime('now'))
	);
	CREATE TABLE IF NOT EXISTS _notifications (
		id         TEXT PRIMARY KEY,
		title      TEXT NOT NULL,
		body       TEXT NOT NULL DEFAULT '',
		type       TEXT NOT NULL DEFAULT 'info',
		is_read    INTEGER NOT NULL DEFAULT 0,
		created_at TEXT NOT NULL DEFAULT (datetime('now'))
	);

	CREATE TABLE IF NOT EXISTS _logs (
		id         TEXT PRIMARY KEY,
		level      TEXT NOT NULL DEFAULT 'info',
		message    TEXT NOT NULL,
		meta       TEXT NOT NULL DEFAULT '{}',
		created_at TEXT NOT NULL DEFAULT (datetime('now'))
	);
	CREATE TABLE IF NOT EXISTS _pubsub_topics (
		id         TEXT PRIMARY KEY,
		name       TEXT UNIQUE NOT NULL,
		created_at TEXT NOT NULL DEFAULT (datetime('now'))
	);
	CREATE TABLE IF NOT EXISTS _pubsub_messages (
		id         TEXT PRIMARY KEY,
		topic_id   TEXT NOT NULL,
		body       TEXT NOT NULL,
		created_at TEXT NOT NULL DEFAULT (datetime('now')),
		FOREIGN KEY (topic_id) REFERENCES _pubsub_topics(id) ON DELETE CASCADE
	);
	CREATE TABLE IF NOT EXISTS _permissions (
		id         TEXT PRIMARY KEY,
		user_id    TEXT NOT NULL,
		collection TEXT NOT NULL,
		role       TEXT NOT NULL DEFAULT 'viewer',
		created_at TEXT NOT NULL DEFAULT (datetime('now')),
		updated_at TEXT NOT NULL DEFAULT (datetime('now')),
		UNIQUE(user_id, collection)
	);
	`
	_, err := db.Exec(schema)
	return err
}

func createCollectionTable(db *sql.DB, name string, schema string) error {
	_, err := db.Exec(fmt.Sprintf(
		`CREATE TABLE IF NOT EXISTS "_data_%s" (
			id         TEXT PRIMARY KEY,
			data       TEXT NOT NULL DEFAULT '{}',
			created_at TEXT NOT NULL DEFAULT (datetime('now')),
			updated_at TEXT NOT NULL DEFAULT (datetime('now'))
		)`, name))
	if err != nil {
		return err
	}
	if schema != "" && schema != "{}" {
		cols := parseSchemaColumns(schema)
		for _, col := range cols {
			db.Exec(fmt.Sprintf(`ALTER TABLE "_data_%s" ADD COLUMN %s %s`, name, col.Name, col.ColType))
		}
	}
	return nil
}

// CreateCollection creates a collection and its backing data table.
func CreateCollection(db *sql.DB, name, schema string) error {
	_, err := db.Exec(
		`INSERT INTO _collections (name, schema) VALUES (?, ?)`,
		name, schema,
	)
	if err != nil {
		return fmt.Errorf("create collection: %w", err)
	}
	return createCollectionTable(db, name, schema)
}

// GetCollection returns a collection by name, or nil if absent.
func GetCollection(db *sql.DB, name string) (*Collection, error) {
	c := &Collection{}
	err := db.QueryRow(
		`SELECT name, schema, created_at, updated_at FROM _collections WHERE name = ?`, name,
	).Scan(&c.Name, &c.Schema, &c.CreatedAt, &c.UpdatedAt)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	return c, nil
}

// ListCollections returns all collections ordered by name.
func ListCollections(db *sql.DB) ([]Collection, error) {
	rows, err := db.Query(`SELECT name, schema, created_at, updated_at FROM _collections ORDER BY name`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var cols []Collection
	for rows.Next() {
		var c Collection
		if err := rows.Scan(&c.Name, &c.Schema, &c.CreatedAt, &c.UpdatedAt); err != nil {
			return nil, err
		}
		cols = append(cols, c)
	}
	return cols, rows.Err()
}

// DeleteCollection removes a collection and its data table.
func DeleteCollection(db *sql.DB, name string) error {
	if _, err := db.Exec(`DELETE FROM _collections WHERE name = ?`, name); err != nil {
		return err
	}
	_, err := db.Exec(fmt.Sprintf(`DROP TABLE IF EXISTS "_data_%s"`, name))
	return err
}

// CreateRecord inserts a record into a collection.
func CreateRecord(db *sql.DB, collection, id string, data json.RawMessage) (*Record, error) {
	now := time.Now().UTC().Format(time.RFC3339)
	raw := string(data)
	_, err := db.Exec(
		fmt.Sprintf(`INSERT INTO "_data_%s" (id, data, created_at, updated_at) VALUES (?, ?, ?, ?)`, collection),
		id, raw, now, now,
	)
	if err != nil {
		return nil, fmt.Errorf("insert record: %w", err)
	}
	syncSchemaColumns(db, collection, id)
	return &Record{ID: id, Data: data, CreatedAt: now, UpdatedAt: now}, nil
}

// GetRecord returns a record by ID, or nil if absent.
func GetRecord(db *sql.DB, collection, id string) (*Record, error) {
	row := db.QueryRow(
		fmt.Sprintf(`SELECT id, data, created_at, updated_at FROM "_data_%s" WHERE id = ?`, collection),
		id,
	)
	r := &Record{}
	var dataStr string
	if err := row.Scan(&r.ID, &dataStr, &r.CreatedAt, &r.UpdatedAt); err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	r.Data = json.RawMessage(dataStr)
	return r, nil
}

func buildFilterClause(filters []string) (string, []any) {
	if len(filters) == 0 {
		return "", nil
	}
	var clauses []string
	var args []any
	for _, f := range filters {
		var op string
		if strings.Contains(f, "!=") {
			op = "!="
		} else if strings.Contains(f, ">=") {
			op = ">="
		} else if strings.Contains(f, "<=") {
			op = "<="
		} else if strings.Contains(f, ">") {
			op = ">"
		} else if strings.Contains(f, "<") {
			op = "<"
		} else if strings.Contains(f, "=") {
			op = "="
		} else {
			continue
		}
		parts := strings.SplitN(f, op, 2)
		if len(parts) != 2 {
			continue
		}
		field := strings.TrimSpace(parts[0])
		value := strings.TrimSpace(parts[1])
		if op == "=" || op == "!=" {
			clauses = append(clauses, fmt.Sprintf("CAST(json_extract(data, '$.%s') AS TEXT) %s ?", field, op))
		} else {
			clauses = append(clauses, fmt.Sprintf("json_extract(data, '$.%s') %s ?", field, op))
		}
		args = append(args, value)
	}
	if len(clauses) == 0 {
		return "", nil
	}
	return " WHERE " + strings.Join(clauses, " AND "), args
}

func buildSearchClause(search string) (string, []any) {
	if search == "" {
		return "", nil
	}
	words := strings.Fields(search)
	var clauses []string
	var args []any
	for _, word := range words {
		clauses = append(clauses, "data LIKE ?")
		args = append(args, "%"+word+"%")
	}
	return " (" + strings.Join(clauses, " AND ") + ")", args
}

func buildSortClause(sort string) string {
	if sort == "" {
		return "ORDER BY created_at DESC"
	}
	var fields []string
	for _, f := range strings.Split(sort, ",") {
		f = strings.TrimSpace(f)
		if f == "" {
			continue
		}
		if strings.HasPrefix(f, "-") {
			fields = append(fields, fmt.Sprintf("json_extract(data, '$.%s') DESC", f[1:]))
		} else {
			fields = append(fields, fmt.Sprintf("json_extract(data, '$.%s') ASC", f))
		}
	}
	if len(fields) == 0 {
		return "ORDER BY created_at DESC"
	}
	return "ORDER BY " + strings.Join(fields, ", ")
}

func resolveExpands(db *sql.DB, records []Record, expandFields []string) (map[string]map[string]any, error) {
	if len(expandFields) == 0 || len(records) == 0 {
		return nil, nil
	}

	cols, err := ListCollections(db)
	if err != nil {
		return nil, err
	}

	referencedIDs := make(map[string]map[string]bool)
	for _, field := range expandFields {
		referencedIDs[field] = make(map[string]bool)
		for _, rec := range records {
			var data map[string]any
			if err := json.Unmarshal(rec.Data, &data); err != nil {
				continue
			}
			if val, ok := data[field]; ok {
				if id, ok := val.(string); ok {
					referencedIDs[field][id] = true
				}
			}
		}
	}

	type refEntry struct {
		collection string
		record     *Record
	}
	lookup := make(map[string]refEntry)

	for _, col := range cols {
		for _, ids := range referencedIDs {
			for id := range ids {
				if _, ok := lookup[id]; ok {
					continue
				}
				rec, err := GetRecord(db, col.Name, id)
				if err != nil {
					continue
				}
				if rec != nil {
					lookup[id] = refEntry{col.Name, rec}
				}
			}
		}
	}

	result := make(map[string]map[string]any)
	for _, rec := range records {
		var data map[string]any
		if err := json.Unmarshal(rec.Data, &data); err != nil {
			continue
		}
		expandMap := make(map[string]any)
		for _, field := range expandFields {
			if val, ok := data[field]; ok {
				if id, ok := val.(string); ok {
					if found, ok := lookup[id]; ok {
						expandMap[field] = map[string]any{
							"collection": found.collection,
							"record":     found.record,
						}
					}
				}
			}
		}
		if len(expandMap) > 0 {
			result[rec.ID] = expandMap
		}
	}

	return result, nil
}

// ListRecords returns a paginated, filtered, sorted, and optionally expanded page of records.
func ListRecords(db *sql.DB, collection string, page, perPage int, filter []string, sort string, expand []string, search string) (*RecordsPage, error) {
	filterClause, filterArgs := buildFilterClause(filter)
	searchClause, searchArgs := buildSearchClause(search)
	if searchClause != "" {
		if filterClause != "" {
			filterClause = filterClause + " AND" + searchClause
		} else {
			filterClause = " WHERE" + searchClause
		}
		filterArgs = append(filterArgs, searchArgs...)
	}

	var total int
	countQuery := fmt.Sprintf(`SELECT COUNT(*) FROM "_data_%s"%s`, collection, filterClause)
	err := db.QueryRow(countQuery, filterArgs...).Scan(&total)
	if err != nil {
		return nil, err
	}
	totalPages := (total + perPage - 1) / perPage
	if totalPages == 0 {
		totalPages = 1
	}

	offset := (page - 1) * perPage
	sortClause := buildSortClause(sort)

	args := make([]any, 0, len(filterArgs)+2)
	args = append(args, filterArgs...)
	args = append(args, perPage, offset)

	query := fmt.Sprintf(`SELECT id, data, created_at, updated_at FROM "_data_%s"%s %s LIMIT ? OFFSET ?`, collection, filterClause, sortClause)
	rows, err := db.Query(query, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var records []Record
	for rows.Next() {
		var r Record
		var dataStr string
		if err := rows.Scan(&r.ID, &dataStr, &r.CreatedAt, &r.UpdatedAt); err != nil {
			return nil, err
		}
		r.Data = json.RawMessage(dataStr)
		records = append(records, r)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}

	var expandResult map[string]map[string]any
	if len(expand) > 0 {
		expandResult, err = resolveExpands(db, records, expand)
		if err != nil {
			return nil, err
		}
	}

	return &RecordsPage{
		Records:    records,
		Total:      total,
		Page:       page,
		PerPage:    perPage,
		TotalPages: totalPages,
		Expand:     expandResult,
	}, nil
}

// UpdateRecord replaces a record's data.
func UpdateRecord(db *sql.DB, collection, id string, data json.RawMessage) (*Record, error) {
	now := time.Now().UTC().Format(time.RFC3339)
	raw := string(data)
	_, err := db.Exec(
		fmt.Sprintf(`UPDATE "_data_%s" SET data = ?, updated_at = ? WHERE id = ?`, collection),
		raw, now, id,
	)
	if err != nil {
		return nil, err
	}
	syncSchemaColumns(db, collection, id)
	return &Record{ID: id, Data: data, CreatedAt: "", UpdatedAt: now}, nil
}

// DeleteRecord removes a record from a collection.
func DeleteRecord(db *sql.DB, collection, id string) error {
	_, err := db.Exec(
		fmt.Sprintf(`DELETE FROM "_data_%s" WHERE id = ?`, collection),
		id,
	)
	return err
}

// CreateBucket creates a new storage bucket.
func CreateBucket(db *sql.DB, name string, isPublic bool) (*Bucket, error) {
	now := time.Now().UTC().Format(time.RFC3339)
	isPublicInt := 0
	if isPublic {
		isPublicInt = 1
	}
	_, err := db.Exec(
		`INSERT INTO _buckets (name, is_public, created_at, updated_at) VALUES (?, ?, ?, ?)`,
		name, isPublicInt, now, now,
	)
	if err != nil {
		return nil, fmt.Errorf("create bucket: %w", err)
	}
	return &Bucket{Name: name, IsPublic: isPublic, CreatedAt: now, UpdatedAt: now}, nil
}

// GetBucket returns a bucket by name, or nil if absent.
func GetBucket(db *sql.DB, name string) (*Bucket, error) {
	b := &Bucket{}
	var isPub int
	err := db.QueryRow(
		`SELECT name, is_public, created_at, updated_at FROM _buckets WHERE name = ?`, name,
	).Scan(&b.Name, &isPub, &b.CreatedAt, &b.UpdatedAt)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	b.IsPublic = isPub != 0
	return b, nil
}

// ListBuckets returns all buckets ordered by name.
func ListBuckets(db *sql.DB) ([]Bucket, error) {
	rows, err := db.Query(`SELECT name, is_public, created_at, updated_at FROM _buckets ORDER BY name`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var buckets []Bucket
	for rows.Next() {
		var b Bucket
		var isPub int
		if err := rows.Scan(&b.Name, &isPub, &b.CreatedAt, &b.UpdatedAt); err != nil {
			return nil, err
		}
		b.IsPublic = isPub != 0
		buckets = append(buckets, b)
	}
	return buckets, rows.Err()
}

// DeleteBucket removes a bucket and returns its files (for disk cleanup by the caller).
func DeleteBucket(db *sql.DB, name string) ([]FileRecord, error) {
	rows, err := db.Query(`SELECT id, bucket, filename, mime_type, size, created_at, updated_at FROM _files WHERE bucket = ?`, name)
	if err != nil {
		return nil, err
	}
	var files []FileRecord
	for rows.Next() {
		var f FileRecord
		if err := rows.Scan(&f.ID, &f.Bucket, &f.Filename, &f.MimeType, &f.Size, &f.CreatedAt, &f.UpdatedAt); err != nil {
			return nil, err
		}
		files = append(files, f)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}

	if _, err := db.Exec(`DELETE FROM _files WHERE bucket = ?`, name); err != nil {
		return nil, err
	}
	if _, err := db.Exec(`DELETE FROM _buckets WHERE name = ?`, name); err != nil {
		return nil, err
	}
	return files, nil
}

// InsertFile stores a file metadata row.
func InsertFile(db *sql.DB, bucket, id, filename, mimeType string, size int64) (*FileRecord, error) {
	now := time.Now().UTC().Format(time.RFC3339)
	_, err := db.Exec(
		`INSERT INTO _files (id, bucket, filename, mime_type, size, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)`,
		id, bucket, filename, mimeType, size, now, now,
	)
	if err != nil {
		return nil, fmt.Errorf("insert file: %w", err)
	}
	return &FileRecord{ID: id, Bucket: bucket, Filename: filename, MimeType: mimeType, Size: size, CreatedAt: now, UpdatedAt: now}, nil
}

// GetFile returns a file record by ID, or nil if absent.
func GetFile(db *sql.DB, id string) (*FileRecord, error) {
	f := &FileRecord{}
	err := db.QueryRow(
		`SELECT id, bucket, filename, mime_type, size, created_at, updated_at FROM _files WHERE id = ?`, id,
	).Scan(&f.ID, &f.Bucket, &f.Filename, &f.MimeType, &f.Size, &f.CreatedAt, &f.UpdatedAt)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	return f, nil
}

// ListFiles returns a paginated list of files within a bucket.
func ListFiles(db *sql.DB, bucket string, page, perPage int) (*FilesPage, error) {
	var total int
	err := db.QueryRow(`SELECT COUNT(*) FROM _files WHERE bucket = ?`, bucket).Scan(&total)
	if err != nil {
		return nil, err
	}
	totalPages := (total + perPage - 1) / perPage
	if totalPages == 0 {
		totalPages = 1
	}
	offset := (page - 1) * perPage
	rows, err := db.Query(
		`SELECT id, bucket, filename, mime_type, size, created_at, updated_at FROM _files WHERE bucket = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`,
		bucket, perPage, offset,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var files []FileRecord
	for rows.Next() {
		var f FileRecord
		if err := rows.Scan(&f.ID, &f.Bucket, &f.Filename, &f.MimeType, &f.Size, &f.CreatedAt, &f.UpdatedAt); err != nil {
			return nil, err
		}
		files = append(files, f)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return &FilesPage{Files: files, Total: total, Page: page, PerPage: perPage, TotalPages: totalPages}, nil
}

// DeleteFile removes a file record and returns it for disk cleanup.
func DeleteFile(db *sql.DB, id string) (*FileRecord, error) {
	f, err := GetFile(db, id)
	if err != nil {
		return nil, err
	}
	if f == nil {
		return nil, nil
	}
	_, err = db.Exec(`DELETE FROM _files WHERE id = ?`, id)
	if err != nil {
		return nil, err
	}
	return f, nil
}

// ListWebhooks returns all webhooks ordered by name.
func ListWebhooks(db *sql.DB) ([]Webhook, error) {
	rows, err := db.Query(`SELECT id, name, url, events, secret, is_active, created_at, updated_at FROM _webhooks ORDER BY name`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var hooks []Webhook
	for rows.Next() {
		var h Webhook
		var eventsStr string
		var active int
		if err := rows.Scan(&h.ID, &h.Name, &h.URL, &eventsStr, &h.Secret, &active, &h.CreatedAt, &h.UpdatedAt); err != nil {
			return nil, err
		}
		h.IsActive = active != 0
		json.Unmarshal([]byte(eventsStr), &h.Events)
		hooks = append(hooks, h)
	}
	return hooks, rows.Err()
}

// GetWebhook returns a webhook by ID, or nil if absent.
func GetWebhook(db *sql.DB, id string) (*Webhook, error) {
	h := &Webhook{}
	var eventsStr string
	var active int
	err := db.QueryRow(
		`SELECT id, name, url, events, secret, is_active, created_at, updated_at FROM _webhooks WHERE id = ?`, id,
	).Scan(&h.ID, &h.Name, &h.URL, &eventsStr, &h.Secret, &active, &h.CreatedAt, &h.UpdatedAt)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	h.IsActive = active != 0
	json.Unmarshal([]byte(eventsStr), &h.Events)
	return h, nil
}

// CreateWebhook inserts a new webhook.
func CreateWebhook(db *sql.DB, name, url, eventsStr, secret string) (*Webhook, error) {
	now := time.Now().UTC().Format(time.RFC3339)
	id := id.Generate()
	_, err := db.Exec(
		`INSERT INTO _webhooks (id, name, url, events, secret, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)`,
		id, name, url, eventsStr, secret, now, now,
	)
	if err != nil {
		return nil, fmt.Errorf("create webhook: %w", err)
	}
	var events []string
	json.Unmarshal([]byte(eventsStr), &events)
	return &Webhook{ID: id, Name: name, URL: url, Events: events, Secret: secret, IsActive: true, CreatedAt: now, UpdatedAt: now}, nil
}

// UpdateWebhook modifies an existing webhook.
func UpdateWebhook(db *sql.DB, id, name, url, eventsStr, secret string, isActive bool) (*Webhook, error) {
	now := time.Now().UTC().Format(time.RFC3339)
	active := 0
	if isActive {
		active = 1
	}
	_, err := db.Exec(
		`UPDATE _webhooks SET name = ?, url = ?, events = ?, secret = ?, is_active = ?, updated_at = ? WHERE id = ?`,
		name, url, eventsStr, secret, active, now, id,
	)
	if err != nil {
		return nil, fmt.Errorf("update webhook: %w", err)
	}
	var events []string
	json.Unmarshal([]byte(eventsStr), &events)
	return &Webhook{ID: id, Name: name, URL: url, Events: events, Secret: secret, IsActive: isActive, CreatedAt: "", UpdatedAt: now}, nil
}

// DeleteWebhook removes a webhook and its delivery logs.
func DeleteWebhook(db *sql.DB, id string) error {
	if _, err := db.Exec(`DELETE FROM _webhook_logs WHERE webhook_id = ?`, id); err != nil {
		return err
	}
	_, err := db.Exec(`DELETE FROM _webhooks WHERE id = ?`, id)
	return err
}

// ListWebhookLogs returns recent delivery logs for a webhook.
func ListWebhookLogs(db *sql.DB, webhookID string, limit int) ([]WebhookLog, error) {
	if limit < 1 || limit > 100 {
		limit = 50
	}
	rows, err := db.Query(
		`SELECT id, webhook_id, event, url, request_body, response_status, response_body, error, status, created_at FROM _webhook_logs WHERE webhook_id = ? ORDER BY created_at DESC LIMIT ?`,
		webhookID, limit,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var logs []WebhookLog
	for rows.Next() {
		var l WebhookLog
		if err := rows.Scan(&l.ID, &l.WebhookID, &l.Event, &l.URL, &l.RequestBody, &l.ResponseStatus, &l.ResponseBody, &l.Error, &l.Status, &l.CreatedAt); err != nil {
			return nil, err
		}
		logs = append(logs, l)
	}
	return logs, rows.Err()
}

// InsertWebhookLog records a webhook delivery attempt.
func InsertWebhookLog(db *sql.DB, l *WebhookLog) error {
	_, err := db.Exec(
		`INSERT INTO _webhook_logs (id, webhook_id, event, url, request_body, response_status, response_body, error, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
		l.ID, l.WebhookID, l.Event, l.URL, l.RequestBody, l.ResponseStatus, l.ResponseBody, l.Error, l.Status, l.CreatedAt,
	)
	return err
}

// ListSecrets returns all secrets ordered by name (values remain encrypted).
func ListSecrets(db *sql.DB) ([]Secret, error) {
	rows, err := db.Query(`SELECT id, name, value, scope, created_at, updated_at FROM _secrets ORDER BY name`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var secrets []Secret
	for rows.Next() {
		var s Secret
		if err := rows.Scan(&s.ID, &s.Name, &s.Value, &s.Scope, &s.CreatedAt, &s.UpdatedAt); err != nil {
			return nil, err
		}
		secrets = append(secrets, s)
	}
	return secrets, rows.Err()
}

// GetSecret returns a secret by ID, or nil if absent.
func GetSecret(db *sql.DB, id string) (*Secret, error) {
	s := &Secret{}
	err := db.QueryRow(
		`SELECT id, name, value, scope, created_at, updated_at FROM _secrets WHERE id = ?`, id,
	).Scan(&s.ID, &s.Name, &s.Value, &s.Scope, &s.CreatedAt, &s.UpdatedAt)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	return s, nil
}

// CreateSecret inserts a secret with the given (already encrypted) value.
func CreateSecret(db *sql.DB, id, name, value, scope string) (*Secret, error) {
	now := time.Now().UTC().Format(time.RFC3339)
	_, err := db.Exec(
		`INSERT INTO _secrets (id, name, value, scope, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)`,
		id, name, value, scope, now, now,
	)
	if err != nil {
		return nil, fmt.Errorf("create secret: %w", err)
	}
	return &Secret{ID: id, Name: name, Value: value, Scope: scope, CreatedAt: now, UpdatedAt: now}, nil
}

// UpdateSecret updates a secret with the given (already encrypted) value.
func UpdateSecret(db *sql.DB, id, name, value, scope string) (*Secret, error) {
	now := time.Now().UTC().Format(time.RFC3339)
	_, err := db.Exec(
		`UPDATE _secrets SET name = ?, value = ?, scope = ?, updated_at = ? WHERE id = ?`,
		name, value, scope, now, id,
	)
	if err != nil {
		return nil, fmt.Errorf("update secret: %w", err)
	}
	return &Secret{ID: id, Name: name, Value: value, Scope: scope, UpdatedAt: now}, nil
}

// DeleteSecret removes a secret.
func DeleteSecret(db *sql.DB, id string) error {
	_, err := db.Exec(`DELETE FROM _secrets WHERE id = ?`, id)
	return err
}

// ListCronJobs returns all cron jobs ordered by name.
func ListCronJobs(db *sql.DB) ([]CronJob, error) {
	rows, err := db.Query(`SELECT id, name, schedule, command, method, headers, body, is_active, last_run_at, last_run_status, created_at, updated_at FROM _cronjobs ORDER BY name`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var jobs []CronJob
	for rows.Next() {
		var j CronJob
		if err := rows.Scan(&j.ID, &j.Name, &j.Schedule, &j.Command, &j.Method, &j.Headers, &j.Body, &j.IsActive, &j.LastRunAt, &j.LastRunStatus, &j.CreatedAt, &j.UpdatedAt); err != nil {
			return nil, err
		}
		jobs = append(jobs, j)
	}
	return jobs, rows.Err()
}

// GetCronJob returns a cron job by ID, or nil if absent.
func GetCronJob(db *sql.DB, id string) (*CronJob, error) {
	j := &CronJob{}
	err := db.QueryRow(
		`SELECT id, name, schedule, command, method, headers, body, is_active, last_run_at, last_run_status, created_at, updated_at FROM _cronjobs WHERE id = ?`, id,
	).Scan(&j.ID, &j.Name, &j.Schedule, &j.Command, &j.Method, &j.Headers, &j.Body, &j.IsActive, &j.LastRunAt, &j.LastRunStatus, &j.CreatedAt, &j.UpdatedAt)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	return j, nil
}

// InsertCronJob creates a new cron job.
func InsertCronJob(db *sql.DB, id, name, schedule, command, method, headers, body string, isActive bool) (*CronJob, error) {
	now := time.Now().UTC().Format(time.RFC3339)
	active := 0
	if isActive {
		active = 1
	}
	_, err := db.Exec(
		`INSERT INTO _cronjobs (id, name, schedule, command, method, headers, body, is_active, last_run_at, last_run_status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, '', '', ?, ?)`,
		id, name, schedule, command, method, headers, body, active, now, now,
	)
	if err != nil {
		return nil, fmt.Errorf("create cronjob: %w", err)
	}
	return &CronJob{ID: id, Name: name, Schedule: schedule, Command: command, Method: method, Headers: headers, Body: body, IsActive: isActive, CreatedAt: now, UpdatedAt: now}, nil
}

// UpdateCronJob modifies an existing cron job.
func UpdateCronJob(db *sql.DB, id, name, schedule, command, method, headers, body string, isActive bool) (*CronJob, error) {
	now := time.Now().UTC().Format(time.RFC3339)
	active := 0
	if isActive {
		active = 1
	}
	_, err := db.Exec(
		`UPDATE _cronjobs SET name = ?, schedule = ?, command = ?, method = ?, headers = ?, body = ?, is_active = ?, updated_at = ? WHERE id = ?`,
		name, schedule, command, method, headers, body, active, now, id,
	)
	if err != nil {
		return nil, fmt.Errorf("update cronjob: %w", err)
	}
	return &CronJob{ID: id, Name: name, Schedule: schedule, Command: command, Method: method, Headers: headers, Body: body, IsActive: isActive, UpdatedAt: now}, nil
}

// UpdateCronJobLastRun records the last execution time and status.
func UpdateCronJobLastRun(db *sql.DB, id, lastRunAt, lastRunStatus string) {
	db.Exec(`UPDATE _cronjobs SET last_run_at = ?, last_run_status = ? WHERE id = ?`, lastRunAt, lastRunStatus, id)
}

// DeleteCronJob removes a cron job and its execution logs.
func DeleteCronJob(db *sql.DB, id string) error {
	db.Exec(`DELETE FROM _cronjob_logs WHERE cronjob_id = ?`, id)
	_, err := db.Exec(`DELETE FROM _cronjobs WHERE id = ?`, id)
	return err
}

// ListCronJobLogs returns recent execution logs for a cron job.
func ListCronJobLogs(db *sql.DB, cronjobID string) ([]CronJobLog, error) {
	rows, err := db.Query(`SELECT id, cronjob_id, started_at, finished_at, duration_ms, status, output, error FROM _cronjob_logs WHERE cronjob_id = ? ORDER BY started_at DESC LIMIT 50`, cronjobID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var logs []CronJobLog
	for rows.Next() {
		var l CronJobLog
		if err := rows.Scan(&l.ID, &l.CronJobID, &l.StartedAt, &l.FinishedAt, &l.DurationMs, &l.Status, &l.Output, &l.Error); err != nil {
			return nil, err
		}
		logs = append(logs, l)
	}
	return logs, rows.Err()
}

// InsertCronJobLog records a cron job execution.
func InsertCronJobLog(db *sql.DB, l *CronJobLog) error {
	_, err := db.Exec(
		`INSERT INTO _cronjob_logs (id, cronjob_id, started_at, finished_at, duration_ms, status, output, error) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
		l.ID, l.CronJobID, l.StartedAt, l.FinishedAt, l.DurationMs, l.Status, l.Output, l.Error,
	)
	return err
}

// InsertWSConnection records a new websocket connection.
func InsertWSConnection(db *sql.DB, id, remoteAddr, path, userAgent string) {
	now := time.Now().UTC().Format(time.RFC3339)
	db.Exec(`INSERT INTO _ws_connections (id, remote_addr, path, user_agent, connected_at) VALUES (?, ?, ?, ?, ?)`,
		id, remoteAddr, path, userAgent, now)
}

// UpdateWSDisconnect marks a websocket connection as disconnected.
func UpdateWSDisconnect(db *sql.DB, id string) {
	now := time.Now().UTC().Format(time.RFC3339)
	db.Exec(`UPDATE _ws_connections SET is_active = 0, disconnected_at = ? WHERE id = ?`, now, id)
}

// ListWSConnections returns all websocket connections, newest first.
func ListWSConnections(db *sql.DB) ([]WSConnection, error) {
	rows, err := db.Query(`SELECT id, remote_addr, path, user_agent, connected_at, disconnected_at, is_active, created_at FROM _ws_connections ORDER BY created_at DESC`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var conns []WSConnection
	for rows.Next() {
		var c WSConnection
		var isActive int
		if err := rows.Scan(&c.ID, &c.RemoteAddr, &c.Path, &c.UserAgent, &c.ConnectedAt, &c.DisconnectedAt, &isActive, &c.CreatedAt); err != nil {
			return nil, err
		}
		c.IsActive = isActive == 1
		conns = append(conns, c)
	}
	return conns, rows.Err()
}

// GetWSConnection returns a websocket connection by ID, or nil if absent.
func GetWSConnection(db *sql.DB, id string) (*WSConnection, error) {
	row := db.QueryRow(`SELECT id, remote_addr, path, user_agent, connected_at, disconnected_at, is_active, created_at FROM _ws_connections WHERE id = ?`, id)
	var c WSConnection
	var isActive int
	if err := row.Scan(&c.ID, &c.RemoteAddr, &c.Path, &c.UserAgent, &c.ConnectedAt, &c.DisconnectedAt, &isActive, &c.CreatedAt); err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	c.IsActive = isActive == 1
	return &c, nil
}

// DeleteWSConnection removes a websocket connection record.
func DeleteWSConnection(db *sql.DB, id string) error {
	_, err := db.Exec(`DELETE FROM _ws_connections WHERE id = ?`, id)
	return err
}

// InsertWSMessage stores a websocket message.
func InsertWSMessage(db *sql.DB, connectionID, direction, content string) {
	now := time.Now().UTC().Format(time.RFC3339)
	id := id.Generate()
	db.Exec(`INSERT INTO _ws_messages (id, connection_id, direction, content, created_at) VALUES (?, ?, ?, ?, ?)`,
		id, connectionID, direction, content, now)
}

// ListWSMessages returns recent messages for a connection.
func ListWSMessages(db *sql.DB, connectionID string) ([]WSMessage, error) {
	rows, err := db.Query(`SELECT id, connection_id, direction, content, created_at FROM _ws_messages WHERE connection_id = ? ORDER BY created_at DESC LIMIT 100`, connectionID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var msgs []WSMessage
	for rows.Next() {
		var m WSMessage
		if err := rows.Scan(&m.ID, &m.ConnectionID, &m.Direction, &m.Content, &m.CreatedAt); err != nil {
			return nil, err
		}
		msgs = append(msgs, m)
	}
	return msgs, rows.Err()
}

// ListAllWSMessages returns the most recent messages across all connections.
func ListAllWSMessages(db *sql.DB) ([]WSMessage, error) {
	rows, err := db.Query(`SELECT id, connection_id, direction, content, created_at FROM _ws_messages ORDER BY created_at DESC LIMIT 200`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var msgs []WSMessage
	for rows.Next() {
		var m WSMessage
		if err := rows.Scan(&m.ID, &m.ConnectionID, &m.Direction, &m.Content, &m.CreatedAt); err != nil {
			return nil, err
		}
		msgs = append(msgs, m)
	}
	return msgs, rows.Err()
}

// SetCacheEntry upserts a cache row.
func SetCacheEntry(db *sql.DB, key, value string, ttl int) (*CacheEntry, error) {
	now := time.Now().UTC()
	nowStr := now.Format(time.RFC3339)
	expiresAt := ""
	if ttl > 0 {
		expiresAt = now.Add(time.Duration(ttl) * time.Second).Format(time.RFC3339)
	}
	_, err := db.Exec(`INSERT INTO _cache (key, value, ttl, expires_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)
		ON CONFLICT(key) DO UPDATE SET value = excluded.value, ttl = excluded.ttl, expires_at = excluded.expires_at, updated_at = excluded.updated_at`,
		key, value, ttl, expiresAt, nowStr, nowStr)
	if err != nil {
		return nil, err
	}
	return &CacheEntry{
		Key:       key,
		Value:     value,
		TTL:       ttl,
		ExpiresAt: expiresAt,
		CreatedAt: nowStr,
		UpdatedAt: nowStr,
	}, nil
}

// GetCacheEntry returns a cache row, honoring TTL expiry.
func GetCacheEntry(db *sql.DB, key string) (*CacheEntry, error) {
	row := db.QueryRow(`SELECT key, value, ttl, expires_at, created_at, updated_at FROM _cache WHERE key = ?`, key)
	var e CacheEntry
	if err := row.Scan(&e.Key, &e.Value, &e.TTL, &e.ExpiresAt, &e.CreatedAt, &e.UpdatedAt); err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	if e.TTL > 0 && e.ExpiresAt != "" {
		expires, err := time.Parse(time.RFC3339, e.ExpiresAt)
		if err == nil && time.Now().UTC().After(expires) {
			db.Exec(`DELETE FROM _cache WHERE key = ?`, key)
			return nil, nil
		}
	}
	return &e, nil
}

// DeleteCacheEntry removes a cache row and reports whether it existed.
func DeleteCacheEntry(db *sql.DB, key string) (bool, error) {
	res, err := db.Exec(`DELETE FROM _cache WHERE key = ?`, key)
	if err != nil {
		return false, err
	}
	n, _ := res.RowsAffected()
	return n > 0, nil
}

// ListCacheEntries returns non-expired cache rows, newest first.
func ListCacheEntries(db *sql.DB) ([]CacheEntry, error) {
	now := time.Now().UTC().Format(time.RFC3339)
	rows, err := db.Query(`SELECT key, value, ttl, expires_at, created_at, updated_at FROM _cache WHERE ttl = 0 OR expires_at > ? ORDER BY updated_at DESC`, now)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var entries []CacheEntry
	for rows.Next() {
		var e CacheEntry
		if err := rows.Scan(&e.Key, &e.Value, &e.TTL, &e.ExpiresAt, &e.CreatedAt, &e.UpdatedAt); err != nil {
			return nil, err
		}
		entries = append(entries, e)
	}
	return entries, rows.Err()
}

// FlushCache removes all cache rows.
func FlushCache(db *sql.DB) error {
	_, err := db.Exec(`DELETE FROM _cache`)
	return err
}

// GetCacheStats returns cache totals from the database.
func GetCacheStats(db *sql.DB) (map[string]any, error) {
	var total, expired int
	db.QueryRow(`SELECT COUNT(*) FROM _cache`).Scan(&total)
	now := time.Now().UTC().Format(time.RFC3339)
	db.QueryRow(`SELECT COUNT(*) FROM _cache WHERE ttl > 0 AND expires_at <= ?`, now).Scan(&expired)
	return map[string]any{
		"total_entries":   total,
		"expired_entries": expired,
	}, nil
}

func parseSchemaColumns(schema string) []schemaColumn {
	if schema == "" || schema == "{}" {
		return nil
	}
	var schemaMap map[string]string
	if err := json.Unmarshal([]byte(schema), &schemaMap); err != nil {
		return nil
	}
	var cols []schemaColumn
	for field, typ := range schemaMap {
		name := strings.TrimSuffix(field, "?")
		cols = append(cols, schemaColumn{Name: name, ColType: schemaTypeToSQL(typ)})
	}
	return cols
}

func schemaTypeToSQL(typ string) string {
	switch typ {
	case "string", "email", "url":
		return "TEXT"
	case "number":
		return "REAL"
	case "integer":
		return "INTEGER"
	case "boolean":
		return "INTEGER"
	case "array", "object":
		return "TEXT"
	default:
		return "TEXT"
	}
}

// MigrateCollectionSchema adds/removes columns to align with a new schema.
func MigrateCollectionSchema(db *sql.DB, name string, oldSchema string, newSchema string) error {
	oldCols := parseSchemaColumns(oldSchema)
	newCols := parseSchemaColumns(newSchema)

	oldMap := make(map[string]string)
	for _, c := range oldCols {
		oldMap[c.Name] = c.ColType
	}
	newMap := make(map[string]string)
	for _, c := range newCols {
		newMap[c.Name] = c.ColType
	}

	for colName, colType := range newMap {
		if _, exists := oldMap[colName]; !exists {
			if _, err := db.Exec(fmt.Sprintf(`ALTER TABLE "_data_%s" ADD COLUMN %s %s`, name, colName, colType)); err != nil {
				return fmt.Errorf("add column %s: %w", colName, err)
			}
		}
	}

	for colName := range oldMap {
		if _, exists := newMap[colName]; !exists {
			if _, err := db.Exec(fmt.Sprintf(`ALTER TABLE "_data_%s" DROP COLUMN %s`, name, colName)); err != nil {
				return fmt.Errorf("drop column %s: %w", colName, err)
			}
		}
	}

	_, err := db.Exec(`UPDATE _collections SET schema = ?, updated_at = datetime('now') WHERE name = ?`, newSchema, name)
	return err
}

func syncSchemaColumns(db *sql.DB, collection, id string) {
	var colSchema string
	err := db.QueryRow("SELECT schema FROM _collections WHERE name = ?", collection).Scan(&colSchema)
	if err != nil || colSchema == "" || colSchema == "{}" {
		return
	}
	var schemaMap map[string]string
	if err := json.Unmarshal([]byte(colSchema), &schemaMap); err != nil {
		return
	}
	var setClauses []string
	for field := range schemaMap {
		name := strings.TrimSuffix(field, "?")
		setClauses = append(setClauses, fmt.Sprintf("%s = json_extract(data, '$.%s')", name, name))
	}
	if len(setClauses) > 0 {
		db.Exec(fmt.Sprintf(`UPDATE "_data_%s" SET %s WHERE id = ?`, collection, strings.Join(setClauses, ", ")), id)
	}
}
