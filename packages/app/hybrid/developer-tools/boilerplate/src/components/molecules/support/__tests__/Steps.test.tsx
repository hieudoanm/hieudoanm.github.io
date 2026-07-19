import { render, screen } from '@testing-library/react';
import { Steps } from '../Steps';

describe('Steps', () => {
  const steps = [
    { label: 'Account', description: 'Create it' },
    { label: 'Payment', description: 'Pay it' },
    { label: 'Done' },
  ];

  it('marks completed and current steps', () => {
    const { container } = render(<Steps steps={steps} current={1} />);
    expect(container.querySelector('[aria-current="step"]')).toHaveTextContent(
      'Payment'
    );
    expect(container.querySelectorAll('.step-primary')).toHaveLength(2);
  });

  it('renders step labels and descriptions', () => {
    render(<Steps steps={steps} current={0} />);
    expect(screen.getByText('Account')).toBeInTheDocument();
    expect(screen.getByText('Create it')).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();
  });
});
