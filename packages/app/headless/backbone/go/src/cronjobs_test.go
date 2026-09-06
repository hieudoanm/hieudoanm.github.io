package main

import (
	"net/http"
	"net/http/httptest"
	"testing"
	"time"
)

func TestWebhookCronjobData(t *testing.T) {
	job := &CronJob{ID: "cj1", Name: "test", Schedule: "*/5 * * * *"}
	data := webhookCronjobData(job)
	if data["cronjob"] != job {
		t.Fatalf("expected cronjob key to reference the job")
	}
}

func TestExecuteCronJob_Success(t *testing.T) {
	ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("pong"))
	}))
	defer ts.Close()

	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	job := CronJob{
		ID:       "exec-test-1",
		Name:     "ping",
		Schedule: "*/5 * * * *",
		Command:  ts.URL,
		Method:   "GET",
		IsActive: true,
	}

	executeCronJob(db, job)

	logs, err := listCronJobLogs(db, job.ID)
	if err != nil {
		t.Fatal(err)
	}
	if len(logs) == 0 {
		t.Fatal("expected at least 1 log entry")
	}
	if logs[0].Status != "success" {
		t.Fatalf("expected success, got %s", logs[0].Status)
	}
	if logs[0].Output != "pong" {
		t.Fatalf("expected pong, got %s", logs[0].Output)
	}
}

func TestExecuteCronJob_HTTPError(t *testing.T) {
	ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusInternalServerError)
	}))
	defer ts.Close()

	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	job := CronJob{
		ID:       "exec-test-2",
		Name:     "fail",
		Schedule: "*/5 * * * *",
		Command:  ts.URL,
		Method:   "GET",
		IsActive: true,
	}

	executeCronJob(db, job)

	logs, err := listCronJobLogs(db, job.ID)
	if err != nil {
		t.Fatal(err)
	}
	if len(logs) == 0 {
		t.Fatal("expected at least 1 log entry")
	}
	if logs[0].Status != "failure" {
		t.Fatalf("expected failure, got %s", logs[0].Status)
	}
}

func TestExecuteCronJob_WithHeaders(t *testing.T) {
	var gotHeader string
	ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		gotHeader = r.Header.Get("X-Custom")
		w.WriteHeader(http.StatusOK)
	}))
	defer ts.Close()

	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	job := CronJob{
		ID:       "exec-test-3",
		Name:     "headers",
		Schedule: "*/5 * * * *",
		Command:  ts.URL,
		Method:   "GET",
		Headers:  `{"X-Custom":"myvalue"}`,
		IsActive: true,
	}

	executeCronJob(db, job)
	if gotHeader != "myvalue" {
		t.Fatalf("expected header X-Custom=myvalue, got %s", gotHeader)
	}
}

func TestExecuteCronJob_WithBody(t *testing.T) {
	var gotBody string
	ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		buf := make([]byte, 1024)
		n, _ := r.Body.Read(buf)
		gotBody = string(buf[:n])
		w.WriteHeader(http.StatusOK)
	}))
	defer ts.Close()

	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	job := CronJob{
		ID:       "exec-test-4",
		Name:     "body",
		Schedule: "*/5 * * * *",
		Command:  ts.URL,
		Method:   "POST",
		Body:     `{"hello":"world"}`,
		IsActive: true,
	}

	executeCronJob(db, job)
	if gotBody != `{"hello":"world"}` {
		t.Fatalf("expected body '{\"hello\":\"world\"}', got %s", gotBody)
	}
}

func TestExecuteCronJob_OutputTruncated(t *testing.T) {
	ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		buf := make([]byte, 20000)
		for i := range buf {
			buf[i] = 'x'
		}
		w.Write(buf)
	}))
	defer ts.Close()

	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	job := CronJob{
		ID:       "exec-test-5",
		Name:     "truncate",
		Schedule: "*/5 * * * *",
		Command:  ts.URL,
		Method:   "GET",
		IsActive: true,
	}

	executeCronJob(db, job)

	logs, err := listCronJobLogs(db, job.ID)
	if err != nil {
		t.Fatal(err)
	}
	if len(logs) == 0 {
		t.Fatal("expected log entry")
	}
	if len(logs[0].Output) > 10240 {
		t.Fatalf("expected output truncated to 10240, got %d", len(logs[0].Output))
	}
}

func TestExecuteCronJob_EmptyMethod(t *testing.T) {
	ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	}))
	defer ts.Close()

	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	job := CronJob{
		ID:       "exec-empty-method",
		Name:     "empty-method",
		Schedule: "* * * * *",
		Command:  ts.URL,
		IsActive: true,
	}

	executeCronJob(db, job)

	logs, err := listCronJobLogs(db, job.ID)
	if err != nil {
		t.Fatal(err)
	}
	if len(logs) == 0 {
		t.Fatal("expected log entry")
	}
	if logs[0].Status != "success" {
		t.Fatalf("expected success, got %s", logs[0].Status)
	}
}

func TestExecuteCronJob_RequestError(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	job := CronJob{
		ID:       "exec-req-err",
		Name:     "req-err",
		Schedule: "* * * * *",
		Command:  "http://127.0.0.1:1",
		Method:   "GET",
		IsActive: true,
	}

	executeCronJob(db, job)

	logs, err := listCronJobLogs(db, job.ID)
	if err != nil {
		t.Fatal(err)
	}
	if len(logs) == 0 {
		t.Fatal("expected log entry")
	}
	if logs[0].Status != "failure" {
		t.Fatalf("expected failure, got %s", logs[0].Status)
	}
}

func TestStartCronScheduler_ExecutesJob(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	}))
	defer ts.Close()

	id := "scheduler-job-1"
	_, err := insertCronJob(db, id, "scheduler-test", "* * * * *", ts.URL, "GET", "", "", true)
	if err != nil {
		t.Fatal(err)
	}

	c := startCronScheduler(db)
	defer c.Stop()

	entries := c.Entries()
	if len(entries) == 0 {
		t.Fatal("expected at least one cron entry")
	}

	for _, entry := range entries {
		entry.Job.Run()
	}

	time.Sleep(200 * time.Millisecond)

	logs, lerr := listCronJobLogs(db, id)
	if lerr != nil {
		t.Fatal(lerr)
	}
	if len(logs) == 0 {
		t.Fatal("expected log entry after running cron job")
	}
	if logs[0].Status != "success" {
		t.Fatalf("expected success, got %s", logs[0].Status)
	}
}

func TestExecuteCronJob_InvalidURL(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	job := CronJob{
		ID:       "exec-test-6",
		Name:     "badurl",
		Schedule: "*/5 * * * *",
		Command:  "://invalid",
		Method:   "GET",
		IsActive: true,
	}

	executeCronJob(db, job)

	logs, err := listCronJobLogs(db, job.ID)
	if err != nil {
		t.Fatal(err)
	}
	if len(logs) == 0 {
		t.Fatal("expected log entry")
	}
	if logs[0].Status != "failure" {
		t.Fatalf("expected failure, got %s", logs[0].Status)
	}
}
