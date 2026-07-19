package server

import (
	"context"
	"fmt"
	"io"
	"net"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/hieudoanm/browserverless/internal/headless"
)

type Config struct {
	Bind           string
	Port           int
	ViewportWidth  int
	ViewportHeight int
	LoadTimeout    time.Duration
}

func (c Config) resolveBind() string {
	host, _, err := net.SplitHostPort(c.Bind)
	if err != nil {
		host = c.Bind
		if host == "" {
			host = "0.0.0.0"
		}
		port := 8080
		if c.Port != 0 {
			port = c.Port
		}
		return net.JoinHostPort(host, strconv.Itoa(port))
	}
	if c.Port == 0 {
		return c.Bind
	}
	return net.JoinHostPort(host, strconv.Itoa(c.Port))
}

func Serve(ctx context.Context, config Config) error {
	bind := config.resolveBind()

	ln, err := net.Listen("tcp", bind)
	if err != nil {
		return err
	}

	printBanner(ln.Addr(), os.Stdout)

	browser := headless.New(headless.Config{
		ViewportWidth:  config.ViewportWidth,
		ViewportHeight: config.ViewportHeight,
		LoadTimeout:    config.LoadTimeout,
	})

	logger := requestLogger{out: os.Stdout, useColor: isTTY(os.Stdout)}
	handler := NewHandler(browser, logger.logLine)

	srv := &http.Server{Handler: handler}
	errCh := make(chan error, 1)
	go func() {
		if serr := srv.Serve(ln); serr != nil && serr != http.ErrServerClosed {
			errCh <- serr
			return
		}
		errCh <- nil
	}()

	select {
	case <-ctx.Done():
		shutdownCtx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()
		return srv.Shutdown(shutdownCtx)
	case err := <-errCh:
		return err
	}
}

func printBanner(addr net.Addr, out io.Writer) {
	port := 8080
	if tcpa, ok := addr.(*net.TCPAddr); ok {
		port = tcpa.Port
	}
	ip := externalIPv4()
	if ip == "" {
		ip = "127.0.0.1"
	}

	labelCol := 10
	title := "Browserverless server"
	rows := [][2]string{
		{"localhost", fmt.Sprintf("http://127.0.0.1:%d", port)},
		{"ip:port", fmt.Sprintf("http://%s:%d", ip, port)},
	}
	urlWidth := 0
	for _, row := range rows {
		if len(row[1]) > urlWidth {
			urlWidth = len(row[1])
		}
	}
	width := len(title)
	if labelCol+urlWidth > width {
		width = labelCol + urlWidth
	}

	horizontal := strings.Repeat("─", width+2)
	fmt.Fprintf(out, "╭%s╮\n", horizontal)
	fmt.Fprintf(out, "│ %s%s │\n", title, strings.Repeat(" ", width-len(title)))
	for _, row := range rows {
		fmt.Fprintf(out, "│ %s%s%s │\n", row[0], strings.Repeat(" ", labelCol-len(row[0])), row[1]+strings.Repeat(" ", urlWidth-len(row[1])))
	}
	fmt.Fprintf(out, "╰%s╯\n", horizontal)
}
