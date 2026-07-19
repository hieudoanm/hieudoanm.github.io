import { fireEvent, render, screen } from '@testing-library/react';
import { seedResumeData } from '../../../../data/seed';
import { CertificationsForm } from '../CertificationsForm';

describe('CertificationsForm', () => {
  it('adds and updates items', () => {
    const onChange = jest.fn();
    render(
      <CertificationsForm
        value={seedResumeData.certifications}
        onChange={onChange}
      />
    );
    fireEvent.change(screen.getAllByLabelText('Name')[0], {
      target: { value: 'CKA' },
    });
    expect(onChange).toHaveBeenCalledWith([
      expect.objectContaining({ name: 'CKA' }),
      expect.anything(),
    ]);
    fireEvent.click(screen.getByRole('button', { name: /add certification/i }));
    expect(onChange).toHaveBeenLastCalledWith(expect.any(Array));
  });

  it('removes an item', () => {
    const onChange = jest.fn();
    render(
      <CertificationsForm
        value={seedResumeData.certifications}
        onChange={onChange}
      />
    );
    fireEvent.click(screen.getAllByRole('button', { name: 'Remove' })[0]);
    expect(onChange).toHaveBeenCalledWith([expect.anything()]);
  });

  it('updates the remaining fields', () => {
    const onChange = jest.fn();
    render(
      <CertificationsForm
        value={seedResumeData.certifications}
        onChange={onChange}
      />
    );
    fireEvent.change(screen.getAllByLabelText('Issuer')[0], {
      target: { value: 'CNCF' },
    });
    expect(onChange).toHaveBeenLastCalledWith(
      expect.arrayContaining([expect.objectContaining({ issuer: 'CNCF' })])
    );
    fireEvent.change(screen.getAllByLabelText('Date')[0], {
      target: { value: '2024' },
    });
    expect(onChange).toHaveBeenLastCalledWith(
      expect.arrayContaining([expect.objectContaining({ date: '2024' })])
    );
  });
});
