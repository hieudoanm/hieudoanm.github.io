'use client';

import { prettyPrint } from '@/lib/format';
import { type FC } from 'react';
import { FiAlignLeft } from 'react-icons/fi';

interface BodyEditorProps {
  body: string;
  onChange: (body: string) => void;
}

export const BodyEditor: FC<BodyEditorProps> = ({ body, onChange }) => (
  <div className="flex flex-col gap-2">
    <textarea
      value={body}
      onChange={(e) => onChange(e.target.value)}
      placeholder='{"name": "value"}'
      aria-label="Request body"
      rows={8}
      spellCheck={false}
      className="textarea textarea-bordered w-full font-mono"
    />
    <button
      type="button"
      onClick={() => onChange(prettyPrint(body))}
      className="btn btn-ghost btn-xs w-fit gap-1">
      <FiAlignLeft className="size-4" />
      <span>Beautify JSON</span>
    </button>
  </div>
);

BodyEditor.displayName = 'BodyEditor';
