'use client';

import { FC, useState, useCallback } from 'react';
import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';
import { LANGUAGES } from './utils';

export const PdfTranslateModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [sourceText, setSourceText] = useState('');
  const [targetLang, setTargetLang] = useState('vi');
  const [sourceLang, setSourceLang] = useState('auto');
  const [translated, setTranslated] = useState('');
  const [loading, setLoading] = useState(false);

  const translate = useCallback(async () => {
    if (!sourceText.trim()) return;
    setLoading(true);
    setTranslated('');
    try {
      const res = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(sourceText)}`
      );
      const data = await res.json();
      setTranslated(data[0]?.map((s: any) => s[0]).join('') || '');
    } catch {
      setTranslated(
        '[Translation requires API key or proxy. Placeholder output.]'
      );
    } finally {
      setLoading(false);
    }
  }, [sourceText, sourceLang, targetLang]);

  return (
    <FullScreen centered onClose={onClose} title="PDF Translate">
      <div className="rounded-box border-base-300 bg-base-200 border p-4">
        <div className="flex flex-col gap-4">
          <p className="text-sm">Translate text between languages.</p>
          <textarea
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            placeholder="Enter text to translate..."
            className="textarea textarea-bordered h-28 resize-none text-xs"
          />
          <div className="flex items-center gap-3 text-xs">
            <div className="flex flex-1 flex-col gap-1">
              <label>Source</label>
              <select
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
                className="select select-bordered select-xs">
                <option value="auto">Auto-detect</option>
                {Object.entries(LANGUAGES).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
            <span className="mt-5">→</span>
            <div className="flex flex-1 flex-col gap-1">
              <label>Target</label>
              <select
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="select select-bordered select-xs">
                {Object.entries(LANGUAGES).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            onClick={translate}
            disabled={loading || !sourceText.trim()}
            className="btn btn-primary btn-sm self-center">
            {loading ? 'Translating...' : 'Translate'}
          </button>
          {translated && (
            <div className="bg-base-200 rounded p-3 text-xs">{translated}</div>
          )}
          <p className="text-base-content/40 text-[10px]">
            Uses Google Translate API. For production, use an API key.
          </p>
        </div>
      </div>
    </FullScreen>
  );
};
PdfTranslateModal.displayName = 'PdfTranslateModal';
