package string

import (
	"regexp"
	"strconv"
	"strings"
	"unicode"
)

var (
	// Match non-word characters (excluding underscore) for splitting.
	wordSplit = regexp.MustCompile(`[^a-zA-Z0-9_]+`)
	// Match camelCase boundaries: lowercase-to-uppercase or digit-to-letter transitions.
	camelBoundary = regexp.MustCompile(`([a-z0-9])([A-Z])`)
	// Match uppercase runs followed by lowercase (e.g. "JSONParser" -> "JSON", "Parser").
	upperRun = regexp.MustCompile(`([A-Z]+)([A-Z][a-z])`)
)

// words splits str into words using the same heuristic as lodash.
func words(str string) []string {
	s := camelBoundary.ReplaceAllString(str, "${1} ${2}")
	s = upperRun.ReplaceAllString(s, "${1} ${2}")
	parts := wordSplit.Split(s, -1)
	var out []string
	for _, p := range parts {
		if p != "" {
			out = append(out, p)
		}
	}
	return out
}

// CamelCase converts str to camelCase.
func CamelCase(str string) string {
	parts := words(str)
	for i := range parts {
		if i == 0 {
			parts[i] = strings.ToLower(parts[i])
		} else {
			parts[i] = strings.ToUpper(parts[i][:1]) + strings.ToLower(parts[i][1:])
		}
	}
	return strings.Join(parts, "")
}

// Capitalize capitalizes the first character of str and lowercases the rest.
func Capitalize(str string) string {
	if str == "" {
		return ""
	}
	return strings.ToUpper(str[:1]) + strings.ToLower(str[1:])
}

// Deburr replaces Latin-1 supplement diacritics (e.g. é, ñ, ü) with their ASCII equivalents.
func Deburr(str string) string {
	return deburrReplacer.Replace(str)
}

var deburrReplacer = strings.NewReplacer(
	"à", "a", "á", "a", "â", "a", "ã", "a", "ä", "a", "å", "a",
	"æ", "ae", "ç", "c", "è", "e", "é", "e", "ê", "e", "ë", "e",
	"ì", "i", "í", "i", "î", "i", "ï", "i", "ð", "d",
	"ñ", "n", "ò", "o", "ó", "o", "ô", "o", "õ", "o", "ö", "o", "ø", "o",
	"ù", "u", "ú", "u", "û", "u", "ü", "u",
	"ý", "y", "þ", "th", "ÿ", "y",
	"À", "A", "Á", "A", "Â", "A", "Ã", "A", "Ä", "A", "Å", "A",
	"Æ", "AE", "Ç", "C", "È", "E", "É", "E", "Ê", "E", "Ë", "E",
	"Ì", "I", "Í", "I", "Î", "I", "Ï", "I", "Ð", "D",
	"Ñ", "N", "Ò", "O", "Ó", "O", "Ô", "O", "Õ", "O", "Ö", "O", "Ø", "O",
	"Ù", "U", "Ú", "U", "Û", "U", "Ü", "U",
	"Ý", "Y", "Þ", "TH", "ß", "ss",
)

// Escape escapes & < > " ' to HTML entities.
func Escape(str string) string {
	return escapeReplacer.Replace(str)
}

var escapeReplacer = strings.NewReplacer(
	"&", "&amp;",
	"<", "&lt;",
	">", "&gt;",
	"\"", "&quot;",
	"'", "&#39;",
)

// EscapeRegExp escapes regular expression special characters in str.
func EscapeRegExp(str string) string {
	return regexp.QuoteMeta(str)
}

// KebabCase converts str to kebab-case.
func KebabCase(str string) string {
	parts := words(str)
	for i := range parts {
		parts[i] = strings.ToLower(parts[i])
	}
	return strings.Join(parts, "-")
}

// LowerCase converts str to lower case, splitting into words.
func LowerCase(str string) string {
	parts := words(str)
	for i := range parts {
		parts[i] = strings.ToLower(parts[i])
	}
	return strings.Join(parts, " ")
}

// LowerFirst lowercases the first character of str.
func LowerFirst(str string) string {
	if str == "" {
		return ""
	}
	return strings.ToLower(str[:1]) + str[1:]
}

// Pad pads str on the left and right sides if it is shorter than length.
// Padding characters are truncated if they exceed the needed length.
func Pad(str string, length int, chars string) string {
	if len(str) >= length {
		return str
	}
	if chars == "" {
		chars = " "
	}
	totalPad := length - len(str)
	leftPad := totalPad / 2
	rightPad := totalPad - leftPad
	return repeatChar(chars, leftPad) + str + repeatChar(chars, rightPad)
}

// PadEnd pads str on the right side if it is shorter than length.
func PadEnd(str string, length int, chars string) string {
	if len(str) >= length {
		return str
	}
	if chars == "" {
		chars = " "
	}
	return str + repeatChar(chars, length-len(str))
}

// PadStart pads str on the left side if it is shorter than length.
func PadStart(str string, length int, chars string) string {
	if len(str) >= length {
		return str
	}
	if chars == "" {
		chars = " "
	}
	return repeatChar(chars, length-len(str)) + str
}

func repeatChar(chars string, count int) string {
	if count <= 0 {
		return ""
	}
	n := (count + len(chars) - 1) / len(chars)
	return strings.Repeat(chars, n)[:count]
}

// ParseInt parses str as an integer with the given radix.
func ParseInt(str string, radix int) int64 {
	n, _ := strconv.ParseInt(str, radix, 64)
	return n
}

// Repeat repeats str n times.
func Repeat(str string, n int) string {
	return strings.Repeat(str, n)
}

// Replace replaces occurrences of pattern in str with replacement.
func Replace(str string, pattern string, replacement string) string {
	return strings.ReplaceAll(str, pattern, replacement)
}

// SnakeCase converts str to snake_case.
func SnakeCase(str string) string {
	parts := words(str)
	for i := range parts {
		parts[i] = strings.ToLower(parts[i])
	}
	return strings.Join(parts, "_")
}

// Split splits str by separator, limiting to limit results.
func Split(str string, separator string, limit int) []string {
	parts := strings.SplitN(str, separator, limit)
	// If limit is 0, lodash returns [] (not []string{""}).
	if limit == 0 {
		return []string{}
	}
	return parts
}

// StartCase converts str to Start Case.
func StartCase(str string) string {
	parts := words(str)
	for i := range parts {
		parts[i] = strings.ToUpper(parts[i][:1]) + strings.ToLower(parts[i][1:])
	}
	return strings.Join(parts, " ")
}

// Template replaces {{key}} placeholders with values from data.
func Template(str string, data map[string]string) string {
	var buf strings.Builder
	buf.Grow(len(str))
	i := 0
	for i < len(str) {
		start := strings.Index(str[i:], "{{")
		if start == -1 {
			buf.WriteString(str[i:])
			break
		}
		buf.WriteString(str[i : i+start])
		i += start + 2
		end := strings.Index(str[i:], "}}")
		if end == -1 {
			buf.WriteString(str[i-2:])
			break
		}
		key := str[i : i+end]
		if val, ok := data[key]; ok {
			buf.WriteString(val)
		}
		i += end + 2
	}
	return buf.String()
}

// ToLower converts str to lower case.
func ToLower(str string) string {
	return strings.ToLower(str)
}

// ToUpper converts str to upper case.
func ToUpper(str string) string {
	return strings.ToUpper(str)
}

// Truncate truncates str if it exceeds the specified length.
// options can contain "length" (default 30), "omission" (default "..."),
// and "separator" (regex pattern to break on).
func Truncate(str string, options map[string]int) string {
	if options == nil {
		options = map[string]int{}
	}
	length := 30
	omission := "..."
	if v, ok := options["length"]; ok && v >= 0 {
		length = v
	}
	omissionLen := len(omission)
	if len(str) <= length {
		return str
	}
	if length < omissionLen {
		return ""
	}
	end := length - omissionLen
	sepStr, hasSep := options["separator"]
	if hasSep {
		sep := string(rune(sepStr))
		if sep != "" {
			re, err := regexp.Compile(sep)
			if err == nil {
				matches := re.FindAllStringIndex(str[:end], -1)
				if len(matches) > 0 {
					end = matches[len(matches)-1][0]
				}
			}
		}
	}
	return str[:end] + omission
}

// Unescape converts HTML entities &amp; &lt; &gt; &quot; &#39; back to characters.
func Unescape(str string) string {
	return unescapeReplacer.Replace(str)
}

var unescapeReplacer = strings.NewReplacer(
	"&amp;", "&",
	"&lt;", "<",
	"&gt;", ">",
	"&quot;", "\"",
	"&#39;", "'",
)

// UpperCase converts str to upper case, splitting into words.
func UpperCase(str string) string {
	parts := words(str)
	for i := range parts {
		parts[i] = strings.ToUpper(parts[i])
	}
	return strings.Join(parts, " ")
}

// UpperFirst uppercases the first character of str.
func UpperFirst(str string) string {
	if str == "" {
		return ""
	}
	return strings.ToUpper(str[:1]) + str[1:]
}

// Words splits str into an array of words.
func Words(str string) []string {
	return words(str)
}

// Ensure the unicode package is used (for future helpers).
var _ = unicode.MaxRune

func EndsWith(str string, char byte, position int) bool {
	if position > len(str) {
		position = len(str)
	}
	if position == 0 {
		return false
	}
	return str[position-1] == char
}

func Trim(str string, chars string) string {
	return strings.Trim(str, chars)
}

func TrimEnd(str string, chars string) string {
	return strings.TrimRight(str, chars)
}

func TrimStart(str string, chars string) string {
	return strings.TrimLeft(str, chars)
}

func StartsWith(str string, char byte, position int) bool {
	return str[position] == char
}
