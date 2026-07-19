package landify

import "net/http"

const openapiSpec = `{
  "openapi": "3.0.3",
  "info": {
    "title": "landify API server",
    "version": "1.0.0",
    "description": "Render and validate landify landing pages over HTTP."
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
        "summary": "Render a landing page",
        "tags": ["Build"],
        "requestBody": {
          "required": true,
          "content": { "application/json": { "schema": {
            "type": "object",
            "properties": {
              "file": { "type": "string", "description": "Config path relative to the server root (default landify.yaml)" },
              "theme": { "type": "string", "description": "Built-in theme preset to override the YAML theme" }
            }
          } } }
        },
        "responses": {
          "200": {
            "description": "The rendered landing page",
            "content": { "text/html": { "schema": { "type": "string" } } }
          },
          "400": { "description": "Invalid request or invalid config" },
          "404": { "description": "No config at that path" }
        }
      }
    },
    "/api/v1/validate": {
      "post": {
        "summary": "Validate a config",
        "tags": ["Build"],
        "requestBody": {
          "required": true,
          "content": { "application/json": { "schema": {
            "type": "object",
            "properties": {
              "file": { "type": "string", "description": "Config path relative to the server root (default landify.yaml)" }
            }
          } } }
        },
        "responses": {
          "200": {
            "description": "Validation result",
            "content": { "application/json": { "schema": {
              "type": "object",
              "properties": {
                "valid": { "type": "boolean" },
                "errors": { "type": "array", "items": { "type": "string" } }
              }
            } } }
          },
          "404": { "description": "No config at that path" }
        }
      }
    },
    "/api/v1/themes": {
      "get": {
        "summary": "List the built-in theme presets",
        "tags": ["Themes"],
        "responses": {
          "200": {
            "description": "The available presets",
            "content": { "application/json": { "schema": {
              "type": "object",
              "properties": { "themes": { "type": "array", "items": {
                "type": "object",
                "properties": {
                  "name": { "type": "string" },
                  "description": { "type": "string" }
                }
              } } }
            } } }
          }
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
  <title>landify - Swagger UI</title>
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
