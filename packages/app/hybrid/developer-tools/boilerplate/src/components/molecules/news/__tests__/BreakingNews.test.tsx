import { render, screen } from '@testing-library/react';
import { BreakingNews } from '../BreakingNews';

describe('BreakingNews', () => {
  it('renders the headline and default tag', () => {
    render(<BreakingNews headline="Markets plunge on rate fears" />);
    expect(
      screen.getByText('Markets plunge on rate fears')
    ).toBeInTheDocument();
    expect(screen.getByText('Breaking')).toBeInTheDocument();
  });

  it('renders a custom tag', () => {
    render(<BreakingNews headline="Quake hits" tag="Urgent" />);
    expect(screen.getByText('Urgent')).toBeInTheDocument();
  });

  it('renders headline as a link when href is provided', () => {
    render(<BreakingNews headline="Storm alert" href="/alerts/storm" />);
    expect(screen.getByRole('link', { name: 'Storm alert' })).toHaveAttribute(
      'href',
      '/alerts/storm'
    );
  });

  it('shows live indicator when live is true', () => {
    const { container } = render(<BreakingNews headline="Live event" live />);
    expect(container.querySelector('.loading-dots')).toBeInTheDocument();
  });
});
