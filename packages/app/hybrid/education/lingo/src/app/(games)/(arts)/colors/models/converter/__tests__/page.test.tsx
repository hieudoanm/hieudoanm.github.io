import { render, screen } from '@testing-library/react';
import ConverterPage from '@/app/(games)/(arts)/colors/models/converter/page';

jest.mock('@/games/colors/shared/useClipboard', () => ({
  useClipboard: () => ({ copied: null, copy: jest.fn() }),
}));

describe('ConverterPage', () => {
  it('renders the tool page with a back link and heading', () => {
    render(<ConverterPage />);
    expect(
      screen.getByRole('link', { name: '← Back to Color Models' })
    ).toHaveAttribute('href', '/colors/models');
    expect(
      screen.getByRole('heading', { name: 'Color Converter' })
    ).toBeInTheDocument();
  });
});
