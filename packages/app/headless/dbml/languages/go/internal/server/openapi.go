package server

import "net/http"

const openapiSpec = `{
  "openapi": "3.0.3",
  "info": {
    "title": "dbml API",
    "version": "1.0.0",
    "description": "Convert Database Markup Language (DBML) into SQL, Mermaid ER diagrams and SVG."
  },
  "servers": [
    { "url": "/", "description": "Local server" }
  ],
  "paths": {
    "/api/v1/health": {
      "get": {
        "summary": "Health check",
        "tags": ["Health"],
        "responses": {
          "200": {
            "description": "OK",
            "content": { "application/json": { "schema": { "$ref": "#/components/schemas/HealthResponse" } } }
          }
        }
      }
    },
    "/api/v1/convert": {
      "post": {
        "summary": "Convert DBML into the requested formats",
        "tags": ["Convert"],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": { "schema": { "$ref": "#/components/schemas/ConvertRequest" } },
            "multipart/form-data": { "schema": { "$ref": "#/components/schemas/ConvertRequest" } },
            "text/plain": { "schema": { "type": "string", "description": "Raw DBML content" } }
          }
        },
        "responses": {
          "200": {
            "description": "Converted output",
            "content": { "application/json": { "schema": { "$ref": "#/components/schemas/ConvertResponse" } } }
          },
          "400": {
            "description": "Invalid input",
            "content": { "application/json": { "schema": { "$ref": "#/components/schemas/ConvertResponse" } } }
          }
        }
      }
    },
    "/api/v1/convert/sql": {
      "post": {
        "summary": "Convert DBML to SQL only",
        "tags": ["Convert"],
        "requestBody": {
          "required": true,
          "content": { "application/json": { "schema": { "$ref": "#/components/schemas/ConvertRequest" } } }
        },
        "responses": {
          "200": {
            "description": "SQL output",
            "content": { "application/json": { "schema": { "$ref": "#/components/schemas/ConvertResponse" } } }
          },
          "400": { "description": "Invalid input" }
        }
      }
    },
    "/api/v1/convert/mermaid": {
      "post": {
        "summary": "Convert DBML to a Mermaid ER diagram only",
        "tags": ["Convert"],
        "requestBody": {
          "required": true,
          "content": { "application/json": { "schema": { "$ref": "#/components/schemas/ConvertRequest" } } }
        },
        "responses": {
          "200": {
            "description": "Mermaid output",
            "content": { "application/json": { "schema": { "$ref": "#/components/schemas/ConvertResponse" } } }
          },
          "400": { "description": "Invalid input" }
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
  },
  "components": {
    "schemas": {
      "ConvertRequest": {
        "type": "object",
        "properties": {
          "dbml": { "type": "string", "description": "DBML source to convert" },
          "formats": {
            "type": "array",
            "items": { "type": "string", "enum": ["sql", "mermaid", "svg"] },
            "description": "Formats to produce. Defaults to sql and mermaid."
          },
          "input_file": { "type": "string", "description": "Optional source file name" }
        }
      },
      "ConvertResponse": {
        "type": "object",
        "properties": {
          "sql": { "type": "string" },
          "mermaid": { "type": "string" },
          "svg": { "type": "string" },
          "error": { "type": "string" }
        }
      },
      "HealthResponse": {
        "type": "object",
        "properties": {
          "status": { "type": "string" },
          "version": { "type": "string" }
        }
      }
    }
  }
}`

const swaggerUIHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>dbml API - Swagger UI</title>
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
