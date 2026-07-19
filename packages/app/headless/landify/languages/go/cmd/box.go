package cmd

import (
	"fmt"
	"io"
	"net"
	"net/url"
	"os"
	"strings"
)

const boxTitle = " landify Server "

type serverLink struct {
	label string
	url   string
}

// baseLinks builds the Local/Network rows shown in the startup box. Network is
// only shown when the server is reachable from the network.
func baseLinks(rawURL string, exposeNetwork bool) []serverLink {
	base := displayBase(rawURL)
	links := []serverLink{{"Local", base}}
	if exposeNetwork {
		if ip := externalIP(); ip != "" {
			links = append(links, serverLink{"Network", withHost(base, ip)})
		}
	}
	return links
}

// serveLinks builds the rows for the JSON API server, which always advertises
// its Swagger UI under /api/v1/docs.
func serveLinks(rawURL string, exposeNetwork bool) []serverLink {
	links := baseLinks(rawURL, exposeNetwork)
	return append(links, serverLink{"Docs", displayBase(rawURL) + "/api/v1/docs"})
}

// previewLinks builds the rows for the static preview, which has no docs.
func previewLinks(rawURL string, exposeNetwork bool) []serverLink {
	return baseLinks(rawURL, exposeNetwork)
}

func printServerBox(w io.Writer, links []serverLink) {
	fmt.Fprint(w, renderServerBox(links, isTerminal(w)))
}

func renderServerBox(links []serverLink, useANSI bool) string {
	labelWidth := 0
	for _, l := range links {
		labelWidth = max(labelWidth, len(l.label))
	}

	rows := make([]string, 0, len(links))
	inner := len(boxTitle) + 1
	for _, l := range links {
		row := "  " + padRight(l.label, labelWidth) + "  " + l.url
		rows = append(rows, row)
		inner = max(inner, len(row)+1)
	}

	var b strings.Builder
	fmt.Fprintf(&b, "╭─%s%s╮\n", boxTitle, strings.Repeat("─", inner-len(boxTitle)-1))
	fmt.Fprintf(&b, "│%s│\n", padRight("", inner))
	for i, row := range rows {
		content := padRight(row, inner)
		if useANSI {
			content = strings.Replace(content, links[i].url, hyperlink(links[i].url, links[i].url), 1)
		}
		fmt.Fprintf(&b, "│%s│\n", content)
	}
	fmt.Fprintf(&b, "│%s│\n", padRight("", inner))
	fmt.Fprintf(&b, "╰%s╯\n", strings.Repeat("─", inner))
	return b.String()
}

// externalIP returns the outbound interface address without sending traffic.
func externalIP() string {
	conn, err := net.Dial("udp", "8.8.8.8:80")
	if err != nil {
		return ""
	}
	defer conn.Close()
	if addr, ok := conn.LocalAddr().(*net.UDPAddr); ok {
		return addr.IP.String()
	}
	return ""
}

// displayBase canonicalises the host for presentation: loopback and unspecified
// binds both read as localhost, which is what a user can actually click.
func displayBase(rawURL string) string {
	u, err := url.Parse(rawURL)
	if err != nil {
		return strings.TrimRight(rawURL, "/")
	}
	if isLoopbackHost(u.Hostname()) || isUnspecifiedHost(u.Hostname()) {
		u.Host = net.JoinHostPort("localhost", u.Port())
	}
	return strings.TrimRight(u.String(), "/")
}

func withHost(base, host string) string {
	u, err := url.Parse(base)
	if err != nil {
		return base
	}
	u.Host = net.JoinHostPort(host, u.Port())
	return u.String()
}

func isLoopbackHost(host string) bool {
	if host == "" || host == "localhost" {
		return true
	}
	if ip := net.ParseIP(host); ip != nil {
		return ip.IsLoopback()
	}
	return false
}

func isUnspecifiedHost(host string) bool {
	if host == "" {
		return true
	}
	if ip := net.ParseIP(host); ip != nil {
		return ip.IsUnspecified()
	}
	return false
}

func hyperlink(url, text string) string {
	return "\x1b]8;;" + url + "\x1b\\" + text + "\x1b]8;;\x1b\\"
}

func isTerminal(w io.Writer) bool {
	f, ok := w.(*os.File)
	if !ok {
		return false
	}
	info, err := f.Stat()
	if err != nil {
		return false
	}
	return info.Mode()&os.ModeCharDevice != 0
}

func padRight(s string, n int) string {
	if len(s) >= n {
		return s
	}
	return s + strings.Repeat(" ", n-len(s))
}
