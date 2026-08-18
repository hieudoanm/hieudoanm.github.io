import { render, screen } from '@testing-library/react';
import ManagerPage from '../(app)/manager/page';

jest.mock('@/components/organisms/SquadManager', () => ({
  SquadManager: () => <div>SquadManager</div>,
}));

describe('ManagerPage', () => {
  it('renders the app title and nav links', () => {
    render(<ManagerPage />);
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
    render(<ManagerPage />);
    expect(screen.getByText('SquadManager')).toBeInTheDocument();
  });
});
