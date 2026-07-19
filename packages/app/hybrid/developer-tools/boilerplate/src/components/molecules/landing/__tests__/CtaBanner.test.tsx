import { render, screen } from '@testing-library/react';
import { CtaBanner } from '../CtaBanner';

describe('CtaBanner', () => {
  it('renders the title and description', () => {
    render(
      <CtaBanner
        title="Ready to start?"
        description="Join thousands of teams."
      />
    );
    expect(screen.getByText('Ready to start?')).toBeInTheDocument();
    expect(screen.getByText('Join thousands of teams.')).toBeInTheDocument();
  });

  it('renders default action buttons', () => {
    render(<CtaBanner title="Ready to start?" />);
    expect(
      screen.getByRole('button', { name: 'Get started' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Learn more' })
    ).toBeInTheDocument();
  });

  it('renders custom action labels', () => {
    render(
      <CtaBanner
        title="Ready to start?"
        primaryLabel="Sign up"
        secondaryLabel="Talk to sales"
      />
    );
    expect(screen.getByRole('button', { name: 'Sign up' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Talk to sales' })
    ).toBeInTheDocument();
  });
});
