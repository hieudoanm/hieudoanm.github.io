import { fireEvent, render, screen } from '@testing-library/react';
import { KnowledgeBaseTemplate } from '../KnowledgeBaseTemplate';

describe('KnowledgeBaseTemplate', () => {
  it('renders articles with read times and the summary', () => {
    render(<KnowledgeBaseTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Knowledge Base' })
    ).toBeInTheDocument();
    expect(screen.getByText('6 articles')).toBeInTheDocument();
    expect(
      screen.getByText('Getting started with your account')
    ).toBeInTheDocument();
    expect(screen.getByText('4 min read')).toBeInTheDocument();
    expect(
      screen.getByText('Manage notification preferences')
    ).toBeInTheDocument();
    expect(screen.getByText('7 min read')).toBeInTheDocument();
  });

  it('filters articles by category', () => {
    render(<KnowledgeBaseTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Billing' }));
    expect(screen.getByText('Understanding your invoice')).toBeInTheDocument();
    expect(screen.getByText('How refunds work')).toBeInTheDocument();
    expect(
      screen.queryByText('Getting started with your account')
    ).not.toBeInTheDocument();
    expect(screen.getByText('2 articles')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Account' }));
    expect(screen.getByText('Update your profile')).toBeInTheDocument();
    expect(screen.queryByText('How refunds work')).not.toBeInTheDocument();
  });

  it('searches articles and shows the empty state', () => {
    render(<KnowledgeBaseTemplate />);
    fireEvent.change(screen.getByLabelText('Search articles'), {
      target: { value: 'refunds' },
    });
    expect(screen.getByText('How refunds work')).toBeInTheDocument();
    expect(screen.queryByText('Update your profile')).not.toBeInTheDocument();
    expect(screen.getByText('1 articles')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Search articles'), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('No articles found')).toBeInTheDocument();
    expect(screen.getByText('0 articles')).toBeInTheDocument();
  });
});
