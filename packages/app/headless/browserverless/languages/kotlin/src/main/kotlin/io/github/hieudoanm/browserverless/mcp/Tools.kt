package io.github.hieudoanm.browserverless.mcp

/** The tools this server exposes. */
object Tools {
    /** Returns the page's final URL, title, and full HTML. */
    fun scrape(): Tool = Tool(
        name = "browserverless_scrape",
        description = "Render a URL headlessly and return its title, final URL and full HTML.",
        inputSchema = Schema(
            properties = mapOf(
                "url" to PropertySchema(
                    type = "string",
                    description = "Absolute http or https URL to render.",
                ),
                "timeout_ms" to PropertySchema(
                    type = "integer",
                    description = "Load deadline in milliseconds; 0 uses the server default. Max 600000.",
                ),
            ),
            required = listOf("url"),
        ),
    )

    /** Returns a PNG of the rendered page. */
    fun screenshot(): Tool = Tool(
        name = "browserverless_screenshot",
        description = "Render a URL headlessly and return a PNG screenshot of the page.",
        inputSchema = Schema(
            properties = mapOf(
                "url" to PropertySchema(
                    type = "string",
                    description = "Absolute http or https URL to render.",
                ),
                "timeout_ms" to PropertySchema(
                    type = "integer",
                    description = "Load deadline in milliseconds; 0 uses the server default. Max 600000.",
                ),
            ),
            required = listOf("url"),
        ),
    )

    /** Reports the server identity and version. */
    fun version(): Tool = Tool(
        name = "browserverless_version",
        description = "Report the browserverless MCP server name and version.",
        inputSchema = Schema(),
    )
}
