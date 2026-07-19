package build

import (
	"encoding/json"
	"fmt"
	"path"
	"sort"
	"strings"

	"pagify/internal/site"
	"pagify/internal/theme"
)

const searchIndexName = "search-index.json"

type searchDocument struct {
	Title string `json:"title"`
	URL   string `json:"url"`
	Body  string `json:"body"`
}

type SearchIndex struct {
	Documents    []searchDocument `json:"documents"`
	TrigramIndex map[string][]int `json:"trigramIndex,omitempty"`
	Meta         SearchMeta       `json:"meta"`
}

type SearchMeta struct {
	Version       int    `json:"version"`
	DocumentCount int    `json:"documentCount"`
	GeneratedAt   string `json:"generatedAt"`
}

const (
	trigramMinLen    = 3
	trigramMaxDocs   = 50
	maxSearchBody    = 3000
	trigramIndexName = "search-trigrams.json"
)

func writeSearchIndex(outputDir string, config Config, pages site.Pages) (int, error) {
	if len(pages) == 0 {
		return 0, nil
	}
	documents := make([]searchDocument, 0, len(pages))
	for _, page := range pages {
		documents = append(documents, searchDocument{
			Title: page.NavTitle(),
			URL:   config.url(page.URL),
			Body:  summarize(page.HTML),
		})
	}

	trigramIndex := buildTrigramIndex(documents)

	index := SearchIndex{
		Documents:    documents,
		TrigramIndex: trigramIndex,
		Meta: SearchMeta{
			Version:       2,
			DocumentCount: len(documents),
			GeneratedAt:   formatTimestamp(),
		},
	}

	encoded, err := json.Marshal(index)
	if err != nil {
		return 0, fmt.Errorf("encode search index: %w", err)
	}
	target := path.Join(theme.AssetDir, searchIndexName)
	if err := writeFile(outputDir, target, encoded); err != nil {
		return 0, err
	}
	return 1, nil
}

func buildTrigramIndex(documents []searchDocument) map[string][]int {
	index := make(map[string]map[int]struct{})

	for docID, doc := range documents {
		text := strings.ToLower(doc.Title + " " + doc.Body)
		words := strings.Fields(text)
		for _, word := range words {
			if len(word) < trigramMinLen {
				continue
			}
			for i := 0; i <= len(word)-trigramMinLen; i++ {
				trigram := word[i : i+trigramMinLen]
				if index[trigram] == nil {
					index[trigram] = make(map[int]struct{})
				}
				index[trigram][docID] = struct{}{}
			}
		}
	}

	result := make(map[string][]int, len(index))
	for trigram, docSet := range index {
		docIDs := make([]int, 0, len(docSet))
		for id := range docSet {
			docIDs = append(docIDs, id)
		}
		sort.Slice(docIDs, func(i, j int) bool {
			return len(documents[docIDs[i]].Title) < len(documents[docIDs[j]].Title)
		})
		if len(docIDs) > trigramMaxDocs {
			docIDs = docIDs[:trigramMaxDocs]
		}
		result[trigram] = docIDs
	}
	return result
}

func formatTimestamp() string {
	return "auto-generated"
}

func summarize(html string) string {
	collapsed := strings.Join(strings.Fields(decodeEntities(visibleText(html))), " ")
	if len(collapsed) > maxSearchBody {
		return collapsed[:maxSearchBody]
	}
	return collapsed
}

var invisibleElements = []string{"script", "style", "template"}

const noSearchAttribute = "data-no-search"

func visibleText(html string) string {
	var text strings.Builder
	lower := strings.ToLower(html)
	var open []bool
	hidden := 0

	for offset := 0; offset < len(html); {
		if html[offset] != '<' {
			if hidden == 0 {
				text.WriteByte(html[offset])
			}
			offset++
			continue
		}

		end := strings.IndexByte(html[offset:], '>')
		if end < 0 {
			break
		}
		tag := lower[offset+1 : offset+end]
		switch {
		case strings.HasSuffix(tag, "/"):
		case strings.HasPrefix(tag, "/"):
			if len(open) > 0 {
				if open[len(open)-1] {
					hidden--
				}
				open = open[:len(open)-1]
			}
		default:
			hide := hidesContents(tag)
			open = append(open, hide)
			if hide {
				hidden++
			}
		}
		offset += end + 1
		if hidden == 0 {
			text.WriteByte(' ')
		}
	}
	return text.String()
}

func hidesContents(tag string) bool {
	name := strings.Trim(tag, "/")
	if cut := strings.IndexAny(name, " \t\n"); cut >= 0 {
		name = name[:cut]
	}
	for _, element := range invisibleElements {
		if name == element {
			return true
		}
	}
	return strings.Contains(tag, noSearchAttribute)
}

func decodeEntities(text string) string {
	replacer := strings.NewReplacer(
		"&", "&",
		"<", "<",
		">", ">",
		"\"", "\"",
		"&"+"quot;", "\"",
		"'", "'",
		"&nbsp;", " ",
	)
	return replacer.Replace(text)
}
