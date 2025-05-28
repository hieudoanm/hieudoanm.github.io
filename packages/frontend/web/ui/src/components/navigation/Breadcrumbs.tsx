import { FC } from 'react';

export const Breadcrumbs: FC = () => {
  return (
    <div className="flex items-center gap-x-2">
      <p>Home</p>
      <p>/</p>
      <p>Category</p>
      <p>/</p>
      <p className="font-black">Product</p>
    </div>
  );
};
