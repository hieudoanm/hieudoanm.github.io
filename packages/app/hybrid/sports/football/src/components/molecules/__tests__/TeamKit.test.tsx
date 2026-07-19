import { fireEvent, render, screen } from '@testing-library/react';
import { TeamKit } from '@/components/molecules/TeamKit';

describe('TeamKit', () => {
  it('shows the current kit colour on the preview shirt', () => {
    render(<TeamKit value="#2563eb" onChange={jest.fn()} />);
    const input = screen.getByLabelText('Kit colour');
    expect(input).toHaveValue('#2563eb');
  });

  it('calls onChange when a preset swatch is picked', () => {
    const onChange = jest.fn();
    render(<TeamKit value="#dc2626" onChange={onChange} />);
    fireEvent.click(screen.getByLabelText('Kit colour blue'));
    expect(onChange).toHaveBeenCalledWith('#2563eb');
  });

  it('marks the active preset swatch as pressed', () => {
    render(<TeamKit value="#2563eb" onChange={jest.fn()} />);
    expect(screen.getByLabelText('Kit colour blue')).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(screen.getByLabelText('Kit colour red')).toHaveAttribute(
      'aria-pressed',
      'false'
    );
  });

  it('calls onChange with a custom colour from the picker', () => {
    const onChange = jest.fn();
    render(<TeamKit value="#dc2626" onChange={onChange} />);
    fireEvent.change(screen.getByLabelText('Kit colour'), {
      target: { value: '#0d9488' },
    });
    expect(onChange).toHaveBeenCalledWith('#0d9488');
  });
});
