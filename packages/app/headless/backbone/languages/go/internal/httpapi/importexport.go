package httpapi

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/hieudoanm/backbone/internal/id"
	"github.com/hieudoanm/backbone/internal/log"
	"github.com/hieudoanm/backbone/internal/store"
)

func (s *Server) handleExport(w http.ResponseWriter, r *http.Request) {
	cols, err := store.ListCollections(s.db)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}

	records := make(map[string][]store.Record)
	for _, c := range cols {
		page, err := store.ListRecords(s.db, c.Name, 1, 1000000, nil, "", nil, "")
		if err != nil {
			errorJSON(w, err.Error(), http.StatusInternalServerError)
			return
		}
		records[c.Name] = page.Records
	}

	buckets, err := store.ListBuckets(s.db)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var files []store.FileRecord
	for _, b := range buckets {
		page, err := store.ListFiles(s.db, b.Name, 1, 1000000)
		if err != nil {
			errorJSON(w, err.Error(), http.StatusInternalServerError)
			return
		}
		files = append(files, page.Files...)
	}

	jsonResponse(w, map[string]any{
		"collections": cols,
		"records":     records,
		"buckets":     buckets,
		"files":       files,
	})
}

func (s *Server) handleImport(w http.ResponseWriter, r *http.Request) {
	skipExisting := r.URL.Query().Get("skip_existing") == "true"

	var body struct {
		Collections []store.Collection        `json:"collections"`
		Records     map[string][]store.Record `json:"records"`
		Buckets     []store.Bucket            `json:"buckets"`
		Files       []store.FileRecord        `json:"files"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		errorJSON(w, "invalid json", http.StatusBadRequest)
		return
	}

	for _, c := range body.Collections {
		existing, err := store.GetCollection(s.db, c.Name)
		if err != nil {
			errorJSON(w, err.Error(), http.StatusInternalServerError)
			return
		}
		if existing != nil {
			if !skipExisting {
				errorJSON(w, fmt.Sprintf("collection %q already exists", c.Name), http.StatusConflict)
				return
			}
			continue
		}
		if err := store.CreateCollection(s.db, c.Name, c.Schema); err != nil {
			errorJSON(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}

	for colName, recs := range body.Records {
		for _, rec := range recs {
			existing, err := store.GetRecord(s.db, colName, rec.ID)
			if err != nil {
				errorJSON(w, err.Error(), http.StatusInternalServerError)
				return
			}
			if existing != nil {
				if !skipExisting {
					errorJSON(w, fmt.Sprintf("record %q in collection %q already exists", rec.ID, colName), http.StatusConflict)
					return
				}
				continue
			}
			if _, err := store.CreateRecord(s.db, colName, rec.ID, rec.Data); err != nil {
				errorJSON(w, err.Error(), http.StatusInternalServerError)
				return
			}
		}
	}

	for _, b := range body.Buckets {
		existing, err := store.GetBucket(s.db, b.Name)
		if err != nil {
			errorJSON(w, err.Error(), http.StatusInternalServerError)
			return
		}
		if existing != nil {
			if !skipExisting {
				errorJSON(w, fmt.Sprintf("bucket %q already exists", b.Name), http.StatusConflict)
				return
			}
			continue
		}
		if _, err := store.CreateBucket(s.db, b.Name, b.IsPublic); err != nil {
			errorJSON(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}

	for _, f := range body.Files {
		existing, err := store.GetFile(s.db, f.ID)
		if err != nil {
			errorJSON(w, err.Error(), http.StatusInternalServerError)
			return
		}
		if existing != nil {
			if !skipExisting {
				errorJSON(w, fmt.Sprintf("file %q already exists", f.ID), http.StatusConflict)
				return
			}
			continue
		}
		if _, err := store.InsertFile(s.db, f.Bucket, f.ID, f.Filename, f.MimeType, f.Size); err != nil {
			errorJSON(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}

	meta, _ := json.Marshal(map[string]any{
		"import":        true,
		"collections":   len(body.Collections),
		"records":       len(body.Records),
		"buckets":       len(body.Buckets),
		"files":         len(body.Files),
		"skip_existing": skipExisting,
	})
	if _, err := log.InsertLog(s.db, id.Generate(), "info", "import completed", string(meta)); err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}

	jsonResponse(w, map[string]string{"status": "imported"})
}
