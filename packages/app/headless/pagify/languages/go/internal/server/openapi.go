package server

import "net/http"

const openapiSpec = `{
  "openapi": "3.0.3",
  "info": {
    "title": "pagify API server",
    "version": "1.0.0",
    "description": "Render individual pages of a pagify site over HTTP."
  },
  "servers": [
    { "url": "/", "description": "Local server" }
  ],
  "paths": {
    "/api/v1/health": {
      "get": {
        "summary": "Health check",
        "tags": ["System"],
        "responses": {
          "200": {
            "description": "Server is up",
            "content": { "application/json": { "schema": {
              "type": "object",
              "properties": { "status": { "type": "string" } }
            } } }
          }
        }
      }
    },
    "/api/v1/build": {
      "post": {
        "summary": "Render one page of the site",
        "tags": ["Build"],
        "requestBody": {
          "required": true,
          "content": { "application/json": { "schema": {
            "type": "object",
            "properties": {
              "content": { "type": "string", "description": "Content directory relative to the server root (default the root)" },
              "path": { "type": "string", "description": "Site-absolute URL of the page to render (default /)" }
            }
          } } }
        },
        "responses": {
          "200": {
            "description": "The rendered page",
            "content": { "text/html": { "schema": { "type": "string" } } }
          },
          "400": { "description": "Invalid request or unreadable content" },
          "404": { "description": "No content directory or page at that path" }
        }
      }
    },
    "/api/v1/openapi.json": {
      "get": {
        "summary": "OpenAPI document",
        "tags": ["Docs"],
        "responses": { "200": { "description": "OpenAPI 3 JSON document" } }
      }
    },
    "/api/v1/docs": {
      "get": {
        "summary": "Swagger UI",
        "tags": ["Docs"],
        "responses": { "200": { "description": "Swagger UI HTML page" } }
      }
    }
  }
}`

const swaggerUIHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>pagify preview - Swagger UI</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui.css" />
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui-bundle.js" crossorigin></script>
  <script>
    SwaggerUIBundle({ url: '/api/v1/openapi.json', dom_id: '#swagger-ui' });
  </script>
</body>
</html>`

func handleOpenAPI(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(openapiSpec))
}

func handleSwaggerUI(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.Write([]byte(swaggerUIHTML))
}
