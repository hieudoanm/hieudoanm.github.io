package crypto

import "testing"

func TestComputeHash_md5(t *testing.T) {
	got, err := computeHash([]byte("hello"), "md5")
	if err != nil {
		t.Fatal(err)
	}
	want := "5d41402abc4b2a76b9719d911017c592"
	if got != want {
		t.Errorf("got %q, want %q", got, want)
	}
}

func TestComputeHash_sha1(t *testing.T) {
	got, err := computeHash([]byte("hello"), "sha1")
	if err != nil {
		t.Fatal(err)
	}
	want := "aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d"
	if got != want {
		t.Errorf("got %q, want %q", got, want)
	}
}

func TestComputeHash_sha256(t *testing.T) {
	got, err := computeHash([]byte("hello"), "sha256")
	if err != nil {
		t.Fatal(err)
	}
	want := "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"
	if got != want {
		t.Errorf("got %q, want %q", got, want)
	}
}

func TestComputeHash_sha512(t *testing.T) {
	got, err := computeHash([]byte("hello"), "sha512")
	if err != nil {
		t.Fatal(err)
	}
	want := "9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca72323c3d99ba5c11d7c7acc6e14b8c5da0c4663475c2e5c3adef46f73bcdec043"
	if got != want {
		t.Errorf("got %q, want %q", got, want)
	}
}

func TestComputeHash_unknown(t *testing.T) {
	_, err := computeHash([]byte("hello"), "sha999")
	if err == nil {
		t.Fatal("expected error for unknown algorithm")
	}
}

func TestComputeHash_emptyInput(t *testing.T) {
	got, err := computeHash([]byte{}, "sha256")
	if err != nil {
		t.Fatal(err)
	}
	want := "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
	if got != want {
		t.Errorf("got %q, want %q", got, want)
	}
}

func TestComputeHash_caseInsensitive(t *testing.T) {
	got, err := computeHash([]byte("hello"), "MD5")
	if err != nil {
		t.Fatal(err)
	}
	want := "5d41402abc4b2a76b9719d911017c592"
	if got != want {
		t.Errorf("got %q, want %q", got, want)
	}
}
