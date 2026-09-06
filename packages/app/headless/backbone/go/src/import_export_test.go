package main

import (
	"database/sql"
	"net/http/httptest"
	"strings"
	"testing"
	"time"
)

func TestHandleExport(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	resp := request(t, h, "GET", "/api/export", "")
	if resp.StatusCode != 200 {
		t.Fatalf("expected 200, got %d", resp.StatusCode)
	}
}

func TestHandleExport_WithData(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	request(t, h, "POST", "/api/collections", `{"name":"export_test"}`)
	request(t, h, "POST", "/api/collections/export_test/records", `{"data":{"hello":"world"}}`)

	resp := request(t, h, "GET", "/api/export", "")
	if resp.StatusCode != 200 {
		t.Fatalf("expected 200, got %d", resp.StatusCode)
	}
}

func TestHandleImport(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	body := `{
		"collections":[{"name":"imported_collection","schema":"{}"}],
		"records":{"imported_collection":[{"id":"r1","data":{"name":"imported"}}]},
		"buckets":[],
		"files":[]
	}`
	resp := request(t, h, "POST", "/api/import", body)
	if resp.StatusCode != 200 {
		t.Fatalf("expected 200, got %d", resp.StatusCode)
	}
}

func TestHandleImport_SkipExisting(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	request(t, h, "POST", "/api/collections", `{"name":"import_skip"}`)
	request(t, h, "POST", "/api/collections/import_skip/records", `{"id":"r1","data":{"x":1}}`)

	body := `{
		"collections":[{"name":"import_skip","schema":"{}"}],
		"records":{"import_skip":[{"id":"r1","data":{"x":2}}]},
		"buckets":[],
		"files":[]
	}`
	resp := request(t, h, "POST", "/api/import?skip_existing=true", body)
	if resp.StatusCode != 200 {
		t.Fatalf("expected 200, got %d", resp.StatusCode)
	}
}

func TestHandleImport_Conflict(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	request(t, h, "POST", "/api/collections", `{"name":"import_conflict"}`)
	request(t, h, "POST", "/api/collections/import_conflict/records", `{"id":"r1","data":{"x":1}}`)

	body := `{
		"collections":[{"name":"import_conflict","schema":"{}"}],
		"records":{"import_conflict":[{"id":"r1","data":{"x":2}}]},
		"buckets":[],
		"files":[]
	}`
	resp := request(t, h, "POST", "/api/import", body)
	if resp.StatusCode != 409 {
		t.Fatalf("expected 409, got %d", resp.StatusCode)
	}
}

func TestHandleImport_InvalidJSON(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	resp := request(t, h, "POST", "/api/import", `not json`)
	if resp.StatusCode != 400 {
		t.Fatalf("expected 400, got %d", resp.StatusCode)
	}
}

func TestHandleImport_BucketConflict(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	request(t, h, "POST", "/api/buckets", `{"name":"import_bucket"}`)

	body := `{
		"collections":[],
		"records":{},
		"buckets":[{"name":"import_bucket","is_public":false}],
		"files":[]
	}`
	resp := request(t, h, "POST", "/api/import", body)
	if resp.StatusCode != 409 {
		t.Fatalf("expected 409, got %d", resp.StatusCode)
	}
}

func TestHandleImport_RecordConflict(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	body := `{
		"collections":[{"name":"import_rec_conflict","schema":"{}"}],
		"records":{"import_rec_conflict":[{"id":"r1","data":{"x":1}}]},
		"buckets":[],
		"files":[]
	}`
	resp := request(t, h, "POST", "/api/import", body)
	if resp.StatusCode != 200 {
		t.Fatalf("expected 200 on first import, got %d", resp.StatusCode)
	}

	body2 := `{
		"collections":[],
		"records":{"import_rec_conflict":[{"id":"r1","data":{"x":2}}]},
		"buckets":[],
		"files":[]
	}`
	resp = request(t, h, "POST", "/api/import", body2)
	if resp.StatusCode != 409 {
		t.Fatalf("expected 409, got %d", resp.StatusCode)
	}
}

func TestHandleImport_SkipExisting_Record(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	body := `{
		"collections":[{"name":"import_rec_skip","schema":"{}"}],
		"records":{"import_rec_skip":[{"id":"r1","data":{"x":1}}]},
		"buckets":[],
		"files":[]
	}`
	resp := request(t, h, "POST", "/api/import", body)
	if resp.StatusCode != 200 {
		t.Fatalf("expected 200 on first import, got %d", resp.StatusCode)
	}

	body2 := `{
		"collections":[],
		"records":{"import_rec_skip":[{"id":"r1","data":{"x":2}}]},
		"buckets":[],
		"files":[]
	}`
	resp = request(t, h, "POST", "/api/import?skip_existing=true", body2)
	if resp.StatusCode != 200 {
		t.Fatalf("expected 200 on skip, got %d", resp.StatusCode)
	}
}

func TestHandleImport_SkipExisting_Bucket(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	request(t, h, "POST", "/api/buckets", `{"name":"import_bucket_skip","is_public":false}`)

	body := `{
		"collections":[],
		"records":{},
		"buckets":[{"name":"import_bucket_skip","is_public":false}],
		"files":[]
	}`
	resp := request(t, h, "POST", "/api/import?skip_existing=true", body)
	if resp.StatusCode != 200 {
		t.Fatalf("expected 200 on skip, got %d", resp.StatusCode)
	}
}

func TestHandleImport_WithFiles(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	request(t, h, "POST", "/api/buckets", `{"name":"file_bucket","is_public":false}`)

	body := `{
		"collections":[],
		"records":{},
		"buckets":[],
		"files":[{"id":"f1","bucket":"file_bucket","filename":"test.txt","mime_type":"text/plain","size":100}]
	}`
	resp := request(t, h, "POST", "/api/import", body)
	if resp.StatusCode != 200 {
		t.Fatalf("expected 200, got %d", resp.StatusCode)
	}
}

func TestHandleImport_FileConflict(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	request(t, h, "POST", "/api/buckets", `{"name":"file_conf_bucket","is_public":false}`)

	body := `{
		"collections":[],
		"records":{},
		"buckets":[],
		"files":[{"id":"f1","bucket":"file_conf_bucket","filename":"test.txt","mime_type":"text/plain","size":100}]
	}`
	resp := request(t, h, "POST", "/api/import", body)
	if resp.StatusCode != 200 {
		t.Fatalf("expected 200 on first import, got %d", resp.StatusCode)
	}

	resp = request(t, h, "POST", "/api/import", body)
	if resp.StatusCode != 409 {
		t.Fatalf("expected 409 on file conflict, got %d", resp.StatusCode)
	}
}

func TestHandleImport_SkipExisting_File(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	request(t, h, "POST", "/api/buckets", `{"name":"file_skip_bucket","is_public":false}`)

	body := `{
		"collections":[],
		"records":{},
		"buckets":[],
		"files":[{"id":"f1","bucket":"file_skip_bucket","filename":"test.txt","mime_type":"text/plain","size":100}]
	}`
	resp := request(t, h, "POST", "/api/import?skip_existing=true", body)
	if resp.StatusCode != 200 {
		t.Fatalf("expected 200 on first import, got %d", resp.StatusCode)
	}

	resp = request(t, h, "POST", "/api/import?skip_existing=true", body)
	if resp.StatusCode != 200 {
		t.Fatalf("expected 200 on skip, got %d", resp.StatusCode)
	}
}

func TestHandleImport_DirectErrorPaths(t *testing.T) {
	t.Run("invalid JSON body", func(t *testing.T) {
		db, cleanup := newTestDB(t)
		defer cleanup()
		w := httptest.NewRecorder()
		r := httptest.NewRequest("POST", "/", strings.NewReader("not json"))
		srv := &Server{db: db, dataDir: t.TempDir()}
		srv.handleImport(w, r)
		if w.Code != 400 {
			t.Fatalf("expected 400, got %d", w.Code)
		}
	})

	t.Run("getCollection error with closed DB", func(t *testing.T) {
		db, err := sql.Open("sqlite", ":memory:")
		if err != nil {
			t.Fatal(err)
		}
		db.Close()
		w := httptest.NewRecorder()
		body := `{"collections":[{"name":"test","schema":"{}"}],"records":{},"buckets":[],"files":[]}`
		r := httptest.NewRequest("POST", "/", strings.NewReader(body))
		srv := &Server{db: db, dataDir: t.TempDir()}
		srv.handleImport(w, r)
		if w.Code != 500 {
			t.Fatalf("expected 500, got %d", w.Code)
		}
	})

	t.Run("getBucket error with closed DB (no collections or records)", func(t *testing.T) {
		db, err := sql.Open("sqlite", ":memory:")
		if err != nil {
			t.Fatal(err)
		}
		db.Close()
		w := httptest.NewRecorder()
		body := `{"collections":[],"records":{},"buckets":[{"name":"test","is_public":false}],"files":[]}`
		r := httptest.NewRequest("POST", "/", strings.NewReader(body))
		srv := &Server{db: db, dataDir: t.TempDir()}
		srv.handleImport(w, r)
		if w.Code != 500 {
			t.Fatalf("expected 500, got %d", w.Code)
		}
	})
}

func TestHandleExport_ListRecordsError(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	now := time.Now().UTC().Format(time.RFC3339)
	_, err := db.Exec(`INSERT INTO _collections (name, schema, created_at, updated_at) VALUES (?, ?, ?, ?)`,
		"orphan_collection", "{}", now, now)
	if err != nil {
		t.Fatal(err)
	}

	w := httptest.NewRecorder()
	r := httptest.NewRequest("GET", "/api/export", nil)
	srv := &Server{db: db, dataDir: t.TempDir()}
	srv.handleExport(w, r)
	if w.Code != 500 {
		t.Fatalf("expected 500 from listRecords error, got %d", w.Code)
	}
}

func TestHandleExport_ListBucketsError(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	_, err := db.Exec(`INSERT INTO _collections (name, schema, created_at, updated_at) VALUES (?, ?, ?, ?)`,
		"real_collection", "{}", time.Now().UTC().Format(time.RFC3339), time.Now().UTC().Format(time.RFC3339))
	if err != nil {
		t.Fatal(err)
	}
	_, err = db.Exec(`CREATE TABLE IF NOT EXISTS "_data_real_collection" (id TEXT PRIMARY KEY, data TEXT NOT NULL DEFAULT '{}', created_at TEXT NOT NULL DEFAULT (datetime('now')), updated_at TEXT NOT NULL DEFAULT (datetime('now')))`)
	if err != nil {
		t.Fatal(err)
	}

	_, err = db.Exec(`DROP TABLE IF EXISTS _buckets`)
	if err != nil {
		t.Fatal(err)
	}

	w := httptest.NewRecorder()
	r := httptest.NewRequest("GET", "/api/export", nil)
	srv := &Server{db: db, dataDir: t.TempDir()}
	srv.handleExport(w, r)
	if w.Code != 500 {
		t.Fatalf("expected 500 from listBuckets error, got %d", w.Code)
	}
}

func TestHandleExport_ListFilesError(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	_, err := db.Exec(`INSERT INTO _collections (name, schema, created_at, updated_at) VALUES (?, ?, ?, ?)`,
		"real_collection", "{}", time.Now().UTC().Format(time.RFC3339), time.Now().UTC().Format(time.RFC3339))
	if err != nil {
		t.Fatal(err)
	}
	_, err = db.Exec(`CREATE TABLE IF NOT EXISTS "_data_real_collection" (id TEXT PRIMARY KEY, data TEXT NOT NULL DEFAULT '{}', created_at TEXT NOT NULL DEFAULT (datetime('now')), updated_at TEXT NOT NULL DEFAULT (datetime('now')))`)
	if err != nil {
		t.Fatal(err)
	}

	_, err = db.Exec(`INSERT INTO _buckets (name, is_public, created_at, updated_at) VALUES (?, ?, ?, ?)`,
		"test-bucket", 1, time.Now().UTC().Format(time.RFC3339), time.Now().UTC().Format(time.RFC3339))
	if err != nil {
		t.Fatal(err)
	}

	_, err = db.Exec(`DROP TABLE IF EXISTS _files`)
	if err != nil {
		t.Fatal(err)
	}

	w := httptest.NewRecorder()
	r := httptest.NewRequest("GET", "/api/export", nil)
	srv := &Server{db: db, dataDir: t.TempDir()}
	srv.handleExport(w, r)
	if w.Code != 500 {
		t.Fatalf("expected 500 from listFiles error, got %d", w.Code)
	}
}

func TestImportExportAuthRequired(t *testing.T) {
	srv := newTestServer(t)
	h := srv.routes()

	resp := request(t, h, "GET", "/api/export", "")
	if resp.StatusCode != 401 {
		t.Fatalf("expected 401, got %d", resp.StatusCode)
	}

	resp = request(t, h, "POST", "/api/import", `{}`)
	if resp.StatusCode != 401 {
		t.Fatalf("expected 401, got %d", resp.StatusCode)
	}
}
