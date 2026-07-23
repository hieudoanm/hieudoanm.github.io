import { render, screen } from '@testing-library/react';
import { DemoModal } from '../DemoModal';

describe('DemoModal', () => {
  it('renders modal heading', () => {
    render(<DemoModal />);
    expect(screen.getByText('Modal component')).toBeInTheDocument();
  });

  it('renders modal description', () => {
    render(<DemoModal />);
    expect(
      screen.getByText(/traps focus, supports Escape/)
    ).toBeInTheDocument();
  });

  it('renders action buttons', () => {
    render(<DemoModal />);
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });

  it('to match snapshot', () => {
    const { container } = render(<DemoModal />);
    expect(container).toMatchSnapshot();
  });
});
