import GdpExplorerPage from '@/app/(games)/gdp-and-national-accounts/aggregate/page';
import { render, screen } from '@testing-library/react';

describe('GdpExplorerPage', () => {
  it('renders the GDP explorer game', () => {
    render(<GdpExplorerPage />);
    expect(
      screen.getByRole('heading', { name: /GDP Explorer/ })
    ).toBeInTheDocument();
    expect(screen.getByTestId('consumption')).toBeInTheDocument();
    expect(screen.getByTestId('gdp-output')).toBeInTheDocument();
  });
});
