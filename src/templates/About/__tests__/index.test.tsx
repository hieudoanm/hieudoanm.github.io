import { render } from '@testing-library/react';
import { AboutTemplate } from '..';

describe('AboutTemplate', () => {
  test('render default', () => {
    const wrapper = render(
      <AboutTemplate
        sections={[]}
        hero={{ id: '', title: '', subtitle: '', backgroundImage: '' }}
        interests={{ id: '', title: '', subtitle: '', features: [] }}
        experiences={{ id: '', title: '', subtitle: '', experiences: [] }}
        stats={{ id: '', title: '', subtitle: '', stats: [] }}
        logos={{ id: '', title: '', subtitle: '', logos: [] }}
        team={{ id: '', title: '', subtitle: '', team: [] }}
        cta={{
          id: '',
          title: '',
          subtitle: '',
          backgroundImage: '',
          cta: '',
        }}
        testimonials={{
          id: '',
          title: '',
          subtitle: '',
          testimonials: [{ quote: '', author: '', position: '' }],
        }}
        blogs={{
          id: '',
          title: '',
          subtitle: '',
          blogs: [],
        }}
        newsletter={{ id: '', title: '', subtitle: '' }}
      />
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
