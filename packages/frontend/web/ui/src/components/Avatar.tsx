import { FC } from 'react';
import avatar from '@atom-ui/assets/avatar.jpg';

export const Avatar: FC = () => {
  return (
    <div
      className="aspect-square w-32 overflow-hidden rounded-full border border-neutral-200 bg-cover bg-no-repeat shadow-sm"
      style={{ backgroundImage: `url(${avatar.src})` }}></div>
  );
};
