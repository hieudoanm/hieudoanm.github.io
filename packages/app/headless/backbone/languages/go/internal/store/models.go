package store

import "encoding/json"

// Collection is a named, optionally schema-constrained data container.
type Collection struct {
	Name      string `json:"name"`
	Schema    string `json:"schema"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
}

// Record is a row inside a collection's data table.
type Record struct {
	ID        string          `json:"id"`
	Data      json.RawMessage `json:"data"`
	CreatedAt string          `json:"created_at"`
	UpdatedAt string          `json:"updated_at"`
}

// RecordsPage is a paginated view of records plus optional expansions.
type RecordsPage struct {
	Records    []Record                  `json:"records"`
	Total      int                       `json:"total"`
	Page       int                       `json:"page"`
	PerPage    int                       `json:"per_page"`
	TotalPages int                       `json:"total_pages"`
	Expand     map[string]map[string]any `json:"expand,omitempty"`
}

// Bucket is a named storage namespace for files.
type Bucket struct {
	Name      string `json:"name"`
	IsPublic  bool   `json:"is_public"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
}

// FileRecord describes a stored file.
type FileRecord struct {
	ID        string `json:"id"`
	Bucket    string `json:"bucket"`
	Filename  string `json:"filename"`
	MimeType  string `json:"mime_type"`
	Size      int64  `json:"size"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
}

// Webhook is a subscriber to a set of app events.
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

// WebhookLog records a single webhook delivery attempt.
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

// Secret is an encrypted key/value stored at rest.
type Secret struct {
	ID        string `json:"id"`
	Name      string `json:"name"`
	Value     string `json:"value"`
	Scope     string `json:"scope"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
}

// CronJob schedules periodic HTTP requests.
type CronJob struct {
	ID            string `json:"id"`
	Name          string `json:"name"`
	Schedule      string `json:"schedule"`
	Command       string `json:"command"`
	Method        string `json:"method"`
	Headers       string `json:"headers"`
	Body          string `json:"body"`
	IsActive      bool   `json:"is_active"`
	LastRunAt     string `json:"last_run_at"`
	LastRunStatus string `json:"last_run_status"`
	CreatedAt     string `json:"created_at"`
	UpdatedAt     string `json:"updated_at"`
}

// CronJobLog records a single cron job execution.
type CronJobLog struct {
	ID         string `json:"id"`
	CronJobID  string `json:"cronjob_id"`
	StartedAt  string `json:"started_at"`
	FinishedAt string `json:"finished_at"`
	DurationMs int64  `json:"duration_ms"`
	Status     string `json:"status"`
	Output     string `json:"output"`
	Error      string `json:"error"`
}

// WSConnection is a persisted websocket connection record.
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

// WSMessage is a persisted websocket message.
type WSMessage struct {
	ID           string `json:"id"`
	ConnectionID string `json:"connection_id"`
	Direction    string `json:"direction"`
	Content      string `json:"content"`
	CreatedAt    string `json:"created_at"`
}

// CacheEntry is a persisted cache row.
type CacheEntry struct {
	Key       string `json:"key"`
	Value     string `json:"value"`
	TTL       int    `json:"ttl"`
	ExpiresAt string `json:"expires_at"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
}

// Notification is a user-visible message.
type Notification struct {
	ID        string `json:"id"`
	Title     string `json:"title"`
	Body      string `json:"body"`
	Type      string `json:"type"`
	IsRead    bool   `json:"is_read"`
	CreatedAt string `json:"created_at"`
}

// LogEntry is an app-level log line.
type LogEntry struct {
	ID        string `json:"id"`
	Level     string `json:"level"`
	Message   string `json:"message"`
	Meta      string `json:"meta"`
	CreatedAt string `json:"created_at"`
}

// FilesPage is a paginated view of files within a bucket.
type FilesPage struct {
	Files      []FileRecord `json:"files"`
	Total      int          `json:"total"`
	Page       int          `json:"page"`
	PerPage    int          `json:"per_page"`
	TotalPages int          `json:"total_pages"`
}

// schemaColumn maps a schema field to a SQLite column type.
type schemaColumn struct {
	Name    string
	ColType string
}
