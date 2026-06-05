package main

import (
	"bytes"
	"image"
	"image/jpeg"
	"image/png"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strconv"

	"golang.org/x/image/draw"
)

func (s *Server) handleFileThumbnail(w http.ResponseWriter, r *http.Request) {
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
	if f.Bucket != name {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}

	width := 200
	height := 200
	if w := r.URL.Query().Get("width"); w != "" {
		if v, err := strconv.Atoi(w); err == nil && v > 0 && v <= 4096 {
			width = v
		}
	}
	if h := r.URL.Query().Get("height"); h != "" {
		if v, err := strconv.Atoi(h); err == nil && v > 0 && v <= 4096 {
			height = v
		}
	}

	if f.MimeType != "image/jpeg" && f.MimeType != "image/png" {
		filePath := filepath.Join(s.dataDir, "storage", name, fileID)
		data, err := os.ReadFile(filePath)
		if err != nil {
			errorJSON(w, "file not found on disk", http.StatusNotFound)
			return
		}
		w.Header().Set("Content-Type", f.MimeType)
		w.Write(data)
		return
	}

	filePath := filepath.Join(s.dataDir, "storage", name, fileID)
	src, err := os.Open(filePath)
	if err != nil {
		errorJSON(w, "file not found on disk", http.StatusNotFound)
		return
	}
	defer src.Close()

	srcImg, _, err := image.Decode(src)
	if err != nil {
		filePath := filepath.Join(s.dataDir, "storage", name, fileID)
		data, err := os.ReadFile(filePath)
		if err != nil {
			errorJSON(w, "file not found on disk", http.StatusNotFound)
			return
		}
		w.Header().Set("Content-Type", f.MimeType)
		w.Write(data)
		return
	}

	dst := image.NewRGBA(image.Rect(0, 0, width, height))
	draw.CatmullRom.Scale(dst, dst.Bounds(), srcImg, srcImg.Bounds(), draw.Over, nil)

	var buf bytes.Buffer
	switch f.MimeType {
	case "image/jpeg":
		err = jpeg.Encode(&buf, dst, &jpeg.Options{Quality: 85})
	case "image/png":
		err = png.Encode(&buf, dst)
	}
	if err != nil {
		errorJSON(w, "encode failed", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", f.MimeType)
	w.Header().Set("Content-Length", strconv.Itoa(buf.Len()))
	io.Copy(w, &buf)
}
