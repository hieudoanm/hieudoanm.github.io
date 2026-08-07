import { fireEvent, render, screen, within } from '@testing-library/react';
import { BreakingNewsTemplate } from '../BreakingNewsTemplate';
import { ArticleTemplate } from '../ArticleTemplate';
import { EditorialTemplate } from '../EditorialTemplate';
import { NewsCategoriesTemplate } from '../NewsCategoriesTemplate';
import { NewsletterSignupTemplate } from '../NewsletterSignupTemplate';
import { PressReleasesTemplate } from '../PressReleasesTemplate';
import { MagazineGridTemplate } from '../MagazineGridTemplate';
import { OpinionTemplate } from '../OpinionTemplate';
import BreakingNewsPage from '@/app/(main)/news/breaking/page';
import ArticlePage from '@/app/(main)/news/article/page';
import EditorialPage from '@/app/(main)/news/editorial/page';
import NewsCategoriesPage from '@/app/(main)/news/categories/page';
import NewsletterSignupPage from '@/app/(main)/news/newsletter/page';
import PressReleasesPage from '@/app/(main)/news/press/page';
import MagazineGridPage from '@/app/(main)/news/magazine/page';
import OpinionPage from '@/app/(main)/news/opinion/page';

describe('BreakingNewsTemplate', () => {
  it('renders stories with sources, times, and badges', () => {
    render(<BreakingNewsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Breaking News' })
    ).toBeInTheDocument();
    expect(screen.getByText('6 stories')).toBeInTheDocument();
    expect(
      screen.getByText('Markets rally as central banks signal rate cuts')
    ).toBeInTheDocument();
    expect(screen.getByText('Reuters')).toBeInTheDocument();
    expect(screen.getAllByText('2h ago')).toHaveLength(2);
    expect(screen.getAllByText('Verified')).toHaveLength(3);
    const storyCard = screen
      .getByText('Quantum computing breakthrough unveiled in Zurich')
      .closest('article');
    expect(
      within(storyCard as HTMLElement).getByText('Verified')
    ).toBeInTheDocument();
  });

  it('filters stories by category tab', () => {
    render(<BreakingNewsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Tech' }));
    expect(screen.getByText('2 stories')).toBeInTheDocument();
    expect(
      screen.getByText('Solid-state battery promises week-long phone charge')
    ).toBeInTheDocument();
    expect(
      screen.queryByText('Markets rally as central banks signal rate cuts')
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Business' }));
    expect(screen.getByText('2 stories')).toBeInTheDocument();
    expect(
      screen.getByText('Retail giant posts record quarterly revenue')
    ).toBeInTheDocument();
    expect(screen.getAllByText('Verified')).toHaveLength(1);
  });
});

describe('ArticleTemplate', () => {
  it('renders the article with meta and body', () => {
    render(<ArticleTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Article' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('The Future of Urban Transit Is Electric')
    ).toBeInTheDocument();
    expect(screen.getByText('Maya Chen')).toBeInTheDocument();
    expect(screen.getByText('Aug 5, 2026')).toBeInTheDocument();
    expect(screen.getByText('6 min read')).toBeInTheDocument();
    expect(screen.getByText('128 likes')).toBeInTheDocument();
  });

  it('toggles the like count', () => {
    render(<ArticleTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Like' }));
    expect(screen.getByText('129 likes')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Unlike' }));
    expect(screen.getByText('128 likes')).toBeInTheDocument();
  });

  it('toggles the bookmark state', () => {
    render(<ArticleTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Bookmark' }));
    expect(
      screen.getByRole('button', { name: 'Bookmarked' })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Bookmarked' }));
    expect(
      screen.getByRole('button', { name: 'Bookmark' })
    ).toBeInTheDocument();
  });
});

describe('EditorialTemplate', () => {
  it('renders editorial cards with authors and roles', () => {
    render(<EditorialTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Editorial' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 editorials')).toBeInTheDocument();
    expect(
      screen.getByText('A New Approach to Digital Privacy')
    ).toBeInTheDocument();
    expect(screen.getByText('Sarah Okafor')).toBeInTheDocument();
    expect(screen.getByText(/Editor-in-Chief/)).toBeInTheDocument();
    expect(
      screen.getAllByRole('button', { name: 'Read editorial' })
    ).toHaveLength(4);
  });

  it('expands an editorial excerpt', () => {
    render(<EditorialTemplate />);
    fireEvent.click(
      screen.getAllByRole('button', { name: 'Read editorial' })[0]
    );
    expect(
      screen.getByText(/Privacy needs to be designed/)
    ).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Close' })).toHaveLength(1);
    expect(
      screen.getAllByRole('button', { name: 'Read editorial' })
    ).toHaveLength(3);
  });

  it('collapses an editorial excerpt when toggled again', () => {
    render(<EditorialTemplate />);
    fireEvent.click(
      screen.getAllByRole('button', { name: 'Read editorial' })[2]
    );
    expect(
      screen.getByText(/Community newsrooms are closing/)
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(
      screen.queryByText(/Community newsrooms are closing/)
    ).not.toBeInTheDocument();
  });
});

describe('NewsCategoriesTemplate', () => {
  it('renders category tiles with article counts', () => {
    render(<NewsCategoriesTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Categories' })
    ).toBeInTheDocument();
    expect(screen.getByText('6 categories')).toBeInTheDocument();
    expect(screen.getAllByText('Technology')).toHaveLength(2);
    expect(screen.getByText('24 articles')).toBeInTheDocument();
    expect(screen.getByText('42 articles')).toBeInTheDocument();
  });

  it('filters categories by search', () => {
    render(<NewsCategoriesTemplate />);
    fireEvent.change(screen.getByLabelText('Search categories'), {
      target: { value: 'tech' },
    });
    expect(screen.getAllByText('Technology')).toHaveLength(2);
    expect(screen.queryByText('World News')).not.toBeInTheDocument();
    expect(screen.getByText('1 categories')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Search categories'), {
      target: { value: 'health' },
    });
    expect(screen.getByText('15 articles')).toBeInTheDocument();
    expect(screen.getByText('1 categories')).toBeInTheDocument();
  });

  it('shows the empty state when nothing matches', () => {
    render(<NewsCategoriesTemplate />);
    fireEvent.change(screen.getByLabelText('Search categories'), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('No categories found')).toBeInTheDocument();
    expect(screen.getByText('0 categories')).toBeInTheDocument();
  });
});

describe('NewsletterSignupTemplate', () => {
  it('renders the signup form', () => {
    render(<NewsletterSignupTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Newsletter' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: 'Email address' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Subscribe' })
    ).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('shows an error for an empty email', () => {
    render(<NewsletterSignupTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Subscribe' }));
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Enter an email address'
    );
  });

  it('shows an error for an email without @', () => {
    render(<NewsletterSignupTemplate />);
    fireEvent.change(screen.getByRole('textbox', { name: 'Email address' }), {
      target: { value: 'not-an-email' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Subscribe' }));
    expect(screen.getByRole('alert')).toHaveTextContent('Enter a valid email');
  });

  it('shows a success message for a valid email', () => {
    render(<NewsletterSignupTemplate />);
    fireEvent.change(screen.getByRole('textbox', { name: 'Email address' }), {
      target: { value: 'reader@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Subscribe' }));
    expect(screen.getByText('Subscribed')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});

describe('PressReleasesTemplate', () => {
  it('renders press releases with dates and summary', () => {
    render(<PressReleasesTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Press Releases' })
    ).toBeInTheDocument();
    expect(screen.getByText('5 press releases')).toBeInTheDocument();
    expect(
      screen.getByText('Acme Corp Launches Renewable Energy Division')
    ).toBeInTheDocument();
    expect(screen.getByText('Jul 30, 2026')).toBeInTheDocument();
    expect(
      screen.getAllByRole('button', { name: 'Read release' })
    ).toHaveLength(5);
  });

  it('expands a press release summary', () => {
    render(<PressReleasesTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Read release' })[0]);
    expect(
      screen.getByText(/Acme Corp announced a new division/)
    ).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Close' })).toHaveLength(1);
    expect(
      screen.getAllByRole('button', { name: 'Read release' })
    ).toHaveLength(4);
  });
});

describe('MagazineGridTemplate', () => {
  it('renders feature cards with read times', () => {
    render(<MagazineGridTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Magazine' })
    ).toBeInTheDocument();
    expect(screen.getByText('6 features')).toBeInTheDocument();
    expect(screen.getByText('The Silicon Valley Exodus')).toBeInTheDocument();
    expect(screen.getByText('12 min read')).toBeInTheDocument();
    expect(screen.getByText('Priya Raman')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Save' })).toHaveLength(6);
  });

  it('saves a feature card', () => {
    render(<MagazineGridTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Save' })[0]);
    expect(screen.getByRole('button', { name: 'Saved' })).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Save' })).toHaveLength(5);
  });

  it('unsaves a feature card when toggled again', () => {
    render(<MagazineGridTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Save' })[3]);
    fireEvent.click(screen.getByRole('button', { name: 'Saved' }));
    expect(screen.getAllByRole('button', { name: 'Save' })).toHaveLength(6);
  });
});

describe('OpinionTemplate', () => {
  it('renders columns with reactions', () => {
    render(<OpinionTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Opinion' })
    ).toBeInTheDocument();
    expect(screen.getByText('6 columns')).toBeInTheDocument();
    expect(
      screen.getByText('Why We Need Stronger Election Reforms')
    ).toBeInTheDocument();
    expect(screen.getByText('Elena Vasquez')).toBeInTheDocument();
    expect(screen.getByText('Aug 1, 2026')).toBeInTheDocument();
    expect(
      screen.getAllByRole('button', { name: '24 reactions' })
    ).toHaveLength(1);
  });

  it('filters columns by category tab', () => {
    render(<OpinionTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Culture' }));
    expect(screen.getByText('2 columns')).toBeInTheDocument();
    expect(screen.getByText('The Concert Economy Is Back')).toBeInTheDocument();
    expect(
      screen.queryByText('Why We Need Stronger Election Reforms')
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Tech' }));
    expect(screen.getByText('2 columns')).toBeInTheDocument();
    expect(
      screen.getByText('Algorithms Deserve a Human Backstop')
    ).toBeInTheDocument();
  });

  it('increments reactions on click', () => {
    render(<OpinionTemplate />);
    fireEvent.click(screen.getByRole('button', { name: '24 reactions' }));
    expect(
      screen.getByRole('button', { name: '25 reactions' })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: '24 reactions' })
    ).not.toBeInTheDocument();
  });
});

describe('News pages', () => {
  it('renders the BreakingNewsPage', () => {
    render(<BreakingNewsPage />);
    expect(screen.getByText('6 stories')).toBeInTheDocument();
  });

  it('renders the ArticlePage', () => {
    render(<ArticlePage />);
    expect(screen.getByText('128 likes')).toBeInTheDocument();
  });

  it('renders the EditorialPage', () => {
    render(<EditorialPage />);
    expect(screen.getByText('4 editorials')).toBeInTheDocument();
  });

  it('renders the NewsCategoriesPage', () => {
    render(<NewsCategoriesPage />);
    expect(screen.getByText('6 categories')).toBeInTheDocument();
  });

  it('renders the NewsletterSignupPage', () => {
    render(<NewsletterSignupPage />);
    expect(
      screen.getByRole('textbox', { name: 'Email address' })
    ).toBeInTheDocument();
  });

  it('renders the PressReleasesPage', () => {
    render(<PressReleasesPage />);
    expect(screen.getByText('5 press releases')).toBeInTheDocument();
  });

  it('renders the MagazineGridPage', () => {
    render(<MagazineGridPage />);
    expect(screen.getByText('6 features')).toBeInTheDocument();
  });

  it('renders the OpinionPage', () => {
    render(<OpinionPage />);
    expect(screen.getByText('6 columns')).toBeInTheDocument();
  });
});
