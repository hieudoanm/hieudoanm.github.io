import { FC } from 'react';
import { H3, Paragraph } from '../Typography';
import { Button } from '../form/Button';

export const Modal: FC = () => {
  return (
    <div className="w-full max-w-md divide-y divide-neutral-200 overflow-hidden rounded border border-neutral-200 bg-white shadow-md">
      <div className="px-6 py-4">
        <H3>Modal Title</H3>
      </div>
      <div className="px-6 py-4">
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          venenatis ante a scelerisque rhoncus. Suspendisse vitae sem ac purus
          condimentum faucibus. Suspendisse potenti. Donec porta.
        </Paragraph>
      </div>
      <div className="px-6 py-4">
        <div className="flex justify-end">
          <Button>Button</Button>
        </div>
      </div>
    </div>
  );
};
