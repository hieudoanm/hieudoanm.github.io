import { render, screen, fireEvent } from '@testing-library/react';
import { PanelHeader } from '@/components/pos/molecules/PanelHeader';

describe('PanelHeader', () => {
  it('renders the title', () => {
    render(<PanelHeader title="Inventory" onBack={jest.fn()} />);
    expect(screen.getByText('Inventory')).toBeInTheDocument();
  });

  it('calls onBack when the back button is pressed', () => {
    const onBack = jest.fn();
    render(<PanelHeader title="Inventory" onBack={onBack} />);
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it('renders a text back label when provided', () => {
    render(<PanelHeader title="Payment" onBack={jest.fn()} backLabel="Back" />);
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument();
  });

  it('renders trailing content', () => {
    render(
      <PanelHeader title="Reports" onBack={jest.fn()}>
        <span>3 transactions</span>
      </PanelHeader>
    );
    expect(screen.getByText('3 transactions')).toBeInTheDocument();
  });
});
