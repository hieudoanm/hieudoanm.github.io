package httpapi

import (
	"encoding/json"
	"net/http"

	"github.com/hieudoanm/backbone/internal/cron"
	"github.com/hieudoanm/backbone/internal/events"
	"github.com/hieudoanm/backbone/internal/id"
	"github.com/hieudoanm/backbone/internal/store"
	crob "github.com/robfig/cron/v3"
)

func (s *Server) handleCronJobsList(w http.ResponseWriter, r *http.Request) {
	jobs, err := store.ListCronJobs(s.db)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	jsonResponse(w, jobs)
}

func (s *Server) handleCronJobsCreate(w http.ResponseWriter, r *http.Request) {
	var body struct {
		Name     string `json:"name"`
		Schedule string `json:"schedule"`
		Command  string `json:"command"`
		Method   string `json:"method"`
		Headers  string `json:"headers"`
		Body     string `json:"body"`
		IsActive *bool  `json:"is_active"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		errorJSON(w, "invalid json", http.StatusBadRequest)
		return
	}
	if body.Name == "" {
		errorJSON(w, "name is required", http.StatusBadRequest)
		return
	}
	if body.Schedule == "" {
		errorJSON(w, "schedule is required", http.StatusBadRequest)
		return
	}
	if body.Command == "" {
		errorJSON(w, "command is required", http.StatusBadRequest)
		return
	}
	if _, err := crob.ParseStandard(body.Schedule); err != nil {
		errorJSON(w, "invalid cron schedule: "+err.Error(), http.StatusBadRequest)
		return
	}
	method := body.Method
	if method == "" {
		method = "GET"
	}
	isActive := true
	if body.IsActive != nil {
		isActive = *body.IsActive
	}
	job, err := store.InsertCronJob(s.db, id.Generate(), body.Name, body.Schedule, body.Command, method, body.Headers, body.Body, isActive)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	go s.dispatchEvent(events.EventCronjobCreate, cron.WebhookCronjobData(job))
	w.WriteHeader(http.StatusCreated)
	jsonResponse(w, job)
}

func (s *Server) handleCronJobsGet(w http.ResponseWriter, r *http.Request) {
	job, err := store.GetCronJob(s.db, r.PathValue("id"))
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if job == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	jsonResponse(w, job)
}

func (s *Server) handleCronJobsUpdate(w http.ResponseWriter, r *http.Request) {
	existing, err := store.GetCronJob(s.db, r.PathValue("id"))
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if existing == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	var body struct {
		Name     *string `json:"name"`
		Schedule *string `json:"schedule"`
		Command  *string `json:"command"`
		Method   *string `json:"method"`
		Headers  *string `json:"headers"`
		Body     *string `json:"body"`
		IsActive *bool   `json:"is_active"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		errorJSON(w, "invalid json", http.StatusBadRequest)
		return
	}
	name := existing.Name
	if body.Name != nil {
		name = *body.Name
	}
	schedule := existing.Schedule
	if body.Schedule != nil {
		schedule = *body.Schedule
	}
	command := existing.Command
	if body.Command != nil {
		command = *body.Command
	}
	method := existing.Method
	if body.Method != nil {
		method = *body.Method
	}
	headers := existing.Headers
	if body.Headers != nil {
		headers = *body.Headers
	}
	jobBody := existing.Body
	if body.Body != nil {
		jobBody = *body.Body
	}
	isActive := existing.IsActive
	if body.IsActive != nil {
		isActive = *body.IsActive
	}
	if schedule != existing.Schedule || (body.Schedule != nil && *body.Schedule != "") {
		if _, err := crob.ParseStandard(schedule); err != nil {
			errorJSON(w, "invalid cron schedule: "+err.Error(), http.StatusBadRequest)
			return
		}
	}
	job, err := store.UpdateCronJob(s.db, existing.ID, name, schedule, command, method, headers, jobBody, isActive)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	go s.dispatchEvent(events.EventCronjobUpdate, cron.WebhookCronjobData(job))
	jsonResponse(w, job)
}

func (s *Server) handleCronJobsDelete(w http.ResponseWriter, r *http.Request) {
	job, err := store.GetCronJob(s.db, r.PathValue("id"))
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if job == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	if err := store.DeleteCronJob(s.db, job.ID); err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	go s.dispatchEvent(events.EventCronjobDelete, cron.WebhookCronjobData(job))
	w.WriteHeader(http.StatusNoContent)
}

func (s *Server) handleCronJobsRun(w http.ResponseWriter, r *http.Request) {
	job, err := store.GetCronJob(s.db, r.PathValue("id"))
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if job == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	cron.ExecuteJob(s.db, *job)
	jsonResponse(w, map[string]string{"status": "triggered"})
}

func (s *Server) handleCronJobsLogs(w http.ResponseWriter, r *http.Request) {
	job, err := store.GetCronJob(s.db, r.PathValue("id"))
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if job == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	logs, err := store.ListCronJobLogs(s.db, job.ID)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if logs == nil {
		logs = []store.CronJobLog{}
	}
	jsonResponse(w, logs)
}
