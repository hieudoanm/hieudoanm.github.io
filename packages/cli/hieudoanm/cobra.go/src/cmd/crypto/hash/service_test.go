package hash

import "testing"

func TestComputeHash_md5(t *testing.T) {
	got, err := ComputeHash([]byte("hello"), "md5")
	if err != nil {
		t.Fatal(err)
	}
	want := "5d41402abc4b2a76b9719d911017c592"
	if got != want {
		t.Errorf("got %q, want %q", got, want)
	}
}

func TestComputeHash_sha1(t *testing.T) {
	got, err := ComputeHash([]byte("hello"), "sha1")
	if err != nil {
		t.Fatal(err)
	}
	want := "aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d"
	if got != want {
		t.Errorf("got %q, want %q", got, want)
	}
}

func TestComputeHash_sha256(t *testing.T) {
	got, err := ComputeHash([]byte("hello"), "sha256")
	if err != nil {
		t.Fatal(err)
	}
	want := "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"
	if got != want {
		t.Errorf("got %q, want %q", got, want)
	}
}

func TestComputeHash_sha512(t *testing.T) {
	got, err := ComputeHash([]byte("hello"), "sha512")
	if err != nil {
		t.Fatal(err)
	}
	want := "9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca72323c3d99ba5c11d7c7acc6e14b8c5da0c4663475c2e5c3adef46f73bcdec043"
	if got != want {
		t.Errorf("got %q, want %q", got, want)
	}
}

func TestComputeHash_unknown(t *testing.T) {
	_, err := ComputeHash([]byte("hello"), "sha999")
	if err == nil {
		t.Fatal("expected error for unknown algorithm")
	}
}

func TestComputeHash_emptyInput(t *testing.T) {
	got, err := ComputeHash([]byte{}, "sha256")
	if err != nil {
		t.Fatal(err)
	}
	want := "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
	if got != want {
		t.Errorf("got %q, want %q", got, want)
	}
}

func TestComputeHash_caseInsensitive(t *testing.T) {
	got, err := ComputeHash([]byte("hello"), "MD5")
	if err != nil {
		t.Fatal(err)
	}
	want := "5d41402abc4b2a76b9719d911017c592"
	if got != want {
		t.Errorf("got %q, want %q", got, want)
	}
}

func TestComputeHash_nilInput(t *testing.T) {
	got, err := ComputeHash(nil, "sha256")
	if err != nil {
		t.Fatal(err)
	}
	want := "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
	if got != want {
		t.Errorf("got %q, want %q", got, want)
	}
}

func TestComputeHash_unicodeInput(t *testing.T) {
	got, err := ComputeHash([]byte("héllo wörld 🔐"), "sha256")
	if err != nil {
		t.Fatal(err)
	}
	want := "9be81d7b234d569ec072f94cf871c8becbb2ebf83d69191d719a867c7c2d63b1"
	if got != want {
		t.Errorf("got %q, want %q", got, want)
	}
}

func TestComputeHash_largeInput(t *testing.T) {
	input := make([]byte, 100000)
	for i := range input {
		input[i] = byte(i % 256)
	}
	got, err := ComputeHash(input, "sha256")
	if err != nil {
		t.Fatal(err)
	}
	want := "db8f1d69251d95e2c88268d3c540533cc5182e0e33065a6f3f322f606a574489"
	if got != want {
		t.Errorf("got %q, want %q", got, want)
	}
}
