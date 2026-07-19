import { render, screen } from '@testing-library/react';
import { QuoteShowcase } from '../QuoteShowcase';

describe('QuoteShowcase', () => {
  it('renders quotes with authors and roles', () => {
    render(
      <QuoteShowcase
        quotes={[
          {
            id: '1',
            text: 'Quality is a journey.',
            author: 'Ada',
            role: 'Engineer',
          },
        ]}
      />
    );
    expect(screen.getByText('What people say')).toBeInTheDocument();
    expect(screen.getByText('Quality is a journey.')).toBeInTheDocument();
    expect(screen.getByText('Ada')).toBeInTheDocument();
  });

  it('renders quotes without author metadata', () => {
    render(<QuoteShowcase quotes={[{ id: '1', text: 'Just words.' }]} />);
    expect(screen.getByText('Just words.')).toBeInTheDocument();
  });
});
