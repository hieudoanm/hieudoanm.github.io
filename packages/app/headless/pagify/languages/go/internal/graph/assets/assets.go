// Package assets embeds the offline graph web assets and exposes them as
// byte slices. It is a leaf package: it imports nothing from its parent.
package assets

import (
	"embed"
	"io/fs"
)

//go:embed web/template.html web/styles.css web/app.js web/vendor/vis-network.min.js web/vendor/LICENSES/vis-network.txt
var Web embed.FS

// Template returns the embedded HTML template.
func Template() ([]byte, error) {
	return fs.ReadFile(Web, "web/template.html")
}

// Styles returns the embedded CSS.
func Styles() ([]byte, error) {
	return fs.ReadFile(Web, "web/styles.css")
}

// VendorJS returns the pinned vis-network distribution.
func VendorJS() ([]byte, error) {
	return fs.ReadFile(Web, "web/vendor/vis-network.min.js")
}

// AppJS returns the embedded application script.
func AppJS() ([]byte, error) {
	return fs.ReadFile(Web, "web/app.js")
}

// VendorLicense returns the license attribution text.
func VendorLicense() ([]byte, error) {
	return fs.ReadFile(Web, "web/vendor/LICENSES/vis-network.txt")
}
