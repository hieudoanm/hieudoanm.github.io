package httpapi

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"strings"

	"github.com/hieudoanm/backbone/internal/events"
	"github.com/hieudoanm/backbone/internal/id"
	"github.com/hieudoanm/backbone/internal/store"
)

func (s *Server) handleBucketsList(w http.ResponseWriter, r *http.Request) {
	buckets, err := store.ListBuckets(s.db)
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
	b, err := store.CreateBucket(s.db, body.Name, body.IsPublic)
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
	go s.dispatchEvent(events.EventBucketCreate, webhookBucketData(b))
	jsonResponse(w, b)
}

func (s *Server) handleBucketsGet(w http.ResponseWriter, r *http.Request) {
	name := r.PathValue("name")
	b, err := store.GetBucket(s.db, name)
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
	b, err := store.GetBucket(s.db, name)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if b == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	go s.dispatchEvent(events.EventBucketDelete, webhookBucketData(b))
	files, err := store.DeleteBucket(s.db, name)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	dir := filepath.Join(s.dataDir, "storage", name)
	for _, f := range files {
		os.Remove(filepath.Join(dir, f.ID))
	}
	os.RemoveAll(dir)
	w.WriteHeader(http.StatusNoContent)
}

func (s *Server) handleFilesUpload(w http.ResponseWriter, r *http.Request) {
	name := r.PathValue("name")
	b, err := store.GetBucket(s.db, name)
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

	fileID := id.Generate()
	fileDir := filepath.Join(s.dataDir, "storage", name)
	os.MkdirAll(fileDir, 0755)
	filePath := filepath.Join(fileDir, fileID)
	if err := os.WriteFile(filePath, data, 0644); err != nil {
		errorJSON(w, "failed to save file", http.StatusInternalServerError)
		return
	}
	f, err := store.InsertFile(s.db, name, fileID, header.Filename, mimeType, int64(len(data)))
	if err != nil {
		os.Remove(filePath)
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	jsonResponse(w, f)
}

func (s *Server) handleFilesList(w http.ResponseWriter, r *http.Request) {
	name := r.PathValue("name")
	b, err := store.GetBucket(s.db, name)
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
	pageData, err := store.ListFiles(s.db, name, page, perPage)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	jsonResponse(w, pageData)
}

func (s *Server) handleFilesDownload(w http.ResponseWriter, r *http.Request) {
	name := r.PathValue("name")
	fileID := r.PathValue("id")
	f, err := store.GetFile(s.db, fileID)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if f == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
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
	f, err := store.GetFile(s.db, fileID)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if f == nil || f.Bucket != name {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	deleted, err := store.DeleteFile(s.db, fileID)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if deleted != nil {
		os.Remove(filepath.Join(s.dataDir, "storage", name, fileID))
	}
	w.WriteHeader(http.StatusNoContent)
}
