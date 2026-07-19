# FEATURE-09 — Jupyter Notebook Conversion

Convert Jupyter notebooks (.ipynb) to Markdown (.md) for inclusion in pagify sites.

## Behaviour

The `pagify ipynb` command converts Jupyter notebooks to Markdown:

- If the path is a directory, all `.ipynb` files in that directory are converted
- If the path is a file, only that file is converted
- Output files are written with the same name and in the same location as the input
- Markdown cells are written as-is
- Code cells are wrapped in fenced code blocks

## Usage

```bash
# Convert a single notebook
pagify ipynb ./analysis.ipynb

# Convert all notebooks in a directory
pagify ipynb ./notebooks
```

## Conversion rules

- **Markdown cells**: Output directly as Markdown
- **Code cells**: Wrapped in triple backticks (```) as code blocks
- **Other cell types**: Output as plain text

## Examples

Given a notebook with:

```json
{
  "cells": [
    {
      "cell_type": "markdown",
      "source": ["# Analysis\n\nThis notebook shows data analysis."]
    },
    {
      "cell_type": "code",
      "source": ["import pandas as pd\n", "df = pd.read_csv('data.csv')"]
    }
  ]
}
```

The output Markdown will be:

```markdown
# Analysis

This notebook shows data analysis.

```
import pandas as pd
df = pd.read_csv('data.csv')
```
```

## Error handling

- Invalid JSON: Returns a parse error
- Missing source fields: Treats as empty
- File permission errors: Returns a file access error

## Constraints

- No external dependencies for notebook parsing
- Uses standard library JSON unmarshalling
- Preserves cell order
- Does not execute code cells
