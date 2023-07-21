import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ContactPage from '../../pages/contact';

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

describe('ContactPage', () => {
  test('render default', () => {
    const wrapper = render(
      <BrowserRouter>
        <ContactPage
          data={{
            site: {
              siteMetadata: {
                about: {
                  hero: {
                    id: 'id',
                    title: 'title',
                    subtitle: 'subtitle',
                    backgroundImage: '',
                  },
                },
                contact: {
                  contact: { id: 'id', title: 'title' },
                  pricing: {
                    id: 'id',
                    title: 'title',
                    subtitle: 'subtitle',
                    plans: [],
                  },
                },
              },
            },
          }}
        />
      </BrowserRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
