package server

import (
	"fmt"
	"net/http"
)

// writeNotFound renders a minimal 404 so a mistyped URL still looks deliberate
// rather than like a bare Go error string.
func writeNotFound(writer http.ResponseWriter) {
	writer.Header().Set("Content-Type", "text/html; charset=utf-8")
	writer.WriteHeader(http.StatusNotFound)
	fmt.Fprint(writer, notFoundPage)
}

// notFoundPage is the fallback body for unknown URLs. It is inline because a
// missing page is exactly when reading a file from disk would be least
// reliable.
const notFoundPage = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>404 · Not found</title>
    <style>
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        font-family: ui-sans-serif, system-ui, sans-serif;
        color: #71717a;
        background: #ffffff;
      }
      main { text-align: center; padding: 2rem; }
      h1 { margin: 0 0 0.5rem; font-size: 3rem; color: #18181b; }
      a { color: #2563eb; }
    </style>
  </head>
  <body>
    <main>
      <h1>404</h1>
      <p>That page does not exist.</p>
      <p><a href="/">Back to the start</a></p>
    </main>
  </body>
</html>
`
