import { render } from '@testing-library/react';
import { BlogsTemplate } from '..';

describe('BlogsTemplate', () => {
  test('render default', () => {
    const { container } = render(
      <BlogsTemplate
        hero={{ id: '', title: '', subtitle: '', backgroundImage: '' }}
        title=""
        subtitle=""
        blogs={[]}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
