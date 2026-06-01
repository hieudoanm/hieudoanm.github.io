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
	dir := os.Getenv("SIMPLEBASE_DATA")
	if dir == "" {
		home, err := os.UserHomeDir()
		if err != nil {
			return nil, fmt.Errorf("get home dir: %w", err)
		}
		dir = filepath.Join(home, ".simplebase")
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
