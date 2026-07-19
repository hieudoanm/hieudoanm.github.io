import { render, screen } from '@testing-library/react';
import { Textarea } from '../Textarea';

describe('Textarea', () => {
  it('renders label, textarea, and derived id', () => {
    render(<Textarea label="Message" />);
    const textarea = screen.getByLabelText('Message');
    expect(textarea).toHaveAttribute('id', 'message');
    expect(textarea).toHaveClass('textarea-bordered');
  });

  it('shows error message and class', () => {
    render(<Textarea label="Message" error="Required" />);
    expect(screen.getByText('Required')).toBeInTheDocument();
    expect(screen.getByLabelText('Message')).toHaveClass('textarea-error');
  });

  it('forwards textarea attributes', () => {
    render(
      <Textarea
        label="Message"
        rows={4}
        placeholder="Type here..."
        maxLength={10}
      />
    );
    const textarea = screen.getByLabelText('Message');
    expect(textarea).toHaveAttribute('rows', '4');
    expect(textarea).toHaveAttribute('placeholder', 'Type here...');
    expect(textarea).toHaveAttribute('maxlength', '10');
  });

  it('uses provided id', () => {
    render(<Textarea label="Message" id="custom" />);
    expect(screen.getByLabelText('Message')).toHaveAttribute('id', 'custom');
  });
});
