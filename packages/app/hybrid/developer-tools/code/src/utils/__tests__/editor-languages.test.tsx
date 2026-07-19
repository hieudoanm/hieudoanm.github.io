import { render } from '@testing-library/react';
import { getLanguageExtension, getFileIcon } from '../editor-languages';

describe('getLanguageExtension', () => {
  it('returns JavaScript for .ts files', () => {
    const result = getLanguageExtension('file.ts');
    expect(result).not.toBeNull();
  });

  it('returns JavaScript for .tsx files', () => {
    const result = getLanguageExtension('file.tsx');
    expect(result).not.toBeNull();
  });

  it('returns Python for .py files', () => {
    const result = getLanguageExtension('file.py');
    expect(result).not.toBeNull();
  });

  it('returns Rust for .rs files', () => {
    const result = getLanguageExtension('file.rs');
    expect(result).not.toBeNull();
  });

  it('returns Markdown for .md files', () => {
    const result = getLanguageExtension('file.md');
    expect(result).not.toBeNull();
  });

  it('returns Markdown for .mdx files', () => {
    const result = getLanguageExtension('file.mdx');
    expect(result).not.toBeNull();
  });

  it('returns JSON for .json files', () => {
    const result = getLanguageExtension('file.json');
    expect(result).not.toBeNull();
  });

  it('returns CSS for .css files', () => {
    const result = getLanguageExtension('file.css');
    expect(result).not.toBeNull();
  });

  it('returns HTML for .html files', () => {
    const result = getLanguageExtension('file.html');
    expect(result).not.toBeNull();
  });

  it('returns XML for .xml files', () => {
    const result = getLanguageExtension('file.xml');
    expect(result).not.toBeNull();
  });

  it('returns null for unknown extensions', () => {
    const result = getLanguageExtension('file.xyz');
    expect(result).toBeNull();
  });

  it('returns shell for Makefile', () => {
    const result = getLanguageExtension('Makefile');
    expect(result).not.toBeNull();
  });

  it('returns shell for GNUmakefile', () => {
    const result = getLanguageExtension('GNUmakefile');
    expect(result).not.toBeNull();
  });

  it('returns null for unknown files without extension', () => {
    const result = getLanguageExtension('LICENSE');
    expect(result).toBeNull();
  });

  it('returns JavaScript for js, mjs and cjs files', () => {
    expect(getLanguageExtension('file.js')).not.toBeNull();
    expect(getLanguageExtension('file.mjs')).not.toBeNull();
    expect(getLanguageExtension('file.cjs')).not.toBeNull();
  });

  it('returns JavaScript for jsx files with a path', () => {
    expect(getLanguageExtension('src/components/Button.jsx')).not.toBeNull();
  });

  it('returns shell for mk and makefile extensions', () => {
    expect(getLanguageExtension('build.mk')).not.toBeNull();
    expect(getLanguageExtension('Makefile.mk')).not.toBeNull();
  });

  it('returns XML for htm and svg files', () => {
    expect(getLanguageExtension('file.htm')).not.toBeNull();
    expect(getLanguageExtension('file.svg')).not.toBeNull();
  });

  it('returns shell for BSDmakefile basename', () => {
    expect(getLanguageExtension('BSDMakefile')).not.toBeNull();
    expect(getLanguageExtension('gnumakefile')).not.toBeNull();
  });

  it('handles uppercase extensions', () => {
    expect(getLanguageExtension('file.TS')).not.toBeNull();
  });
});

describe('getFileIcon', () => {
  const renderIcon = (filename: string) => {
    const icon = getFileIcon(filename);
    const { container } = render(<>{icon}</>);
    return container.querySelector('svg');
  };

  it('returns an SVG for TypeScript files', () => {
    expect(renderIcon('file.ts')).toBeInTheDocument();
    expect(renderIcon('file.tsx')).toBeInTheDocument();
  });

  it('returns an SVG for JavaScript files', () => {
    expect(renderIcon('file.js')).toBeInTheDocument();
    expect(renderIcon('file.jsx')).toBeInTheDocument();
    expect(renderIcon('file.mjs')).toBeInTheDocument();
    expect(renderIcon('file.cjs')).toBeInTheDocument();
  });

  it('returns an SVG for Python files', () => {
    expect(renderIcon('file.py')).toBeInTheDocument();
  });

  it('returns an SVG for Rust files', () => {
    expect(renderIcon('file.rs')).toBeInTheDocument();
  });

  it('returns an SVG for Markdown files', () => {
    expect(renderIcon('file.md')).toBeInTheDocument();
    expect(renderIcon('file.mdx')).toBeInTheDocument();
  });

  it('returns an SVG for JSON files', () => {
    expect(renderIcon('file.json')).toBeInTheDocument();
  });

  it('returns an SVG for CSS files', () => {
    expect(renderIcon('file.css')).toBeInTheDocument();
  });

  it('returns an SVG for HTML files', () => {
    expect(renderIcon('file.html')).toBeInTheDocument();
    expect(renderIcon('file.htm')).toBeInTheDocument();
  });

  it('returns an SVG for XML/SVG files', () => {
    expect(renderIcon('file.xml')).toBeInTheDocument();
    expect(renderIcon('file.svg')).toBeInTheDocument();
  });

  it('returns an SVG for unknown extensions', () => {
    expect(renderIcon('file.xyz')).toBeInTheDocument();
  });

  it('returns an SVG for mk files', () => {
    expect(renderIcon('file.mk')).toBeInTheDocument();
  });

  it('returns an SVG for makefile basenames', () => {
    expect(renderIcon('Makefile')).toBeInTheDocument();
    expect(renderIcon('GNUmakefile')).toBeInTheDocument();
    expect(renderIcon('bsdmakefile')).toBeInTheDocument();
  });
});
