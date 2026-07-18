import { FC } from 'react';
import { DemoColumn1 } from './DemoColumn1';
import { DemoColumn2 } from './DemoColumn2';
import { DemoColumn3 } from './DemoColumn3';
import { DemoColumn4 } from './DemoColumn4';

export const ComponentsDemo: FC = () => (
  <div className="grid gap-6 pb-20 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
    <div className="flex flex-col gap-4">
      <DemoColumn1 />
    </div>
    <div className="flex flex-col gap-4">
      <DemoColumn2 />
    </div>
    <div className="flex flex-col gap-4">
      <DemoColumn3 />
      <DemoColumn4 />
    </div>
  </div>
);
ComponentsDemo.displayName = 'ComponentsDemo';
