package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/robfig/cron/v3"
)

const (
	EventCronjobCreate = "cronjob.create"
	EventCronjobUpdate = "cronjob.update"
	EventCronjobDelete = "cronjob.delete"
)

type CronJob struct {
	ID            string `json:"id"`
	Name          string `json:"name"`
	Schedule      string `json:"schedule"`
	Command       string `json:"command"`
	Method        string `json:"method"`
	Headers       string `json:"headers"`
	Body          string `json:"body"`
	IsActive      bool   `json:"is_active"`
	LastRunAt     string `json:"last_run_at"`
	LastRunStatus string `json:"last_run_status"`
	CreatedAt     string `json:"created_at"`
	UpdatedAt     string `json:"updated_at"`
}

type CronJobLog struct {
	ID         string `json:"id"`
	CronJobID  string `json:"cronjob_id"`
	StartedAt  string `json:"started_at"`
	FinishedAt string `json:"finished_at"`
	DurationMs int64  `json:"duration_ms"`
	Status     string `json:"status"`
	Output     string `json:"output"`
	Error      string `json:"error"`
}

func startCronScheduler(db *sql.DB) *cron.Cron {
	c := cron.New(cron.WithSeconds())
	c.AddFunc("@every 30s", func() {
		jobs, err := listCronJobs(db)
		if err != nil {
			log.Printf("cron scheduler: list jobs: %v", err)
			return
		}
		now := time.Now()
		for _, j := range jobs {
			if !j.IsActive {
				continue
			}
			entry, err := cron.ParseStandard(j.Schedule)
			if err != nil {
				continue
			}
			lastRun, _ := time.Parse(time.RFC3339, j.LastRunAt)
			nextRun := entry.Next(lastRun)
			if nextRun.IsZero() {
				continue
			}
			if !now.Before(nextRun) {
				go executeCronJob(db, j)
			}
		}
	})
	c.Start()
	return c
}

func executeCronJob(db *sql.DB, job CronJob) {
	startedAt := time.Now().UTC().Format(time.RFC3339)
	var status, output, errMsg string
	var durationMs int64

	method := strings.ToUpper(job.Method)
	if method == "" {
		method = "GET"
	}

	var bodyReader io.Reader
	if job.Body != "" {
		bodyReader = strings.NewReader(job.Body)
	}

	req, err := http.NewRequest(method, job.Command, bodyReader)
	if err != nil {
		errMsg = fmt.Sprintf("create request: %v", err)
		status = "failure"
	} else {
		if job.Headers != "" {
			var headers map[string]string
			if err := json.Unmarshal([]byte(job.Headers), &headers); err == nil {
				for k, v := range headers {
					req.Header.Set(k, v)
				}
			}
		}
		client := &http.Client{Timeout: 30 * time.Second}
		resp, err := client.Do(req)
		finishedAt := time.Now()
		if startedTime, parseErr := time.Parse(time.RFC3339, startedAt); parseErr == nil {
			durationMs = finishedAt.Sub(startedTime).Milliseconds()
		}

		if err != nil {
			errMsg = err.Error()
			status = "failure"
		} else {
			defer resp.Body.Close()
			body, _ := io.ReadAll(resp.Body)
			output = string(body)
			if len(output) > 10240 {
				output = output[:10240]
			}
			if resp.StatusCode >= 200 && resp.StatusCode < 300 {
				status = "success"
			} else {
				status = "failure"
				errMsg = fmt.Sprintf("HTTP %d", resp.StatusCode)
			}
		}
	}

	now := time.Now().UTC()
	id := generateID()
	logEntry := &CronJobLog{
		ID:         id,
		CronJobID:  job.ID,
		StartedAt:  startedAt,
		FinishedAt: now.Format(time.RFC3339),
		DurationMs: durationMs,
		Status:     status,
		Output:     output,
		Error:      errMsg,
	}
	updateCronJobLastRun(db, job.ID, now.Format(time.RFC3339), status)
	insertCronJobLog(db, logEntry)
}

func webhookCronjobData(job *CronJob) map[string]any {
	return map[string]any{
		"cronjob": job,
	}
}
