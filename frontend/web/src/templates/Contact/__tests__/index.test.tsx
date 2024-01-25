import { render } from '@testing-library/react';
import ContactTemplate from '..';

describe('Contact', () => {
  test('render default', () => {
    const { container } = render(
      <ContactTemplate
        sections={[]}
        hero={{
          id: 'id',
          title: 'title',
          subtitle: 'subtitle',
          backgroundImage: '',
        }}
        pricing={{
          id: 'id',
          title: 'title',
          subtitle: 'subtitle',
          plans: [],
        }}
        contact={{
          id: '',
          title: 'title',
        }}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
