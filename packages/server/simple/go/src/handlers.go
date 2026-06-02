package main

import (
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

	"github.com/robfig/cron/v3"
)

type Server struct {
	db            *sql.DB
	dataDir       string
	secretsKey    []byte
	cronScheduler *cron.Cron
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

	pageData, err := listRecords(s.db, name, page, perPage)
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

func (s *Server) routes() http.Handler {
	mux := http.NewServeMux()

	mux.HandleFunc("GET /api/health", func(w http.ResponseWriter, r *http.Request) {
		jsonResponse(w, map[string]string{"status": "ok"})
	})

	mux.HandleFunc("POST /api/auth/register", s.handleRegister)
	mux.HandleFunc("POST /api/auth/login", s.handleLogin)

	mux.Handle("/", http.FileServer(http.Dir("public")))

	protected := http.NewServeMux()
	protected.HandleFunc("GET /api/collections", s.handleCollectionsList)
	protected.HandleFunc("POST /api/collections", s.handleCollectionsCreate)
	protected.HandleFunc("GET /api/collections/{name}", s.handleCollectionsGet)
	protected.HandleFunc("DELETE /api/collections/{name}", s.handleCollectionsDelete)

	protected.HandleFunc("POST /api/collections/{name}/records", s.handleRecordsCreate)
	protected.HandleFunc("GET /api/collections/{name}/records", s.handleRecordsList)
	protected.HandleFunc("GET /api/collections/{name}/records/{id}", s.handleRecordsGet)
	protected.HandleFunc("PATCH /api/collections/{name}/records/{id}", s.handleRecordsUpdate)
	protected.HandleFunc("DELETE /api/collections/{name}/records/{id}", s.handleRecordsDelete)

	protected.HandleFunc("GET /api/buckets", s.handleBucketsList)
	protected.HandleFunc("POST /api/buckets", s.handleBucketsCreate)
	protected.HandleFunc("GET /api/buckets/{name}", s.handleBucketsGet)
	protected.HandleFunc("DELETE /api/buckets/{name}", s.handleBucketsDelete)

	protected.HandleFunc("POST /api/buckets/{name}/files", s.handleFilesUpload)
	protected.HandleFunc("GET /api/buckets/{name}/files", s.handleFilesList)
	protected.HandleFunc("GET /api/buckets/{name}/files/{id}", s.handleFilesDownload)
	protected.HandleFunc("DELETE /api/buckets/{name}/files/{id}", s.handleFilesDelete)

	protected.HandleFunc("GET /api/webhooks", s.handleWebhooksList)
	protected.HandleFunc("POST /api/webhooks", s.handleWebhooksCreate)
	protected.HandleFunc("GET /api/webhooks/{id}", s.handleWebhooksGet)
	protected.HandleFunc("PATCH /api/webhooks/{id}", s.handleWebhooksUpdate)
	protected.HandleFunc("DELETE /api/webhooks/{id}", s.handleWebhooksDelete)
	protected.HandleFunc("GET /api/webhooks/{id}/logs", s.handleWebhookLogs)

	protected.HandleFunc("GET /api/secrets", s.handleSecretsList)
	protected.HandleFunc("POST /api/secrets", s.handleSecretsCreate)
	protected.HandleFunc("GET /api/secrets/{id}", s.handleSecretsGet)
	protected.HandleFunc("PATCH /api/secrets/{id}", s.handleSecretsUpdate)
	protected.HandleFunc("DELETE /api/secrets/{id}", s.handleSecretsDelete)

	protected.HandleFunc("GET /api/cronjobs", s.handleCronJobsList)
	protected.HandleFunc("POST /api/cronjobs", s.handleCronJobsCreate)
	protected.HandleFunc("GET /api/cronjobs/{id}", s.handleCronJobsGet)
	protected.HandleFunc("PATCH /api/cronjobs/{id}", s.handleCronJobsUpdate)
	protected.HandleFunc("DELETE /api/cronjobs/{id}", s.handleCronJobsDelete)
	protected.HandleFunc("POST /api/cronjobs/{id}/run", s.handleCronJobsRun)
	protected.HandleFunc("GET /api/cronjobs/{id}/logs", s.handleCronJobsLogs)

	mux.Handle("/api/", authMiddleware(protected))

	return mux
}

func (s *Server) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	s.routes().ServeHTTP(w, r)
	log.Printf("%s %s %s", r.Method, r.URL.Path, r.RemoteAddr)
}
