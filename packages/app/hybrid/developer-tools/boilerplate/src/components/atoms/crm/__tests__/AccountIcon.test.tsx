import { render, screen } from '@testing-library/react';
import { AccountIcon } from '../AccountIcon';

describe('AccountIcon', () => {
  it('renders an svg icon', () => {
    render(<AccountIcon name="Acme Inc" />);
    expect(screen.getByTestId('account-icon')).toBeInTheDocument();
  });

  it('labels the icon with the account name', () => {
    render(<AccountIcon name="Acme Inc" />);
    expect(screen.getByLabelText('Acme Inc')).toBeInTheDocument();
  });

  it('applies size classes', () => {
    const { container } = render(<AccountIcon name="Acme Inc" size="lg" />);
    expect(container.querySelector('.avatar')).toHaveClass('w-12');
  });
});
