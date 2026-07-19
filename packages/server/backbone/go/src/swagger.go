package main

import (
	"net/http"
)

const openapiSpec = `{
  "openapi": "3.0.0",
  "info": {
    "title": "Backbone Server API",
    "version": "1.0.0",
    "description": "A backbone Go server with collections, records, buckets, files, webhooks, secrets, cronjobs, websockets, cache, notifications, logs, pubsub, and RBAC."
  },
  "servers": [
    {
      "url": "/",
      "description": "Local server"
    }
  ],
  "paths": {
    "/api/health": {
      "get": {
        "summary": "Health check",
        "tags": ["Health"],
        "responses": {
          "200": {
            "description": "OK",
            "content": { "application/json": { "schema": { "type": "object", "properties": { "status": { "type": "string" } } } } }
          }
        }
      }
    },
    "/api/openapi.json": {
      "get": {
        "summary": "OpenAPI spec",
        "tags": ["Docs"],
        "responses": { "200": { "description": "OpenAPI JSON" } }
      }
    },
    "/api/docs": {
      "get": {
        "summary": "Swagger UI",
        "tags": ["Docs"],
        "responses": { "200": { "description": "Swagger UI HTML" } }
      }
    },
    "/api/auth/register": {
      "post": {
        "summary": "Register a new user",
        "tags": ["Auth"],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": ["email", "password"],
                "properties": { "email": { "type": "string" }, "password": { "type": "string" } }
              }
            }
          }
        },
        "responses": {
          "200": { "description": "User created" },
          "400": { "description": "Invalid input" },
          "409": { "description": "Email already registered" }
        }
      }
    },
    "/api/auth/login": {
      "post": {
        "summary": "Login",
        "tags": ["Auth"],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": ["email", "password"],
                "properties": { "email": { "type": "string" }, "password": { "type": "string" } }
              }
            }
          }
        },
        "responses": {
          "200": { "description": "Login successful, returns token" },
          "401": { "description": "Invalid credentials" }
        }
      }
    },
    "/api/collections": {
      "get": {
        "summary": "List collections",
        "tags": ["Collections"],
        "security": [{"BearerAuth": []}],
        "responses": { "200": { "description": "Collections list" } }
      },
      "post": {
        "summary": "Create collection",
        "tags": ["Collections"],
        "security": [{"BearerAuth": []}],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": ["name"],
                "properties": {
                  "name": { "type": "string" },
                  "schema": { "type": "string", "description": "JSON object mapping field names to types" }
                }
              }
            }
          }
        },
        "responses": {
          "200": { "description": "Collection created" },
          "400": { "description": "Invalid input" },
          "409": { "description": "Collection already exists" }
        }
      }
    },
    "/api/collections/{name}": {
      "get": {
        "summary": "Get collection",
        "tags": ["Collections"],
        "security": [{"BearerAuth": []}],
        "parameters": [
          { "name": "name", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "responses": {
          "200": { "description": "Collection" },
          "404": { "description": "Not found" }
        }
      },
      "patch": {
        "summary": "Update collection schema",
        "tags": ["Collections"],
        "security": [{"BearerAuth": []}],
        "parameters": [
          { "name": "name", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": { "schema": { "type": "string" } }
              }
            }
          }
        },
        "responses": {
          "200": { "description": "Collection updated" },
          "404": { "description": "Not found" }
        }
      },
      "delete": {
        "summary": "Delete collection",
        "tags": ["Collections"],
        "security": [{"BearerAuth": []}],
        "parameters": [
          { "name": "name", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "responses": {
          "204": { "description": "Deleted" },
          "404": { "description": "Not found" }
        }
      }
    },
    "/api/collections/{name}/records": {
      "post": {
        "summary": "Create record",
        "tags": ["Records"],
        "security": [{"BearerAuth": []}],
        "parameters": [
          { "name": "name", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "id": { "type": "string" },
                  "data": { "type": "object" }
                }
              }
            }
          }
        },
        "responses": {
          "200": { "description": "Record created" },
          "400": { "description": "Invalid input" },
          "404": { "description": "Collection not found" },
          "409": { "description": "Duplicate ID" }
        }
      },
      "get": {
        "summary": "List records",
        "tags": ["Records"],
        "security": [{"BearerAuth": []}],
        "parameters": [
          { "name": "name", "in": "path", "required": true, "schema": { "type": "string" } },
          { "name": "page", "in": "query", "schema": { "type": "integer", "default": 1 } },
          { "name": "per_page", "in": "query", "schema": { "type": "integer", "default": 20 } },
          { "name": "filter", "in": "query", "schema": { "type": "array", "items": { "type": "string" } }, "description": "Field filters like field=value" },
          { "name": "sort", "in": "query", "schema": { "type": "string" }, "description": "Sort by field, prefix - for DESC" },
          { "name": "expand", "in": "query", "schema": { "type": "string" }, "description": "Comma-separated fields to expand" },
          { "name": "search", "in": "query", "schema": { "type": "string" }, "description": "Full-text search term" }
        ],
        "responses": {
          "200": { "description": "Paginated records" },
          "404": { "description": "Collection not found" }
        }
      }
    },
    "/api/collections/{name}/records/{id}": {
      "get": {
        "summary": "Get record",
        "tags": ["Records"],
        "security": [{"BearerAuth": []}],
        "parameters": [
          { "name": "name", "in": "path", "required": true, "schema": { "type": "string" } },
          { "name": "id", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "responses": {
          "200": { "description": "Record" },
          "404": { "description": "Not found" }
        }
      },
      "patch": {
        "summary": "Update record",
        "tags": ["Records"],
        "security": [{"BearerAuth": []}],
        "parameters": [
          { "name": "name", "in": "path", "required": true, "schema": { "type": "string" } },
          { "name": "id", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": ["data"],
                "properties": { "data": { "type": "object" } }
              }
            }
          }
        },
        "responses": {
          "200": { "description": "Record updated" },
          "400": { "description": "Invalid input" },
          "404": { "description": "Not found" }
        }
      },
      "delete": {
        "summary": "Delete record",
        "tags": ["Records"],
        "security": [{"BearerAuth": []}],
        "parameters": [
          { "name": "name", "in": "path", "required": true, "schema": { "type": "string" } },
          { "name": "id", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "responses": {
          "204": { "description": "Deleted" },
          "404": { "description": "Not found" }
        }
      }
    },
    "/api/buckets": {
      "get": {
        "summary": "List buckets",
        "tags": ["Buckets"],
        "security": [{"BearerAuth": []}],
        "responses": { "200": { "description": "Buckets list" } }
      },
      "post": {
        "summary": "Create bucket",
        "tags": ["Buckets"],
        "security": [{"BearerAuth": []}],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": ["name"],
                "properties": {
                  "name": { "type": "string" },
                  "is_public": { "type": "boolean", "default": false }
                }
              }
            }
          }
        },
        "responses": {
          "200": { "description": "Bucket created" },
          "400": { "description": "Invalid input" },
          "409": { "description": "Bucket already exists" }
        }
      }
    },
    "/api/buckets/{name}": {
      "get": {
        "summary": "Get bucket",
        "tags": ["Buckets"],
        "security": [{"BearerAuth": []}],
        "parameters": [
          { "name": "name", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "responses": {
          "200": { "description": "Bucket" },
          "404": { "description": "Not found" }
        }
      },
      "delete": {
        "summary": "Delete bucket",
        "tags": ["Buckets"],
        "security": [{"BearerAuth": []}],
        "parameters": [
          { "name": "name", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "responses": {
          "204": { "description": "Deleted" },
          "404": { "description": "Not found" }
        }
      }
    },
    "/api/buckets/{name}/files": {
      "post": {
        "summary": "Upload file",
        "tags": ["Files"],
        "security": [{"BearerAuth": []}],
        "parameters": [
          { "name": "name", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "requestBody": {
          "required": true,
          "content": { "multipart/form-data": { "schema": { "type": "object", "properties": { "file": { "type": "string", "format": "binary" } } } } }
        },
        "responses": {
          "200": { "description": "File uploaded" },
          "400": { "description": "Invalid input" },
          "404": { "description": "Bucket not found" }
        }
      },
      "get": {
        "summary": "List files",
        "tags": ["Files"],
        "security": [{"BearerAuth": []}],
        "parameters": [
          { "name": "name", "in": "path", "required": true, "schema": { "type": "string" } },
          { "name": "page", "in": "query", "schema": { "type": "integer", "default": 1 } },
          { "name": "per_page", "in": "query", "schema": { "type": "integer", "default": 20 } }
        ],
        "responses": {
          "200": { "description": "Paginated files" },
          "404": { "description": "Bucket not found" }
        }
      }
    },
    "/api/buckets/{name}/files/{id}": {
      "get": {
        "summary": "Download file",
        "tags": ["Files"],
        "security": [{"BearerAuth": []}],
        "parameters": [
          { "name": "name", "in": "path", "required": true, "schema": { "type": "string" } },
          { "name": "id", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "responses": {
          "200": { "description": "File content" },
          "404": { "description": "Not found" }
        }
      },
      "delete": {
        "summary": "Delete file",
        "tags": ["Files"],
        "security": [{"BearerAuth": []}],
        "parameters": [
          { "name": "name", "in": "path", "required": true, "schema": { "type": "string" } },
          { "name": "id", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "responses": {
          "204": { "description": "Deleted" },
          "404": { "description": "Not found" }
        }
      }
    },
    "/api/buckets/{name}/files/{id}/thumb": {
      "get": {
        "summary": "Get file thumbnail",
        "tags": ["Files"],
        "security": [{"BearerAuth": []}],
        "parameters": [
          { "name": "name", "in": "path", "required": true, "schema": { "type": "string" } },
          { "name": "id", "in": "path", "required": true, "schema": { "type": "string" } },
          { "name": "width", "in": "query", "schema": { "type": "integer" } },
          { "name": "height", "in": "query", "schema": { "type": "integer" } }
        ],
        "responses": {
          "200": { "description": "Thumbnail image" },
          "404": { "description": "Not found" }
        }
      }
    },
    "/api/webhooks": {
      "get": {
        "summary": "List webhooks",
        "tags": ["Webhooks"],
        "security": [{"BearerAuth": []}],
        "responses": { "200": { "description": "Webhooks list" } }
      },
      "post": {
        "summary": "Create webhook",
        "tags": ["Webhooks"],
        "security": [{"BearerAuth": []}],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": ["name", "url", "events"],
                "properties": {
                  "name": { "type": "string" },
                  "url": { "type": "string" },
                  "events": { "type": "array", "items": { "type": "string" } },
                  "secret": { "type": "string" }
                }
              }
            }
          }
        },
        "responses": {
          "200": { "description": "Webhook created" },
          "400": { "description": "Invalid input" }
        }
      }
    },
    "/api/webhooks/{id}": {
      "get": {
        "summary": "Get webhook",
        "tags": ["Webhooks"],
        "security": [{"BearerAuth": []}],
        "parameters": [
          { "name": "id", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "responses": {
          "200": { "description": "Webhook" },
          "404": { "description": "Not found" }
        }
      },
      "patch": {
        "summary": "Update webhook",
        "tags": ["Webhooks"],
        "security": [{"BearerAuth": []}],
        "parameters": [
          { "name": "id", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "name": { "type": "string" },
                  "url": { "type": "string" },
                  "events": { "type": "array", "items": { "type": "string" } },
                  "secret": { "type": "string" },
                  "is_active": { "type": "boolean" }
                }
              }
            }
          }
        },
        "responses": {
          "200": { "description": "Webhook updated" },
          "404": { "description": "Not found" }
        }
      },
      "delete": {
        "summary": "Delete webhook",
        "tags": ["Webhooks"],
        "security": [{"BearerAuth": []}],
        "parameters": [
          { "name": "id", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "responses": {
          "204": { "description": "Deleted" },
          "404": { "description": "Not found" }
        }
      }
    },
    "/api/webhooks/{id}/logs": {
      "get": {
        "summary": "Get webhook logs",
        "tags": ["Webhooks"],
        "security": [{"BearerAuth": []}],
        "parameters": [
          { "name": "id", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "responses": {
          "200": { "description": "Webhook logs" },
          "404": { "description": "Not found" }
        }
      }
    },
    "/api/secrets": {
      "get": {
        "summary": "List secrets",
        "tags": ["Secrets"],
        "security": [{"BearerAuth": []}],
        "responses": { "200": { "description": "Secrets list (values omitted)" } }
      },
      "post": {
        "summary": "Create secret",
        "tags": ["Secrets"],
        "security": [{"BearerAuth": []}],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": ["name", "value"],
                "properties": {
                  "name": { "type": "string" },
                  "value": { "type": "string" },
                  "scope": { "type": "string", "default": "general" }
                }
              }
            }
          }
        },
        "responses": {
          "201": { "description": "Secret created" },
          "400": { "description": "Invalid input" }
        }
      }
    },
    "/api/secrets/{id}": {
      "get": {
        "summary": "Get secret (decrypted)",
        "tags": ["Secrets"],
        "security": [{"BearerAuth": []}],
        "parameters": [
          { "name": "id", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "responses": {
          "200": { "description": "Secret with decrypted value" },
          "404": { "description": "Not found" }
        }
      },
      "patch": {
        "summary": "Update secret",
        "tags": ["Secrets"],
        "security": [{"BearerAuth": []}],
        "parameters": [
          { "name": "id", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "name": { "type": "string" },
                  "value": { "type": "string" },
                  "scope": { "type": "string" }
                }
              }
            }
          }
        },
        "responses": {
          "200": { "description": "Secret updated" },
          "404": { "description": "Not found" }
        }
      },
      "delete": {
        "summary": "Delete secret",
        "tags": ["Secrets"],
        "security": [{"BearerAuth": []}],
        "parameters": [
          { "name": "id", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "responses": {
          "204": { "description": "Deleted" },
          "404": { "description": "Not found" }
        }
      }
    },
    "/api/cronjobs": {
      "get": {
        "summary": "List cron jobs",
        "tags": ["CronJobs"],
        "security": [{"BearerAuth": []}],
        "responses": { "200": { "description": "Cron jobs list" } }
      },
      "post": {
        "summary": "Create cron job",
        "tags": ["CronJobs"],
        "security": [{"BearerAuth": []}],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": ["name", "schedule", "command"],
                "properties": {
                  "name": { "type": "string" },
                  "schedule": { "type": "string" },
                  "command": { "type": "string" },
                  "method": { "type": "string", "default": "GET" },
                  "headers": { "type": "string" },
                  "body": { "type": "string" },
                  "is_active": { "type": "boolean" }
                }
              }
            }
          }
        },
        "responses": {
          "201": { "description": "Cron job created" },
          "400": { "description": "Invalid input" }
        }
      }
    },
    "/api/cronjobs/{id}": {
      "get": {
        "summary": "Get cron job",
        "tags": ["CronJobs"],
        "security": [{"BearerAuth": []}],
        "parameters": [
          { "name": "id", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "responses": {
          "200": { "description": "Cron job" },
          "404": { "description": "Not found" }
        }
      },
      "patch": {
        "summary": "Update cron job",
        "tags": ["CronJobs"],
        "security": [{"BearerAuth": []}],
        "parameters": [
          { "name": "id", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "requestBody": {
          "required": true,
          "content": { "application/json": { "schema": { "type": "object" } } }
        },
        "responses": {
          "200": { "description": "Cron job updated" },
          "404": { "description": "Not found" }
        }
      },
      "delete": {
        "summary": "Delete cron job",
        "tags": ["CronJobs"],
        "security": [{"BearerAuth": []}],
        "parameters": [
          { "name": "id", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "responses": {
          "204": { "description": "Deleted" },
          "404": { "description": "Not found" }
        }
      }
    },
    "/api/cronjobs/{id}/run": {
      "post": {
        "summary": "Run cron job manually",
        "tags": ["CronJobs"],
        "security": [{"BearerAuth": []}],
        "parameters": [
          { "name": "id", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "responses": {
          "200": { "description": "Triggered" },
          "404": { "description": "Not found" }
        }
      }
    },
    "/api/cronjobs/{id}/logs": {
      "get": {
        "summary": "Get cron job logs",
        "tags": ["CronJobs"],
        "security": [{"BearerAuth": []}],
        "parameters": [
          { "name": "id", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "responses": {
          "200": { "description": "Cron job logs" },
          "404": { "description": "Not found" }
        }
      }
    },
    "/api/websockets": {
      "get": {
        "summary": "List WebSocket connections",
        "tags": ["WebSockets"],
        "security": [{"BearerAuth": []}],
        "responses": { "200": { "description": "WS connections" } }
      }
    },
    "/api/websockets/{id}": {
      "get": {
        "summary": "Get WebSocket connection",
        "tags": ["WebSockets"],
        "security": [{"BearerAuth": []}],
        "parameters": [
          { "name": "id", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "responses": {
          "200": { "description": "WS connection" },
          "404": { "description": "Not found" }
        }
      },
      "delete": {
        "summary": "Close WebSocket connection",
        "tags": ["WebSockets"],
        "security": [{"BearerAuth": []}],
        "parameters": [
          { "name": "id", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "responses": {
          "204": { "description": "Deleted" },
          "404": { "description": "Not found" }
        }
      }
    },
    "/api/websockets/broadcast": {
      "post": {
        "summary": "Broadcast to all WebSocket clients",
        "tags": ["WebSockets"],
        "security": [{"BearerAuth": []}],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": ["content"],
                "properties": { "content": { "type": "string" } }
              }
            }
          }
        },
        "responses": { "200": { "description": "Broadcasted" } }
      }
    },
    "/api/websockets/{id}/send": {
      "post": {
        "summary": "Send message to WebSocket client",
        "tags": ["WebSockets"],
        "security": [{"BearerAuth": []}],
        "parameters": [
          { "name": "id", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": ["content"],
                "properties": { "content": { "type": "string" } }
              }
            }
          }
        },
        "responses": {
          "200": { "description": "Sent" },
          "404": { "description": "Client not found" }
        }
      }
    },
    "/api/websockets/{id}/messages": {
      "get": {
        "summary": "Get messages for a WebSocket client",
        "tags": ["WebSockets"],
        "security": [{"BearerAuth": []}],
        "parameters": [
          { "name": "id", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "responses": { "200": { "description": "WS messages" } }
      }
    },
    "/api/websockets/messages": {
      "get": {
        "summary": "Get all WebSocket messages",
        "tags": ["WebSockets"],
        "security": [{"BearerAuth": []}],
        "responses": { "200": { "description": "All WS messages" } }
      }
    },
    "/api/cache": {
      "get": {
        "summary": "List cache entries",
        "tags": ["Cache"],
        "security": [{"BearerAuth": []}],
        "responses": { "200": { "description": "Cache entries" } }
      },
      "post": {
        "summary": "Set cache entry",
        "tags": ["Cache"],
        "security": [{"BearerAuth": []}],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": ["key", "value"],
                "properties": {
                  "key": { "type": "string" },
                  "value": { "type": "string" },
                  "ttl": { "type": "integer", "description": "TTL in seconds" }
                }
              }
            }
          }
        },
        "responses": { "200": { "description": "Cache entry set" } }
      },
      "delete": {
        "summary": "Flush cache",
        "tags": ["Cache"],
        "security": [{"BearerAuth": []}],
        "responses": { "200": { "description": "Cache flushed" } }
      }
    },
    "/api/cache/{key}": {
      "get": {
        "summary": "Get cache entry",
        "tags": ["Cache"],
        "security": [{"BearerAuth": []}],
        "parameters": [
          { "name": "key", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "responses": {
          "200": { "description": "Cache entry" },
          "404": { "description": "Not found" }
        }
      },
      "delete": {
        "summary": "Delete cache entry",
        "tags": ["Cache"],
        "security": [{"BearerAuth": []}],
        "parameters": [
          { "name": "key", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "responses": {
          "204": { "description": "Deleted" },
          "404": { "description": "Not found" }
        }
      }
    },
    "/api/cache/stats": {
      "get": {
        "summary": "Get cache stats",
        "tags": ["Cache"],
        "security": [{"BearerAuth": []}],
        "responses": { "200": { "description": "Cache stats" } }
      }
    },
    "/api/notifications": {
      "get": {
        "summary": "List notifications",
        "tags": ["Notifications"],
        "security": [{"BearerAuth": []}],
        "responses": { "200": { "description": "Notifications list" } }
      },
      "post": {
        "summary": "Create notification",
        "tags": ["Notifications"],
        "security": [{"BearerAuth": []}],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": ["title"],
                "properties": {
                  "title": { "type": "string" },
                  "body": { "type": "string" },
                  "type": { "type": "string", "default": "info" }
                }
              }
            }
          }
        },
        "responses": {
          "201": { "description": "Notification created" },
          "400": { "description": "Invalid input" }
        }
      },
      "delete": {
        "summary": "Clear all notifications",
        "tags": ["Notifications"],
        "security": [{"BearerAuth": []}],
        "responses": { "200": { "description": "Cleared" } }
      }
    },
    "/api/notifications/{id}": {
      "get": {
        "summary": "Get notification",
        "tags": ["Notifications"],
        "security": [{"BearerAuth": []}],
        "parameters": [
          { "name": "id", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "responses": {
          "200": { "description": "Notification" },
          "404": { "description": "Not found" }
        }
      },
      "patch": {
        "summary": "Mark notification as read",
        "tags": ["Notifications"],
        "security": [{"BearerAuth": []}],
        "parameters": [
          { "name": "id", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "responses": {
          "200": { "description": "Notification marked read" },
          "404": { "description": "Not found" }
        }
      },
      "delete": {
        "summary": "Delete notification",
        "tags": ["Notifications"],
        "security": [{"BearerAuth": []}],
        "parameters": [
          { "name": "id", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "responses": {
          "204": { "description": "Deleted" },
          "404": { "description": "Not found" }
        }
      }
    },
    "/api/logs": {
      "get": {
        "summary": "List logs",
        "tags": ["Logs"],
        "security": [{"BearerAuth": []}],
        "responses": { "200": { "description": "Logs list" } }
      },
      "post": {
        "summary": "Create log entry",
        "tags": ["Logs"],
        "security": [{"BearerAuth": []}],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": ["message"],
                "properties": {
                  "level": { "type": "string", "default": "info" },
                  "message": { "type": "string" },
                  "meta": { "type": "string" }
                }
              }
            }
          }
        },
        "responses": {
          "201": { "description": "Log created" },
          "400": { "description": "Invalid input" }
        }
      },
      "delete": {
        "summary": "Clear logs",
        "tags": ["Logs"],
        "security": [{"BearerAuth": []}],
        "responses": { "200": { "description": "Logs cleared" } }
      }
    },
    "/api/pubsub/topics": {
      "get": {
        "summary": "List pubsub topics",
        "tags": ["PubSub"],
        "security": [{"BearerAuth": []}],
        "responses": { "200": { "description": "Topics list" } }
      },
      "post": {
        "summary": "Create pubsub topic",
        "tags": ["PubSub"],
        "security": [{"BearerAuth": []}],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": ["name"],
                "properties": { "name": { "type": "string" } }
              }
            }
          }
        },
        "responses": {
          "201": { "description": "Topic created" },
          "400": { "description": "Invalid input" },
          "409": { "description": "Topic already exists" }
        }
      }
    },
    "/api/pubsub/topics/{name}": {
      "get": {
        "summary": "Get pubsub topic",
        "tags": ["PubSub"],
        "security": [{"BearerAuth": []}],
        "parameters": [
          { "name": "name", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "responses": {
          "200": { "description": "Topic" },
          "404": { "description": "Not found" }
        }
      },
      "delete": {
        "summary": "Delete pubsub topic",
        "tags": ["PubSub"],
        "security": [{"BearerAuth": []}],
        "parameters": [
          { "name": "name", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "responses": {
          "204": { "description": "Deleted" },
          "404": { "description": "Not found" }
        }
      }
    },
    "/api/pubsub/topics/{name}/messages": {
      "get": {
        "summary": "List pubsub messages",
        "tags": ["PubSub"],
        "security": [{"BearerAuth": []}],
        "parameters": [
          { "name": "name", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "responses": {
          "200": { "description": "Messages list" },
          "404": { "description": "Topic not found" }
        }
      },
      "post": {
        "summary": "Publish pubsub message",
        "tags": ["PubSub"],
        "security": [{"BearerAuth": []}],
        "parameters": [
          { "name": "name", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": ["body"],
                "properties": { "body": { "type": "string" } }
              }
            }
          }
        },
        "responses": {
          "201": { "description": "Message published" },
          "400": { "description": "Invalid input" },
          "404": { "description": "Topic not found" }
        }
      }
    },
    "/api/export": {
      "get": {
        "summary": "Export all data",
        "tags": ["Import/Export"],
        "security": [{"BearerAuth": []}],
        "responses": { "200": { "description": "Exported data" } }
      }
    },
    "/api/import": {
      "post": {
        "summary": "Import data",
        "tags": ["Import/Export"],
        "security": [{"BearerAuth": []}],
        "parameters": [
          { "name": "skip_existing", "in": "query", "schema": { "type": "boolean" } }
        ],
        "requestBody": {
          "required": true,
          "content": { "application/json": { "schema": { "type": "object" } } }
        },
        "responses": { "200": { "description": "Import completed" } }
      }
    },
    "/api/permissions": {
      "get": {
        "summary": "List permissions",
        "tags": ["RBAC"],
        "security": [{"BearerAuth": []}],
        "responses": { "200": { "description": "Permissions list" } }
      },
      "post": {
        "summary": "Create permission",
        "tags": ["RBAC"],
        "security": [{"BearerAuth": []}],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": ["user_id", "collection"],
                "properties": {
                  "user_id": { "type": "string" },
                  "collection": { "type": "string" },
                  "role": { "type": "string", "default": "viewer" }
                }
              }
            }
          }
        },
        "responses": { "200": { "description": "Permission created" } }
      }
    },
    "/api/permissions/{id}": {
      "delete": {
        "summary": "Delete permission",
        "tags": ["RBAC"],
        "security": [{"BearerAuth": []}],
        "parameters": [
          { "name": "id", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "responses": {
          "204": { "description": "Deleted" },
          "404": { "description": "Not found" }
        }
      }
    },
    "/api/backup": {
      "get": {
        "summary": "Download database backup",
        "tags": ["Backup"],
        "security": [{"BearerAuth": []}],
        "responses": {
          "200": { "description": "SQLite database file" }
        }
      }
    },
    "/ws": {
      "get": {
        "summary": "WebSocket endpoint",
        "tags": ["WebSockets"],
        "responses": { "101": { "description": "WebSocket upgrade" } }
      }
    },
    "/api/notifications/stream": {
      "get": {
        "summary": "SSE notification stream",
        "tags": ["Notifications"],
        "responses": { "200": { "description": "SSE stream" } }
      }
    },
    "/api/logs/stream": {
      "get": {
        "summary": "SSE log stream",
        "tags": ["Logs"],
        "responses": { "200": { "description": "SSE stream" } }
      }
    },
    "/api/pubsub/{name}/stream": {
      "get": {
        "summary": "SSE pubsub stream for topic",
        "tags": ["PubSub"],
        "parameters": [
          { "name": "name", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "responses": {
          "200": { "description": "SSE stream" },
          "404": { "description": "Topic not found" }
        }
      }
    }
  },
  "components": {
    "securitySchemes": {
      "BearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    }
  }
}`

func (s *Server) handleOpenAPIJSON(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(openapiSpec))
}

func (s *Server) handleSwaggerUI(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.Write([]byte(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Backbone Server API - Swagger UI</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui.css" />
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui-bundle.js" crossorigin></script>
  <script>
    SwaggerUIBundle({ url: '/api/openapi.json', dom_id: '#swagger-ui' });
  </script>
</body>
</html>`))
}
