// Package cron schedules and executes periodic HTTP jobs.
package cron

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/hieudoanm/backbone/internal/id"
	"github.com/hieudoanm/backbone/internal/store"
	"github.com/robfig/cron/v3"
)

// StartScheduler runs a cron loop that executes due jobs.
func StartScheduler(db *sql.DB) *cron.Cron {
	c := cron.New(cron.WithSeconds())
	c.AddFunc("@every 30s", func() {
		jobs, err := store.ListCronJobs(db)
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
				go ExecuteJob(db, j)
			}
		}
	})
	c.Start()
	return c
}

// ExecuteJob runs a single cron job and records the result.
func ExecuteJob(db *sql.DB, job store.CronJob) {
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
	id := id.Generate()
	logEntry := &store.CronJobLog{
		ID:         id,
		CronJobID:  job.ID,
		StartedAt:  startedAt,
		FinishedAt: now.Format(time.RFC3339),
		DurationMs: durationMs,
		Status:     status,
		Output:     output,
		Error:      errMsg,
	}
	store.UpdateCronJobLastRun(db, job.ID, now.Format(time.RFC3339), status)
	store.InsertCronJobLog(db, logEntry)
}

// WebhookCronjobData wraps a job for webhook payloads.
func WebhookCronjobData(job *store.CronJob) map[string]any {
	return map[string]any{
		"cronjob": job,
	}
}
