package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"time"

	_ "modernc.org/sqlite"
)

func openDB() (*sql.DB, error) {
	dir := os.Getenv("SIMPLE_DATA")
	if dir == "" {
		home, err := os.UserHomeDir()
		if err != nil {
			return nil, fmt.Errorf("get home dir: %w", err)
		}
		dir = filepath.Join(home, ".simple")
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

type Collection struct {
	Name      string `json:"name"`
	Schema    string `json:"schema"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
}

type Record struct {
	ID        string          `json:"id"`
	Data      json.RawMessage `json:"data"`
	CreatedAt string          `json:"created_at"`
	UpdatedAt string          `json:"updated_at"`
}

type RecordsPage struct {
	Records    []Record `json:"records"`
	Total      int      `json:"total"`
	Page       int      `json:"page"`
	PerPage    int      `json:"per_page"`
	TotalPages int      `json:"total_pages"`
}

type Bucket struct {
	Name      string `json:"name"`
	IsPublic  bool   `json:"is_public"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
}

type FileRecord struct {
	ID        string `json:"id"`
	Bucket    string `json:"bucket"`
	Filename  string `json:"filename"`
	MimeType  string `json:"mime_type"`
	Size      int64  `json:"size"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
}

type Webhook struct {
	ID        string   `json:"id"`
	Name      string   `json:"name"`
	URL       string   `json:"url"`
	Events    []string `json:"events"`
	Secret    string   `json:"secret,omitempty"`
	IsActive  bool     `json:"is_active"`
	CreatedAt string   `json:"created_at"`
	UpdatedAt string   `json:"updated_at"`
}

type WebhookLog struct {
	ID             string `json:"id"`
	WebhookID      string `json:"webhook_id"`
	Event          string `json:"event"`
	URL            string `json:"url"`
	RequestBody    string `json:"request_body"`
	ResponseStatus int    `json:"response_status"`
	ResponseBody   string `json:"response_body"`
	Error          string `json:"error,omitempty"`
	Status         string `json:"status"`
	CreatedAt      string `json:"created_at"`
}

type Secret struct {
	ID        string `json:"id"`
	Name      string `json:"name"`
	Value     string `json:"value"`
	Scope     string `json:"scope"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
}

type WSConnection struct {
	ID             string `json:"id"`
	RemoteAddr     string `json:"remote_addr"`
	Path           string `json:"path"`
	UserAgent      string `json:"user_agent"`
	ConnectedAt    string `json:"connected_at"`
	DisconnectedAt string `json:"disconnected_at"`
	IsActive       bool   `json:"is_active"`
	CreatedAt      string `json:"created_at"`
}

type WSMessage struct {
	ID           string `json:"id"`
	ConnectionID string `json:"connection_id"`
	Direction    string `json:"direction"`
	Content      string `json:"content"`
	CreatedAt    string `json:"created_at"`
}

type CacheEntry struct {
	Key       string `json:"key"`
	Value     string `json:"value"`
	TTL       int    `json:"ttl"`
	ExpiresAt string `json:"expires_at"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
}

type Notification struct {
	ID        string `json:"id"`
	Title     string `json:"title"`
	Body      string `json:"body"`
	Type      string `json:"type"`
	IsRead    bool   `json:"is_read"`
	CreatedAt string `json:"created_at"`
}

type LogEntry struct {
	ID        string `json:"id"`
	Level     string `json:"level"`
	Message   string `json:"message"`
	Meta      string `json:"meta"`
	CreatedAt string `json:"created_at"`
}

type FilesPage struct {
	Files      []FileRecord `json:"files"`
	Total      int          `json:"total"`
	Page       int          `json:"page"`
	PerPage    int          `json:"per_page"`
	TotalPages int          `json:"total_pages"`
}

func migrateDB(db *sql.DB) error {
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
	`
	_, err := db.Exec(schema)
	return err
}

func createCollectionTable(db *sql.DB, name string) error {
	_, err := db.Exec(fmt.Sprintf(
		`CREATE TABLE IF NOT EXISTS "_data_%s" (
			id         TEXT PRIMARY KEY,
			data       TEXT NOT NULL DEFAULT '{}',
			created_at TEXT NOT NULL DEFAULT (datetime('now')),
			updated_at TEXT NOT NULL DEFAULT (datetime('now'))
		)`, name))
	return err
}

func createCollection(db *sql.DB, name, schema string) error {
	_, err := db.Exec(
		`INSERT INTO _collections (name, schema) VALUES (?, ?)`,
		name, schema,
	)
	if err != nil {
		return fmt.Errorf("create collection: %w", err)
	}
	return createCollectionTable(db, name)
}

func getCollection(db *sql.DB, name string) (*Collection, error) {
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

func listCollections(db *sql.DB) ([]Collection, error) {
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

func deleteCollection(db *sql.DB, name string) error {
	if _, err := db.Exec(`DELETE FROM _collections WHERE name = ?`, name); err != nil {
		return err
	}
	_, err := db.Exec(fmt.Sprintf(`DROP TABLE IF EXISTS "_data_%s"`, name))
	return err
}

func createRecord(db *sql.DB, collection, id string, data json.RawMessage) (*Record, error) {
	now := time.Now().UTC().Format(time.RFC3339)
	raw := string(data)
	_, err := db.Exec(
		fmt.Sprintf(`INSERT INTO "_data_%s" (id, data, created_at, updated_at) VALUES (?, ?, ?, ?)`, collection),
		id, raw, now, now,
	)
	if err != nil {
		return nil, fmt.Errorf("insert record: %w", err)
	}
	return &Record{ID: id, Data: data, CreatedAt: now, UpdatedAt: now}, nil
}

func getRecord(db *sql.DB, collection, id string) (*Record, error) {
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

func listRecords(db *sql.DB, collection string, page, perPage int) (*RecordsPage, error) {
	var total int
	err := db.QueryRow(
		fmt.Sprintf(`SELECT COUNT(*) FROM "_data_%s"`, collection),
	).Scan(&total)
	if err != nil {
		return nil, err
	}
	totalPages := (total + perPage - 1) / perPage
	if totalPages == 0 {
		totalPages = 1
	}

	offset := (page - 1) * perPage
	rows, err := db.Query(
		fmt.Sprintf(`SELECT id, data, created_at, updated_at FROM "_data_%s" ORDER BY created_at DESC LIMIT ? OFFSET ?`, collection),
		perPage, offset,
	)
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

	return &RecordsPage{
		Records:    records,
		Total:      total,
		Page:       page,
		PerPage:    perPage,
		TotalPages: totalPages,
	}, nil
}

func updateRecord(db *sql.DB, collection, id string, data json.RawMessage) (*Record, error) {
	now := time.Now().UTC().Format(time.RFC3339)
	raw := string(data)
	_, err := db.Exec(
		fmt.Sprintf(`UPDATE "_data_%s" SET data = ?, updated_at = ? WHERE id = ?`, collection),
		raw, now, id,
	)
	if err != nil {
		return nil, err
	}
	return &Record{ID: id, Data: data, CreatedAt: "", UpdatedAt: now}, nil
}

func deleteRecord(db *sql.DB, collection, id string) error {
	_, err := db.Exec(
		fmt.Sprintf(`DELETE FROM "_data_%s" WHERE id = ?`, collection),
		id,
	)
	return err
}

func createBucket(db *sql.DB, name string, isPublic bool) (*Bucket, error) {
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

func getBucket(db *sql.DB, name string) (*Bucket, error) {
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

func listBuckets(db *sql.DB) ([]Bucket, error) {
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

func deleteBucket(db *sql.DB, name string) ([]FileRecord, error) {
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

func insertFile(db *sql.DB, bucket, id, filename, mimeType string, size int64) (*FileRecord, error) {
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

func getFile(db *sql.DB, id string) (*FileRecord, error) {
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

func listFiles(db *sql.DB, bucket string, page, perPage int) (*FilesPage, error) {
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

func deleteFile(db *sql.DB, id string) (*FileRecord, error) {
	f, err := getFile(db, id)
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

// --- Webhooks ---

func listWebhooks(db *sql.DB) ([]Webhook, error) {
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

func getWebhook(db *sql.DB, id string) (*Webhook, error) {
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

func createWebhook(db *sql.DB, name, url, eventsStr, secret string) (*Webhook, error) {
	now := time.Now().UTC().Format(time.RFC3339)
	id := generateID()
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

func updateWebhook(db *sql.DB, id, name, url, eventsStr, secret string, isActive bool) (*Webhook, error) {
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

func deleteWebhook(db *sql.DB, id string) error {
	if _, err := db.Exec(`DELETE FROM _webhook_logs WHERE webhook_id = ?`, id); err != nil {
		return err
	}
	_, err := db.Exec(`DELETE FROM _webhooks WHERE id = ?`, id)
	return err
}

func listWebhookLogs(db *sql.DB, webhookID string, limit int) ([]WebhookLog, error) {
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

func insertWebhookLog(db *sql.DB, log *WebhookLog) error {
	_, err := db.Exec(
		`INSERT INTO _webhook_logs (id, webhook_id, event, url, request_body, response_status, response_body, error, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
		log.ID, log.WebhookID, log.Event, log.URL, log.RequestBody, log.ResponseStatus, log.ResponseBody, log.Error, log.Status, log.CreatedAt,
	)
	return err
}

// --- Secrets ---

func listSecrets(db *sql.DB) ([]Secret, error) {
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

func getSecret(db *sql.DB, id string) (*Secret, error) {
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

func createSecret(db *sql.DB, id, name, value, scope string) (*Secret, error) {
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

func updateSecret(db *sql.DB, id, name, value, scope string) (*Secret, error) {
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

func deleteSecret(db *sql.DB, id string) error {
	_, err := db.Exec(`DELETE FROM _secrets WHERE id = ?`, id)
	return err
}

// --- CronJobs ---

func listCronJobs(db *sql.DB) ([]CronJob, error) {
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

func getCronJob(db *sql.DB, id string) (*CronJob, error) {
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

func insertCronJob(db *sql.DB, id, name, schedule, command, method, headers, body string, isActive bool) (*CronJob, error) {
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

func updateCronJob(db *sql.DB, id, name, schedule, command, method, headers, body string, isActive bool) (*CronJob, error) {
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

func updateCronJobLastRun(db *sql.DB, id, lastRunAt, lastRunStatus string) {
	db.Exec(`UPDATE _cronjobs SET last_run_at = ?, last_run_status = ? WHERE id = ?`, lastRunAt, lastRunStatus, id)
}

func deleteCronJob(db *sql.DB, id string) error {
	db.Exec(`DELETE FROM _cronjob_logs WHERE cronjob_id = ?`, id)
	_, err := db.Exec(`DELETE FROM _cronjobs WHERE id = ?`, id)
	return err
}

func listCronJobLogs(db *sql.DB, cronjobID string) ([]CronJobLog, error) {
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

func insertCronJobLog(db *sql.DB, log *CronJobLog) error {
	_, err := db.Exec(
		`INSERT INTO _cronjob_logs (id, cronjob_id, started_at, finished_at, duration_ms, status, output, error) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
		log.ID, log.CronJobID, log.StartedAt, log.FinishedAt, log.DurationMs, log.Status, log.Output, log.Error,
	)
	return err
}

func insertWSConnection(db *sql.DB, id, remoteAddr, path, userAgent string) {
	now := time.Now().UTC().Format(time.RFC3339)
	db.Exec(`INSERT INTO _ws_connections (id, remote_addr, path, user_agent, connected_at) VALUES (?, ?, ?, ?, ?)`,
		id, remoteAddr, path, userAgent, now)
}

func updateWSDisconnect(db *sql.DB, id string) {
	now := time.Now().UTC().Format(time.RFC3339)
	db.Exec(`UPDATE _ws_connections SET is_active = 0, disconnected_at = ? WHERE id = ?`, now, id)
}

func listWSConnections(db *sql.DB) ([]WSConnection, error) {
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

func getWSConnection(db *sql.DB, id string) (*WSConnection, error) {
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

func deleteWSConnection(db *sql.DB, id string) error {
	_, err := db.Exec(`DELETE FROM _ws_connections WHERE id = ?`, id)
	return err
}

func insertWSMessage(db *sql.DB, connectionID, direction, content string) {
	now := time.Now().UTC().Format(time.RFC3339)
	id := generateID()
	db.Exec(`INSERT INTO _ws_messages (id, connection_id, direction, content, created_at) VALUES (?, ?, ?, ?, ?)`,
		id, connectionID, direction, content, now)
}

func listWSMessages(db *sql.DB, connectionID string) ([]WSMessage, error) {
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

func listAllWSMessages(db *sql.DB) ([]WSMessage, error) {
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

func setCacheEntry(db *sql.DB, key, value string, ttl int) (*CacheEntry, error) {
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

func getCacheEntry(db *sql.DB, key string) (*CacheEntry, error) {
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

func deleteCacheEntry(db *sql.DB, key string) (bool, error) {
	res, err := db.Exec(`DELETE FROM _cache WHERE key = ?`, key)
	if err != nil {
		return false, err
	}
	n, _ := res.RowsAffected()
	return n > 0, nil
}

func listCacheEntries(db *sql.DB) ([]CacheEntry, error) {
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

func flushCache(db *sql.DB) error {
	_, err := db.Exec(`DELETE FROM _cache`)
	return err
}

func getCacheStats(db *sql.DB) (map[string]any, error) {
	var total, expired int
	db.QueryRow(`SELECT COUNT(*) FROM _cache`).Scan(&total)
	now := time.Now().UTC().Format(time.RFC3339)
	db.QueryRow(`SELECT COUNT(*) FROM _cache WHERE ttl > 0 AND expires_at <= ?`, now).Scan(&expired)
	return map[string]any{
		"total_entries":   total,
		"expired_entries": expired,
	}, nil
}
