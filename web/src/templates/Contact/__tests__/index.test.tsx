import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ContactTemplate from '..';

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

describe('Contact', () => {
  test('render default', () => {
    const wrapper = render(
      <BrowserRouter>
        <>
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
        </>
      </BrowserRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
