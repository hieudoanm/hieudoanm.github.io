import { fireEvent, render, screen } from '@testing-library/react';
import { seedResumeData } from '../../../../data/seed';
import { PersonalForm } from '../PersonalForm';

describe('PersonalForm', () => {
  it('updates a field', () => {
    const onChange = jest.fn();
    render(
      <PersonalForm value={seedResumeData.personal} onChange={onChange} />
    );
    fireEvent.change(screen.getByLabelText('Full name'), {
      target: { value: 'Jane Doe' },
    });
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ fullName: 'Jane Doe' })
    );
  });

  it('updates a two-column field', () => {
    const onChange = jest.fn();
    render(
      <PersonalForm value={seedResumeData.personal} onChange={onChange} />
    );
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'j@x.com' },
    });
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ email: 'j@x.com' })
    );
  });
});
