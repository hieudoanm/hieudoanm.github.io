import { fireEvent, render, screen } from '@testing-library/react';
import { QuickActions } from '../QuickActions';

const actions = [
  { id: 'new', label: 'New document', variant: 'primary' as const },
  { id: 'import', label: 'Import', variant: 'outline' as const },
];

describe('QuickActions', () => {
  it('renders action labels', () => {
    render(<QuickActions actions={actions} />);
    expect(screen.getByText('New document')).toBeInTheDocument();
    expect(screen.getByText('Import')).toBeInTheDocument();
  });

  it('fires onAction with the action id', () => {
    const onAction = jest.fn();
    render(<QuickActions actions={actions} onAction={onAction} />);
    fireEvent.click(screen.getByTestId('quick-action-import'));
    expect(onAction).toHaveBeenCalledWith('import');
  });

  it('applies the variant class', () => {
    render(<QuickActions actions={actions} />);
    expect(screen.getByTestId('quick-action-new')).toHaveClass('btn-primary');
    expect(screen.getByTestId('quick-action-import')).toHaveClass(
      'btn-outline'
    );
  });
});
