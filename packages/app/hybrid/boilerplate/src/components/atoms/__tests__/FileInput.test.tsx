import { fireEvent, render, screen } from '@testing-library/react';
import { Avatar } from '../Avatar';
import { FileInput } from '../FileInput';

describe('FileInput', () => {
  it('renders label and file input', () => {
    render(<FileInput label="Avatar" />);
    expect(screen.getByLabelText('Avatar')).toBeInTheDocument();
    expect(screen.getByLabelText('Avatar')).toHaveAttribute('type', 'file');
  });

  it('calls onChange with files', () => {
    const onChange = jest.fn();
    render(<FileInput label="Avatar" onChange={onChange} />);
    const input = screen.getByLabelText('Avatar');
    fireEvent.change(input, {
      target: { files: [new File(['x'], 'x.png')] },
    });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('renders hint and applies multiple/accept', () => {
    render(<FileInput label="Docs" hint="PDF only" accept=".pdf" multiple />);
    expect(screen.getByText('PDF only')).toBeInTheDocument();
    expect(screen.getByLabelText('Docs')).toHaveAttribute('accept', '.pdf');
    expect(screen.getByLabelText('Docs')).toHaveAttribute('multiple');
  });
});
