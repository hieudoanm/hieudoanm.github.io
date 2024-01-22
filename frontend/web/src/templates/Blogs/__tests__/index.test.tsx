import { render } from '@testing-library/react';
import Blogs from '..';

describe('Blogs', () => {
  test('render default', () => {
    const { container } = render(
      <Blogs
        hero={{ id: '', title: '', subtitle: '', backgroundImage: '' }}
        title=""
        subtitle=""
        blogs={[]}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
