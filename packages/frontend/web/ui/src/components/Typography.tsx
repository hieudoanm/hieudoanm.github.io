import { FC } from 'react';

export const H1: FC = () => {
  return <h1 className="text-4xl font-black">Heading 1</h1>;
};

export const H2: FC = () => {
  return <h2 className="text-3xl font-extrabold">Heading 2</h2>;
};

export const H3: FC = () => {
  return <h3 className="text-2xl font-bold">Heading 3</h3>;
};

export const H4: FC = () => {
  return <h4 className="text-xl font-semibold">Heading 4</h4>;
};

export const H5: FC = () => {
  return <h5 className="text-lg font-medium">Heading 5</h5>;
};

export const H6: FC = () => {
  return <h6 className="text-base font-normal">Heading 6</h6>;
};

export const Paragraph: FC = () => {
  return <p className="text-base font-normal">Paragraph</p>;
};
