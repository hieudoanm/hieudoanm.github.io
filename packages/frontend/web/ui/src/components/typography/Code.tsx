import { FC, useEffect, useState } from 'react';
import { BundledLanguage, codeToHtml } from 'shiki';

export const Code: FC<{
  code: string;
  lang: BundledLanguage;
}> = ({ code, lang }) => {
  const [html, setHtml] = useState<string>('');
  useEffect(() => {
    const codeToHtmlAsync = async () => {
      const html: string = await codeToHtml(code, {
        lang,
        theme: 'github-dark',
      });
      setHtml(html);
    };
    codeToHtmlAsync();
  });

  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      className="w-full overflow-x-auto bg-neutral-900 p-4"
    />
  );
};
