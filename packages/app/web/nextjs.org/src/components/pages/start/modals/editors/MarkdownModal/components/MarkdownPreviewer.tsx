import DOMPurify from 'dompurify';
import { FC, useEffect, useState } from 'react';

export const MarkdownPreviewer: FC<{ html: string; fontClassName: string }> = ({
  html = '',
  fontClassName = '',
}) => {
  const [innerHTML, setInnerHTML] = useState('');

  useEffect(() => {
    setInnerHTML(DOMPurify.sanitize(html));
  }, [html]);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: innerHTML }}
      className={`markdown-body !bg-base-100 !text-base-content h-full w-full ${fontClassName}`}
    />
  );
};
