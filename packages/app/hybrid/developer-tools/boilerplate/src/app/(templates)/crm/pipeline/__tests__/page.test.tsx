import { render, screen } from '@testing-library/react';
import PipelinePage from '@/app/(templates)/crm/pipeline/page';

describe('PipelinePage', () => {
  it('renders the PipelinePage', () => {
    render(<PipelinePage />);
    expect(screen.getByText('7 deals')).toBeInTheDocument();
  });
});
