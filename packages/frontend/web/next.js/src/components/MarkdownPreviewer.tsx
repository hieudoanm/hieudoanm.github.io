import DOMPurify from 'dompurify';
import { FC } from 'react';

export const MarkdownPreviewer: FC<{ html: string }> = ({ html = '' }) => {
  const __html: string = DOMPurify.sanitize(html);

  return (
    <div
      className="markdown-body !bg-neutral-900 !text-neutral-100"
      // Render the HTML safely
      dangerouslySetInnerHTML={{ __html }}
    />
  );
};
