import { FC, ReactNode, useState } from 'react';
import { Button } from './Button';
import { H3 } from './Typography';

export const Preview: FC<{
  id: string;
  name: string;
  code: string;
  component: ReactNode;
}> = ({ id = '', name = '', code = '', component = <></> }) => {
  const [preview, setPreview] = useState<boolean>(true);

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex items-center justify-between">
        <H3 id={id}>{name}</H3>
        <Button onClick={() => setPreview((previous: boolean) => !previous)}>
          {preview ? 'Preview' : 'Code'}
        </Button>
      </div>
      {preview ? (
        <div className="flex items-center justify-center rounded border border-neutral-200 p-4 shadow-xs">
          {component}
        </div>
      ) : (
        <code className="language-markup p-4!">{code}</code>
      )}
    </div>
  );
};
