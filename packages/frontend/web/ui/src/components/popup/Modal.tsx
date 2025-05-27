import { H3, Paragraph } from '@atomic-ui/components/Typography';
import { Button } from '@atomic-ui/components/form/Button';
import { FC } from 'react';

export const Modal: FC = () => {
  return (
    <div className="w-full max-w-md divide-y divide-neutral-200 overflow-hidden rounded-lg border border-neutral-200 bg-white shadow dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-neutral-100/10">
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
