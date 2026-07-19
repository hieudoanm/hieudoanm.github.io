import { render, screen } from '@testing-library/react';
import VersionPage from '../page';

describe('VersionPage', () => {
  it('renders the current deployment version', () => {
    render(<VersionPage />);
    expect(screen.getByText('Current deployment')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Copy version' })
    ).toBeInTheDocument();
    expect(screen.getByText('Year')).toBeInTheDocument();
  });
});
