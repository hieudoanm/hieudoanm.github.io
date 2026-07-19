import { fireEvent, render, screen, within } from '@testing-library/react';
import { SignatureSettings } from '../SignatureSettings';

describe('SignatureSettings', () => {
  it('renders the signature form fields', () => {
    render(<SignatureSettings />);
    expect(screen.getByLabelText('Signature name')).toBeInTheDocument();
    expect(screen.getByLabelText('Signature title')).toBeInTheDocument();
    expect(screen.getByLabelText('Signature text')).toBeInTheDocument();
  });

  it('shows a preview of the signature', () => {
    render(
      <SignatureSettings
        name="Ada Lovelace"
        title="Engineer"
        signature="Best, Ada"
      />
    );
    const preview = within(screen.getByTestId('signature-preview'));
    expect(preview.getByText('Ada Lovelace')).toBeInTheDocument();
    expect(preview.getByText('Engineer')).toBeInTheDocument();
    expect(preview.getByText('Best, Ada')).toBeInTheDocument();
  });

  it('fires onChange with the edited signature', () => {
    const onChange = jest.fn();
    render(<SignatureSettings name="Ada" onChange={onChange} />);
    fireEvent.change(screen.getByLabelText('Signature text'), {
      target: { value: 'Regards' },
    });
    fireEvent.click(screen.getByText('Save signature'));
    expect(onChange).toHaveBeenCalledWith({
      name: 'Ada',
      title: '',
      signature: 'Regards',
    });
  });
});
