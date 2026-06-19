import { ChangeEventHandler, FC, useRef, useState } from 'react';
import { countWords } from './utils/typoglycemia';

export const EditorTab: FC<{
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
}> = ({ value, onChange }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [selectedWordCount, setSelectedWordCount] = useState(0);

  const handleSelect = () => {
    if (!textareaRef.current) return;
    const sel = textareaRef.current.value.substring(
      textareaRef.current.selectionStart,
      textareaRef.current.selectionEnd
    );
    setSelectedWordCount((sel.match(/\b[\p{L}\p{N}']+\b/gu) ?? []).length);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = value;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      onChange({ target: { value: text } } as any);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <textarea
        ref={textareaRef}
        placeholder="Type or paste markdown here…"
        className="w-full grow resize-none p-4 font-mono text-sm focus:outline-none"
        value={value}
        onChange={onChange}
        onSelect={handleSelect}
      />
      <div className="border-base-300 flex items-center justify-between border-t px-4 py-2 text-xs">
        <span className="opacity-50">
          {countWords(value)} words
          {selectedWordCount > 0 && <> · {selectedWordCount} selected</>}
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            className="btn btn-ghost btn-xs"
            onClick={handleCopy}>
            Copy
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-xs"
            onClick={handlePaste}>
            Paste
          </button>
        </div>
      </div>
    </div>
  );
};
