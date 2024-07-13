import {
  fonts,
  COLORED_THEMES,
  DARK_THEMES,
  Font,
  LIGHT_THEMES,
  useTheme,
} from '@web/context/ThemeContext';
import { Layout } from '@web/layout';
import { Theme } from 'daisyui';
import { NextPage } from 'next';
import { ChangeEvent } from 'react';

const SettingsPage: NextPage = () => {
  const { font, setFont, theme, setTheme } = useTheme();

  return (
    <Layout nav>
      <div className='container mx-auto'>
        <div className='p-4 md:p-8'>
          <div className='card rounded-lg border border-base-content'>
            <div className='p-2 md:p-4'>
              <div className='flex items-center justify-between'>
                <div>Theme</div>
                <select
                  name='theme'
                  className='select select-sm text-right capitalize'
                  value={theme}
                  onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                    setTheme(event.target.value as Theme)
                  }>
                  {COLORED_THEMES.map((theme: string) => {
                    return (
                      <option key={theme} value={theme}>
                        Colored ({theme})
                      </option>
                    );
                  })}
                  {DARK_THEMES.map((theme: string) => {
                    return (
                      <option key={theme} value={theme}>
                        Dark ({theme})
                      </option>
                    );
                  })}
                  {LIGHT_THEMES.map((theme: string) => {
                    return (
                      <option key={theme} value={theme}>
                        Light ({theme})
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className='border-t border-base-content p-2 md:p-4'>
              <div className='flex items-center justify-between'>
                <div>Font</div>
                <select
                  name='font'
                  className='select select-sm text-right capitalize'
                  value={font}
                  onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                    setFont(event.target.value as Font)
                  }>
                  {Object.keys(fonts).map((font) => {
                    return (
                      <option key={font} value={font}>
                        {font}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;
