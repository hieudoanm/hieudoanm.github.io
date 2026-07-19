# FEATURE-10 — PDF Export

Convert Markdown files to PDF in A4 format for offline distribution and printing.

## Behaviour

The `pagify pdf` command converts Markdown files to PDF:

- A4 page layout (210 × 297 mm)
- 25 mm margins on all sides
- 11 pt body text for optimal readability
- 6 pt vertical and 8 pt horizontal cell padding for tables
- Automatic page breaks with proper handling of headings, tables, and code blocks

## Usage

```bash
# Convert all Markdown in docs to PDF
pagify pdf

# Convert with custom output directory
pagify pdf ./docs --output ./pdfs
```

## Page Layout

For a standard A4 page (210 × 297 mm) with 25 mm margins:

- **Usable width:** 160 mm (about 454 pt)
- **Table width:** up to 160 mm
- **Font size:** 11 pt for body text
- **Cell padding:** 6 pt vertical, 8 pt horizontal

## CSS Rules

The PDF is generated with the following CSS rules for optimal print layout:

```css
@page {
  size: A4;
  margin: 25mm;
}
body {
  font-family: serif;
  font-size: 11pt;
  line-height: 1.4;
  color: #000;
}
h1, h2, h3, h4, h5, h6 {
  page-break-after: avoid;
}
table {
  width: 100%;
  border-collapse: collapse;
  page-break-inside: avoid;
}
td, th {
  padding: 6pt 8pt;
}
pre, code {
  page-break-inside: avoid;
}
```

## Output

PDF files are written with the same structure as the input Markdown:

- `index.md` → `index.pdf`
- `guide/installation.md` → `guide/installation.pdf`
- `README.md` → `index.pdf`

## Error handling

- Invalid Markdown: Returns a parse error
- Missing content directory: Returns a file access error
- PDF generation failure: Returns a conversion error

## Constraints

- Uses the folio library for HTML to PDF conversion
- No external dependencies (no headless browser required)
- Renders Markdown to HTML first, then to PDF
- Supports all standard Markdown features
