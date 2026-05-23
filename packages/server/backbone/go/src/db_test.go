package main

import (
	"testing"
	"time"
)

func TestBuildFilterClause_Empty(t *testing.T) {
	clause, args := buildFilterClause(nil)
	if clause != "" || args != nil {
		t.Fatalf("expected empty, got clause=%q args=%v", clause, args)
	}
	clause, args = buildFilterClause([]string{})
	if clause != "" || args != nil {
		t.Fatalf("expected empty, got clause=%q args=%v", clause, args)
	}
}

func TestBuildFilterClause_Equals(t *testing.T) {
	clause, args := buildFilterClause([]string{"name=hello"})
	if clause != " WHERE CAST(json_extract(data, '$.name') AS TEXT) = ?" {
		t.Fatalf("unexpected clause: %q", clause)
	}
	if len(args) != 1 || args[0] != "hello" {
		t.Fatalf("unexpected args: %v", args)
	}
}

func TestBuildFilterClause_NotEquals(t *testing.T) {
	clause, args := buildFilterClause([]string{"name!=hello"})
	if clause != " WHERE CAST(json_extract(data, '$.name') AS TEXT) != ?" {
		t.Fatalf("unexpected clause: %q", clause)
	}
	if args[0] != "hello" {
		t.Fatalf("unexpected args: %v", args)
	}
}

func TestBuildFilterClause_GreaterThan(t *testing.T) {
	clause, _ := buildFilterClause([]string{"age>18"})
	if clause != " WHERE json_extract(data, '$.age') > ?" {
		t.Fatalf("unexpected clause: %q", clause)
	}
}

func TestBuildFilterClause_LessThan(t *testing.T) {
	clause, _ := buildFilterClause([]string{"price<100"})
	if clause != " WHERE json_extract(data, '$.price') < ?" {
		t.Fatalf("unexpected clause: %q", clause)
	}
}

func TestBuildFilterClause_GreaterThanOrEqual(t *testing.T) {
	clause, _ := buildFilterClause([]string{"age>=18"})
	if clause != " WHERE json_extract(data, '$.age') >= ?" {
		t.Fatalf("unexpected clause: %q", clause)
	}
}

func TestBuildFilterClause_LessThanOrEqual(t *testing.T) {
	clause, _ := buildFilterClause([]string{"price<=50"})
	if clause != " WHERE json_extract(data, '$.price') <= ?" {
		t.Fatalf("unexpected clause: %q", clause)
	}
}

func TestBuildFilterClause_NoOperator(t *testing.T) {
	clause, args := buildFilterClause([]string{"justfield"})
	if clause != "" || args != nil {
		t.Fatalf("expected empty for no operator, got %q %v", clause, args)
	}
}

func TestBuildFilterClause_Multiple(t *testing.T) {
	clause, args := buildFilterClause([]string{"name=hello", "age>18"})
	expected := " WHERE CAST(json_extract(data, '$.name') AS TEXT) = ? AND json_extract(data, '$.age') > ?"
	if clause != expected {
		t.Fatalf("unexpected clause:\n  got:  %q\n  want: %q", clause, expected)
	}
	if len(args) != 2 || args[0] != "hello" || args[1] != "18" {
		t.Fatalf("unexpected args: %v", args)
	}
}

func TestBuildFilterClause_AllSkipped(t *testing.T) {
	clause, args := buildFilterClause([]string{"noop", "also_noop"})
	if clause != "" || args != nil {
		t.Fatalf("expected empty when all skipped, got %q %v", clause, args)
	}
}

func TestBuildSearchClause_Empty(t *testing.T) {
	clause, args := buildSearchClause("")
	if clause != "" || args != nil {
		t.Fatalf("expected empty, got clause=%q args=%v", clause, args)
	}
}

func TestBuildSearchClause_SingleWord(t *testing.T) {
	clause, args := buildSearchClause("hello")
	if clause != " (data LIKE ?)" {
		t.Fatalf("unexpected clause: %q", clause)
	}
	if len(args) != 1 || args[0] != "%hello%" {
		t.Fatalf("unexpected args: %v", args)
	}
}

func TestBuildSearchClause_MultipleWords(t *testing.T) {
	clause, args := buildSearchClause("hello world")
	if clause != " (data LIKE ? AND data LIKE ?)" {
		t.Fatalf("unexpected clause: %q", clause)
	}
	if len(args) != 2 || args[0] != "%hello%" || args[1] != "%world%" {
		t.Fatalf("unexpected args: %v", args)
	}
}

func TestBuildSortClause_Empty(t *testing.T) {
	clause := buildSortClause("")
	if clause != "ORDER BY created_at DESC" {
		t.Fatalf("unexpected clause: %q", clause)
	}
}

func TestBuildSortClause_SingleField(t *testing.T) {
	clause := buildSortClause("name")
	if clause != "ORDER BY json_extract(data, '$.name') ASC" {
		t.Fatalf("unexpected clause: %q", clause)
	}
}

func TestBuildSortClause_Descending(t *testing.T) {
	clause := buildSortClause("-name")
	if clause != "ORDER BY json_extract(data, '$.name') DESC" {
		t.Fatalf("unexpected clause: %q", clause)
	}
}

func TestBuildSortClause_MultipleFields(t *testing.T) {
	clause := buildSortClause("name,-age")
	if clause != "ORDER BY json_extract(data, '$.name') ASC, json_extract(data, '$.age') DESC" {
		t.Fatalf("unexpected clause: %q", clause)
	}
}

func TestBuildSortClause_EmptyParts(t *testing.T) {
	clause := buildSortClause("name,,age")
	if clause != "ORDER BY json_extract(data, '$.name') ASC, json_extract(data, '$.age') ASC" {
		t.Fatalf("unexpected clause: %q", clause)
	}
}

func TestSchemaTypeToSQL(t *testing.T) {
	tests := []struct {
		typ      string
		expected string
	}{
		{"string", "TEXT"},
		{"email", "TEXT"},
		{"url", "TEXT"},
		{"number", "REAL"},
		{"integer", "INTEGER"},
		{"boolean", "INTEGER"},
		{"array", "TEXT"},
		{"object", "TEXT"},
		{"unknown", "TEXT"},
	}
	for _, tt := range tests {
		got := schemaTypeToSQL(tt.typ)
		if got != tt.expected {
			t.Errorf("schemaTypeToSQL(%q) = %q, want %q", tt.typ, got, tt.expected)
		}
	}
}

func TestParseSchemaColumns_Empty(t *testing.T) {
	cols := parseSchemaColumns("")
	if cols != nil {
		t.Fatalf("expected nil, got %v", cols)
	}
	cols = parseSchemaColumns("{}")
	if cols != nil {
		t.Fatalf("expected nil for {}, got %v", cols)
	}
}

func TestParseSchemaColumns_InvalidJSON(t *testing.T) {
	cols := parseSchemaColumns("not json")
	if cols != nil {
		t.Fatalf("expected nil, got %v", cols)
	}
}

func TestParseSchemaColumns_Valid(t *testing.T) {
	cols := parseSchemaColumns(`{"name":"string","age":"integer"}`)
	if len(cols) != 2 {
		t.Fatalf("expected 2 columns, got %d", len(cols))
	}
	m := make(map[string]string)
	for _, c := range cols {
		m[c.Name] = c.ColType
	}
	if m["name"] != "TEXT" {
		t.Fatalf("expected name=TEXT, got %q", m["name"])
	}
	if m["age"] != "INTEGER" {
		t.Fatalf("expected age=INTEGER, got %q", m["age"])
	}
}

func TestParseSchemaColumns_OptionalField(t *testing.T) {
	cols := parseSchemaColumns(`{"email?":"email","name":"string"}`)
	if len(cols) != 2 {
		t.Fatalf("expected 2 columns, got %d", len(cols))
	}
	m := make(map[string]string)
	for _, c := range cols {
		m[c.Name] = c.ColType
	}
	if m["email"] != "TEXT" {
		t.Fatalf("expected email=TEXT, got %q", m["email"])
	}
}

// --- Cache DB Function Tests ---

func TestSetGetDeleteCacheEntry(t *testing.T) {
	dir := t.TempDir()
	t.Setenv("BACKBONE_DATA", dir)
	db, err := openDB()
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()
	migrateDB(db)

	entry, err := setCacheEntry(db, "mykey", "myvalue", 0)
	if err != nil {
		t.Fatal(err)
	}
	if entry.Key != "mykey" || entry.Value != "myvalue" {
		t.Fatalf("unexpected entry: %+v", entry)
	}

	got, err := getCacheEntry(db, "mykey")
	if err != nil {
		t.Fatal(err)
	}
	if got == nil {
		t.Fatal("expected entry")
	}
	if got.Value != "myvalue" {
		t.Fatalf("expected myvalue, got %s", got.Value)
	}

	// delete
	found, err := deleteCacheEntry(db, "mykey")
	if err != nil {
		t.Fatal(err)
	}
	if !found {
		t.Fatal("expected found=true")
	}

	got, _ = getCacheEntry(db, "mykey")
	if got != nil {
		t.Fatal("expected nil after delete")
	}

	// delete not found
	found, _ = deleteCacheEntry(db, "nonexistent")
	if found {
		t.Fatal("expected found=false")
	}
}

func TestSetCacheEntryWithTTL(t *testing.T) {
	dir := t.TempDir()
	t.Setenv("BACKBONE_DATA", dir)
	db, err := openDB()
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()
	migrateDB(db)

	setCacheEntry(db, "temp", "data", 1)
	got, _ := getCacheEntry(db, "temp")
	if got == nil {
		t.Fatal("expected entry before TTL")
	}
	if got.Value != "data" {
		t.Fatalf("expected data, got %s", got.Value)
	}

	time.Sleep(1100 * time.Millisecond)
	got, _ = getCacheEntry(db, "temp")
	if got != nil {
		t.Fatal("expected nil after TTL expired")
	}
}

func TestListCacheEntries(t *testing.T) {
	dir := t.TempDir()
	t.Setenv("BACKBONE_DATA", dir)
	db, err := openDB()
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()
	migrateDB(db)

	setCacheEntry(db, "a", "1", 0)
	setCacheEntry(db, "b", "2", 0)

	entries, err := listCacheEntries(db)
	if err != nil {
		t.Fatal(err)
	}
	if len(entries) != 2 {
		t.Fatalf("expected 2 entries, got %d", len(entries))
	}
}

func TestFlushCache(t *testing.T) {
	dir := t.TempDir()
	t.Setenv("BACKBONE_DATA", dir)
	db, err := openDB()
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()
	migrateDB(db)

	setCacheEntry(db, "x", "1", 0)
	setCacheEntry(db, "y", "2", 0)

	if err := flushCache(db); err != nil {
		t.Fatal(err)
	}

	entries, _ := listCacheEntries(db)
	if len(entries) != 0 {
		t.Fatalf("expected 0 entries after flush, got %d", len(entries))
	}
}

func TestGetCacheStats(t *testing.T) {
	dir := t.TempDir()
	t.Setenv("BACKBONE_DATA", dir)
	db, err := openDB()
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()
	migrateDB(db)

	stats, err := getCacheStats(db)
	if err != nil {
		t.Fatal(err)
	}
	total, _ := stats["total_entries"].(int)
	if total != 0 {
		t.Fatalf("expected 0, got %d", total)
	}

	setCacheEntry(db, "k", "v", 0)
	stats, _ = getCacheStats(db)
	total, _ = stats["total_entries"].(int)
	if total != 1 {
		t.Fatalf("expected 1, got %d", total)
	}
}

// --- WebSocket DB Function Tests ---

func TestWSConnectionDBFunctions(t *testing.T) {
	dir := t.TempDir()
	t.Setenv("BACKBONE_DATA", dir)
	db, err := openDB()
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()
	migrateDB(db)

	insertWSConnection(db, "c1", "10.0.0.1", "/ws", "agent")
	insertWSConnection(db, "c2", "10.0.0.2", "/ws2", "")

	conns, err := listWSConnections(db)
	if err != nil {
		t.Fatal(err)
	}
	if len(conns) != 2 {
		t.Fatalf("expected 2, got %d", len(conns))
	}

	conn, err := getWSConnection(db, "c1")
	if err != nil {
		t.Fatal(err)
	}
	if conn == nil || !conn.IsActive {
		t.Fatal("expected active connection")
	}

	updateWSDisconnect(db, "c1")
	conn, _ = getWSConnection(db, "c1")
	if conn.IsActive {
		t.Fatal("expected inactive after disconnect")
	}

	// get nonexistent
	conn, err = getWSConnection(db, "nonexistent")
	if err != nil {
		t.Fatal(err)
	}
	if conn != nil {
		t.Fatal("expected nil")
	}

	deleteWSConnection(db, "c2")
	conn, _ = getWSConnection(db, "c2")
	if conn != nil {
		t.Fatal("expected nil after delete")
	}
}

// --- resolveExpands Tests ---

func TestResolveExpands(t *testing.T) {
	dir := t.TempDir()
	t.Setenv("BACKBONE_DATA", dir)
	db, err := openDB()
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()
	migrateDB(db)

	createCollection(db, "authors", "")
	createCollection(db, "books", "")

	createRecord(db, "authors", "author1", []byte(`{"name":"Alice"}`))
	createRecord(db, "books", "book1", []byte(`{"title":"Go Programming","author":"author1"}`))

	book, _ := getRecord(db, "books", "book1")
	result, err := resolveExpands(db, []Record{*book}, []string{"author"})
	if err != nil {
		t.Fatal(err)
	}

	expand, ok := result["book1"]
	if !ok {
		t.Fatal("expected expand for book1")
	}
	authorField, ok := expand["author"].(map[string]any)
	if !ok {
		t.Fatal("expected author field in expand")
	}
	collectionName, _ := authorField["collection"].(string)
	if collectionName != "authors" {
		t.Fatalf("expected authors, got %s", collectionName)
	}
}

func TestResolveExpandsNoFields(t *testing.T) {
	dir := t.TempDir()
	t.Setenv("BACKBONE_DATA", dir)
	db, err := openDB()
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()
	migrateDB(db)

	rec := Record{ID: "r1", Data: []byte(`{"name":"test"}`)}
	result, err := resolveExpands(db, []Record{rec}, nil)
	if err != nil {
		t.Fatal(err)
	}
	if result != nil {
		t.Fatal("expected nil for no expand fields")
	}

	result, err = resolveExpands(db, nil, []string{"field"})
	if err != nil {
		t.Fatal(err)
	}
	if result != nil {
		t.Fatal("expected nil for no records")
	}
}

// --- migrateCollectionSchema Tests ---

// --- Webhook Log Tests ---

func TestWebhookLogDBFunctions(t *testing.T) {
	dir := t.TempDir()
	t.Setenv("BACKBONE_DATA", dir)
	db, err := openDB()
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()
	migrateDB(db)

	wh1, _ := createWebhook(db, "test hook", "https://example.com/hook", `["record.create"]`, "")
	createWebhook(db, "hook 2", "https://example.com/hook2", `["record.delete"]`, "secret")

	insertWebhookLog(db, &WebhookLog{
		ID:             generateID(),
		WebhookID:      wh1.ID,
		Event:          "record.create",
		URL:            "https://example.com/hook",
		RequestBody:    `{"event":"record.create"}`,
		ResponseStatus: 200,
		ResponseBody:   "ok",
		Status:         "success",
		CreatedAt:      time.Now().UTC().Format(time.RFC3339),
	})

	logs, err := listWebhookLogs(db, wh1.ID, 10)
	if err != nil {
		t.Fatal(err)
	}
	if len(logs) != 1 {
		t.Fatalf("expected 1 log, got %d", len(logs))
	}

	// Nonexistent webhook
	logs, err = listWebhookLogs(db, "nonexistent", 10)
	if err != nil {
		t.Fatal(err)
	}
	if len(logs) != 0 {
		t.Fatalf("expected 0 logs, got %d", len(logs))
	}

	// With limit 0 (should default to 50)
	logs, err = listWebhookLogs(db, wh1.ID, 0)
	if err != nil {
		t.Fatal(err)
	}
	if len(logs) != 1 {
		t.Fatalf("expected 1 log with limit 0, got %d", len(logs))
	}
}

// --- WS Message Tests ---

func TestWSMessageDBFunctions(t *testing.T) {
	dir := t.TempDir()
	t.Setenv("BACKBONE_DATA", dir)
	db, err := openDB()
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()
	migrateDB(db)

	insertWSConnection(db, "c1", "10.0.0.1", "/ws", "agent")
	insertWSMessage(db, "c1", "received", "hello")
	insertWSMessage(db, "c1", "sent", "world")

	msgs, err := listWSMessages(db, "c1")
	if err != nil {
		t.Fatal(err)
	}
	if len(msgs) != 2 {
		t.Fatalf("expected 2 messages, got %d", len(msgs))
	}

	all, err := listAllWSMessages(db)
	if err != nil {
		t.Fatal(err)
	}
	if len(all) != 2 {
		t.Fatalf("expected 2 all messages, got %d", len(all))
	}

	// Nonexistent connection
	msgs, err = listWSMessages(db, "nonexistent")
	if err != nil {
		t.Fatal(err)
	}
	if len(msgs) != 0 {
		t.Fatalf("expected 0, got %d", len(msgs))
	}
}

func TestMigrateCollectionSchema(t *testing.T) {
	dir := t.TempDir()
	t.Setenv("BACKBONE_DATA", dir)
	db, err := openDB()
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()
	migrateDB(db)

	createCollection(db, "evolving", `{"name":"string"}`)
	createRecord(db, "evolving", "r1", []byte(`{"name":"hello"}`))

	err = migrateCollectionSchema(db, "evolving", `{"name":"string"}`, `{"name":"string","count":"integer"}`)
	if err != nil {
		t.Fatalf("migrate add column: %v", err)
	}

	err = migrateCollectionSchema(db, "evolving", `{"name":"string","count":"integer"}`, `{"name":"string"}`)
	if err != nil {
		t.Fatalf("migrate drop column: %v", err)
	}
}

func TestOpenDB_WithEnv(t *testing.T) {
	dir := t.TempDir()
	t.Setenv("BACKBONE_DATA", dir)
	db, err := openDB()
	if err != nil {
		t.Fatalf("openDB: %v", err)
	}
	defer db.Close()
	if err := db.Ping(); err != nil {
		t.Fatalf("ping: %v", err)
	}
}
