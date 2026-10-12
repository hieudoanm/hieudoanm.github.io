package server

import (
	"encoding/json"
	"fmt"
	"io"
	"log/slog"
	"net/http"
	"strings"

	"github.com/gorilla/mux"

	"dbml/internal/dbml"
)

type Server struct {
	router *mux.Router
	port   string
}

type ConvertRequest struct {
	DBML      string   `json:"dbml"`
	Formats   []string `json:"formats,omitempty"`
	InputFile string   `json:"input_file,omitempty"`
}

type ConvertResponse struct {
	SQL     string `json:"sql,omitempty"`
	Mermaid string `json:"mermaid,omitempty"`
	SVG     string `json:"svg,omitempty"`
	Error   string `json:"error,omitempty"`
}

type HealthResponse struct {
	Status  string `json:"status"`
	Version string `json:"version"`
}

func NewServer(port string) *Server {
	s := &Server{
		router: mux.NewRouter(),
		port:   port,
	}
	s.setupRoutes()
	return s
}

func (s *Server) setupRoutes() {
	s.router.HandleFunc("/health", s.healthHandler).Methods("GET")
	s.router.HandleFunc("/api/v1/convert", s.convertHandler).Methods("POST")
	s.router.HandleFunc("/api/v1/convert/sql", s.convertSQLHandler).Methods("POST")
	s.router.HandleFunc("/api/v1/convert/mermaid", s.convertMermaidHandler).Methods("POST")
}

func (s *Server) Start() error {
	slog.Info("Starting server", "port", s.port)
	return http.ListenAndServe(":"+s.port, s.router)
}

func (s *Server) Router() *mux.Router {
	return s.router
}

func (s *Server) healthHandler(w http.ResponseWriter, r *http.Request) {
	response := HealthResponse{
		Status:  "ok",
		Version: "dev",
	}
	writeJSON(w, http.StatusOK, response)
}

func (s *Server) convertHandler(w http.ResponseWriter, r *http.Request) {
	var req ConvertRequest
	if err := parseRequest(r, &req); err != nil {
		writeError(w, http.StatusBadRequest, err.Error())
		return
	}

	if req.DBML == "" {
		writeError(w, http.StatusBadRequest, "dbml field is required")
		return
	}

	project, err := dbml.Parse(strings.NewReader(req.DBML))
	if err != nil {
		writeError(w, http.StatusBadRequest, fmt.Sprintf("parse error: %v", err))
		return
	}

	formats := req.Formats
	if len(formats) == 0 {
		formats = []string{"sql", "mermaid"}
	}

	response := ConvertResponse{}
	for _, format := range formats {
		switch strings.ToLower(format) {
		case "sql":
			response.SQL = project.ToSQL()
		case "mermaid":
			response.Mermaid = project.ToMermaid()
		case "svg":
			response.SVG = project.ToSVG()
		}
	}

	writeJSON(w, http.StatusOK, response)
}

func (s *Server) convertSQLHandler(w http.ResponseWriter, r *http.Request) {
	var req ConvertRequest
	if err := parseRequest(r, &req); err != nil {
		writeError(w, http.StatusBadRequest, err.Error())
		return
	}

	if req.DBML == "" {
		writeError(w, http.StatusBadRequest, "dbml field is required")
		return
	}

	project, err := dbml.Parse(strings.NewReader(req.DBML))
	if err != nil {
		writeError(w, http.StatusBadRequest, fmt.Sprintf("parse error: %v", err))
		return
	}

	response := ConvertResponse{
		SQL: project.ToSQL(),
	}
	writeJSON(w, http.StatusOK, response)
}

func (s *Server) convertMermaidHandler(w http.ResponseWriter, r *http.Request) {
	var req ConvertRequest
	if err := parseRequest(r, &req); err != nil {
		writeError(w, http.StatusBadRequest, err.Error())
		return
	}

	if req.DBML == "" {
		writeError(w, http.StatusBadRequest, "dbml field is required")
		return
	}

	project, err := dbml.Parse(strings.NewReader(req.DBML))
	if err != nil {
		writeError(w, http.StatusBadRequest, fmt.Sprintf("parse error: %v", err))
		return
	}

	response := ConvertResponse{
		Mermaid: project.ToMermaid(),
	}
	writeJSON(w, http.StatusOK, response)
}

func parseRequest(r *http.Request, v interface{}) error {
	contentType := r.Header.Get("Content-Type")

	if strings.Contains(contentType, "multipart/form-data") {
		return parseMultipart(r, v)
	}

	if strings.Contains(contentType, "application/json") {
		return json.NewDecoder(r.Body).Decode(v)
	}

	body, err := io.ReadAll(r.Body)
	if err != nil {
		return err
	}

	var req ConvertRequest
	req.DBML = string(body)
	return json.Unmarshal([]byte(fmt.Sprintf(`{"dbml": %s}`, jsonEscape(string(body)))), v)
}

func parseMultipart(r *http.Request, v interface{}) error {
	err := r.ParseMultipartForm(32 << 20)
	if err != nil {
		return err
	}

	file, _, err := r.FormFile("file")
	if err == nil {
		defer file.Close()
		content, err := io.ReadAll(file)
		if err != nil {
			return err
		}
		if req, ok := v.(*ConvertRequest); ok {
			req.DBML = string(content)
			return nil
		}
	}

	dbmlContent := r.FormValue("dbml")
	if dbmlContent != "" {
		if req, ok := v.(*ConvertRequest); ok {
			req.DBML = dbmlContent
			return nil
		}
	}

	jsonContent := r.FormValue("json")
	if jsonContent != "" {
		return json.NewDecoder(strings.NewReader(jsonContent)).Decode(v)
	}

	return fmt.Errorf("no dbml content found in multipart request")
}

func jsonEscape(s string) string {
	b, _ := json.Marshal(s)
	return string(b)
}

func writeJSON(w http.ResponseWriter, status int, v interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(v)
}

func writeError(w http.ResponseWriter, status int, message string) {
	writeJSON(w, status, ConvertResponse{Error: message})
}
