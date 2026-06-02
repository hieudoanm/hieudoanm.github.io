import { render, screen, fireEvent } from '@solidjs/testing-library';
import { ProxyModal } from '../ProxyModal';

Object.assign(navigator, { clipboard: { writeText: vi.fn() } });

describe('ProxyModal', () => {
  it('renders the URL input', () => {
    render(() => <ProxyModal onClose={() => {}} />);
    const input = screen.getByPlaceholderText(
      'https://api.example.com/data'
    ) as HTMLInputElement;
    expect(input).toBeInTheDocument();
  });

  it('renders all four tab buttons', () => {
    render(() => <ProxyModal onClose={() => {}} />);
    expect(screen.getByText('curl')).toBeInTheDocument();
    expect(screen.getByText('fetch')).toBeInTheDocument();
    expect(screen.getByText('axios')).toBeInTheDocument();
    expect(screen.getByText('TanStack Query')).toBeInTheDocument();
  });

  it('renders curl snippet by default', () => {
    render(() => <ProxyModal onClose={() => {}} />);
    const pre = document.querySelector('pre');
    expect(pre?.textContent).toContain('curl');
  });

  it('shows Copy button', () => {
    render(() => <ProxyModal onClose={() => {}} />);
    expect(screen.getByText('Copy')).toBeInTheDocument();
  });
});
