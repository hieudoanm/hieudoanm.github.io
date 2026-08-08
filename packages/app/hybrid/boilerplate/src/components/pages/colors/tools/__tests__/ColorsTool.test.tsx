import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { ThemeEditorLayout } from '@/layout';
import { ColorsTool } from '../ColorsTool';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('ColorsTool', () => {
  it('renders swatches from the theme context', () => {
    render(
      <ThemeEditorLayout>
        <ColorsTool />
      </ThemeEditorLayout>
    );
    const tool = within(screen.getByTestId('colors-tool'));
    expect(tool.getByText('Primary')).toBeInTheDocument();
    expect(tool.getByText('Primary Content')).toBeInTheDocument();
    expect(tool.getByText('Base Content')).toBeInTheDocument();
    expect(tool.getAllByText('#ff0030').length).toBeGreaterThan(0);
    expect(tool.getAllByText('#000000').length).toBeGreaterThan(0);
  });

  it('copies the CSS variable on swatch click', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });

    render(
      <ThemeEditorLayout>
        <ColorsTool />
      </ThemeEditorLayout>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Copy Primary' }));

    await waitFor(() =>
      expect(writeText).toHaveBeenCalledWith('--color-primary: #ff0030')
    );
  });

  it('reports the picked hex value', () => {
    const onPick = jest.fn();
    render(
      <ThemeEditorLayout>
        <ColorsTool onPick={onPick} />
      </ThemeEditorLayout>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Copy Primary' }));
    expect(onPick).toHaveBeenCalledWith('#ff0030');
  });
});
