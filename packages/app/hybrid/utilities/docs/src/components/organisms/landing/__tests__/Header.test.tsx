import { fireEvent, render, screen } from '@testing-library/react';
import { Header } from '../Header';

describe('Header', () => {
  it('to match snapshot', () => {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });

  it('renders brand name', () => {
    render(<Header />);
    expect(screen.getByText('DaisyX')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Header />);
    expect(screen.getByText('Components')).toBeInTheDocument();
    expect(screen.getByText('Forms')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();
  });

  it('renders sign in and get started buttons', () => {
    render(<Header />);
    expect(
      screen.getByRole('button', { name: /sign in/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /get started/i })
    ).toBeInTheDocument();
  });

  it('calls onSignInClick when sign in clicked', () => {
    const onClick = jest.fn();
    render(<Header onSignInClick={onClick} />);
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('calls onGetStartedClick when get started clicked', () => {
    const onClick = jest.fn();
    render(<Header onGetStartedClick={onClick} />);
    fireEvent.click(screen.getByRole('button', { name: /get started/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
