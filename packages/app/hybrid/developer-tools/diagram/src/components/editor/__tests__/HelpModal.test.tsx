import { fireEvent, render, screen } from '@testing-library/react';
import HelpModal from '@/components/editor/HelpModal';

describe('HelpModal', () => {
  it('renders nothing when closed', () => {
    const { container } = render(
      <HelpModal onClose={jest.fn()} open={false} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('documents the syntax and closes', () => {
    const onClose = jest.fn();
    render(<HelpModal onClose={onClose} open />);
    expect(screen.getByText('Diagram syntax')).toBeInTheDocument();
    expect(screen.getByText(/node <id>:/)).toBeInTheDocument();
    expect(screen.getByText(/edge <from>/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Close help' }));
    expect(onClose).toHaveBeenCalled();
  });
});
