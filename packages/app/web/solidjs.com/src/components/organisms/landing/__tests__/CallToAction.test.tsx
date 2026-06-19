import { render, screen, fireEvent } from '@solidjs/testing-library';
import { CallToAction } from '../CallToAction';

describe('CallToAction', () => {
  it('renders heading', () => {
    render(() => <CallToAction />);
    expect(screen.getByText('Ready to build?')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(() => <CallToAction />);
    expect(screen.getByText(/Start building with Forma/)).toBeInTheDocument();
  });

  it('renders start building button', () => {
    render(() => <CallToAction />);
    expect(screen.getByText('Start building')).toBeInTheDocument();
  });

  it('calls onStartClick when button is clicked', () => {
    const onStartClick = vi.fn();
    render(() => <CallToAction onStartClick={onStartClick} />);
    fireEvent.click(screen.getByText('Start building'));
    expect(onStartClick).toHaveBeenCalledOnce();
  });
});
