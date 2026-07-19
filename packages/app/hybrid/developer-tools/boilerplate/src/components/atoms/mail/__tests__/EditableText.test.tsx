import { fireEvent, render, screen } from '@testing-library/react';
import { EditableText } from '../EditableText';

describe('EditableText', () => {
  it('renders the value as editable text', () => {
    render(<EditableText value="Project name" onChange={jest.fn()} />);
    expect(screen.getByRole('button', { name: 'Edit text' })).toHaveTextContent(
      'Project name'
    );
  });

  it('switches to an input and commits on Enter', () => {
    const onChange = jest.fn();
    render(<EditableText value="Old" onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Edit text' }));
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'New name' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith('New name');
    expect(
      screen.getByRole('button', { name: 'Edit text' })
    ).toBeInTheDocument();
  });

  it('cancels editing on Escape', () => {
    const onChange = jest.fn();
    render(<EditableText value="Old" onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Edit text' }));
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'New name' } });
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'Edit text' })).toHaveTextContent(
      'Old'
    );
  });

  it('commits on blur', () => {
    const onChange = jest.fn();
    render(<EditableText value="Old" onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Edit text' }));
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Blurred' } });
    fireEvent.blur(input);
    expect(onChange).toHaveBeenCalledWith('Blurred');
  });

  it('shows the placeholder when value is empty', () => {
    render(<EditableText value="" onChange={jest.fn()} />);
    expect(screen.getByRole('button', { name: 'Edit text' })).toHaveTextContent(
      'Click to edit'
    );
  });
});
