package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func (s *Server) handleExport(w http.ResponseWriter, r *http.Request) {
	cols, err := listCollections(s.db)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}

	records := make(map[string][]Record)
	for _, c := range cols {
		page, err := listRecords(s.db, c.Name, 1, 1000000, nil, "", nil)
		if err != nil {
			errorJSON(w, err.Error(), http.StatusInternalServerError)
			return
		}
		records[c.Name] = page.Records
	}

	buckets, err := listBuckets(s.db)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var files []FileRecord
	for _, b := range buckets {
		page, err := listFiles(s.db, b.Name, 1, 1000000)
		if err != nil {
			errorJSON(w, err.Error(), http.StatusInternalServerError)
			return
		}
		files = append(files, page.Files...)
	}

	result := map[string]any{
		"collections": cols,
		"records":     records,
		"buckets":     buckets,
		"files":       files,
	}
	jsonResponse(w, result)
}

func (s *Server) handleImport(w http.ResponseWriter, r *http.Request) {
	skipExisting := r.URL.Query().Get("skip_existing") == "true"

	var body struct {
		Collections []Collection           `json:"collections"`
		Records     map[string][]Record    `json:"records"`
		Buckets     []Bucket               `json:"buckets"`
		Files       []FileRecord           `json:"files"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		errorJSON(w, "invalid json", http.StatusBadRequest)
		return
	}

	for _, c := range body.Collections {
		existing, err := getCollection(s.db, c.Name)
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
		if err := createCollection(s.db, c.Name, c.Schema); err != nil {
			errorJSON(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}

	for colName, recs := range body.Records {
		for _, rec := range recs {
			existing, err := getRecord(s.db, colName, rec.ID)
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
			if _, err := createRecord(s.db, colName, rec.ID, rec.Data); err != nil {
				errorJSON(w, err.Error(), http.StatusInternalServerError)
				return
			}
		}
	}

	for _, b := range body.Buckets {
		existing, err := getBucket(s.db, b.Name)
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
		if _, err := createBucket(s.db, b.Name, b.IsPublic); err != nil {
			errorJSON(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}

	for _, f := range body.Files {
		existing, err := getFile(s.db, f.ID)
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
		if _, err := insertFile(s.db, f.Bucket, f.ID, f.Filename, f.MimeType, f.Size); err != nil {
			errorJSON(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}

	logID := generateID()
	meta, _ := json.Marshal(map[string]any{
		"import":       true,
		"collections":  len(body.Collections),
		"records":      len(body.Records),
		"buckets":      len(body.Buckets),
		"files":        len(body.Files),
		"skip_existing": skipExisting,
	})
	insertLog(s.db, logID, "info", "import completed", string(meta))

	jsonResponse(w, map[string]string{"status": "imported"})
}


