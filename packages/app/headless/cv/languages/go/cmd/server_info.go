package cmd

import (
	"fmt"
	"io"
	"net"
	"os"
	"strings"
)

const boxTitle = " CV Server "

type serverLink struct {
	label string
	url   string
}

func printServerBox(w io.Writer, port string) {
	links := []serverLink{{"Local", "http://localhost:" + port}}
	if ip := externalIP(); ip != "" {
		links = append(links, serverLink{"Network", "http://" + ip + ":" + port})
	}
	links = append(links, serverLink{"Docs", "http://localhost:" + port + "/api/v1/docs"})
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
