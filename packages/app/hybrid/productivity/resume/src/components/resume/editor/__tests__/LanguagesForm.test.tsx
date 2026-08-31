import { fireEvent, render, screen } from '@testing-library/react';
import { seedResumeData } from '../../../../data/seed';
import { LanguagesForm } from '../LanguagesForm';

describe('LanguagesForm', () => {
  it('adds and updates items', () => {
    const onChange = jest.fn();
    render(
      <LanguagesForm value={seedResumeData.languages} onChange={onChange} />
    );
    fireEvent.change(screen.getAllByLabelText('Language')[0], {
      target: { value: 'French' },
    });
    expect(onChange).toHaveBeenCalledWith([
      expect.objectContaining({ name: 'French' }),
      expect.anything(),
    ]);
    fireEvent.click(screen.getByRole('button', { name: /add language/i }));
    expect(onChange).toHaveBeenLastCalledWith(expect.any(Array));
  });

  it('removes an item', () => {
    const onChange = jest.fn();
    render(
      <LanguagesForm value={seedResumeData.languages} onChange={onChange} />
    );
    fireEvent.click(screen.getAllByRole('button', { name: 'Remove' })[0]);
    expect(onChange).toHaveBeenCalledWith([expect.anything()]);
  });

  it('updates the proficiency field', () => {
    const onChange = jest.fn();
    render(
      <LanguagesForm value={seedResumeData.languages} onChange={onChange} />
    );
    fireEvent.change(screen.getAllByLabelText('Proficiency')[0], {
      target: { value: 'Fluent' },
    });
    expect(onChange).toHaveBeenCalledWith([
      expect.objectContaining({ proficiency: 'Fluent' }),
      expect.anything(),
    ]);
  });
});
