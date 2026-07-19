import { fireEvent, render, screen } from '@testing-library/react';
import { seedResumeData } from '../../../../data/seed';
import { ExperienceForm } from '../ExperienceForm';

describe('ExperienceForm', () => {
  it('adds an empty item', () => {
    const onChange = jest.fn();
    render(<ExperienceForm value={[]} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: /add experience/i }));
    expect(onChange).toHaveBeenCalledWith([
      expect.objectContaining({ company: '', role: '' }),
    ]);
  });

  it('updates an item', () => {
    const onChange = jest.fn();
    render(
      <ExperienceForm value={seedResumeData.experience} onChange={onChange} />
    );
    fireEvent.change(screen.getAllByLabelText('Company')[0], {
      target: { value: 'Acme' },
    });
    expect(onChange).toHaveBeenCalledWith([
      expect.objectContaining({ company: 'Acme' }),
      expect.anything(),
    ]);
  });

  it('removes an item', () => {
    const onChange = jest.fn();
    render(
      <ExperienceForm value={seedResumeData.experience} onChange={onChange} />
    );
    fireEvent.click(screen.getAllByRole('button', { name: 'Remove' })[0]);
    expect(onChange).toHaveBeenCalledWith([expect.anything()]);
  });

  it('updates the remaining fields', () => {
    const onChange = jest.fn();
    render(
      <ExperienceForm value={seedResumeData.experience} onChange={onChange} />
    );
    fireEvent.change(screen.getAllByLabelText('Role')[0], {
      target: { value: 'Engineer' },
    });
    expect(onChange).toHaveBeenLastCalledWith(
      expect.arrayContaining([expect.objectContaining({ role: 'Engineer' })])
    );
    fireEvent.change(screen.getAllByLabelText('Location')[0], {
      target: { value: 'Berlin' },
    });
    expect(onChange).toHaveBeenLastCalledWith(
      expect.arrayContaining([expect.objectContaining({ location: 'Berlin' })])
    );
    fireEvent.change(screen.getAllByLabelText('End date')[0], {
      target: { value: 'Present' },
    });
    expect(onChange).toHaveBeenLastCalledWith(
      expect.arrayContaining([expect.objectContaining({ endDate: 'Present' })])
    );
    fireEvent.change(
      screen.getAllByLabelText('Description (one bullet per line)')[0],
      {
        target: { value: 'Shipped X' },
      }
    );
    expect(onChange).toHaveBeenLastCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ description: 'Shipped X' }),
      ])
    );
  });
});
