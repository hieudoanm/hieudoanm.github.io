import { render, screen } from '@testing-library/react';
import { ThemeEditorLayout } from '@/layout';
import ColorsRoute from '../page';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('ColorsRoute', () => {
  it('renders the colors page under the theme layout', () => {
    render(
      <ThemeEditorLayout>
        <ColorsRoute />
      </ThemeEditorLayout>
    );
    expect(screen.getByTestId('colors-page')).toBeInTheDocument();
  });
});
