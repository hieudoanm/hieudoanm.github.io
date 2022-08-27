import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AboutPage from '../../pages/about';

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

describe('AboutPage', () => {
  test('render default', () => {
    const wrapper = render(
      <BrowserRouter>
        <AboutPage
          data={{
            site: {
              siteMetadata: {
                about: {
                  cta: {
                    id: 'id',
                    title: 'title',
                    subtitle: 'subtitle',
                    cta: 'cta',
                    backgroundImage: 'backgroundImage',
                  },
                  experiences: {
                    id: 'id',
                    title: 'title',
                    subtitle: 'subtitle',
                    experiences: [],
                  },
                  hero: {
                    id: 'id',
                    title: 'title',
                    subtitle: 'subtitle',
                    backgroundImage: '',
                  },
                  interests: {
                    id: 'id',
                    title: 'title',
                    subtitle: 'subtitle',
                    features: [],
                  },
                  newsletter: {
                    id: 'id',
                    title: 'title',
                    subtitle: 'subtitle',
                  },
                  projects: {
                    id: 'id',
                    title: 'title',
                    subtitle: 'subtitle',
                    logos: [],
                  },
                  stats: {
                    id: 'id',
                    title: 'title',
                    subtitle: 'subtitle',
                    stats: [],
                  },
                  techstack: {
                    id: 'id',
                    title: 'title',
                    subtitle: 'subtitle',
                    team: [],
                  },
                  testimonials: {
                    id: 'id',
                    title: 'title',
                    subtitle: 'subtitle',
                    testimonials: [],
                  },
                },
              },
            },
            allMdx: {
              nodes: [
                {
                  id: 'id',
                  slug: 'slug',
                  frontmatter: {
                    title: 'title',
                    description: 'description',
                    date: 'date',
                  },
                },
              ],
            },
          }}
        />
      </BrowserRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
