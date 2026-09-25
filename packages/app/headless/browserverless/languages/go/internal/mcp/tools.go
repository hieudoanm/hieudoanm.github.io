package mcp

// Tool names exposed over MCP. They carry a server prefix so a model can tell
// which server produced a result when several servers share one session.
const (
	ToolScrape     = "browserverless_scrape"
	ToolScreenshot = "browserverless_screenshot"
	ToolVersion    = "browserverless_version"
)

// Register adds the browserverless tool surface to s. Both render tools work
// against either backend, so nothing here depends on how rendering happens.
func Register(s *Server, renderer Renderer) {
	s.AddTool(scrapeTool(), handleScrape(renderer))
	s.AddTool(screenshotTool(), handleScreenshot(renderer))
	s.AddTool(versionTool(), handleVersion())
}

func scrapeTool() Tool {
	return Tool{
		Name:        ToolScrape,
		Description: "Render a URL in the headless browser and return the full HTML document, its final URL, title, and render metrics.",
		InputSchema: Schema{
			Type: "object",
			Properties: map[string]PropertySchema{
				"url":        urlProperty(),
				"timeout_ms": timeoutProperty(),
			},
			Required: []string{"url"},
		},
	}
}

func screenshotTool() Tool {
	return Tool{
		Name:        ToolScreenshot,
		Description: "Render a URL in the headless browser and return a PNG screenshot as an image, with the final URL, title, and render metrics.",
		InputSchema: Schema{
			Type: "object",
			Properties: map[string]PropertySchema{
				"url":        urlProperty(),
				"timeout_ms": timeoutProperty(),
			},
			Required: []string{"url"},
		},
	}
}

func versionTool() Tool {
	return Tool{
		Name:        ToolVersion,
		Description: "Report the browserverless binary version backing this server.",
		InputSchema: Schema{
			Type:       "object",
			Properties: map[string]PropertySchema{},
		},
	}
}

// urlProperty and timeoutProperty are shared by the two render tools. The
// schemas are written out by hand because MCP clients read them to build the
// tool descriptions a model sees.
func urlProperty() PropertySchema {
	return PropertySchema{
		Type:        "string",
		Description: "absolute http or https URL to render",
	}
}

func timeoutProperty() PropertySchema {
	return PropertySchema{
		Type:        "integer",
		Description: "per-call load timeout in milliseconds; omit to use the server default",
	}
}
