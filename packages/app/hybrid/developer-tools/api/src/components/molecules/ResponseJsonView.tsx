'use client';

import { SchemaCheck } from '@/components/molecules/SchemaCheck';
import { prettyPrint } from '@/lib/format';
import { type FC, useState } from 'react';

interface ResponseJsonViewProps {
  body: string;
}

export const ResponseJsonView: FC<ResponseJsonViewProps> = ({ body }) => {
  const [showSchema, setShowSchema] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1">
        <button
          type="button"
          onClick={() => setShowSchema(false)}
          className={`btn btn-ghost btn-xs ${!showSchema ? 'btn-active' : ''}`}>
          Response
        </button>
        <button
          type="button"
          onClick={() => setShowSchema(true)}
          className={`btn btn-ghost btn-xs ${showSchema ? 'btn-active' : ''}`}>
          JSON Schema
        </button>
      </div>
      {showSchema ? (
        <SchemaCheck body={body} />
      ) : (
        <pre className="bg-base-200 h-64 overflow-x-auto rounded-lg p-3 font-mono text-sm break-all whitespace-pre-wrap">
          {prettyPrint(body)}
        </pre>
      )}
    </div>
  );
};

ResponseJsonView.displayName = 'ResponseJsonView';
