package build

import (
	"fmt"
	"os"
	"path/filepath"

	"gopkg.in/yaml.v3"
)

// configFileName is the optional file that overrides inferred site metadata.
// Everything in it has a working default, so a site with no config file at all
// builds exactly as well as one with a full config file.
const configFileName = "pagify.yaml"

// Config is the optional pagify.yaml at the content root. It exists to give a
// site a name, a language and a footer without renaming content files.
type Config struct {
	// Title is the site name shown in the header and page titles.
	Title string `yaml:"title"`
	// Language is the value of the html lang attribute.
	Language string `yaml:"language"`
	// BasePath is the URL prefix the site is served under, e.g. "/my-repo" for
	// a project page on GitHub Pages. Empty means the domain root.
	BasePath string `yaml:"basePath"`
	// Theme is the initial colour scheme, "light" or "dark".
	Theme string `yaml:"theme"`
	// Footer is an optional line of text below the page content.
	Footer string `yaml:"footer"`
}

// withDefaults fills unset fields so the rest of the build can treat every
// field as present.
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

// normalizeBasePath makes basePath either empty or a slash-delimited prefix
// with no trailing slash, so joining it onto a URL never doubles a separator.
func normalizeBasePath(basePath string) string {
	if basePath == "" || basePath == "/" {
		return ""
	}
	return "/" + trimSlashes(basePath)
}

// trimSlashes removes leading and trailing slashes.
func trimSlashes(value string) string {
	for len(value) > 0 && value[0] == '/' {
		value = value[1:]
	}
	for len(value) > 0 && value[len(value)-1] == '/' {
		value = value[:len(value)-1]
	}
	return value
}

// LoadConfig reads pagify.yaml from contentDir. A missing file is not an error:
// the site falls back to defaults derived from the directory name. A file that
// exists but cannot be parsed is an error, because silently ignoring a
// malformed config would be far more confusing than failing the build.
func LoadConfig(contentDir string) (Config, error) {
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

// defaultTitle turns the content directory's own name into a site title, so
// `pagify build ./docs` produces a site called "Docs" without any config.
func defaultTitle(contentDir string) string {
	absolute, err := filepath.Abs(contentDir)
	if err != nil {
		return "Documentation"
	}
	return filepath.Base(absolute)
}
