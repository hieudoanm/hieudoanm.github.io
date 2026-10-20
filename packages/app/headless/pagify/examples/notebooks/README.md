# Jupyter Notebook Example

This example demonstrates how to use `pagify ipynb` to convert Jupyter notebooks to Markdown, then build them into a static site.

## Quick Start

Build this example:

```bash
cd examples/notebooks
../../languages/go/bin/pagify ipynb ./notebooks
# Move converted files to docs
mv notebooks/*.md docs/
../../languages/go/bin/pagify build ./docs --output ./dist
```

Or build all examples:

```bash
cd examples
bash examples.sh
```

## Workflow

1. Convert notebooks to Markdown:
   ```bash
   pagify ipynb ./notebooks
   ```

2. Move converted files to docs directory:
   ```bash
   mv notebooks/*.md docs/
   ```

3. Build the site:
   ```bash
   pagify build ./docs --output ./dist
   ```

4. Preview the site:
   ```bash
   pagify preview ./docs
   ```

## Structure

- `notebooks/` - Source Jupyter notebooks (.ipynb)
- `docs/` - Converted Markdown files (.md) + index.md
- `dist/` - Built static site (generated)

## Notebooks

- **data-analysis.ipynb** - Basic data analysis with pandas
- **visualization.ipynb** - Data visualization with matplotlib
- **machine-learning.ipynb** - ML basics with scikit-learn
