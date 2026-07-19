package server

import (
	"fmt"
	"io"
	"net"
	"os"
	"strconv"
	"strings"
	"time"
)

type requestLogger struct {
	out      io.Writer
	useColor bool
}

func (l *requestLogger) logLine(id uint64, method, path string, status int, durationMS int64) {
	var b strings.Builder
	b.WriteString("[")
	b.WriteString(time.Now().Format("15:04:05"))
	b.WriteString("] req=")
	b.WriteString(strconv.FormatUint(id, 10))
	b.WriteString(" ")
	b.WriteString(l.paint("36", method))
	b.WriteString(" ")
	b.WriteString(path)
	b.WriteString(" -> ")
	b.WriteString(l.paintStatus(status))
	b.WriteString(" (")
	b.WriteString(strconv.FormatInt(durationMS, 10))
	b.WriteString("ms)")
	fmt.Fprintln(l.out, b.String())
}

func (l *requestLogger) paint(style, text string) string {
	if !l.useColor {
		return text
	}
	return "\x1b[" + style + "m" + text + "\x1b[0m"
}

func (l *requestLogger) paintStatus(status int) string {
	switch {
	case status >= 200 && status < 300:
		return l.paint("32", strconv.Itoa(status))
	case status >= 300 && status < 400:
		return l.paint("36", strconv.Itoa(status))
	case status >= 400 && status < 500:
		return l.paint("33", strconv.Itoa(status))
	default:
		return l.paint("31", strconv.Itoa(status))
	}
}

func isTTY(f *os.File) bool {
	info, err := f.Stat()
	if err != nil {
		return false
	}
	return info.Mode()&os.ModeCharDevice != 0
}

func externalIPv4() string {
	virtual := []string{"lo", "utun", "awdl", "llw", "bridge", "vmnet", "vbox", "tap", "tun"}
	ifaces, err := net.Interfaces()
	if err != nil {
		return ""
	}
	for _, iface := range ifaces {
		if isVirtual(iface.Name, virtual) {
			continue
		}
		addrs, err := iface.Addrs()
		if err != nil {
			continue
		}
		for _, a := range addrs {
			ipn, ok := a.(*net.IPNet)
			if !ok {
				continue
			}
			v4 := ipn.IP.To4()
			if v4 == nil || v4.IsLoopback() || v4.IsLinkLocalUnicast() {
				continue
			}
			return v4.String()
		}
	}
	return ""
}

func isVirtual(name string, prefixes []string) bool {
	for _, p := range prefixes {
		if strings.HasPrefix(name, p) {
			return true
		}
	}
	return false
}
