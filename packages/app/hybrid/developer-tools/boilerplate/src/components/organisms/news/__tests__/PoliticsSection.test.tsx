import { render, screen } from '@testing-library/react';
import { PoliticsSection } from '../PoliticsSection';

const lead = {
  title: 'Senate passes budget bill',
  category: 'National',
  imageAlt: 'Senate floor',
};

const articles = [
  {
    title: 'Governors meet on transit',
    category: 'State',
    imageAlt: 'Statehouse',
  },
  {
    title: 'Campaign finance reform',
    category: 'National',
    imageAlt: 'Briefing room',
  },
];

describe('PoliticsSection', () => {
  it('renders the lead story and supporting articles', () => {
    render(<PoliticsSection lead={lead} articles={articles} />);
    expect(screen.getByText('Senate passes budget bill')).toBeInTheDocument();
    expect(screen.getByText('Governors meet on transit')).toBeInTheDocument();
    expect(screen.getByText('Campaign finance reform')).toBeInTheDocument();
  });

  it('renders article categories', () => {
    render(<PoliticsSection lead={lead} articles={articles} />);
    expect(screen.getAllByText('National')).toHaveLength(2);
    expect(screen.getByText('State')).toBeInTheDocument();
  });

  it('renders poll question when provided', () => {
    render(
      <PoliticsSection
        lead={lead}
        articles={articles}
        poll={{ question: 'Do you approve?', yes: 60, no: 40 }}
      />
    );
    expect(screen.getByText('Do you approve?')).toBeInTheDocument();
    expect(screen.getByText('60')).toBeInTheDocument();
    expect(screen.getByText('40')).toBeInTheDocument();
  });

  it('renders without a poll', () => {
    render(<PoliticsSection lead={lead} articles={articles} />);
    expect(screen.queryByText('Do you approve?')).not.toBeInTheDocument();
  });
});
