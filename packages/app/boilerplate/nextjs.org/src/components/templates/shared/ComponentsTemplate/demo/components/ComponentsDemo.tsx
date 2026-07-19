import { FC } from 'react';
import { ComponentsDemoColumn1 } from './ComponentsDemoColumn1';
import { ComponentsDemoColumn2 } from './ComponentsDemoColumn2';
import { ComponentsDemoColumn3 } from './ComponentsDemoColumn3';

export const ComponentsDemo: FC = () => (
  <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3">
    <ComponentsDemoColumn1 />
    <ComponentsDemoColumn2 />
    <ComponentsDemoColumn3 />
  </div>
);
ComponentsDemo.displayName = 'ComponentsDemo';
