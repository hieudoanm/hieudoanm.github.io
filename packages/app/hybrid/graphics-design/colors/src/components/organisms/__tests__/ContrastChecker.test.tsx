import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContrastChecker } from '../ContrastChecker';

describe('ContrastChecker', () => {
  it('renders Foreground and Background fields', () => {
    render(<ContrastChecker baseColor="#ffffff" />);
    expect(
      screen.getByLabelText('Foreground color picker')
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText('Background color picker')
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Foreground hex value')).toBeInTheDocument();
    expect(screen.getByLabelText('Background hex value')).toBeInTheDocument();
  });

  it('renders the contrast preview', () => {
    render(<ContrastChecker baseColor="#ffffff" />);
    expect(screen.getByLabelText('Contrast preview')).toBeInTheDocument();
  });

  it('displays a contrast ratio value', () => {
    render(<ContrastChecker baseColor="#ffffff" />);
    expect(screen.getByText(/:\s*1$/)).toBeInTheDocument();
  });

  it('renders AA and AAA Pass/Fail badges', () => {
    render(<ContrastChecker baseColor="#ffffff" />);
    expect(screen.getByText('AA Normal text')).toBeInTheDocument();
    expect(screen.getByText('AA Large text')).toBeInTheDocument();
    expect(screen.getByText('AAA Normal text')).toBeInTheDocument();
    expect(screen.getByText('AAA Large text')).toBeInTheDocument();
  });

  it('renders the TheoryNote about Contrast and WCAG', () => {
    render(<ContrastChecker baseColor="#ffffff" />);
    expect(screen.getByText('Contrast and WCAG')).toBeInTheDocument();
  });

  it('renders the container with data-testid', () => {
    render(<ContrastChecker baseColor="#6366f1" />);
    expect(screen.getByTestId('contrast-checker')).toBeInTheDocument();
  });

  it('changes the background color via its picker', () => {
    render(<ContrastChecker baseColor="#ffffff" />);
    const picker = screen.getByLabelText('Background color picker');
    fireEvent.change(picker, { target: { value: '#123456' } });
    expect(screen.getByLabelText('Background color picker')).toHaveValue(
      '#123456'
    );
  });

  it('updates the foreground hex value on Enter', async () => {
    const user = userEvent.setup();
    render(<ContrastChecker baseColor="#ffffff" />);
    const input = screen.getByLabelText('Foreground hex value');
    await user.clear(input);
    await user.type(input, '#000000');
    await user.keyboard('{Enter}');
    expect(screen.getByLabelText('Foreground hex value')).toHaveValue(
      '#000000'
    );
  });
});
