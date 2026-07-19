import { render, screen } from '@testing-library/react';
import KnowledgeBasePage from '@/app/(templates)/support/knowledge-base/page';

describe('KnowledgeBasePage', () => {
  it('renders the KnowledgeBasePage', () => {
    render(<KnowledgeBasePage />);
    expect(screen.getByText('6 articles')).toBeInTheDocument();
  });
});
