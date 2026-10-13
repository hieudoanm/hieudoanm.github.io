package cmd

import (
	"encoding/json"
	"net/http"
	"os"

	"cv/internal/cv"

	"github.com/spf13/cobra"
)

var serveCmd = &cobra.Command{
	Use:   "serve",
	Short: "Start HTTP server",
	Long:  `Start HTTP server with endpoint POST /pdf to generate PDF from JSON.`,
	Args:  cobra.NoArgs,
	RunE: func(cmd *cobra.Command, args []string) error {
		port := os.Getenv("PORT")
		if port == "" {
			port = "8080"
		}

		http.HandleFunc("/pdf", handlePDF)
		http.HandleFunc("/health", handleHealth)

		cmd.Printf("Server starting on :%s\n", port)
		return http.ListenAndServe(":"+port, nil)
	},
}

func handleHealth(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
}

func handlePDF(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}

	var data cv.CVData
	if err := json.NewDecoder(r.Body).Decode(&data); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": err.Error()})
		return
	}

	template := r.URL.Query().Get("template")
	if template == "" {
		templates := cv.ListTemplates()
		if len(templates) > 0 {
			template = templates[0]
		}
	}

	output := os.TempDir() + "/cv.pdf"
	if err := cv.GeneratePDF(&data, template, output); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": err.Error()})
		return
	}

	w.Header().Set("Content-Type", "application/pdf")
	http.ServeFile(w, r, output)
	os.Remove(output)
}
