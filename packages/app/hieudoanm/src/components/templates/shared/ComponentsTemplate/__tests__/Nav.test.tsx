import { fireEvent, render, screen } from '@testing-library/react';
import { Nav } from '../Nav';

describe('Nav', () => {
  it('renders brand name', () => {
    render(<Nav />);
    expect(screen.getByText('DaisyX')).toBeInTheDocument();
  });

  it('renders nav links', () => {
    render(<Nav />);
    expect(screen.getByText('Components')).toBeInTheDocument();
    expect(screen.getByText('Forms')).toBeInTheDocument();
    expect(screen.getByText('Feedback')).toBeInTheDocument();
    expect(screen.getByText('Navigation')).toBeInTheDocument();
    expect(screen.getByText('Cards')).toBeInTheDocument();
    expect(screen.getByText('Containers')).toBeInTheDocument();
    expect(screen.getByText('Data')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();
    expect(screen.getByText('Extra')).toBeInTheDocument();
  });

  it('renders theme options', () => {
    render(<Nav />);
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Luxury' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Nothing' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Light' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Dark' })).toBeInTheDocument();
  });

  it('shows active theme', () => {
    render(<Nav theme="light" />);
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('light');
  });

  it('calls onThemeChange with theme name', () => {
    const onChange = jest.fn();
    render(<Nav onThemeChange={onChange} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'dark' } });
    expect(onChange).toHaveBeenCalledWith('dark');
  });

  it('renders sign in and get started buttons', () => {
    render(<Nav />);
    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.getByText('Get started')).toBeInTheDocument();
  });

  it('to match snapshot', () => {
    const { container } = render(<Nav />);
    expect(container).toMatchSnapshot();
  });
});
