package net

import (
	"encoding/json"
	"fmt"
	"net"
	"net/http"
	"os"
	"path/filepath"

	"github.com/spf13/cobra"
)

func newServeCmd() *cobra.Command {
	var port int
	var dir, certFile, keyFile string
	var cors, serveJSON bool

	cmd := &cobra.Command{
		Use:   "serve",
		Short: "Start an HTTP file server",
		Long:  `Serve static files over HTTP with optional CORS, directory listing, and TLS support.`,
		Example: `  serve
  serve --port 9000 --dir ./public
  serve --port 443 --cert cert.pem --key key.pem`,
		RunE: func(cmd *cobra.Command, args []string) error {
			absDir, err := filepath.Abs(dir)
			if err != nil {
				return err
			}

			info, err := os.Stat(absDir)
			if err != nil {
				return fmt.Errorf("directory error: %w", err)
			}
			if !info.IsDir() {
				return fmt.Errorf("%s is not a directory", absDir)
			}

			mux := http.NewServeMux()
			fs := http.FileServer(http.Dir(absDir))

			if cors {
				mux.Handle("/", corsMiddleware(fs))
			} else {
				mux.Handle("/", fs)
			}

			addr := fmt.Sprintf(":%d", port)
			listener, err := net.Listen("tcp", addr)
			if err != nil {
				return fmt.Errorf("port %d unavailable: %w", port, err)
			}
			listener.Close()

			if serveJSON {
				out, _ := json.MarshalIndent(map[string]interface{}{
					"directory": absDir,
					"url":       fmt.Sprintf("http://localhost:%d", port),
					"port":      port,
					"tls":       certFile != "" && keyFile != "",
				}, "", "  ")
				fmt.Println(string(out))
			} else {
				fmt.Printf("Serving %s on http://localhost:%d\n", absDir, port)
			}
			if certFile != "" && keyFile != "" {
				fmt.Printf("TLS enabled (cert: %s, key: %s)\n", certFile, keyFile)
				return http.ListenAndServeTLS(addr, certFile, keyFile, mux)
			}
			return http.ListenAndServe(addr, mux)
		},
	}

	cmd.Flags().IntVarP(&port, "port", "p", 8080, "Port to listen on")
	cmd.Flags().StringVarP(&dir, "dir", "d", ".", "Directory to serve")
	cmd.Flags().BoolVar(&cors, "cors", false, "Enable CORS headers")
	cmd.Flags().StringVar(&certFile, "cert", "", "TLS certificate file")
	cmd.Flags().StringVar(&keyFile, "key", "", "TLS key file")
	cmd.Flags().BoolVar(&serveJSON, "json", false, "Output in JSON format")
	return cmd
}

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "*")
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		next.ServeHTTP(w, r)
	})
}
