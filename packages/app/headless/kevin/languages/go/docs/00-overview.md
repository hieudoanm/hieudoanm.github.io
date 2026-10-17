# KeVIN (Go) — Project Overview

## 1. Project Summary

KeVIN is a Redis-style in-memory key/value store in a single static Go binary. It implements the same PING, SET, GET, KEYS, DEL protocol as the C and C++ implementations, with no external dependencies. It also provides a bubbletea TUI (`serve --tui`), an optional fyne GUI (`serve --gui`), and an MCP server (`mcp serve`) that speaks newline-delimited JSON-RPC 2.0 on stdio.

The project showcases clean Go architecture: cobra CLI, modular packages under `internal/` (db, server, gui, tui, mcp), and a transport-agnostic MCP implementation with pluggable backends (in-process and TCP proxy).

## 2. Problem Statement

A lightweight, self-contained key/value store needs to be accessible across multiple runtimes (C, C++, Go) with identical protocol behavior. The Go implementation must be:

- Protocol-identical to the C/C++ reference implementations
- Single static binary (CGO_ENABLED=0 by default)
- Simple to run and test
- Usable as both a TCP server and an MCP tool provider for LLM clients

## 3. Product Vision

Build a minimal, correct, and well-tested Redis-style store with a clean architecture that demonstrates Go best practices while maintaining perfect protocol parity across language implementations.

The product prioritises correctness of protocol behavior, simplicity of deployment, and clear module boundaries over feature bloat.

## 4. Target Users

### 4.1 Developers

Need a simple local key/value store for development, testing, or as a reference implementation.

### 4.2 LLM Clients (via MCP)

Need programmatic access to a key/value store through the Model Context Protocol over stdio.

### 4.3 Operators

Need a static binary with zero runtime dependencies that can run anywhere.

## 5. Product Goals

- Deliver protocol-identical behavior to C and C++ implementations
- Maintain a clean, testable codebase with clear package boundaries
- Provide both TCP server and MCP server interfaces
- Ship as a single static binary with minimal footprint
- Keep the core store simple and in-memory (by design)

## 6. Non-Goals

- Distributed clustering or replication (MVP/scope is single-node in-memory)
- RESP protocol compatibility (inline protocol only)
- Production-grade persistence as a requirement (snapshot support exists via flags where documented)
- External service dependencies

## 7. Core Commands

| Command         | Description                              |
| --------------- | ---------------------------------------- |
| `PING`          | Liveness check → `PONG`                  |
| `SET key value` | Store a value (value may contain spaces) |
| `GET key`       | Retrieve a value                         |
| `KEYS`          | List all keys                            |
| `DEL key`       | Delete a key                             |

Commands are case-insensitive. Value spaces are preserved.
