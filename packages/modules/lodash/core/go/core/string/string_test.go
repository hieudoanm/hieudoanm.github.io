package string

import (
	"testing"
)

func TestCamelCase(t *testing.T) {
	if got := CamelCase("Foo Bar"); got != "fooBar" {
		t.Errorf("expected 'fooBar', got '%s'", got)
	}
	if got := CamelCase("--foo-bar--"); got != "fooBar" {
		t.Errorf("expected 'fooBar', got '%s'", got)
	}
	if got := CamelCase("FOO BAR"); got != "fooBar" {
		t.Errorf("expected 'fooBar', got '%s'", got)
	}
}

func TestCapitalize(t *testing.T) {
	if got := Capitalize("FRED"); got != "Fred" {
		t.Errorf("expected 'Fred', got '%s'", got)
	}
	if got := Capitalize(""); got != "" {
		t.Errorf("expected '', got '%s'", got)
	}
	if got := Capitalize("hello"); got != "Hello" {
		t.Errorf("expected 'Hello', got '%s'", got)
	}
}

func TestDeburr(t *testing.T) {
	if got := Deburr("déjà vu"); got != "deja vu" {
		t.Errorf("expected 'deja vu', got '%s'", got)
	}
	if got := Deburr("über"); got != "uber" {
		t.Errorf("expected 'uber', got '%s'", got)
	}
	if got := Deburr("abc"); got != "abc" {
		t.Errorf("expected 'abc', got '%s'", got)
	}
}

func TestEndsWith(t *testing.T) {
	if EndsWith("abc", 'c', 0) {
		t.Errorf("expected false for position 0")
	}
	if !EndsWith("abc", 'c', 3) {
		t.Errorf("expected true for full string")
	}
	if EndsWith("abc", 'b', 1) {
		t.Errorf("expected false (first char 'a')")
	}
	if !EndsWith("abc", 'b', 2) {
		t.Errorf("expected true (first 2 chars 'ab')")
	}
}

func TestEscape(t *testing.T) {
	if got := Escape("a&b<c>d\"e'"); got != "a&amp;b&lt;c&gt;d&quot;e&#39;" {
		t.Errorf("expected escaped string, got '%s'", got)
	}
	if got := Escape("hello"); got != "hello" {
		t.Errorf("expected unchanged, got '%s'", got)
	}
}

func TestEscapeRegExp(t *testing.T) {
	if got := EscapeRegExp("hello.world"); got != "hello\\.world" {
		t.Errorf("expected 'hello\\.world', got '%s'", got)
	}
}

func TestKebabCase(t *testing.T) {
	if got := KebabCase("Foo Bar"); got != "foo-bar" {
		t.Errorf("expected 'foo-bar', got '%s'", got)
	}
	if got := KebabCase("fooBar"); got != "foo-bar" {
		t.Errorf("expected 'foo-bar', got '%s'", got)
	}
}

func TestLowerCase(t *testing.T) {
	if got := LowerCase("--Foo-Bar--"); got != "foo bar" {
		t.Errorf("expected 'foo bar', got '%s'", got)
	}
	if got := LowerCase("fooBar"); got != "foo bar" {
		t.Errorf("expected 'foo bar', got '%s'", got)
	}
}

func TestLowerFirst(t *testing.T) {
	if got := LowerFirst("Fred"); got != "fred" {
		t.Errorf("expected 'fred', got '%s'", got)
	}
	if got := LowerFirst("FRED"); got != "fRED" {
		t.Errorf("expected 'fRED', got '%s'", got)
	}
	if got := LowerFirst(""); got != "" {
		t.Errorf("expected '', got '%s'", got)
	}
}

func TestPad(t *testing.T) {
	if got := Pad("abc", 7, "_-"); got != "_-abc_-" {
		t.Errorf("expected '_-abc_-', got '%s'", got)
	}
	if got := Pad("abc", 3, "*"); got != "abc" {
		t.Errorf("expected 'abc', got '%s'", got)
	}
	if got := Pad("abc", 5, ""); got != " abc " {
		t.Errorf("expected ' abc ', got '%s'", got)
	}
}

func TestPadEnd(t *testing.T) {
	if got := PadEnd("abc", 6, "*"); got != "abc***" {
		t.Errorf("expected 'abc***', got '%s'", got)
	}
	if got := PadEnd("abc", 2, "*"); got != "abc" {
		t.Errorf("expected 'abc', got '%s'", got)
	}
	if got := PadEnd("abc", 5, ""); got != "abc  " {
		t.Errorf("expected 'abc  ', got '%s'", got)
	}
}

func TestPadStart(t *testing.T) {
	if got := PadStart("abc", 6, "*"); got != "***abc" {
		t.Errorf("expected '***abc', got '%s'", got)
	}
	if got := PadStart("abc", 2, "*"); got != "abc" {
		t.Errorf("expected 'abc', got '%s'", got)
	}
	if got := PadStart("abc", 5, ""); got != "  abc" {
		t.Errorf("expected '  abc', got '%s'", got)
	}
}

func TestParseInt(t *testing.T) {
	if got := ParseInt("42", 10); got != 42 {
		t.Errorf("expected 42, got %d", got)
	}
	if got := ParseInt("ff", 16); got != 255 {
		t.Errorf("expected 255, got %d", got)
	}
	if got := ParseInt("invalid", 10); got != 0 {
		t.Errorf("expected 0, got %d", got)
	}
}

func TestRepeat(t *testing.T) {
	if got := Repeat("*", 3); got != "***" {
		t.Errorf("expected '***', got '%s'", got)
	}
	if got := Repeat("abc", 0); got != "" {
		t.Errorf("expected '', got '%s'", got)
	}
}

func TestReplace(t *testing.T) {
	if got := Replace("hello world", "world", "there"); got != "hello there" {
		t.Errorf("expected 'hello there', got '%s'", got)
	}
	if got := Replace("abc", "x", "y"); got != "abc" {
		t.Errorf("expected 'abc', got '%s'", got)
	}
}

func TestSnakeCase(t *testing.T) {
	if got := SnakeCase("Foo Bar"); got != "foo_bar" {
		t.Errorf("expected 'foo_bar', got '%s'", got)
	}
	if got := SnakeCase("fooBar"); got != "foo_bar" {
		t.Errorf("expected 'foo_bar', got '%s'", got)
	}
}

func TestSplit(t *testing.T) {
	result := Split("a-b-c", "-", 2)
	if len(result) != 2 || result[0] != "a" || result[1] != "b-c" {
		t.Errorf("expected [a b-c], got %v", result)
	}

	result2 := Split("a-b-c", "-", 0)
	if len(result2) != 0 {
		t.Errorf("expected [], got %v", result2)
	}

	result3 := Split("a-b-c", "-", -1)
	if len(result3) != 3 {
		t.Errorf("expected [a b c], got %v", result3)
	}
}

func TestStartCase(t *testing.T) {
	if got := StartCase("--foo-bar--"); got != "Foo Bar" {
		t.Errorf("expected 'Foo Bar', got '%s'", got)
	}
	if got := StartCase("FOO BAR"); got != "Foo Bar" {
		t.Errorf("expected 'Foo Bar', got '%s'", got)
	}
}

func TestStartsWith(t *testing.T) {
	if !StartsWith("abc", 'a', 0) {
		t.Errorf("expected true")
	}
	if StartsWith("abc", 'a', 1) {
		t.Errorf("expected false")
	}
	if !StartsWith("abc", 'b', 1) {
		t.Errorf("expected true")
	}
}

func TestTemplate(t *testing.T) {
	data := map[string]string{"name": "world", "greeting": "hello"}
	if got := Template("{{greeting}} {{name}}!", data); got != "hello world!" {
		t.Errorf("expected 'hello world!', got '%s'", got)
	}

	if got := Template("no placeholders", data); got != "no placeholders" {
		t.Errorf("expected 'no placeholders', got '%s'", got)
	}

	if got := Template("{{missing}}", data); got != "" {
		t.Errorf("expected '', got '%s'", got)
	}

	if got := Template("{{unclosed", data); got != "{{unclosed" {
		t.Errorf("expected '{{unclosed', got '%s'", got)
	}
}

func TestToLower(t *testing.T) {
	if got := ToLower("ABC"); got != "abc" {
		t.Errorf("expected 'abc', got '%s'", got)
	}
}

func TestToUpper(t *testing.T) {
	if got := ToUpper("abc"); got != "ABC" {
		t.Errorf("expected 'ABC', got '%s'", got)
	}
}

func TestTruncate(t *testing.T) {
	t.Run("default length 30", func(t *testing.T) {
		short := "hello"
		if got := Truncate(short, nil); got != short {
			t.Errorf("expected '%s', got '%s'", short, got)
		}
	})

	t.Run("longer than length", func(t *testing.T) {
		long := "hello world, this is a long string"
		result := Truncate(long, map[string]int{"length": 15})
		if len(result) > 15 {
			t.Errorf("expected <=15, got '%s' (%d)", result, len(result))
		}
	})

	t.Run("length 0", func(t *testing.T) {
		result := Truncate("hello", map[string]int{"length": 0})
		if result != "" {
			t.Errorf("expected '', got '%s'", result)
		}
	})

	t.Run("length < omissionLen", func(t *testing.T) {
		result := Truncate("hello world", map[string]int{"length": 1})
		if result != "" {
			t.Errorf("expected '', got '%s'", result)
		}
	})
}

func TestUnescape(t *testing.T) {
	if got := Unescape("a&amp;b&lt;c&gt;d&quot;e&#39;"); got != "a&b<c>d\"e'" {
		t.Errorf("expected 'a&b<c>d\"e'', got '%s'", got)
	}
	if got := Unescape("hello"); got != "hello" {
		t.Errorf("expected 'hello', got '%s'", got)
	}
}

func TestUpperCase(t *testing.T) {
	if got := UpperCase("--foo-bar--"); got != "FOO BAR" {
		t.Errorf("expected 'FOO BAR', got '%s'", got)
	}
}

func TestUpperFirst(t *testing.T) {
	if got := UpperFirst("fred"); got != "Fred" {
		t.Errorf("expected 'Fred', got '%s'", got)
	}
	if got := UpperFirst(""); got != "" {
		t.Errorf("expected '', got '%s'", got)
	}
}

func TestWords(t *testing.T) {
	result := Words("foo bar baz")
	if len(result) != 3 || result[0] != "foo" || result[1] != "bar" || result[2] != "baz" {
		t.Errorf("expected [foo bar baz], got %v", result)
	}
}

func TestTrim(t *testing.T) {
	if got := Trim("  abc  ", " "); got != "abc" {
		t.Errorf("expected 'abc', got '%s'", got)
	}
	if got := Trim("--abc--", "-"); got != "abc" {
		t.Errorf("expected 'abc', got '%s'", got)
	}
}

func TestTrimEnd(t *testing.T) {
	if got := TrimEnd("  abc  ", " "); got != "  abc" {
		t.Errorf("expected '  abc', got '%s'", got)
	}
}

func TestTrimStart(t *testing.T) {
	if got := TrimStart("  abc  ", " "); got != "abc  " {
		t.Errorf("expected 'abc  ', got '%s'", got)
	}
}
