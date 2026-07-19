import { Fragment, createElement, type FC } from 'react';

import { resolveEmbed } from '@/components/templates/noteEmbeds';
import { renderMarkdown, splitSegments } from '@/lib/notes';

export const NoteBody: FC<{ markdown: string }> = ({ markdown }) => (
  <div className="note-prose flex flex-col gap-3">
    {splitSegments(markdown).map((segment, index) =>
      segment.kind === 'embed' ? (
        <Fragment key={index}>
          {createElement(resolveEmbed(segment.name))}
        </Fragment>
      ) : (
        <div
          key={index}
          dangerouslySetInnerHTML={{ __html: renderMarkdown(segment.value) }}
        />
      )
    )}
  </div>
);
