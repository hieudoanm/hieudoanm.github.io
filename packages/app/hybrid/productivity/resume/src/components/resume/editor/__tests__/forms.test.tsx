import { fireEvent, render, screen } from '@testing-library/react';
import { seedResumeData } from '../../../../data/seed';
import { CertificationsForm } from '../CertificationsForm';
import { EducationForm } from '../EducationForm';
import { ExperienceForm } from '../ExperienceForm';
import { LanguagesForm } from '../LanguagesForm';
import { PersonalForm } from '../PersonalForm';
import { ProjectForm } from '../ProjectForm';
import { SkillsForm } from '../SkillsForm';

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

describe('ProjectForm', () => {
  it('adds and updates items', () => {
    const onChange = jest.fn();
    render(<ProjectForm value={seedResumeData.projects} onChange={onChange} />);
    fireEvent.change(screen.getAllByLabelText('Name')[0], {
      target: { value: 'App' },
    });
    expect(onChange).toHaveBeenCalledWith([
      expect.objectContaining({ name: 'App' }),
      expect.anything(),
    ]);
    fireEvent.click(screen.getByRole('button', { name: /add project/i }));
    expect(onChange).toHaveBeenLastCalledWith(expect.any(Array));
  });

  it('removes an item', () => {
    const onChange = jest.fn();
    render(<ProjectForm value={seedResumeData.projects} onChange={onChange} />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Remove' })[0]);
    expect(onChange).toHaveBeenCalledWith([expect.anything()]);
  });

  it('updates the remaining fields', () => {
    const onChange = jest.fn();
    render(<ProjectForm value={seedResumeData.projects} onChange={onChange} />);
    fireEvent.change(screen.getAllByLabelText('Link')[0], {
      target: { value: 'https://x.dev' },
    });
    expect(onChange).toHaveBeenLastCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ link: 'https://x.dev' }),
      ])
    );
    fireEvent.change(screen.getAllByLabelText('Technologies')[0], {
      target: { value: 'Next.js' },
    });
    expect(onChange).toHaveBeenLastCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ technologies: 'Next.js' }),
      ])
    );
    fireEvent.change(screen.getAllByLabelText('Description')[0], {
      target: { value: 'Built it' },
    });
    expect(onChange).toHaveBeenLastCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ description: 'Built it' }),
      ])
    );
  });
});

describe('SkillsForm', () => {
  it('adds and updates items', () => {
    const onChange = jest.fn();
    render(<SkillsForm value={seedResumeData.skills} onChange={onChange} />);
    fireEvent.change(screen.getAllByLabelText('Category')[0], {
      target: { value: 'DevOps' },
    });
    expect(onChange).toHaveBeenCalledWith([
      expect.objectContaining({ category: 'DevOps' }),
      expect.anything(),
      expect.anything(),
    ]);
    fireEvent.click(screen.getByRole('button', { name: /add skill group/i }));
    expect(onChange).toHaveBeenLastCalledWith(expect.any(Array));
  });

  it('removes an item', () => {
    const onChange = jest.fn();
    render(<SkillsForm value={seedResumeData.skills} onChange={onChange} />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Remove' })[0]);
    expect(onChange).toHaveBeenCalledWith([
      expect.anything(),
      expect.anything(),
    ]);
  });

  it('updates the items field', () => {
    const onChange = jest.fn();
    render(<SkillsForm value={seedResumeData.skills} onChange={onChange} />);
    fireEvent.change(screen.getAllByLabelText('Skills (comma separated)')[0], {
      target: { value: 'Go, Rust' },
    });
    expect(onChange).toHaveBeenCalledWith([
      expect.objectContaining({ items: 'Go, Rust' }),
      expect.anything(),
      expect.anything(),
    ]);
  });
});

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
