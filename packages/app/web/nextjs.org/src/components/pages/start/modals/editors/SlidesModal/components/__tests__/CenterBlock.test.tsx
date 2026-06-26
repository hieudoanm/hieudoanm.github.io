import { render, screen } from '@testing-library/react';
import { CenterBlock } from '../CenterBlock';

jest.mock('../TextBlock', () => ({
  TextBlock: ({ text }: { text: string }) => <span>{text}</span>,
}));

describe('CenterBlock', () => {
  it('renders title block', () => {
    render(<CenterBlock block={{ type: 'title', text: 'Title Text' }} />);
    expect(screen.getByText('Title Text')).toBeInTheDocument();
  });

  it('renders subtitle block', () => {
    render(<CenterBlock block={{ type: 'subtitle', text: 'Subtitle Text' }} />);
    expect(screen.getByText('Subtitle Text')).toBeInTheDocument();
  });

  it('renders text block', () => {
    render(<CenterBlock block={{ type: 'text', text: 'Plain Text' }} />);
    expect(screen.getByText('Plain Text')).toBeInTheDocument();
  });

  it('renders pricing-plan block', () => {
    render(
      <CenterBlock
        block={{
          type: 'pricing-plan' as const,
          name: 'Pro',
          price: '$29/mo',
          frequency: 'monthly',
        }}
      />
    );
    expect(screen.getByText('Pro')).toBeInTheDocument();
    expect(screen.getByText('$29/mo')).toBeInTheDocument();
  });

  it('returns null for bullets type', () => {
    const { container } = render(
      <CenterBlock block={{ type: 'bullets', items: [] }} />
    );
    expect(container.innerHTML).toBe('');
  });

  it('returns null for highlight type', () => {
    const { container } = render(
      <CenterBlock block={{ type: 'highlight', text: 'Highlight' }} />
    );
    expect(container.innerHTML).toBe('');
  });
});
