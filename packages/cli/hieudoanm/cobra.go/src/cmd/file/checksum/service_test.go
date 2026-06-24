package checksum

import (
	"bytes"
	"io"
	"os"
	"path/filepath"
	"strings"
	"testing"
)

func captureOutput(fn func()) string {
	old := os.Stdout
	r, w, _ := os.Pipe()
	os.Stdout = w
	fn()
	w.Close()
	var buf bytes.Buffer
	io.Copy(&buf, r)
	os.Stdout = old
	return buf.String()
}

func TestRunChecksum_SHA256(t *testing.T) {
	tmp := t.TempDir()
	path := filepath.Join(tmp, "test.txt")
	os.WriteFile(path, []byte("hello"), 0644)

	output := captureOutput(func() {
		if err := runChecksum(path, "sha256", false); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "2cf24dba") {
		t.Errorf("expected sha256 hash, got: %s", output)
	}
}

func TestRunChecksum_MD5(t *testing.T) {
	tmp := t.TempDir()
	path := filepath.Join(tmp, "test.txt")
	os.WriteFile(path, []byte("hello"), 0644)

	output := captureOutput(func() {
		if err := runChecksum(path, "md5", false); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "5d41402a") {
		t.Errorf("expected md5 hash, got: %s", output)
	}
}

func TestRunChecksum_SHA1(t *testing.T) {
	tmp := t.TempDir()
	path := filepath.Join(tmp, "test.txt")
	os.WriteFile(path, []byte("hello"), 0644)

	output := captureOutput(func() {
		if err := runChecksum(path, "sha1", false); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "aaf4c61d") {
		t.Errorf("expected sha1 hash, got: %s", output)
	}
}

func TestRunChecksum_SHA512(t *testing.T) {
	tmp := t.TempDir()
	path := filepath.Join(tmp, "test.txt")
	os.WriteFile(path, []byte("hello"), 0644)

	output := captureOutput(func() {
		if err := runChecksum(path, "sha512", false); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "9b71d224") {
		t.Errorf("expected sha512 hash, got: %s", output)
	}
}

func TestRunChecksum_FileNotFound(t *testing.T) {
	err := runChecksum("/nonexistent/file.txt", "sha256", false)
	if err == nil {
		t.Fatal("expected error for nonexistent file")
	}
}
