'use client';

import { type FC, useState } from 'react';

interface ResponseHtmlViewProps {
  body: string;
}

export const ResponseHtmlView: FC<ResponseHtmlViewProps> = ({ body }) => {
  const [preview, setPreview] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1">
        <button
          type="button"
          onClick={() => setPreview(false)}
          className={`btn btn-ghost btn-xs ${!preview ? 'btn-active' : ''}`}>
          Raw
        </button>
        <button
          type="button"
          onClick={() => setPreview(true)}
          className={`btn btn-ghost btn-xs ${preview ? 'btn-active' : ''}`}>
          Preview
        </button>
      </div>
      {preview ? (
        <iframe
          title="Response preview"
          sandbox=""
          srcDoc={body}
          className="bg-base-200 h-96 w-full rounded-lg"
        />
      ) : (
        <pre className="bg-base-200 overflow-x-auto rounded-lg p-3 font-mono text-sm break-all whitespace-pre-wrap">
          {body}
        </pre>
      )}
    </div>
  );
};

ResponseHtmlView.displayName = 'ResponseHtmlView';
