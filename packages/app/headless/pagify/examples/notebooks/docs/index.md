# Jupyter Notebook Examples

This site demonstrates how to convert Jupyter notebooks to Markdown using pagify.

## Converting Notebooks

Convert your Jupyter notebooks to Markdown:

```bash
pagify ipynb ./notebooks
```

This will create `.md` files in the same location as your `.ipynb` files.

## Available Notebooks

- [Data Analysis](data-analysis.md) - Basic data analysis with pandas
- [Visualization](visualization.md) - Data visualization with matplotlib
- [Machine Learning](machine-learning.md) - ML basics with scikit-learn

## Building the Site

After converting notebooks to Markdown, build the site:

```bash
pagify build ./docs --output ./dist
```

## Preview

Preview the site locally:

```bash
pagify preview ./docs
```
