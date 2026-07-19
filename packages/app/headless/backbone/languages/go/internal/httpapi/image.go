package httpapi

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

	"github.com/hieudoanm/backbone/internal/store"
	"golang.org/x/image/draw"
)

func (s *Server) handleFileThumbnail(w http.ResponseWriter, r *http.Request) {
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

	width := 200
	height := 200
	if v := r.URL.Query().Get("width"); v != "" {
		if n, err := strconv.Atoi(v); err == nil && n > 0 && n <= 4096 {
			width = n
		}
	}
	if v := r.URL.Query().Get("height"); v != "" {
		if n, err := strconv.Atoi(v); err == nil && n > 0 && n <= 4096 {
			height = n
		}
	}

	filePath := filepath.Join(s.dataDir, "storage", name, fileID)

	if f.MimeType != "image/jpeg" && f.MimeType != "image/png" {
		data, err := os.ReadFile(filePath)
		if err != nil {
			errorJSON(w, "file not found on disk", http.StatusNotFound)
			return
		}
		w.Header().Set("Content-Type", f.MimeType)
		w.Write(data)
		return
	}

	src, err := os.Open(filePath)
	if err != nil {
		errorJSON(w, "file not found on disk", http.StatusNotFound)
		return
	}
	defer src.Close()

	srcImg, _, err := image.Decode(src)
	if err != nil {
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
