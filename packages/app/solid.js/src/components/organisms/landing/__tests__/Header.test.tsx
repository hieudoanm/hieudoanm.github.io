import { render, screen, fireEvent } from '@solidjs/testing-library';
import { Header } from '../Header';

describe('Header', () => {
  it('renders brand name', () => {
    render(() => <Header />);
    expect(screen.getByText('Forma')).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    render(() => <Header />);
    expect(screen.getByText('Components')).toBeInTheDocument();
    expect(screen.getByText('Forms')).toBeInTheDocument();
    expect(screen.getByText('Feedback')).toBeInTheDocument();
    expect(screen.getByText('Navigation')).toBeInTheDocument();
    expect(screen.getByText('Data')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();
  });

  it('renders sign in button', () => {
    render(() => <Header />);
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('renders get started button', () => {
    render(() => <Header />);
    expect(screen.getByText('Get started')).toBeInTheDocument();
  });

  it('calls onSignInClick when sign in is clicked', () => {
    const onSignInClick = vi.fn();
    render(() => <Header onSignInClick={onSignInClick} />);
    fireEvent.click(screen.getByText('Sign in'));
    expect(onSignInClick).toHaveBeenCalledOnce();
  });

  it('calls onGetStartedClick when get started is clicked', () => {
    const onGetStartedClick = vi.fn();
    render(() => <Header onGetStartedClick={onGetStartedClick} />);
    fireEvent.click(screen.getByText('Get started'));
    expect(onGetStartedClick).toHaveBeenCalledOnce();
  });

  it('uses navbar class', () => {
    const { container } = render(() => <Header />);
    expect(container.querySelector('.navbar')).toBeInTheDocument();
  });
});
