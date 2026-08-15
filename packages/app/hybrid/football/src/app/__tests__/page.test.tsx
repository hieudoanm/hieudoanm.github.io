import { render, screen } from '@testing-library/react';
import HomePage from '../page';

jest.mock('@/components/organisms/SquadManager', () => ({
  SquadManager: () => <div>SquadManager</div>,
}));

describe('HomePage', () => {
  it('renders the app title and nav links', () => {
    render(<HomePage />);
    expect(
      screen.getByRole('heading', { name: 'Football Manager' })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute(
      'href',
      '/about'
    );
    expect(screen.getByRole('link', { name: 'Downloads' })).toHaveAttribute(
      'href',
      '/downloads'
    );
    expect(screen.getByRole('link', { name: 'Version' })).toHaveAttribute(
      'href',
      '/version'
    );
  });

  it('renders the squad manager', () => {
    render(<HomePage />);
    expect(screen.getByText('SquadManager')).toBeInTheDocument();
  });
});
