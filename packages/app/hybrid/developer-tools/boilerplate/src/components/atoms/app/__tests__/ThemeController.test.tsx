import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeController } from '../ThemeController';

describe('ThemeController', () => {
  it('renders a checkbox with the theme-controller class and value', () => {
    render(<ThemeController theme="dark" label="Dark" />);
    const input = screen.getByLabelText('Dark');
    expect(input).toHaveClass('theme-controller');
    expect(input).toHaveAttribute('value', 'dark');
  });

  it('notifies changes with the checked state and theme', () => {
    const onChange = jest.fn();
    render(<ThemeController theme="dark" onChange={onChange} />);
    const input = document.querySelector(
      '.theme-controller'
    ) as HTMLInputElement;
    fireEvent.click(input);
    expect(onChange).toHaveBeenCalledWith(true, 'dark');
  });

  it('respects the checked prop', () => {
    render(<ThemeController theme="dark" checked />);
    expect(document.querySelector('.theme-controller')).toBeChecked();
  });
});
