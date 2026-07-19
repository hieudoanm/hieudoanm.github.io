import type { ReactNode } from 'react';
import { LanguageSupport, StreamLanguage } from '@codemirror/language';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { rust } from '@codemirror/lang-rust';
import { markdown } from '@codemirror/lang-markdown';
import { json } from '@codemirror/lang-json';
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { xml } from '@codemirror/lang-xml';
import { shell } from '@codemirror/legacy-modes/mode/shell';
import {
  LuFile,
  LuFileCode,
  LuFileJson,
  LuFileText,
  LuGlobe,
} from 'react-icons/lu';

const extMap: Record<string, () => LanguageSupport> = {
  ts: () => javascript({ typescript: true }),
  tsx: () => javascript({ jsx: true, typescript: true }),
  js: () => javascript(),
  jsx: () => javascript({ jsx: true }),
  mjs: () => javascript(),
  cjs: () => javascript(),
  py: python,
  rs: rust,
  md: markdown,
  mdx: markdown,
  json: json,
  css: css,
  html: html,
  htm: html,
  xml: xml,
  svg: xml,
  mk: () => new LanguageSupport(StreamLanguage.define(shell)),
  makefile: () => new LanguageSupport(StreamLanguage.define(shell)),
};

const nameMap: Record<string, () => LanguageSupport> = {
  makefile: () => new LanguageSupport(StreamLanguage.define(shell)),
  gnumakefile: () => new LanguageSupport(StreamLanguage.define(shell)),
  bsdmakefile: () => new LanguageSupport(StreamLanguage.define(shell)),
};

export const getLanguageExtension = (
  filename: string
): LanguageSupport | null => {
  const basename = filename.split('/').pop()?.toLowerCase();
  if (basename && nameMap[basename]) return nameMap[basename]();

  const ext = filename.split('.').pop()?.toLowerCase();
  if (!ext) return null;
  const factory = extMap[ext];
  return factory ? factory() : null;
};

export const getFileIcon = (filename: string): ReactNode => {
  const basename = filename.split('/').pop()?.toLowerCase();
  if (
    basename === 'makefile' ||
    basename === 'gnumakefile' ||
    basename === 'bsdmakefile'
  ) {
    return <LuFileCode className="text-red-400" />;
  }

  const ext = filename.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'ts':
    case 'tsx':
    case 'js':
    case 'jsx':
    case 'mjs':
    case 'cjs':
      return <LuFileCode className="text-blue-400" />;
    case 'py':
    case 'rs':
      return <LuFileCode className="text-orange-400" />;
    case 'md':
    case 'mdx':
      return <LuFileText />;
    case 'json':
      return <LuFileJson />;
    case 'css':
      return <LuFileCode className="text-purple-400" />;
    case 'html':
    case 'htm':
      return <LuGlobe className="text-green-400" />;
    case 'xml':
    case 'svg':
      return <LuFileCode />;
    case 'mk':
      return <LuFileCode className="text-red-400" />;
    default:
      return <LuFile />;
  }
};
