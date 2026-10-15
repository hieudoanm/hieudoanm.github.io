package cmd

import "net/http"

const openapiSpec = `{
  "openapi": "3.0.3",
  "info": {
    "title": "CV API",
    "version": "1.0.0",
    "description": "Generate a CV PDF from JSON data using HTML templates."
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
            "content": {
              "application/json": {
                "schema": { "type": "object", "properties": { "status": { "type": "string" } } }
              }
            }
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
    },
    "/api/v1/pdf": {
      "post": {
        "summary": "Generate a CV PDF",
        "tags": ["CV"],
        "parameters": [
          {
            "name": "template",
            "in": "query",
            "required": false,
            "schema": { "type": "string" },
            "description": "Template name (category/name). Defaults to the first available template."
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": { "schema": { "$ref": "#/components/schemas/CVData" } }
          }
        },
        "responses": {
          "200": {
            "description": "Generated PDF",
            "content": {
              "application/pdf": { "schema": { "type": "string", "format": "binary" } }
            }
          },
          "400": { "description": "Invalid JSON body" },
          "405": { "description": "Method not allowed" },
          "500": { "description": "PDF generation failed" }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "CVData": {
        "type": "object",
        "properties": {
          "personal": { "$ref": "#/components/schemas/Personal" },
          "contact": { "$ref": "#/components/schemas/Contact" },
          "websites": { "$ref": "#/components/schemas/Websites" },
          "summary": { "type": "string" },
          "experience": { "type": "array", "items": { "$ref": "#/components/schemas/Experience" } },
          "education": { "type": "array", "items": { "$ref": "#/components/schemas/Education" } },
          "projects": { "type": "array", "items": { "$ref": "#/components/schemas/Project" } },
          "skills": { "type": "array", "items": { "$ref": "#/components/schemas/SkillGroup" } },
          "certifications": { "type": "array", "items": { "$ref": "#/components/schemas/Certification" } },
          "languages": { "type": "array", "items": { "$ref": "#/components/schemas/Language" } },
          "interests": { "type": "string" },
          "references": { "type": "array", "items": { "$ref": "#/components/schemas/Reference" } }
        }
      },
      "Personal": {
        "type": "object",
        "properties": {
          "fullName": { "type": "string" },
          "jobTitle": { "type": "string" }
        }
      },
      "Contact": {
        "type": "object",
        "properties": {
          "email": { "type": "string" },
          "phone": { "type": "string" },
          "address": { "type": "string" }
        }
      },
      "Websites": {
        "type": "object",
        "properties": {
          "website": { "type": "string" },
          "linkedin": { "type": "string" },
          "github": { "type": "string" }
        }
      },
      "Experience": {
        "type": "object",
        "properties": {
          "id": { "type": "string" },
          "company": { "type": "string" },
          "role": { "type": "string" },
          "location": { "type": "string" },
          "startDate": { "type": "string" },
          "endDate": { "type": "string" },
          "description": { "type": "string" }
        }
      },
      "Education": {
        "type": "object",
        "properties": {
          "id": { "type": "string" },
          "school": { "type": "string" },
          "degree": { "type": "string" },
          "field": { "type": "string" },
          "location": { "type": "string" },
          "startDate": { "type": "string" },
          "endDate": { "type": "string" },
          "gpa": { "type": "string" },
          "description": { "type": "string" },
          "relevantSubjects": { "type": "string" },
          "interests": { "type": "string" }
        }
      },
      "Project": {
        "type": "object",
        "properties": {
          "id": { "type": "string" },
          "name": { "type": "string" },
          "organization": { "type": "string" },
          "description": { "type": "string" },
          "technologies": { "type": "string" }
        }
      },
      "SkillGroup": {
        "type": "object",
        "properties": {
          "id": { "type": "string" },
          "category": { "type": "string" },
          "items": { "type": "string" }
        }
      },
      "Certification": {
        "type": "object",
        "properties": {
          "id": { "type": "string" },
          "name": { "type": "string" },
          "issuer": { "type": "string" },
          "date": { "type": "string" }
        }
      },
      "Language": {
        "type": "object",
        "properties": {
          "id": { "type": "string" },
          "name": { "type": "string" },
          "proficiency": { "type": "string" }
        }
      },
      "Reference": {
        "type": "object",
        "properties": {
          "id": { "type": "string" },
          "name": { "type": "string" },
          "title": { "type": "string" },
          "organization": { "type": "string" },
          "email": { "type": "string" }
        }
      }
    }
  }
}`

func handleOpenAPI(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(openapiSpec))
}

const swaggerUIHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>CV API - Swagger UI</title>
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

func handleSwaggerUI(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.Write([]byte(swaggerUIHTML))
}
