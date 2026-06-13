// package openrouter ...
package openrouter

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/spf13/cobra"
)

// ---------------------------
// Request / Response types
// ---------------------------

type chatRequest struct {
	Prompt string `json:"prompt"`
	Model  string `json:"model"`
}

type chatResponse struct {
	Prompt   string `json:"prompt"`
	Response string `json:"response"`
}

type errorResponse struct {
	Error string `json:"error"`
}

// ---------------------------
// Handlers
// ---------------------------

func serveRoot(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"message": "Go + OpenRouter Chat API server is running",
	})
}

func serveChat(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		json.NewEncoder(w).Encode(errorResponse{Error: "method not allowed"})
		return
	}

	var req chatRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(errorResponse{Error: "invalid request body"})
		return
	}

	// Default model — mirrors Python reference default
	if req.Model == "" {
		req.Model = "openai/gpt-oss-20b"
	}

	output, err := Generate(req.Model, req.Prompt)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(errorResponse{Error: err.Error()})
		return
	}

	json.NewEncoder(w).Encode(chatResponse{
		Prompt:   req.Prompt,
		Response: output,
	})
}

// ---------------------------
// Cobra command
// ---------------------------

var servePort string

var openrouterServeCmd = &cobra.Command{
	Use:   "serve",
	Short: "Start the OpenRouter HTTP server",
	Long: `Starts a lightweight Go HTTP server that exposes:
  GET  /       — health check
  POST /chat   — forward {prompt, model} to OpenRouter and return the response`,
	Run: func(cmd *cobra.Command, args []string) {
		mux := http.NewServeMux()
		mux.HandleFunc("/", serveRoot)
		mux.HandleFunc("/chat", serveChat)

		addr := fmt.Sprintf(":%s", servePort)
		fmt.Printf("🚀 OpenRouter server listening on http://localhost%s\n", addr)
		fmt.Println("  GET  / → health check")
		fmt.Println("  POST /chat → {\"prompt\":\"...\",\"model\":\"...\"}")

		if err := http.ListenAndServe(addr, mux); err != nil {
			log.Fatalf("Server error: %v", err)
		}
	},
}

func init() {
	openrouterServeCmd.Flags().StringVarP(&servePort, "port", "p", "8080", "Port to listen on")
}
