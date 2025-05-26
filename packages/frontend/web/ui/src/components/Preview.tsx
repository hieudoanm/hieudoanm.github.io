import { FC, ReactNode, useState } from 'react';
import { Button } from './Button';
import { H2 } from './Typography';

export const Preview: FC<{
  name: string;
  code: string;
  component: ReactNode;
}> = ({ name = '', code = '', component = <></> }) => {
  const [preview, setPreview] = useState<boolean>(true);

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex items-center justify-between">
        <H2>{name}</H2>
        <Button onClick={() => setPreview((previous: boolean) => !previous)}>
          {preview ? '👁️ Preview' : '👾 Code'}
        </Button>
      </div>
      {preview ? (
        <div className="flex items-center justify-center rounded border border-neutral-900 bg-black p-4">
          {component}
        </div>
      ) : (
        <code className="language-markup p-4!">{code}</code>
      )}
    </div>
  );
};
