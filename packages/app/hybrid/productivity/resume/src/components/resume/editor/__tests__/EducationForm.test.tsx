import { fireEvent, render, screen } from '@testing-library/react';
import { seedResumeData } from '../../../../data/seed';
import { EducationForm } from '../EducationForm';

describe('EducationForm', () => {
  it('adds and updates items', () => {
    const onChange = jest.fn();
    render(
      <EducationForm value={seedResumeData.education} onChange={onChange} />
    );
    fireEvent.change(screen.getByLabelText('School'), {
      target: { value: 'MIT' },
    });
    expect(onChange).toHaveBeenCalledWith([
      expect.objectContaining({ school: 'MIT' }),
    ]);
    fireEvent.click(screen.getByRole('button', { name: /add education/i }));
    expect(onChange).toHaveBeenLastCalledWith(expect.any(Array));
  });

  it('removes an item', () => {
    const onChange = jest.fn();
    render(
      <EducationForm value={seedResumeData.education} onChange={onChange} />
    );
    fireEvent.click(screen.getAllByRole('button', { name: 'Remove' })[0]);
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it('updates the remaining fields', () => {
    const onChange = jest.fn();
    render(
      <EducationForm value={seedResumeData.education} onChange={onChange} />
    );
    fireEvent.change(screen.getByLabelText('Degree'), {
      target: { value: 'BSc' },
    });
    expect(onChange).toHaveBeenLastCalledWith([
      expect.objectContaining({ degree: 'BSc' }),
    ]);
    fireEvent.change(screen.getByLabelText('Field of study'), {
      target: { value: 'CS' },
    });
    expect(onChange).toHaveBeenLastCalledWith([
      expect.objectContaining({ field: 'CS' }),
    ]);
    fireEvent.change(screen.getByLabelText('End year'), {
      target: { value: '2021' },
    });
    expect(onChange).toHaveBeenLastCalledWith([
      expect.objectContaining({ endDate: '2021' }),
    ]);
    fireEvent.change(screen.getByLabelText('Description'), {
      target: { value: 'Graduated' },
    });
    expect(onChange).toHaveBeenLastCalledWith([
      expect.objectContaining({ description: 'Graduated' }),
    ]);
  });
});
