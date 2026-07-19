package main

import (
	"bytes"
	"image"
	"image/jpeg"
	"image/png"
	"io"
	"mime/multipart"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"testing"
)

func uploadBinaryFile(t *testing.T, h interface {
	ServeHTTP(http.ResponseWriter, *http.Request)
}, bucket, filename string, data []byte) *httptest.ResponseRecorder {
	t.Helper()
	var buf bytes.Buffer
	w := multipart.NewWriter(&buf)
	fw, err := w.CreateFormFile("file", filename)
	if err != nil {
		t.Fatal(err)
	}
	io.Copy(fw, bytes.NewReader(data))
	w.Close()

	req := httptest.NewRequest("POST", "/api/buckets/"+bucket+"/files", &buf)
	req.Header.Set("Content-Type", w.FormDataContentType())
	resp := httptest.NewRecorder()
	h.ServeHTTP(resp, req)
	return resp
}

func TestHandleFileThumbnail_DBError(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	w := httptest.NewRecorder()
	r := httptest.NewRequest("GET", "/api/buckets/test/files/123/thumb", nil)
	srv := &Server{db: db, dataDir: t.TempDir()}
	srv.handleFileThumbnail(w, r)
	if w.Code != 500 {
		t.Fatalf("expected 500 from getFile error (no migrateDB), got %d. Body: %s", w.Code, w.Body.String())
	}
}

func TestHandleFileThumbnail_NotFound(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	resp := request(t, h, "GET", "/api/buckets/nonexistent/files/nonexistent/thumb", "")
	if resp.StatusCode != 404 {
		t.Fatalf("expected 404, got %d", resp.StatusCode)
	}
}

func TestHandleFileThumbnail_NonImage(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	// Create bucket
	request(t, h, "POST", "/api/buckets", `{"name":"thumbs"}`)

	// Upload text file
	resp := uploadFile(t, h, "thumbs", "test.txt", "hello")
	if resp.StatusCode != 200 {
		t.Fatalf("upload: expected 200, got %d", resp.StatusCode)
	}
	result := readBody(t, resp)
	fileID := result["id"].(string)

	// Request thumbnail (text file should return as-is)
	resp = request(t, h, "GET", "/api/buckets/thumbs/files/"+fileID+"/thumb", "")
	if resp.StatusCode != 200 {
		t.Fatalf("thumbnail: expected 200, got %d", resp.StatusCode)
	}
}

func TestHandleFileThumbnail_WrongBucket(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	request(t, h, "POST", "/api/buckets", `{"name":"bucket_a"}`)
	request(t, h, "POST", "/api/buckets", `{"name":"bucket_b"}`)

	resp := uploadFile(t, h, "bucket_a", "a.txt", "content")
	fileID := readBody(t, resp)["id"].(string)

	// Request via wrong bucket
	resp = request(t, h, "GET", "/api/buckets/bucket_b/files/"+fileID+"/thumb", "")
	if resp.StatusCode != 404 {
		t.Fatalf("expected 404 for wrong bucket, got %d", resp.StatusCode)
	}
}

func TestHandleFileThumbnail_ImageResize(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	request(t, h, "POST", "/api/buckets", `{"name":"images"}`)

	img := image.NewRGBA(image.Rect(0, 0, 10, 10))
	var jpgBuf bytes.Buffer
	if err := jpeg.Encode(&jpgBuf, img, nil); err != nil {
		t.Fatal(err)
	}
	resp := uploadBinaryFile(t, h, "images", "test.jpg", jpgBuf.Bytes())
	if resp.Code != 200 {
		t.Fatalf("upload JPEG: expected 200, got %d", resp.Code)
	}
	result := readBody(t, resp.Result())
	fileID := result["id"].(string)

	var pngBuf bytes.Buffer
	if err := png.Encode(&pngBuf, img); err != nil {
		t.Fatal(err)
	}
	resp = uploadBinaryFile(t, h, "images", "test.png", pngBuf.Bytes())
	if resp.Code != 200 {
		t.Fatalf("upload PNG: expected 200, got %d", resp.Code)
	}
	pngResult := readBody(t, resp.Result())
	pngID := pngResult["id"].(string)

	rr := httptest.NewRecorder()
	req := httptest.NewRequest("GET", "/api/buckets/images/files/"+fileID+"/thumb", nil)
	h.ServeHTTP(rr, req)
	if rr.Code != 200 {
		t.Fatalf("JPEG thumbnail: expected 200, got %d", rr.Code)
	}
	if ct := rr.Header().Get("Content-Type"); ct != "image/jpeg" {
		t.Fatalf("expected image/jpeg, got %s", ct)
	}

	rr2 := httptest.NewRecorder()
	req2 := httptest.NewRequest("GET", "/api/buckets/images/files/"+pngID+"/thumb", nil)
	h.ServeHTTP(rr2, req2)
	if rr2.Code != 200 {
		t.Fatalf("PNG thumbnail: expected 200, got %d", rr2.Code)
	}
	if ct := rr2.Header().Get("Content-Type"); ct != "image/png" {
		t.Fatalf("expected image/png, got %s", ct)
	}
}

func TestHandleFileThumbnail_ImageMissingOnDisk(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	request(t, h, "POST", "/api/buckets", `{"name":"img_missing"}`)

	img := image.NewRGBA(image.Rect(0, 0, 1, 1))
	var jpgBuf bytes.Buffer
	if err := jpeg.Encode(&jpgBuf, img, nil); err != nil {
		t.Fatal(err)
	}
	resp := uploadBinaryFile(t, h, "img_missing", "test.jpg", jpgBuf.Bytes())
	if resp.Code != 200 {
		t.Fatalf("upload: expected 200, got %d", resp.Code)
	}
	result := readBody(t, resp.Result())
	fileID := result["id"].(string)

	dir := filepath.Join(srv.dataDir, "storage", "img_missing")
	os.Remove(filepath.Join(dir, fileID))

	rr := httptest.NewRecorder()
	req := httptest.NewRequest("GET", "/api/buckets/img_missing/files/"+fileID+"/thumb", nil)
	h.ServeHTTP(rr, req)
	if rr.Code != 404 {
		t.Fatalf("expected 404 for missing image file, got %d", rr.Code)
	}
}

func TestHandleFileThumbnail_FileOnDiskMissing(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	request(t, h, "POST", "/api/buckets", `{"name":"missing"}`)
	resp := uploadFile(t, h, "missing", "f.txt", "data")
	fileID := readBody(t, resp)["id"].(string)

	// Delete the disk file
	dir := filepath.Join(srv.dataDir, "storage", "missing")
	os.Remove(filepath.Join(dir, fileID))

	resp = request(t, h, "GET", "/api/buckets/missing/files/"+fileID+"/thumb", "")
	if resp.StatusCode != 404 {
		t.Fatalf("expected 404 for missing disk file, got %d", resp.StatusCode)
	}
}
