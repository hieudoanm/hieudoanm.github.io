# pagify — Tech Stack: Goldmark

Goldmark is the Markdown parser for pagify.

- Configured with GFM, footnotes, automatic heading IDs, and raw HTML passthrough.
- The parser knows nothing about visual design.
- One AST walk collects the heading outline, resolves links, and marks callouts.
