import { useDarkMode } from '@atomic-ui/hooks/use-dark-mode';
import { FC, useEffect, useState } from 'react';
import { BundledLanguage, BundledTheme, codeToHtml } from 'shiki';

export const Code: FC<{
  code: string;
  lang: BundledLanguage;
}> = ({ code, lang }) => {
  const { darkMode } = useDarkMode();
  const theme: BundledTheme = darkMode ? 'github-dark' : 'github-light';

  const [html, setHtml] = useState<string>('');
  useEffect(() => {
    const codeToHtmlAsync = async () => {
      const html: string = await codeToHtml(code, { lang, theme });
      setHtml(html);
    };
    codeToHtmlAsync();
  });

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};
