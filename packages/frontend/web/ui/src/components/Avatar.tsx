import avatar from '@atomic-ui/assets/avatar.jpg';
import { FC } from 'react';

export const Avatar: FC = () => {
  return (
    <div
      className="aspect-square w-32 overflow-hidden rounded-full border border-neutral-200 bg-cover bg-no-repeat shadow-sm"
      style={{ backgroundImage: `url(${avatar.src})` }}></div>
  );
};
