import { fireEvent, render, screen } from '@testing-library/react';
import { CaseToolbar } from '@/components/editor/CaseToolbar';

describe('CaseToolbar', () => {
  it('renders all case buttons', () => {
    render(<CaseToolbar caseKind={null} onCaseChange={jest.fn()} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(6);
  });

  it('calls onCaseChange with the kind when a button is clicked', () => {
    const onCaseChange = jest.fn();
    render(<CaseToolbar caseKind={null} onCaseChange={onCaseChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Case UPPER' }));
    expect(onCaseChange).toHaveBeenCalledWith('upper');
  });

  it('calls onCaseChange with null to deselect the active kind', () => {
    const onCaseChange = jest.fn();
    render(<CaseToolbar caseKind="upper" onCaseChange={onCaseChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Case UPPER' }));
    expect(onCaseChange).toHaveBeenCalledWith(null);
  });

  it('highlights the active case button', () => {
    render(<CaseToolbar caseKind="title" onCaseChange={jest.fn()} />);
    const btn = screen.getByRole('button', { name: 'Title case' });
    expect(btn.className).toContain('btn-primary');
  });

  it('does not highlight inactive buttons', () => {
    render(<CaseToolbar caseKind="upper" onCaseChange={jest.fn()} />);
    const btn = screen.getByRole('button', { name: 'Case lower' });
    expect(btn.className).toContain('btn-ghost');
  });
});
