import { fireEvent, render, screen } from '@testing-library/react';
import { TagInput } from '../TagInput';

describe('TagInput', () => {
  it('renders tags with remove buttons', () => {
    const onChange = jest.fn();
    render(<TagInput tags={['react', 'ts']} onChange={onChange} />);
    expect(screen.getByText('react')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });

  it('adds a tag on Enter', () => {
    const onChange = jest.fn();
    render(<TagInput tags={[]} onChange={onChange} />);
    const input = screen.getByRole('textbox', { name: 'Add tag' });
    fireEvent.change(input, { target: { value: 'next' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith(['next']);
  });

  it('does not add duplicates or empty tags', () => {
    const onChange = jest.fn();
    render(<TagInput tags={['react']} onChange={onChange} />);
    const input = screen.getByRole('textbox', { name: 'Add tag' });
    fireEvent.change(input, { target: { value: '  ' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).not.toHaveBeenCalled();
    fireEvent.change(input, { target: { value: 'react' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('removes the last tag on Backspace with empty draft', () => {
    const onChange = jest.fn();
    render(<TagInput tags={['a', 'b']} onChange={onChange} />);
    const input = screen.getByRole('textbox', { name: 'Add tag' });
    fireEvent.keyDown(input, { key: 'Backspace' });
    expect(onChange).toHaveBeenCalledWith(['a']);
  });

  it('removes a tag via its remove button', () => {
    const onChange = jest.fn();
    render(<TagInput tags={['react']} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Remove react tag' }));
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it('disables input when disabled', () => {
    render(<TagInput tags={[]} onChange={jest.fn()} disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});
