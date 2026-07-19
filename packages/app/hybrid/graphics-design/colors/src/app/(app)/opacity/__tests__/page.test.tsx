import { render, screen } from '@testing-library/react';
import Page from '../page';

jest.mock('next/navigation', () => ({
  usePathname: () => '/opacity/',
}));

describe('OpacityPage', () => {
  it('renders the page with its heading and description', () => {
    render(<Page />);
    expect(
      screen.getByRole('heading', { name: 'Opacity Overlay' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('Preview a color over white and black at any alpha')
    ).toBeInTheDocument();
  });

  it('renders the white and black background groups', () => {
    render(<Page />);
    expect(screen.getByText('On white')).toBeInTheDocument();
    expect(screen.getByText('On black')).toBeInTheDocument();
  });

  it('renders opacity percentage swatches', () => {
    render(<Page />);
    expect(screen.getAllByText('100%').length).toBeGreaterThan(0);
    expect(screen.getAllByText('50%').length).toBeGreaterThan(0);
    expect(screen.getAllByText('10%').length).toBeGreaterThan(0);
  });
});
