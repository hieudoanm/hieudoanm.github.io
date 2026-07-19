package httpapi

import "net/http"

func (s *Server) routes() http.Handler {
	mux := http.NewServeMux()

	mux.HandleFunc("GET /api/health", func(w http.ResponseWriter, r *http.Request) {
		jsonResponse(w, map[string]string{"status": "ok"})
	})

	mux.HandleFunc("POST /api/auth/register", s.handleRegister)
	mux.HandleFunc("POST /api/auth/login", s.handleLogin)

	mux.HandleFunc("GET /api/openapi.json", s.handleOpenAPIJSON)
	mux.HandleFunc("GET /api/docs", s.handleSwaggerUI)
	mux.HandleFunc("GET /api/docs/", s.handleSwaggerUI)

	mux.Handle("/", http.FileServer(http.Dir("public")))

	protected := http.NewServeMux()

	contentHandler := func(h http.HandlerFunc) http.HandlerFunc {
		return validateContentType(h).ServeHTTP
	}

	protected.HandleFunc("GET /api/collections", s.handleCollectionsList)
	protected.Handle("POST /api/collections", s.rbacMiddleware("admin")(contentHandler(s.handleCollectionsCreate)))
	protected.HandleFunc("GET /api/collections/{name}", s.handleCollectionsGet)
	protected.Handle("PATCH /api/collections/{name}", s.rbacMiddleware("admin")(contentHandler(s.handleCollectionsUpdate)))
	protected.Handle("DELETE /api/collections/{name}", s.rbacMiddleware("admin")(http.HandlerFunc(s.handleCollectionsDelete)))

	protected.Handle("POST /api/collections/{name}/records", s.rbacMiddleware("admin", "editor")(contentHandler(s.handleRecordsCreate)))
	protected.Handle("GET /api/collections/{name}/records", s.rbacMiddleware("admin", "editor", "viewer")(http.HandlerFunc(s.handleRecordsList)))
	protected.Handle("GET /api/collections/{name}/records/{id}", s.rbacMiddleware("admin", "editor", "viewer")(http.HandlerFunc(s.handleRecordsGet)))
	protected.Handle("PATCH /api/collections/{name}/records/{id}", s.rbacMiddleware("admin", "editor")(contentHandler(s.handleRecordsUpdate)))
	protected.Handle("DELETE /api/collections/{name}/records/{id}", s.rbacMiddleware("admin")(http.HandlerFunc(s.handleRecordsDelete)))

	protected.HandleFunc("GET /api/buckets", s.handleBucketsList)
	protected.Handle("POST /api/buckets", contentHandler(s.handleBucketsCreate))
	protected.HandleFunc("GET /api/buckets/{name}", s.handleBucketsGet)
	protected.HandleFunc("DELETE /api/buckets/{name}", s.handleBucketsDelete)

	protected.HandleFunc("POST /api/buckets/{name}/files", s.handleFilesUpload)
	protected.HandleFunc("GET /api/buckets/{name}/files", s.handleFilesList)
	protected.HandleFunc("GET /api/buckets/{name}/files/{id}", s.handleFilesDownload)
	protected.HandleFunc("GET /api/buckets/{name}/files/{id}/thumb", s.handleFileThumbnail)
	protected.HandleFunc("DELETE /api/buckets/{name}/files/{id}", s.handleFilesDelete)

	protected.HandleFunc("GET /api/webhooks", s.handleWebhooksList)
	protected.Handle("POST /api/webhooks", contentHandler(s.handleWebhooksCreate))
	protected.HandleFunc("GET /api/webhooks/{id}", s.handleWebhooksGet)
	protected.Handle("PATCH /api/webhooks/{id}", contentHandler(s.handleWebhooksUpdate))
	protected.HandleFunc("DELETE /api/webhooks/{id}", s.handleWebhooksDelete)
	protected.HandleFunc("GET /api/webhooks/{id}/logs", s.handleWebhookLogs)

	protected.HandleFunc("GET /api/secrets", s.handleSecretsList)
	protected.Handle("POST /api/secrets", contentHandler(s.handleSecretsCreate))
	protected.HandleFunc("GET /api/secrets/{id}", s.handleSecretsGet)
	protected.Handle("PATCH /api/secrets/{id}", contentHandler(s.handleSecretsUpdate))
	protected.HandleFunc("DELETE /api/secrets/{id}", s.handleSecretsDelete)

	protected.HandleFunc("GET /api/cronjobs", s.handleCronJobsList)
	protected.Handle("POST /api/cronjobs", contentHandler(s.handleCronJobsCreate))
	protected.HandleFunc("GET /api/cronjobs/{id}", s.handleCronJobsGet)
	protected.Handle("PATCH /api/cronjobs/{id}", contentHandler(s.handleCronJobsUpdate))
	protected.HandleFunc("DELETE /api/cronjobs/{id}", s.handleCronJobsDelete)
	protected.HandleFunc("POST /api/cronjobs/{id}/run", s.handleCronJobsRun)
	protected.HandleFunc("GET /api/cronjobs/{id}/logs", s.handleCronJobsLogs)

	protected.HandleFunc("GET /api/websockets", s.handleWSList)
	protected.HandleFunc("GET /api/websockets/{id}", s.handleWSGet)
	protected.HandleFunc("DELETE /api/websockets/{id}", s.handleWSDelete)
	protected.Handle("POST /api/websockets/broadcast", contentHandler(s.handleWSBroadcast))
	protected.Handle("POST /api/websockets/{id}/send", contentHandler(s.handleWSSend))
	protected.HandleFunc("GET /api/websockets/{id}/messages", s.handleWSMessages)
	protected.HandleFunc("GET /api/websockets/messages", s.handleWSAllMessages)

	protected.HandleFunc("GET /api/cache", s.handleCacheList)
	protected.Handle("POST /api/cache", contentHandler(s.handleCacheSet))
	protected.HandleFunc("GET /api/cache/{key}", s.handleCacheGet)
	protected.HandleFunc("DELETE /api/cache/{key}", s.handleCacheDelete)
	protected.HandleFunc("DELETE /api/cache", s.handleCacheFlush)
	protected.HandleFunc("GET /api/cache/stats", s.handleCacheStats)

	protected.HandleFunc("GET /api/notifications", s.handleNotificationsList)
	protected.Handle("POST /api/notifications", contentHandler(s.handleNotificationsCreate))
	protected.HandleFunc("GET /api/notifications/{id}", s.handleNotificationsGet)
	protected.HandleFunc("PATCH /api/notifications/{id}", s.handleNotificationsMarkRead)
	protected.HandleFunc("DELETE /api/notifications/{id}", s.handleNotificationsDelete)
	protected.HandleFunc("DELETE /api/notifications", s.handleNotificationsClear)

	protected.HandleFunc("GET /api/logs", s.handleLogsList)
	protected.Handle("POST /api/logs", contentHandler(s.handleLogsCreate))
	protected.HandleFunc("DELETE /api/logs", s.handleLogsClear)

	protected.HandleFunc("GET /api/pubsub/topics", s.handlePubSubTopicsList)
	protected.Handle("POST /api/pubsub/topics", contentHandler(s.handlePubSubTopicsCreate))
	protected.HandleFunc("GET /api/pubsub/topics/{name}", s.handlePubSubTopicsGet)
	protected.HandleFunc("DELETE /api/pubsub/topics/{name}", s.handlePubSubTopicsDelete)
	protected.HandleFunc("GET /api/pubsub/topics/{name}/messages", s.handlePubSubMessagesList)
	protected.Handle("POST /api/pubsub/topics/{name}/messages", contentHandler(s.handlePubSubMessagesCreate))

	protected.HandleFunc("GET /api/export", s.handleExport)
	protected.Handle("POST /api/import", contentHandler(s.handleImport))

	protected.Handle("GET /api/permissions", s.rbacMiddleware("admin")(http.HandlerFunc(s.handlePermissionsList)))
	protected.Handle("POST /api/permissions", s.rbacMiddleware("admin")(contentHandler(s.handlePermissionsCreate)))
	protected.Handle("DELETE /api/permissions/{id}", s.rbacMiddleware("admin")(http.HandlerFunc(s.handlePermissionsDelete)))

	protected.Handle("GET /api/backup", s.rbacMiddleware("admin")(http.HandlerFunc(s.handleBackup)))

	mux.Handle("/api/", rateLimitMiddleware(authMiddleware(protected)))

	if s.pubsubHub != nil {
		mux.HandleFunc("GET /api/pubsub/{name}/stream", s.handlePubSubStream)
	}

	mux.HandleFunc("GET /ws", s.wsHub.ServeWS)

	if s.sseHub != nil {
		mux.HandleFunc("GET /api/notifications/stream", s.sseHub.HandleStream)
	}
	if s.logHub != nil {
		mux.HandleFunc("GET /api/logs/stream", s.logHub.HandleStream)
	}

	return mux
}
