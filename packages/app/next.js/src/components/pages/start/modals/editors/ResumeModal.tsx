'use client';

import { yaml as yamlLang } from '@codemirror/lang-yaml';
import { EditorState, Extension } from '@codemirror/state';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView } from '@codemirror/view';
import { useDebounce } from '@hieudoanm/hooks/use-debounce';
import { yaml2pdfMake } from '@hieudoanm/services/yaml2pdfmake/yaml2pdfmake.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { FC, useEffect, useMemo, useRef, useState } from 'react';

(pdfMake as any).vfs = pdfFonts.vfs;

/* ------------------------------------------------------------------ */
/* Constants                                                            */
/* ------------------------------------------------------------------ */

const YAML_TEMPLATE = `
resume:
  info:
    name: "Hieu Doan"
    title: "Senior Software Engineer"
    mobile: "+84 123 456 789"
    email: "hieu@example.com"
    website: "https://hieudoanm.github.io"
    address: "Ho Chi Minh City, Vietnam"
  theme: "modern"
  ats:
    keywords: ["React", "TypeScript", "Node.js", "Next.js", "Tailwind CSS"]
  sections:
    experiences:
      - company: "Tech Solutions Inc."
        position: "Senior Frontend Engineer"
        start_date: "2020-01"
        end_date: "Present"
        highlights:
          - "Led the development of a high-traffic e-commerce platform using React and Next.js."
          - "Optimized application performance, reducing load times by 40%."
    education:
      - institution: "University of Science"
        degree: "Bachelor of Computer Science"
        start_date: "2012-09"
        end_date: "2016-06"
    projects:
      - name: "Resume Builder"
        description: "A real-time YAML-based resume generator."
        link: "https://github.com/hieudoanm/resume-builder"
    skills:
      - name: "Languages"
        keywords: ["JavaScript", "TypeScript", "Python", "Go"]
      - name: "Frameworks"
        keywords: ["React", "Next.js", "Node.js", "Express"]
`;

type ParseResult = { ok: true; doc: any } | { ok: false; error: string };

/* ------------------------------------------------------------------ */
/* CodeMirror hook                                                      */
/* ------------------------------------------------------------------ */

const useCodeMirror = ({
  value,
  onChange,
  extensions = [],
}: {
  value: string;
  onChange?: (v: string) => void;
  extensions?: Extension[];
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    viewRef.current?.destroy();
    const state = EditorState.create({
      doc: value,
      extensions: [
        oneDark,
        EditorView.lineWrapping,
        EditorView.theme({
          '&': { height: '100%' },
          '.cm-editor': { height: '100%' },
          '.cm-scroller': { overflow: 'auto', fontFamily: 'monospace' },
        }),
        ...extensions,
        EditorView.updateListener.of((update) => {
          if (update.docChanged && onChange)
            onChange(update.state.doc.toString());
        }),
      ],
    });
    viewRef.current = new EditorView({ state, parent: ref.current });
    return () => viewRef.current?.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [extensions]);

  return { ref };
};

/* ------------------------------------------------------------------ */
/* Modal                                                                */
/* ------------------------------------------------------------------ */

export const ResumeModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [yaml, setYaml] = useState(YAML_TEMPLATE);
  const debouncedYaml = useDebounce(yaml, 500);

  const { ref: editorRef } = useCodeMirror({
    value: yaml,
    onChange: setYaml,
    extensions: [yamlLang()],
  });

  const parseResult: ParseResult = useMemo(() => {
    try {
      const doc = yaml2pdfMake(debouncedYaml);
      return { ok: true, doc };
    } catch (err) {
      return {
        ok: false,
        error: err instanceof Error ? err.message : 'Invalid YAML structure',
      };
    }
  }, [debouncedYaml]);

  useEffect(() => {
    if (!parseResult.ok) return;
    let cancelled = false;
    (async () => {
      try {
        const blob = await pdfMake.createPdf(parseResult.doc).getBlob();
        if (cancelled) return;
        const url = URL.createObjectURL(blob);
        if (iframeRef.current) {
          iframeRef.current.src = url;
        }
      } catch (err) {
        console.error('PDF generation error:', err);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [parseResult]);

  return (
    <div className="bg-base-100 fixed inset-0 z-[60] flex flex-col font-sans">
      {/* ── NAV ── */}
      <div className="navbar border-base-300 bg-base-100 min-h-[4rem] border-b px-4">
        <div className="navbar-start">
          <button onClick={onClose} className="btn btn-circle btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <span className="text-primary ml-2 font-serif text-xl font-bold tracking-widest">
            Resume Builder
          </span>
        </div>
        <div className="navbar-end">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              if (parseResult.ok) {
                pdfMake.createPdf(parseResult.doc).download('resume.pdf');
              }
            }}
            disabled={!parseResult.ok}>
            Export PDF
          </button>
        </div>
      </div>

      {/* ── MAIN ── */}
      <div className="flex-1 overflow-hidden p-4 md:p-6">
        <div className="grid h-full gap-6 md:grid-cols-2">
          {/* YAML Editor */}
          <div className="border-base-300 bg-base-200 flex flex-col overflow-hidden rounded-2xl border">
            <div className="border-base-300 flex items-center justify-between border-b px-5 py-3">
              <span className="text-base-content/50 text-sm">YAML Editor</span>
              {!parseResult.ok && (
                <span className="badge badge-error badge-sm">Invalid YAML</span>
              )}
            </div>

            {/* Error Message */}
            {!parseResult.ok && (
              <div className="bg-error/10 text-error px-5 py-2 text-xs">
                {parseResult.error}
              </div>
            )}

            <div ref={editorRef} className="flex-1 overflow-hidden" />
          </div>

          {/* PDF Preview */}
          <div className="border-base-300 bg-base-200 relative flex flex-col overflow-hidden rounded-2xl border">
            <div className="border-base-300 text-base-content/50 border-b px-5 py-3 text-sm">
              Preview
            </div>

            {!parseResult.ok && (
              <div className="bg-base-200/80 text-base-content/60 absolute inset-0 z-10 flex items-center justify-center text-sm">
                Fix YAML errors to update preview
              </div>
            )}

            <iframe
              ref={iframeRef}
              title="Resume Preview"
              className="w-full flex-1"
            />
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="border-base-300 bg-base-200/50 border-t py-3 text-center">
        <p className="text-base-content/40 text-[10px] tracking-widest uppercase">
          Structured writing · Real-time PDF · Inspired by Forma
        </p>
      </footer>
    </div>
  );
};

export default ResumeModal;
