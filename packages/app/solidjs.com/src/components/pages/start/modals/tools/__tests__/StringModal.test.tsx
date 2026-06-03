import { render, screen, fireEvent } from '@solidjs/testing-library';
import { StringModal } from '../StringModal';

Object.assign(navigator, { clipboard: { writeText: vi.fn() } });

describe('StringModal', () => {
  it('renders the formatting style selector', () => {
    render(() => <StringModal onClose={() => {}} />);
    expect(screen.getByText(/Formatting style/)).toBeInTheDocument();
  });

  it('renders style options', () => {
    render(() => <StringModal onClose={() => {}} />);
    expect(screen.getByText('Capitalise')).toBeInTheDocument();
    expect(screen.getByText('deburr')).toBeInTheDocument();
    expect(screen.getByText('kebab-case')).toBeInTheDocument();
    expect(screen.getByText('lowercase')).toBeInTheDocument();
    expect(screen.getByText('snake_case')).toBeInTheDocument();
    expect(screen.getByText('UPPERCASE')).toBeInTheDocument();
  });

  it('renders Input and Output labels', () => {
    render(() => <StringModal onClose={() => {}} />);
    expect(screen.getByText('Input')).toBeInTheDocument();
    expect(screen.getByText('Output')).toBeInTheDocument();
  });

  it('renders Copy button', () => {
    render(() => <StringModal onClose={() => {}} />);
    expect(screen.getByText('Copy')).toBeInTheDocument();
  });
});
