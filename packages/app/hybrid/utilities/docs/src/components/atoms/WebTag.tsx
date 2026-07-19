import { JSX } from 'react/jsx-runtime';

export const WebTag = (
  tagName: string,
  Component: React.ComponentType<any>
) => {
  const WrappedComponent = (props: any) => {
    const Tag = tagName as keyof JSX.IntrinsicElements;

    return (
      <Tag>
        <Component {...props} />
      </Tag>
    );
  };

  return WrappedComponent;
};
