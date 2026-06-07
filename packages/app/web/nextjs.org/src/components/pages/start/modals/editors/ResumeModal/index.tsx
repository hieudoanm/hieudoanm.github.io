import { yaml as yamlLang } from '@codemirror/lang-yaml';
import { useDebounce } from '@frontend/react';
import { yaml2pdfMake } from '@hieudoanm.github.io/services/yaml2pdfmake/yaml2pdfmake.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';

import { ParseResult, YAML_TEMPLATE } from './constants';
import { useCodeMirror } from './useCodeMirror';

(pdfMake as unknown as { vfs: typeof pdfFonts.vfs }).vfs = pdfFonts.vfs;

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
        const blob = await pdfMake
          .createPdf(parseResult.doc as TDocumentDefinitions)
          .getBlob();
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
    <ModalWrapper
      onClose={onClose}
      title="Resume Builder"
      size="max-w-6xl"
      fullHeight>
      <div className="border-base-300 flex justify-end border-b px-4 py-2">
        <button
          className="btn btn-primary btn-sm"
          onClick={() => {
            if (parseResult.ok) {
              pdfMake
                .createPdf(parseResult.doc as TDocumentDefinitions)
                .download('resume.pdf');
            }
          }}
          disabled={!parseResult.ok}>
          Export PDF
        </button>
      </div>

      <div className="flex-1 overflow-hidden p-4 md:p-6">
        <div className="grid h-full gap-6 md:grid-cols-2">
          <div className="border-base-300 bg-base-200 flex flex-col overflow-hidden rounded-2xl border">
            <div className="border-base-300 flex items-center justify-between border-b px-5 py-3">
              <span className="text-base-content/50 text-sm">YAML Editor</span>
              {!parseResult.ok && (
                <span className="badge badge-error badge-sm">Invalid YAML</span>
              )}
            </div>

            {!parseResult.ok && (
              <div className="bg-error/10 text-error px-5 py-2 text-xs">
                {parseResult.error}
              </div>
            )}

            <div ref={editorRef} className="flex-1 overflow-hidden" />
          </div>

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

      <footer className="border-base-300 bg-base-200/50 border-t py-3 text-center">
        <p className="text-base-content/40 text-[10px] tracking-widest uppercase">
          Structured writing · Real-time PDF · Inspired by DaisyX
        </p>
      </footer>
    </ModalWrapper>
  );
};

export default ResumeModal;
