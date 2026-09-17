package mcp

import (
	"bytes"
	"context"
	"database/sql"
	"encoding/json"
	"strconv"
	"strings"
	"testing"

	"github.com/hieudoanm/backbone/internal/store"
)

// exchange feeds frames to a server and returns the reply frames it wrote.
func exchange(t *testing.T, s *Server, input string) []string {
	t.Helper()

	var out bytes.Buffer
	s.mu.Lock()
	s.out = &out
	s.mu.Unlock()

	if err := s.RunWithReader(context.Background(), strings.NewReader(input)); err != nil {
		t.Fatalf("run: %v", err)
	}

	var frames []string
	for _, line := range strings.Split(out.String(), "\n") {
		if trimmed := strings.TrimSpace(line); trimmed != "" {
			frames = append(frames, trimmed)
		}
	}
	return frames
}

// decodeFrame pulls the id and error out of a reply frame.
func decodeFrame(t *testing.T, frame string) (json.RawMessage, *ErrorObject) {
	t.Helper()

	var response struct {
		ID    json.RawMessage `json:"id"`
		Error *ErrorObject    `json:"error"`
	}
	if err := json.Unmarshal([]byte(frame), &response); err != nil {
		t.Fatalf("unmarshal %q: %v", frame, err)
	}
	return response.ID, response.Error
}

// testServer returns a server with the tool catalogue registered but no
// database, so tool handlers see an unavailable store rather than a real one.
func testServer() *Server {
	s := NewServerWithIO(&bytes.Buffer{})
	Register(s, ServerDeps{})
	return s
}

// A notification carries no id, so it must never be answered. Answering one
// desynchronises the client, which is a protocol violation.
func TestNotificationsAreNeverAnswered(t *testing.T) {
	methods := []string{
		"initialize", "ping", "tools/list", "tools/call", "resources/list",
	}

	for _, method := range methods {
		t.Run(method, func(t *testing.T) {
			frame := `{"jsonrpc":"2.0","method":"` + method + `","params":{"name":"backbone_health"}}`
			if frames := exchange(t, testServer(), frame+"\n"); len(frames) != 0 {
				t.Fatalf("notification %s was answered with %v", method, frames)
			}
		})
	}
}

// A notification that is also malformed stays silent: the notification check
// must precede the jsonrpc version check.
func TestMalformedNotificationIsNotAnswered(t *testing.T) {
	if frames := exchange(t, testServer(), "{\"method\":\"ping\"}\n"); len(frames) != 0 {
		t.Fatalf("a malformed notification was answered with %v", frames)
	}
}

func TestAWrongJSONRPCVersionIsRejected(t *testing.T) {
	frames := exchange(t, testServer(), `{"jsonrpc":"1.0","id":1,"method":"ping"}`+"\n")
	if len(frames) != 1 {
		t.Fatalf("expected one reply, got %v", frames)
	}
	if _, err := decodeFrame(t, frames[0]); err == nil || err.Code != ErrCodeInvalidRequest {
		t.Fatalf("expected an invalid request error, got %v", err)
	}
}

// Absent params are tolerated and name no tool, matching the other headless MCP
// servers. A params of the wrong type is still rejected.
func TestToolsCallParamsHandling(t *testing.T) {
	tests := []struct {
		name  string
		frame string
		code  int
	}{
		{
			name:  "absent params names no tool",
			frame: `{"jsonrpc":"2.0","id":1,"method":"tools/call"}`,
			code:  ErrCodeMethodNotFound,
		},
		{
			name:  "null params names no tool",
			frame: `{"jsonrpc":"2.0","id":1,"method":"tools/call","params":null}`,
			code:  ErrCodeMethodNotFound,
		},
		{
			name:  "params of the wrong type are rejected",
			frame: `{"jsonrpc":"2.0","id":1,"method":"tools/call","params":"nope"}`,
			code:  ErrCodeInvalidParams,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			frames := exchange(t, testServer(), tt.frame+"\n")
			if len(frames) != 1 {
				t.Fatalf("expected one reply, got %v", frames)
			}
			_, err := decodeFrame(t, frames[0])
			if err == nil || err.Code != tt.code {
				t.Fatalf("expected code %d, got %v", tt.code, err)
			}
		})
	}
}

// The version is echoed when the server speaks it, and the server's latest is
// offered otherwise.
func TestInitializeNegotiatesTheProtocolVersion(t *testing.T) {
	tests := []struct {
		name  string
		frame string
		want  string
	}{
		{"supported version is echoed", ProtocolVersion, ProtocolVersion},
		{"unsupported version falls back", "1999-01-01", ProtocolVersion},
		{"absent params fall back", "", ProtocolVersion},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			frame := `{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"` + tt.frame + `"}}`
			frames := exchange(t, testServer(), frame+"\n")
			if len(frames) != 1 {
				t.Fatalf("expected one reply, got %v", frames)
			}
			if !strings.Contains(frames[0], tt.want) {
				t.Fatalf("expected protocol version %q, got %q", tt.want, frames[0])
			}
		})
	}
}

// A frame larger than the cap is reported as a parse error rather than being
// buffered, and the stream resynchronises on the next newline.
func TestOverlongFrameIsAParseErrorAndTheStreamRecovers(t *testing.T) {
	oversized := `{"jsonrpc":"2.0","id":1,"method":"ping","params":{"pad":"` +
		strings.Repeat("x", MaxFrameBytes) + `"}}`
	input := oversized + "\n" + `{"jsonrpc":"2.0","id":2,"method":"ping"}` + "\n"

	frames := exchange(t, testServer(), input)
	if len(frames) < 2 {
		t.Fatalf("expected a parse error and a ping reply, got %v", frames)
	}
	if _, err := decodeFrame(t, frames[0]); err == nil || err.Code != ErrCodeParse {
		t.Fatalf("expected a parse error, got %q", frames[0])
	}
	if !strings.Contains(frames[len(frames)-1], `"id":2`) {
		t.Fatalf("the stream did not resynchronise, got %q", frames[len(frames)-1])
	}
}

func TestToolsListIsSortedByName(t *testing.T) {
	frames := exchange(t, testServer(), `{"jsonrpc":"2.0","id":1,"method":"tools/list"}`+"\n")
	if len(frames) != 1 {
		t.Fatalf("expected one reply, got %v", frames)
	}

	var response struct {
		Result ListToolsResult `json:"result"`
	}
	if err := json.Unmarshal([]byte(frames[0]), &response); err != nil {
		t.Fatalf("unmarshal: %v", err)
	}

	names := make([]string, 0, len(response.Result.Tools))
	for _, tool := range response.Result.Tools {
		names = append(names, tool.Name)
	}
	want := []string{
		"backbone_collections_create", "backbone_collections_delete",
		"backbone_collections_list", "backbone_export", "backbone_health",
		"backbone_import", "backbone_records_create", "backbone_records_delete",
		"backbone_records_get", "backbone_records_list", "backbone_records_update",
	}
	if strings.Join(names, ",") != strings.Join(want, ",") {
		t.Fatalf("expected %v, got %v", want, names)
	}
}

// A format this build cannot produce must be reported, not silently swapped for
// JSON, so a caller asking for CSV learns why it did not get one.
func TestUnsupportedFormatIsReported(t *testing.T) {
	tests := []struct {
		tool string
		args string
	}{
		{"backbone_export", `{"format":"csv"}`},
		{"backbone_import", `{"format":"csv","data":"{}"}`},
	}

	for _, tt := range tests {
		t.Run(tt.tool, func(t *testing.T) {
			result := callToolResult(t, ServerDeps{}, tt.tool, tt.args)
			if !result.IsError {
				t.Fatalf("%s reported success for an unsupported format: %+v", tt.tool, result)
			}
			if !strings.Contains(result.Content[0].Text, "only the json format") {
				t.Fatalf("%s did not name the supported format: %q", tt.tool, result.Content[0].Text)
			}
		})
	}
}

// A missing body must be rejected too. Defaulting it to {} would store an empty
// record the caller never described, and the other ports reject it.
func TestRecordBodyMustBePresent(t *testing.T) {
	for name, args := range map[string]string{
		"absent": `{"collection":"c","id":"r1"}`,
		"null":   `{"collection":"c","id":"r1","data":null}`,
	} {
		t.Run(name, func(t *testing.T) {
			deps := ServerDeps{DB: openTestDB(t)}
			result := callToolResult(t, deps, "backbone_records_create", args)
			if !result.IsError {
				t.Fatalf("a missing body was accepted: %+v", result)
			}
			if !strings.Contains(result.Content[0].Text, "must be a JSON object") {
				t.Fatalf("unclear rejection message: %q", result.Content[0].Text)
			}
		})
	}
}

// A record body is stored verbatim, so a string must be rejected rather than
// persisted where an object was meant.
func TestRecordBodyMustBeAnObject(t *testing.T) {
	deps := ServerDeps{DB: openTestDB(t)}
	result := callToolResult(t, deps, "backbone_records_create", `{"collection":"c","data":"text"}`)
	if !result.IsError {
		t.Fatalf("a string body was accepted: %+v", result)
	}
	if !strings.Contains(result.Content[0].Text, "must be a JSON object") {
		t.Fatalf("unclear rejection message: %q", result.Content[0].Text)
	}
}

// An export must carry real rows, and importing that payload into a second
// database must recreate them, so neither tool can be a no-op that reports
// success.
func TestExportAndImportMoveRealData(t *testing.T) {
	// A temp data dir keeps the test off the developer's real ~/.backbone.
	t.Setenv("BACKBONE_DATA", t.TempDir())
	source, err := store.OpenDB()
	if err != nil {
		t.Fatalf("open db: %v", err)
	}
	defer source.Close()
	if err := store.MigrateDB(source); err != nil {
		t.Fatalf("migrate db: %v", err)
	}
	from := ServerDeps{DB: source}

	created := callToolResult(t, from, "backbone_collections_create", `{"name":"books"}`)
	if created.IsError {
		t.Fatalf("create collection: %s", created.Content[0].Text)
	}
	record := callToolResult(t, from, "backbone_records_create", `{"collection":"books","id":"b1","data":{"title":"Dune"}}`)
	if record.IsError {
		t.Fatalf("create record: %s", record.Content[0].Text)
	}

	exported := callToolResult(t, from, "backbone_export", `{"format":"json"}`)
	if exported.IsError {
		t.Fatalf("export: %s", exported.Content[0].Text)
	}
	if !strings.Contains(exported.Content[0].Text, "Dune") {
		t.Fatalf("export is missing the record: %s", exported.Content[0].Text)
	}

	target := openTestDB(t)
	defer target.Close()
	into := ServerDeps{DB: target}
	summary := callToolResult(t, into, "backbone_import",
		`{"format":"json","data":`+strconv.Quote(exported.Content[0].Text)+`}`)
	if summary.IsError {
		t.Fatalf("import: %s", summary.Content[0].Text)
	}
	if !strings.Contains(summary.Content[0].Text, `"created_collections": 1`) {
		t.Fatalf("import summary did not count the collection: %s", summary.Content[0].Text)
	}

	listed := callToolResult(t, into, "backbone_records_list", `{"collection":"books"}`)
	if listed.IsError {
		t.Fatalf("list records: %s", listed.Content[0].Text)
	}
	if !strings.Contains(listed.Content[0].Text, "Dune") {
		t.Fatalf("imported record is missing: %s", listed.Content[0].Text)
	}
}

// collections_list must reuse the injected database rather than opening its own
// on every call, so a missing one is an error instead of a leaked connection.
func TestCollectionsListWithoutADatabaseIsAnError(t *testing.T) {
	result := callToolResult(t, ServerDeps{}, "backbone_collections_list", `{}`)
	if !result.IsError {
		t.Fatalf("expected an errored result, got %+v", result)
	}
	if !strings.Contains(result.Content[0].Text, "not available") {
		t.Fatalf("expected a clear unavailable message, got %q", result.Content[0].Text)
	}
}

// With a database injected, the tool reads that database and never opens one of
// its own, so repeated calls are served from the same connection.
func TestCollectionsListReadsTheInjectedDatabase(t *testing.T) {
	db := openTestDB(t)
	defer db.Close()

	seedCollection(t, db, "posts", "{\"title\":\"string\"}")
	seedCollection(t, db, "users", "{\"email\":\"string\"}")

	deps := ServerDeps{DB: db}
	for i := 0; i < 3; i++ {
		result := callToolResult(t, deps, "backbone_collections_list", `{}`)
		if result.IsError {
			t.Fatalf("call %d failed: %s", i, result.Content[0].Text)
		}
		for _, name := range []string{"posts", "users"} {
			if !strings.Contains(result.Content[0].Text, `"`+name+`"`) {
				t.Fatalf("call %d did not list %s: %s", i, name, result.Content[0].Text)
			}
		}
	}
}

// openTestDB creates a migrated database in a temp dir and returns it.
func openTestDB(t *testing.T) *sql.DB {
	t.Helper()

	t.Setenv("BACKBONE_DATA", t.TempDir())
	db, err := store.OpenDB()
	if err != nil {
		t.Fatalf("open db: %v", err)
	}
	if err := store.MigrateDB(db); err != nil {
		db.Close()
		t.Fatalf("migrate db: %v", err)
	}
	return db
}

// seedCollection inserts one row into _collections.
func seedCollection(t *testing.T, db *sql.DB, name, schema string) {
	t.Helper()

	if _, err := db.Exec(
		`INSERT INTO _collections (name, schema) VALUES (?, ?)`, name, schema,
	); err != nil {
		t.Fatalf("seed %s: %v", name, err)
	}
}

// callToolResult invokes one tool and returns its result, failing the test if
// the server answered with a JSON-RPC error instead.
func callToolResult(t *testing.T, deps ServerDeps, name, arguments string) ToolResult {
	t.Helper()

	s := NewServerWithIO(&bytes.Buffer{})
	Register(s, deps)
	frame := `{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"` +
		name + `","arguments":` + arguments + `}}`

	frames := exchange(t, s, frame+"\n")
	if len(frames) != 1 {
		t.Fatalf("expected one reply, got %v", frames)
	}

	var response struct {
		Result ToolResult   `json:"result"`
		Error  *ErrorObject `json:"error"`
	}
	if err := json.Unmarshal([]byte(frames[0]), &response); err != nil {
		t.Fatalf("unmarshal %q: %v", frames[0], err)
	}
	if response.Error != nil {
		t.Fatalf("tool %s returned a jsonrpc error: %+v", name, *response.Error)
	}
	return response.Result
}

// A clean EOF is how clients signal shutdown, so it is not an error.
func TestCleanEOFIsNotAnError(t *testing.T) {
	var out bytes.Buffer
	s := NewServerWithIO(&out)
	if err := s.RunWithReader(context.Background(), strings.NewReader("")); err != nil {
		t.Fatalf("expected a clean EOF, got %v", err)
	}
	if out.Len() != 0 {
		t.Fatalf("expected no frames, got %q", out.String())
	}
}
