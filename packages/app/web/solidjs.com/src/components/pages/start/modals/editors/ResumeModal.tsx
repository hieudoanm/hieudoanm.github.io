import { yaml as yamlLang } from '@codemirror/lang-yaml';
import { EditorState, Extension } from '@codemirror/state';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView } from '@codemirror/view';
import { createDebounce } from '@frontend/solid';
import { yaml2pdfMake } from '@hieudoanm.github.io/services/yaml2pdfmake/yaml2pdfmake.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {
  createSignal,
  createEffect,
  createMemo,
  onCleanup,
  onMount,
} from 'solid-js';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

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

type ParseResult = { ok: boolean; doc?: any; error?: string };

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
  let ref: HTMLDivElement | undefined;
  let viewRef: EditorView | undefined;

  onMount(() => {
    if (!ref) return;
    viewRef?.destroy();
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
    viewRef = new EditorView({ state, parent: ref });
    onCleanup(() => viewRef?.destroy());
  });

  return { ref };
};

/* ------------------------------------------------------------------ */
/* Modal                                                                */
/* ------------------------------------------------------------------ */

export const ResumeModal = ({ onClose }: { onClose: () => void }) => {
  let iframeRef: HTMLIFrameElement | undefined;
  const [yaml, setYaml] = createSignal(YAML_TEMPLATE);
  const debouncedYaml = createDebounce(yaml(), 500);

  const { ref: editorRef } = useCodeMirror({
    value: yaml(),
    onChange: setYaml,
    extensions: [yamlLang()],
  });

  const parseResult: () => ParseResult = createMemo(() => {
    try {
      const doc = yaml2pdfMake(debouncedYaml());
      return { ok: true, doc };
    } catch (err) {
      return {
        ok: false,
        error: err instanceof Error ? err.message : 'Invalid YAML structure',
      };
    }
  });

  createEffect(() => {
    if (!parseResult().ok) return;
    let cancelled = false;
    (async () => {
      try {
        const blob = await pdfMake.createPdf(parseResult().doc).getBlob();
        if (cancelled) return;
        const url = URL.createObjectURL(blob);
        if (iframeRef) {
          iframeRef.src = url;
        }
      } catch (err) {
        console.error('PDF generation error:', err);
      }
    })();
    onCleanup(() => {
      cancelled = true;
    });
  });

  return (
    <ModalWrapper
      onClose={onClose}
      title="Resume Builder"
      size="max-w-6xl"
      fullHeight>
      {/* Export button */}
      <div class="border-base-300 flex justify-end border-b px-4 py-2">
        <button
          class="btn btn-primary btn-sm"
          onClick={() => {
            if (parseResult().ok) {
              pdfMake.createPdf(parseResult().doc).download('resume.pdf');
            }
          }}
          disabled={!parseResult().ok}>
          Export PDF
        </button>
      </div>

      {/* ── MAIN ── */}
      <div class="flex-1 overflow-hidden p-4 md:p-6">
        <div class="grid h-full gap-6 md:grid-cols-2">
          {/* YAML Editor */}
          <div class="border-base-300 bg-base-200 flex flex-col overflow-hidden rounded-2xl border">
            <div class="border-base-300 flex items-center justify-between border-b px-5 py-3">
              <span class="text-base-content/50 text-sm">YAML Editor</span>
              {!parseResult().ok && (
                <span class="badge badge-error badge-sm">Invalid YAML</span>
              )}
            </div>

            {/* Error Message */}
            {!parseResult().ok && (
              <div class="bg-error/10 text-error px-5 py-2 text-xs">
                {parseResult().error}
              </div>
            )}

            <div ref={editorRef} class="flex-1 overflow-hidden" />
          </div>

          {/* PDF Preview */}
          <div class="border-base-300 bg-base-200 relative flex flex-col overflow-hidden rounded-2xl border">
            <div class="border-base-300 text-base-content/50 border-b px-5 py-3 text-sm">
              Preview
            </div>

            {!parseResult().ok && (
              <div class="bg-base-200/80 text-base-content/60 absolute inset-0 z-10 flex items-center justify-center text-sm">
                Fix YAML errors to update preview
              </div>
            )}

            <iframe
              ref={iframeRef}
              title="Resume Preview"
              class="w-full flex-1"
            />
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer class="border-base-300 bg-base-200/50 border-t py-3 text-center">
        <p class="text-base-content/40 text-[10px] tracking-widest uppercase">
          Structured writing · Real-time PDF · Inspired by Forma
        </p>
      </footer>
    </ModalWrapper>
  );
};

export default ResumeModal;
