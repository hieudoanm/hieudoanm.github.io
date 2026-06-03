import { render, screen, fireEvent } from '@solidjs/testing-library';
import { EmojisModal } from '../EmojisModal';

vi.mock('@hieudoanm.github.io/data/emojis', () => ({
  emojis: { smile: '😊', heart: '❤️', fire: '🔥' },
}));

Object.assign(navigator, { clipboard: { writeText: vi.fn() } });

describe('EmojisModal', () => {
  it('renders search input', () => {
    render(() => <EmojisModal onClose={() => {}} />);
    expect(screen.getByPlaceholderText('Search emoji…')).toBeInTheDocument();
  });

  it('renders emoji count', () => {
    render(() => <EmojisModal onClose={() => {}} />);
    expect(screen.getByText(/emojis?/)).toBeInTheDocument();
  });

  it('renders emoji items', () => {
    render(() => <EmojisModal onClose={() => {}} />);
    expect(screen.getByText('😊')).toBeInTheDocument();
    expect(screen.getByText('❤️')).toBeInTheDocument();
    expect(screen.getByText('🔥')).toBeInTheDocument();
  });

  it('filters emojis based on search query', () => {
    render(() => <EmojisModal onClose={() => {}} />);
    const input = screen.getByPlaceholderText(
      'Search emoji…'
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'heart' } });
    expect(screen.getByText('❤️')).toBeInTheDocument();
    expect(screen.queryByText('🔥')).not.toBeInTheDocument();
  });

  it('shows no emojis message when search has no results', () => {
    render(() => <EmojisModal onClose={() => {}} />);
    const input = screen.getByPlaceholderText(
      'Search emoji…'
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'zzzzz' } });
    expect(screen.getByText('No emojis found.')).toBeInTheDocument();
  });
});
