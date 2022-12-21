import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import About from './index';

jest.mock('gatsby', () => {
  return {
    graphql: jest.fn(),
    Link: jest.fn().mockImplementation(
      // these props are invalid for an `a` tag
      ({ to, ...rest }: { to: string }) =>
        React.createElement('a', {
          ...rest,
          href: to,
        })
    ),
  };
});

describe('About', () => {
  test('render default', () => {
    const wrapper = render(
      <BrowserRouter>
        <About
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
      </BrowserRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
