import { render, screen } from '@testing-library/react';
import VersionPage from '../page';

describe('VersionPage', () => {
  it('renders segments', () => {
    render(<VersionPage />);
    expect(screen.getByText('Year')).toBeInTheDocument();
  });
});
