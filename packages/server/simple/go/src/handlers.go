package main

import (
	"bytes"
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/robfig/cron/v3"
)

type ipRateLimiter struct {
	mu     sync.Mutex
	tokens float64
	last   time.Time
}

var rateLimiters sync.Map

func rateLimitMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ip := r.RemoteAddr
		if idx := strings.LastIndex(ip, ":"); idx != -1 {
			ip = ip[:idx]
		}
		val, _ := rateLimiters.LoadOrStore(ip, &ipRateLimiter{
			tokens: 200,
			last:   time.Now(),
		})
		rl := val.(*ipRateLimiter)
		rl.mu.Lock()
		now := time.Now()
		elapsed := now.Sub(rl.last).Seconds()
		rl.tokens += elapsed * 100
		if rl.tokens > 200 {
			rl.tokens = 200
		}
		rl.last = now
		if rl.tokens < 1 {
			rl.mu.Unlock()
			errorJSON(w, "rate limit exceeded", http.StatusTooManyRequests)
			return
		}
		rl.tokens--
		rl.mu.Unlock()
		next.ServeHTTP(w, r)
	})
}

func validateContentType(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method == "POST" || r.Method == "PATCH" || r.Method == "PUT" {
			ct := r.Header.Get("Content-Type")
			if !strings.HasPrefix(ct, "application/json") {
				errorJSON(w, "content-type must be application/json", http.StatusUnsupportedMediaType)
				return
			}
			data, err := io.ReadAll(r.Body)
			if err != nil {
				errorJSON(w, "invalid body", http.StatusBadRequest)
				return
			}
			if !json.Valid(data) {
				errorJSON(w, "invalid json body", http.StatusBadRequest)
				return
			}
			r.Body = io.NopCloser(bytes.NewReader(data))
		}
		next.ServeHTTP(w, r)
	})
}

type Server struct {
	db            *sql.DB
	dataDir       string
	secretsKey    []byte
	cronScheduler *cron.Cron
	wsHub         *WSHub
	cache         *CacheStore
	sseHub        *SSEHub
	logHub        *SSEHub
	pubsubHub     *SSEHub
}

func errorJSON(w http.ResponseWriter, msg string, code int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(map[string]string{"error": msg})
}

func jsonResponse(w http.ResponseWriter, data any) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}

func (s *Server) handleCollectionsList(w http.ResponseWriter, r *http.Request) {
	cols, err := listCollections(s.db)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	jsonResponse(w, cols)
}

func (s *Server) handleCollectionsCreate(w http.ResponseWriter, r *http.Request) {
	var body struct {
		Name   string `json:"name"`
		Schema string `json:"schema"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		errorJSON(w, "invalid json", http.StatusBadRequest)
		return
	}
	if body.Name == "" {
		errorJSON(w, "name is required", http.StatusBadRequest)
		return
	}
	if body.Schema == "" {
		body.Schema = "{}"
	}
	if err := createCollection(s.db, body.Name, body.Schema); err != nil {
		if strings.Contains(err.Error(), "UNIQUE") {
			errorJSON(w, "collection already exists", http.StatusConflict)
			return
		}
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	c, _ := getCollection(s.db, body.Name)
	go s.dispatchEvent(EventCollectionCreate, webhookCollectionData(c))
	jsonResponse(w, c)
}

func (s *Server) handleCollectionsGet(w http.ResponseWriter, r *http.Request) {
	name := r.PathValue("name")
	c, err := getCollection(s.db, name)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if c == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	jsonResponse(w, c)
}

func (s *Server) handleCollectionsDelete(w http.ResponseWriter, r *http.Request) {
	name := r.PathValue("name")
	c, err := getCollection(s.db, name)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if c == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	go s.dispatchEvent(EventCollectionDelete, webhookCollectionData(c))
	if err := deleteCollection(s.db, name); err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}

func (s *Server) handleRecordsCreate(w http.ResponseWriter, r *http.Request) {
	name := r.PathValue("name")
	c, err := getCollection(s.db, name)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if c == nil {
		errorJSON(w, "collection not found", http.StatusNotFound)
		return
	}

	var body struct {
		ID   string          `json:"id"`
		Data json.RawMessage `json:"data"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		errorJSON(w, "invalid json", http.StatusBadRequest)
		return
	}
	if body.Data == nil {
		body.Data = json.RawMessage("{}")
	}
	id := body.ID
	if id == "" {
		id = generateID()
	}
	rec, err := createRecord(s.db, name, id, body.Data)
	if err != nil {
		if strings.Contains(err.Error(), "UNIQUE") {
			errorJSON(w, "record with this id already exists", http.StatusConflict)
			return
		}
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	go s.dispatchEvent(EventRecordCreate, webhookRecordData(name, rec))
	jsonResponse(w, rec)
}

func (s *Server) handleRecordsList(w http.ResponseWriter, r *http.Request) {
	name := r.PathValue("name")
	c, err := getCollection(s.db, name)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if c == nil {
		errorJSON(w, "collection not found", http.StatusNotFound)
		return
	}

	page, _ := strconv.Atoi(r.URL.Query().Get("page"))
	if page < 1 {
		page = 1
	}
	perPage, _ := strconv.Atoi(r.URL.Query().Get("per_page"))
	if perPage < 1 || perPage > 100 {
		perPage = 20
	}

	filter := r.URL.Query()["filter"]
	sort := r.URL.Query().Get("sort")
	expandParam := r.URL.Query().Get("expand")
	var expand []string
	if expandParam != "" {
		for _, f := range strings.Split(expandParam, ",") {
			f = strings.TrimSpace(f)
			if f != "" {
				expand = append(expand, f)
			}
		}
	}

	pageData, err := listRecords(s.db, name, page, perPage, filter, sort, expand)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	jsonResponse(w, pageData)
}

func (s *Server) handleRecordsGet(w http.ResponseWriter, r *http.Request) {
	name := r.PathValue("name")
	recID := r.PathValue("id")

	rec, err := getRecord(s.db, name, recID)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if rec == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	jsonResponse(w, rec)
}

func (s *Server) handleRecordsUpdate(w http.ResponseWriter, r *http.Request) {
	name := r.PathValue("name")
	recID := r.PathValue("id")

	c, err := getCollection(s.db, name)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if c == nil {
		errorJSON(w, "collection not found", http.StatusNotFound)
		return
	}

	existing, err := getRecord(s.db, name, recID)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if existing == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}

	var body struct {
		Data json.RawMessage `json:"data"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		errorJSON(w, "invalid json", http.StatusBadRequest)
		return
	}
	if body.Data == nil {
		errorJSON(w, "data is required", http.StatusBadRequest)
		return
	}

	rec, err := updateRecord(s.db, name, recID, body.Data)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	go s.dispatchEvent(EventRecordUpdate, webhookRecordData(name, rec))
	jsonResponse(w, rec)
}

func (s *Server) handleRecordsDelete(w http.ResponseWriter, r *http.Request) {
	name := r.PathValue("name")
	recID := r.PathValue("id")

	rec, err := getRecord(s.db, name, recID)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if rec == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	go s.dispatchEvent(EventRecordDelete, webhookRecordData(name, rec))
	if err := deleteRecord(s.db, name, recID); err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}

func (s *Server) handleRegister(w http.ResponseWriter, r *http.Request) {
	var body struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		errorJSON(w, "invalid json", http.StatusBadRequest)
		return
	}
	if body.Email == "" || body.Password == "" {
		errorJSON(w, "email and password are required", http.StatusBadRequest)
		return
	}
	if len(body.Password) < 6 {
		errorJSON(w, "password must be at least 6 characters", http.StatusBadRequest)
		return
	}

	user, err := registerUser(s.db, body.Email, body.Password)
	if err != nil {
		if strings.Contains(err.Error(), "UNIQUE") {
			errorJSON(w, "email already registered", http.StatusConflict)
			return
		}
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	jsonResponse(w, user)
}

func (s *Server) handleLogin(w http.ResponseWriter, r *http.Request) {
	var body struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		errorJSON(w, "invalid json", http.StatusBadRequest)
		return
	}
	if body.Email == "" || body.Password == "" {
		errorJSON(w, "email and password are required", http.StatusBadRequest)
		return
	}

	user, token, err := loginUser(s.db, body.Email, body.Password)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusUnauthorized)
		return
	}
	jsonResponse(w, map[string]any{
		"user":  user,
		"token": token,
	})
}

func (s *Server) handleBucketsList(w http.ResponseWriter, r *http.Request) {
	buckets, err := listBuckets(s.db)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	jsonResponse(w, buckets)
}

func (s *Server) handleBucketsCreate(w http.ResponseWriter, r *http.Request) {
	var body struct {
		Name     string `json:"name"`
		IsPublic bool   `json:"is_public"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		errorJSON(w, "invalid json", http.StatusBadRequest)
		return
	}
	if body.Name == "" {
		errorJSON(w, "name is required", http.StatusBadRequest)
		return
	}
	b, err := createBucket(s.db, body.Name, body.IsPublic)
	if err != nil {
		if strings.Contains(err.Error(), "UNIQUE") {
			errorJSON(w, "bucket already exists", http.StatusConflict)
			return
		}
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	dir := filepath.Join(s.dataDir, "storage", body.Name)
	if err := os.MkdirAll(dir, 0755); err != nil {
		errorJSON(w, "create storage dir: "+err.Error(), http.StatusInternalServerError)
		return
	}
	go s.dispatchEvent(EventBucketCreate, webhookBucketData(b))
	jsonResponse(w, b)
}

func (s *Server) handleBucketsGet(w http.ResponseWriter, r *http.Request) {
	name := r.PathValue("name")
	b, err := getBucket(s.db, name)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if b == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	jsonResponse(w, b)
}

func (s *Server) handleBucketsDelete(w http.ResponseWriter, r *http.Request) {
	name := r.PathValue("name")
	b, err := getBucket(s.db, name)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if b == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	go s.dispatchEvent(EventBucketDelete, webhookBucketData(b))
	files, err := deleteBucket(s.db, name)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	// Delete all files from disk
	dir := filepath.Join(s.dataDir, "storage", name)
	for _, f := range files {
		os.Remove(filepath.Join(dir, f.ID))
	}
	os.RemoveAll(dir)
	w.WriteHeader(http.StatusNoContent)
}

func (s *Server) handleFilesUpload(w http.ResponseWriter, r *http.Request) {
	name := r.PathValue("name")
	b, err := getBucket(s.db, name)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if b == nil {
		errorJSON(w, "bucket not found", http.StatusNotFound)
		return
	}
	r.Body = http.MaxBytesReader(w, r.Body, 10<<20)
	if err := r.ParseMultipartForm(10 << 20); err != nil {
		errorJSON(w, "file too large or invalid multipart", http.StatusBadRequest)
		return
	}
	file, header, err := r.FormFile("file")
	if err != nil {
		errorJSON(w, "file field required", http.StatusBadRequest)
		return
	}
	defer file.Close()

	data, err := io.ReadAll(file)
	if err != nil {
		errorJSON(w, "failed to read file", http.StatusInternalServerError)
		return
	}
	if len(data) == 0 {
		errorJSON(w, "file is empty", http.StatusBadRequest)
		return
	}

	mimeType := header.Header.Get("Content-Type")
	if mimeType == "" || mimeType == "application/octet-stream" {
		mimeType = http.DetectContentType(data)
	}

	id := generateID()
	fileDir := filepath.Join(s.dataDir, "storage", name)
	os.MkdirAll(fileDir, 0755)
	filePath := filepath.Join(fileDir, id)
	if err := os.WriteFile(filePath, data, 0644); err != nil {
		errorJSON(w, "failed to save file", http.StatusInternalServerError)
		return
	}
	f, err := insertFile(s.db, name, id, header.Filename, mimeType, int64(len(data)))
	if err != nil {
		os.Remove(filePath)
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	jsonResponse(w, f)
}

func (s *Server) handleFilesList(w http.ResponseWriter, r *http.Request) {
	name := r.PathValue("name")
	b, err := getBucket(s.db, name)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if b == nil {
		errorJSON(w, "bucket not found", http.StatusNotFound)
		return
	}
	page, _ := strconv.Atoi(r.URL.Query().Get("page"))
	if page < 1 {
		page = 1
	}
	perPage, _ := strconv.Atoi(r.URL.Query().Get("per_page"))
	if perPage < 1 || perPage > 100 {
		perPage = 20
	}
	pageData, err := listFiles(s.db, name, page, perPage)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	jsonResponse(w, pageData)
}

func (s *Server) handleFilesDownload(w http.ResponseWriter, r *http.Request) {
	name := r.PathValue("name")
	fileID := r.PathValue("id")
	f, err := getFile(s.db, fileID)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if f == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	// Verify the file belongs to the specified bucket
	if f.Bucket != name {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	filePath := filepath.Join(s.dataDir, "storage", name, fileID)
	data, err := os.ReadFile(filePath)
	if err != nil {
		errorJSON(w, "file not found on disk", http.StatusNotFound)
		return
	}
	w.Header().Set("Content-Type", f.MimeType)
	w.Header().Set("Content-Disposition", fmt.Sprintf(`attachment; filename="%s"`, f.Filename))
	w.Header().Set("Content-Length", strconv.FormatInt(f.Size, 10))
	w.Write(data)
}

func (s *Server) handleFilesDelete(w http.ResponseWriter, r *http.Request) {
	name := r.PathValue("name")
	fileID := r.PathValue("id")
	f, err := getFile(s.db, fileID)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if f == nil || f.Bucket != name {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	deleted, err := deleteFile(s.db, fileID)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if deleted != nil {
		os.Remove(filepath.Join(s.dataDir, "storage", name, fileID))
	}
	w.WriteHeader(http.StatusNoContent)
}

func authMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		auth := r.Header.Get("Authorization")
		if auth == "" {
			errorJSON(w, "authorization header required", http.StatusUnauthorized)
			return
		}
		tokenStr := strings.TrimPrefix(auth, "Bearer ")
		if tokenStr == auth {
			errorJSON(w, "bearer token required", http.StatusUnauthorized)
			return
		}
		claims, err := validateToken(tokenStr)
		if err != nil {
			errorJSON(w, "invalid token", http.StatusUnauthorized)
			return
		}
		r.Header.Set("X-User-ID", claims.UserID)
		r.Header.Set("X-User-Email", claims.Email)
		next.ServeHTTP(w, r)
	})
}

// --- Webhook Handlers ---

func (s *Server) handleWebhooksList(w http.ResponseWriter, r *http.Request) {
	hooks, err := listWebhooks(s.db)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	jsonResponse(w, hooks)
}

func (s *Server) handleWebhooksCreate(w http.ResponseWriter, r *http.Request) {
	var body struct {
		Name   string   `json:"name"`
		URL    string   `json:"url"`
		Events []string `json:"events"`
		Secret string   `json:"secret"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		errorJSON(w, "invalid json", http.StatusBadRequest)
		return
	}
	if body.Name == "" {
		errorJSON(w, "name is required", http.StatusBadRequest)
		return
	}
	if body.URL == "" {
		errorJSON(w, "url is required", http.StatusBadRequest)
		return
	}
	if len(body.Events) == 0 {
		errorJSON(w, "at least one event is required", http.StatusBadRequest)
		return
	}
	eventsJSON := writeWebhookEventsJSON(body.Events)
	h, err := createWebhook(s.db, body.Name, body.URL, eventsJSON, body.Secret)
	if err != nil {
		if strings.Contains(err.Error(), "UNIQUE") {
			errorJSON(w, "webhook already exists", http.StatusConflict)
			return
		}
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	jsonResponse(w, h)
}

func (s *Server) handleWebhooksGet(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	h, err := getWebhook(s.db, id)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if h == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	jsonResponse(w, h)
}

func (s *Server) handleWebhooksUpdate(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	existing, err := getWebhook(s.db, id)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if existing == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}

	var body struct {
		Name     *string  `json:"name"`
		URL      *string  `json:"url"`
		Events   []string `json:"events"`
		Secret   *string  `json:"secret"`
		IsActive *bool    `json:"is_active"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		errorJSON(w, "invalid json", http.StatusBadRequest)
		return
	}

	name := existing.Name
	if body.Name != nil {
		name = *body.Name
	}
	url := existing.URL
	if body.URL != nil {
		url = *body.URL
	}
	events := existing.Events
	if body.Events != nil {
		events = body.Events
	}
	secret := existing.Secret
	if body.Secret != nil {
		secret = *body.Secret
	}
	isActive := existing.IsActive
	if body.IsActive != nil {
		isActive = *body.IsActive
	}

	eventsJSON := writeWebhookEventsJSON(events)
	h, err := updateWebhook(s.db, id, name, url, eventsJSON, secret, isActive)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	jsonResponse(w, h)
}

func (s *Server) handleWebhooksDelete(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	h, err := getWebhook(s.db, id)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if h == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	if err := deleteWebhook(s.db, id); err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}

func (s *Server) handleWebhookLogs(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	h, err := getWebhook(s.db, id)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if h == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	logs, err := listWebhookLogs(s.db, id, 50)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if logs == nil {
		logs = []WebhookLog{}
	}
	jsonResponse(w, logs)
}

// --- Secrets ---

func (s *Server) handleSecretsList(w http.ResponseWriter, r *http.Request) {
	secrets, err := listSecrets(s.db)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	type secretItem struct {
		ID        string `json:"id"`
		Name      string `json:"name"`
		Scope     string `json:"scope"`
		CreatedAt string `json:"created_at"`
		UpdatedAt string `json:"updated_at"`
	}
	items := make([]secretItem, 0, len(secrets))
	for _, s := range secrets {
		items = append(items, secretItem{ID: s.ID, Name: s.Name, Scope: s.Scope, CreatedAt: s.CreatedAt, UpdatedAt: s.UpdatedAt})
	}
	jsonResponse(w, items)
}

func (s *Server) handleSecretsCreate(w http.ResponseWriter, r *http.Request) {
	var body struct {
		Name  string `json:"name"`
		Value string `json:"value"`
		Scope string `json:"scope"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		errorJSON(w, "invalid json", http.StatusBadRequest)
		return
	}
	if body.Name == "" {
		errorJSON(w, "name is required", http.StatusBadRequest)
		return
	}
	if body.Scope == "" {
		body.Scope = "general"
	}
	encrypted, err := encryptSecret(s.secretsKey, body.Value)
	if err != nil {
		errorJSON(w, "encryption error", http.StatusInternalServerError)
		return
	}
	id := generateID()
	secret, err := createSecret(s.db, id, body.Name, encrypted, body.Scope)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	go s.dispatchEvent(EventSecretCreate, webhookSecretData(secret))
	w.WriteHeader(http.StatusCreated)
	jsonResponse(w, secret)
}

func (s *Server) handleSecretsGet(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	secret, err := getSecret(s.db, id)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if secret == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	decrypted, err := decryptSecret(s.secretsKey, secret.Value)
	if err != nil {
		errorJSON(w, "decryption error", http.StatusInternalServerError)
		return
	}
	secret.Value = decrypted
	jsonResponse(w, secret)
}

func (s *Server) handleSecretsUpdate(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	existing, err := getSecret(s.db, id)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if existing == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	var body struct {
		Name  string `json:"name"`
		Value string `json:"value"`
		Scope string `json:"scope"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		errorJSON(w, "invalid json", http.StatusBadRequest)
		return
	}
	if body.Name == "" {
		body.Name = existing.Name
	}
	if body.Scope == "" {
		body.Scope = existing.Scope
	}
	plaintext := body.Value
	if plaintext == "" {
		if v, err := decryptSecret(s.secretsKey, existing.Value); err == nil {
			plaintext = v
		}
	}
	encrypted, err := encryptSecret(s.secretsKey, plaintext)
	if err != nil {
		errorJSON(w, "encryption error", http.StatusInternalServerError)
		return
	}
	secret, err := updateSecret(s.db, id, body.Name, encrypted, body.Scope)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	go s.dispatchEvent(EventSecretUpdate, webhookSecretData(secret))
	jsonResponse(w, secret)
}

func (s *Server) handleSecretsDelete(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	secret, err := getSecret(s.db, id)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if secret == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	if err := deleteSecret(s.db, id); err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	go s.dispatchEvent(EventSecretDelete, webhookSecretData(secret))
	w.WriteHeader(http.StatusNoContent)
}

// --- CronJobs ---

func (s *Server) handleCronJobsList(w http.ResponseWriter, r *http.Request) {
	jobs, err := listCronJobs(s.db)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	jsonResponse(w, jobs)
}

func (s *Server) handleCronJobsCreate(w http.ResponseWriter, r *http.Request) {
	var body struct {
		Name     string `json:"name"`
		Schedule string `json:"schedule"`
		Command  string `json:"command"`
		Method   string `json:"method"`
		Headers  string `json:"headers"`
		Body     string `json:"body"`
		IsActive *bool  `json:"is_active"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		errorJSON(w, "invalid json", http.StatusBadRequest)
		return
	}
	if body.Name == "" {
		errorJSON(w, "name is required", http.StatusBadRequest)
		return
	}
	if body.Schedule == "" {
		errorJSON(w, "schedule is required", http.StatusBadRequest)
		return
	}
	if body.Command == "" {
		errorJSON(w, "command is required", http.StatusBadRequest)
		return
	}
	if _, err := cron.ParseStandard(body.Schedule); err != nil {
		errorJSON(w, "invalid cron schedule: "+err.Error(), http.StatusBadRequest)
		return
	}
	method := body.Method
	if method == "" {
		method = "GET"
	}
	isActive := true
	if body.IsActive != nil {
		isActive = *body.IsActive
	}
	id := generateID()
	job, err := insertCronJob(s.db, id, body.Name, body.Schedule, body.Command, method, body.Headers, body.Body, isActive)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	go s.dispatchEvent(EventCronjobCreate, webhookCronjobData(job))
	w.WriteHeader(http.StatusCreated)
	jsonResponse(w, job)
}

func (s *Server) handleCronJobsGet(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	job, err := getCronJob(s.db, id)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if job == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	jsonResponse(w, job)
}

func (s *Server) handleCronJobsUpdate(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	existing, err := getCronJob(s.db, id)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if existing == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	var body struct {
		Name     *string `json:"name"`
		Schedule *string `json:"schedule"`
		Command  *string `json:"command"`
		Method   *string `json:"method"`
		Headers  *string `json:"headers"`
		Body     *string `json:"body"`
		IsActive *bool   `json:"is_active"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		errorJSON(w, "invalid json", http.StatusBadRequest)
		return
	}
	name := existing.Name
	if body.Name != nil {
		name = *body.Name
	}
	schedule := existing.Schedule
	if body.Schedule != nil {
		schedule = *body.Schedule
	}
	command := existing.Command
	if body.Command != nil {
		command = *body.Command
	}
	method := existing.Method
	if body.Method != nil {
		method = *body.Method
	}
	headers := existing.Headers
	if body.Headers != nil {
		headers = *body.Headers
	}
	jobBody := existing.Body
	if body.Body != nil {
		jobBody = *body.Body
	}
	isActive := existing.IsActive
	if body.IsActive != nil {
		isActive = *body.IsActive
	}
	if schedule != existing.Schedule || (body.Schedule != nil && *body.Schedule != "") {
		if _, err := cron.ParseStandard(schedule); err != nil {
			errorJSON(w, "invalid cron schedule: "+err.Error(), http.StatusBadRequest)
			return
		}
	}
	job, err := updateCronJob(s.db, id, name, schedule, command, method, headers, jobBody, isActive)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	go s.dispatchEvent(EventCronjobUpdate, webhookCronjobData(job))
	jsonResponse(w, job)
}

func (s *Server) handleCronJobsDelete(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	job, err := getCronJob(s.db, id)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if job == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	if err := deleteCronJob(s.db, id); err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	go s.dispatchEvent(EventCronjobDelete, webhookCronjobData(job))
	w.WriteHeader(http.StatusNoContent)
}

// --- WebSockets ---

func (s *Server) handleWSList(w http.ResponseWriter, r *http.Request) {
	conns, err := listWSConnections(s.db)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	jsonResponse(w, conns)
}

func (s *Server) handleWSGet(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	conn, err := getWSConnection(s.db, id)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if conn == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	jsonResponse(w, conn)
}

func (s *Server) handleWSDelete(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	conn, err := getWSConnection(s.db, id)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if conn == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	if s.wsHub != nil {
		s.wsHub.CloseClient(id)
	}
	if err := deleteWSConnection(s.db, id); err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}

func (s *Server) handleWSBroadcast(w http.ResponseWriter, r *http.Request) {
	var body struct {
		Content string `json:"content"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		errorJSON(w, "invalid json", http.StatusBadRequest)
		return
	}
	if body.Content == "" {
		errorJSON(w, "content is required", http.StatusBadRequest)
		return
	}
	if s.wsHub != nil {
		s.wsHub.broadcast <- []byte(body.Content)
	}
	// Store broadcast message
	insertWSMessage(s.db, "", "sent", body.Content)
	jsonResponse(w, map[string]string{"status": "broadcasted"})
}

func (s *Server) handleWSSend(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	var body struct {
		Content string `json:"content"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		errorJSON(w, "invalid json", http.StatusBadRequest)
		return
	}
	if body.Content == "" {
		errorJSON(w, "content is required", http.StatusBadRequest)
		return
	}
	if s.wsHub != nil {
		if !s.wsHub.SendToClient(id, []byte(body.Content)) {
			errorJSON(w, "client not found or disconnected", http.StatusNotFound)
			return
		}
	}
	insertWSMessage(s.db, id, "sent", body.Content)
	jsonResponse(w, map[string]string{"status": "sent"})
}

func (s *Server) handleWSMessages(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	msgs, err := listWSMessages(s.db, id)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	jsonResponse(w, msgs)
}

func (s *Server) handleWSAllMessages(w http.ResponseWriter, r *http.Request) {
	msgs, err := listAllWSMessages(s.db)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	jsonResponse(w, msgs)
}

func (s *Server) handleCronJobsRun(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	job, err := getCronJob(s.db, id)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if job == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	executeCronJob(s.db, *job)
	jsonResponse(w, map[string]string{"status": "triggered"})
}

func (s *Server) handleCronJobsLogs(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	job, err := getCronJob(s.db, id)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if job == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	logs, err := listCronJobLogs(s.db, id)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if logs == nil {
		logs = []CronJobLog{}
	}
	jsonResponse(w, logs)
}

// --- Cache ---

func (s *Server) handleCacheList(w http.ResponseWriter, r *http.Request) {
	entries := s.cache.List()
	jsonResponse(w, entries)
}

func (s *Server) handleCacheSet(w http.ResponseWriter, r *http.Request) {
	var body struct {
		Key   string `json:"key"`
		Value string `json:"value"`
		TTL   int    `json:"ttl"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		errorJSON(w, "invalid json", http.StatusBadRequest)
		return
	}
	if body.Key == "" || body.Value == "" {
		errorJSON(w, "key and value are required", http.StatusBadRequest)
		return
	}
	entry := s.cache.Set(body.Key, body.Value, body.TTL)
	jsonResponse(w, entry)
}

func (s *Server) handleCacheGet(w http.ResponseWriter, r *http.Request) {
	key := r.PathValue("key")
	entry := s.cache.Get(key)
	if entry == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	jsonResponse(w, entry)
}

func (s *Server) handleCacheDelete(w http.ResponseWriter, r *http.Request) {
	key := r.PathValue("key")
	if !s.cache.Delete(key) {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}

func (s *Server) handleCacheFlush(w http.ResponseWriter, r *http.Request) {
	s.cache.Flush()
	jsonResponse(w, map[string]string{"status": "flushed"})
}

func (s *Server) handleCacheStats(w http.ResponseWriter, r *http.Request) {
	jsonResponse(w, s.cache.Stats())
}

func (s *Server) routes() http.Handler {
	mux := http.NewServeMux()

	mux.HandleFunc("GET /api/health", func(w http.ResponseWriter, r *http.Request) {
		jsonResponse(w, map[string]string{"status": "ok"})
	})

	mux.HandleFunc("POST /api/auth/register", s.handleRegister)
	mux.HandleFunc("POST /api/auth/login", s.handleLogin)

	mux.Handle("/", http.FileServer(http.Dir("public")))

	protected := http.NewServeMux()

	contentHandler := func(h http.HandlerFunc) http.HandlerFunc {
		return validateContentType(h).ServeHTTP
	}

	protected.HandleFunc("GET /api/collections", s.handleCollectionsList)
	protected.Handle("POST /api/collections", s.rbacMiddleware("admin")(contentHandler(s.handleCollectionsCreate)))
	protected.HandleFunc("GET /api/collections/{name}", s.handleCollectionsGet)
	protected.Handle("DELETE /api/collections/{name}", s.rbacMiddleware("admin")(http.HandlerFunc(s.handleCollectionsDelete)))

	protected.Handle("POST /api/collections/{name}/records", s.rbacMiddleware("admin", "editor")(contentHandler(s.handleRecordsCreate)))
	protected.Handle("GET /api/collections/{name}/records", s.rbacMiddleware("admin", "editor", "viewer")(http.HandlerFunc(s.handleRecordsList)))
	protected.Handle("GET /api/collections/{name}/records/{id}", s.rbacMiddleware("admin", "editor", "viewer")(http.HandlerFunc(s.handleRecordsGet)))
	protected.Handle("PATCH /api/collections/{name}/records/{id}", s.rbacMiddleware("admin", "editor")(contentHandler(s.handleRecordsUpdate)))
	protected.Handle("DELETE /api/collections/{name}/records/{id}", s.rbacMiddleware("admin")(http.HandlerFunc(s.handleRecordsDelete)))

	protected.HandleFunc("GET /api/buckets", s.handleBucketsList)
	protected.Handle("POST /api/buckets", contentHandler(s.handleBucketsCreate))
	protected.HandleFunc("GET /api/buckets/{name}", s.handleBucketsGet)
	protected.HandleFunc("DELETE /api/buckets/{name}", s.handleBucketsDelete)

	protected.HandleFunc("POST /api/buckets/{name}/files", s.handleFilesUpload)
	protected.HandleFunc("GET /api/buckets/{name}/files", s.handleFilesList)
	protected.HandleFunc("GET /api/buckets/{name}/files/{id}", s.handleFilesDownload)
	protected.HandleFunc("GET /api/buckets/{name}/files/{id}/thumb", s.handleFileThumbnail)
	protected.HandleFunc("DELETE /api/buckets/{name}/files/{id}", s.handleFilesDelete)

	protected.HandleFunc("GET /api/webhooks", s.handleWebhooksList)
	protected.Handle("POST /api/webhooks", contentHandler(s.handleWebhooksCreate))
	protected.HandleFunc("GET /api/webhooks/{id}", s.handleWebhooksGet)
	protected.Handle("PATCH /api/webhooks/{id}", contentHandler(s.handleWebhooksUpdate))
	protected.HandleFunc("DELETE /api/webhooks/{id}", s.handleWebhooksDelete)
	protected.HandleFunc("GET /api/webhooks/{id}/logs", s.handleWebhookLogs)

	protected.HandleFunc("GET /api/secrets", s.handleSecretsList)
	protected.Handle("POST /api/secrets", contentHandler(s.handleSecretsCreate))
	protected.HandleFunc("GET /api/secrets/{id}", s.handleSecretsGet)
	protected.Handle("PATCH /api/secrets/{id}", contentHandler(s.handleSecretsUpdate))
	protected.HandleFunc("DELETE /api/secrets/{id}", s.handleSecretsDelete)

	protected.HandleFunc("GET /api/cronjobs", s.handleCronJobsList)
	protected.Handle("POST /api/cronjobs", contentHandler(s.handleCronJobsCreate))
	protected.HandleFunc("GET /api/cronjobs/{id}", s.handleCronJobsGet)
	protected.Handle("PATCH /api/cronjobs/{id}", contentHandler(s.handleCronJobsUpdate))
	protected.HandleFunc("DELETE /api/cronjobs/{id}", s.handleCronJobsDelete)
	protected.HandleFunc("POST /api/cronjobs/{id}/run", s.handleCronJobsRun)
	protected.HandleFunc("GET /api/cronjobs/{id}/logs", s.handleCronJobsLogs)

	protected.HandleFunc("GET /api/websockets", s.handleWSList)
	protected.HandleFunc("GET /api/websockets/{id}", s.handleWSGet)
	protected.HandleFunc("DELETE /api/websockets/{id}", s.handleWSDelete)
	protected.Handle("POST /api/websockets/broadcast", contentHandler(s.handleWSBroadcast))
	protected.Handle("POST /api/websockets/{id}/send", contentHandler(s.handleWSSend))
	protected.HandleFunc("GET /api/websockets/{id}/messages", s.handleWSMessages)
	protected.HandleFunc("GET /api/websockets/messages", s.handleWSAllMessages)

	protected.HandleFunc("GET /api/cache", s.handleCacheList)
	protected.Handle("POST /api/cache", contentHandler(s.handleCacheSet))
	protected.HandleFunc("GET /api/cache/{key}", s.handleCacheGet)
	protected.HandleFunc("DELETE /api/cache/{key}", s.handleCacheDelete)
	protected.HandleFunc("DELETE /api/cache", s.handleCacheFlush)
	protected.HandleFunc("GET /api/cache/stats", s.handleCacheStats)

	protected.HandleFunc("GET /api/notifications", s.handleNotificationsList)
	protected.Handle("POST /api/notifications", contentHandler(s.handleNotificationsCreate))
	protected.HandleFunc("GET /api/notifications/{id}", s.handleNotificationsGet)
	protected.HandleFunc("PATCH /api/notifications/{id}", s.handleNotificationsMarkRead)
	protected.HandleFunc("DELETE /api/notifications/{id}", s.handleNotificationsDelete)
	protected.HandleFunc("DELETE /api/notifications", s.handleNotificationsClear)

	protected.HandleFunc("GET /api/logs", s.handleLogsList)
	protected.Handle("POST /api/logs", contentHandler(s.handleLogsCreate))
	protected.HandleFunc("DELETE /api/logs", s.handleLogsClear)

	protected.HandleFunc("GET /api/pubsub/topics", s.handlePubSubTopicsList)
	protected.Handle("POST /api/pubsub/topics", contentHandler(s.handlePubSubTopicsCreate))
	protected.HandleFunc("GET /api/pubsub/topics/{name}", s.handlePubSubTopicsGet)
	protected.HandleFunc("DELETE /api/pubsub/topics/{name}", s.handlePubSubTopicsDelete)
	protected.HandleFunc("GET /api/pubsub/topics/{name}/messages", s.handlePubSubMessagesList)
	protected.Handle("POST /api/pubsub/topics/{name}/messages", contentHandler(s.handlePubSubMessagesCreate))

	protected.HandleFunc("GET /api/export", s.handleExport)
	protected.Handle("POST /api/import", contentHandler(s.handleImport))

	protected.Handle("GET /api/permissions", s.rbacMiddleware("admin")(http.HandlerFunc(s.handlePermissionsList)))
	protected.Handle("POST /api/permissions", s.rbacMiddleware("admin")(contentHandler(s.handlePermissionsCreate)))
	protected.Handle("DELETE /api/permissions/{id}", s.rbacMiddleware("admin")(http.HandlerFunc(s.handlePermissionsDelete)))

	mux.Handle("/api/", rateLimitMiddleware(authMiddleware(protected)))

	if s.pubsubHub != nil {
		mux.HandleFunc("GET /api/pubsub/{name}/stream", s.handlePubSubStream)
	}

	mux.HandleFunc("GET /ws", s.wsHub.ServeWS)

	if s.sseHub != nil {
		mux.HandleFunc("GET /api/notifications/stream", s.sseHub.handleStream)
	}
	if s.logHub != nil {
		mux.HandleFunc("GET /api/logs/stream", s.logHub.handleStream)
	}

	return mux
}

func (s *Server) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	s.routes().ServeHTTP(w, r)
	log.Printf("%s %s %s", r.Method, r.URL.Path, r.RemoteAddr)
}
