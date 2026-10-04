package build

import (
	"fmt"
	"os"
	"path/filepath"

	"gopkg.in/yaml.v3"
)

const configFileName = "pagify.yaml"

type Config struct {
	Title     string `yaml:"title"`
	Language  string `yaml:"language"`
	BasePath  string `yaml:"basePath"`
	Theme     string `yaml:"theme"`
	Footer    string `yaml:"footer"`
	FromIndex bool
}

func (c Config) withDefaults(fallbackTitle string) Config {
	if c.Title == "" {
		c.Title = fallbackTitle
	}
	if c.Language == "" {
		c.Language = "en"
	}
	if c.Theme == "" {
		c.Theme = "light"
	}
	c.BasePath = normalizeBasePath(c.BasePath)
	return c
}

func normalizeBasePath(basePath string) string {
	if basePath == "" || basePath == "/" {
		return ""
	}
	return "/" + trimSlashes(basePath)
}

func trimSlashes(value string) string {
	for len(value) > 0 && value[0] == '/' {
		value = value[1:]
	}
	for len(value) > 0 && value[len(value)-1] == '/' {
		value = value[:len(value)-1]
	}
	return value
}

// LoadConfig loads site configuration. It first checks for site-wide frontmatter
// in the index page (index.md). If not found, it falls back to pagify.yaml.
// If neither exists, defaults are derived from the directory name.
func LoadConfig(contentDir string, indexFrontmatter map[string]string) (Config, error) {
	// If index frontmatter has site fields, use those
	if indexFrontmatter != nil {
		if hasSiteFields(indexFrontmatter) {
			config := Config{
				Title:     indexFrontmatter["title"],
				Language:  indexFrontmatter["language"],
				BasePath:  indexFrontmatter["basePath"],
				Theme:     indexFrontmatter["theme"],
				Footer:    indexFrontmatter["footer"],
				FromIndex: true,
			}
			return config.withDefaults(defaultTitle(contentDir)), nil
		}
	}

	// Fall back to pagify.yaml
	path := filepath.Join(contentDir, configFileName)
	raw, err := os.ReadFile(path)
	if os.IsNotExist(err) {
		return Config{}.withDefaults(defaultTitle(contentDir)), nil
	}
	if err != nil {
		return Config{}, fmt.Errorf("read %s: %w", configFileName, err)
	}

	var config Config
	if err := yaml.Unmarshal(raw, &config); err != nil {
		return Config{}, fmt.Errorf("parse %s: %w", configFileName, err)
	}
	return config.withDefaults(defaultTitle(contentDir)), nil
}

func hasSiteFields(fm map[string]string) bool {
	fields := []string{"language", "basePath", "theme", "footer"}
	for _, field := range fields {
		if fm[field] != "" {
			return true
		}
	}
	return false
}

func defaultTitle(contentDir string) string {
	absolute, err := filepath.Abs(contentDir)
	if err != nil {
		return "Documentation"
	}
	return filepath.Base(absolute)
}
