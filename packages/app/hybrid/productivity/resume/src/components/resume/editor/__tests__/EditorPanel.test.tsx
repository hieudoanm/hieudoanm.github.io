import { fireEvent, render, screen } from '@testing-library/react';
import { seedResumeData } from '../../../../data/seed';
import { EditorPanel } from '../EditorPanel';

describe('EditorPanel', () => {
  it('renders all accordion sections', () => {
    render(<EditorPanel data={seedResumeData} onChange={jest.fn()} />);
    expect(screen.getByText('Personal Details')).toBeInTheDocument();
    expect(screen.getByText('Summary')).toBeInTheDocument();
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Education')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Skills')).toBeInTheDocument();
    expect(screen.getByText('Certifications')).toBeInTheDocument();
    expect(screen.getByText('Languages')).toBeInTheDocument();
    expect(screen.getByText('Interests')).toBeInTheDocument();
  });

  it('updates personal details', () => {
    const onChange = jest.fn();
    render(<EditorPanel data={seedResumeData} onChange={onChange} />);
    fireEvent.change(screen.getByLabelText('Full name'), {
      target: { value: 'Jane Doe' },
    });
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        personal: expect.objectContaining({ fullName: 'Jane Doe' }),
      })
    );
  });

  it('updates the summary', () => {
    const onChange = jest.fn();
    render(<EditorPanel data={seedResumeData} onChange={onChange} />);
    fireEvent.change(screen.getByLabelText('Professional summary'), {
      target: { value: 'A new summary.' },
    });
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ summary: 'A new summary.' })
    );
  });

  it('adds an experience item', () => {
    const onChange = jest.fn();
    render(<EditorPanel data={seedResumeData} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: /add experience/i }));
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        experience: expect.arrayContaining([
          expect.objectContaining({ company: '' }),
        ]),
      })
    );
  });

  it('updates education', () => {
    const onChange = jest.fn();
    render(<EditorPanel data={seedResumeData} onChange={onChange} />);
    fireEvent.change(screen.getByLabelText('Degree'), {
      target: { value: 'BSc' },
    });
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        education: expect.arrayContaining([
          expect.objectContaining({ degree: 'BSc' }),
        ]),
      })
    );
  });

  it('updates projects', () => {
    const onChange = jest.fn();
    render(<EditorPanel data={seedResumeData} onChange={onChange} />);
    fireEvent.change(screen.getAllByLabelText('Link')[0], {
      target: { value: 'https://example.com' },
    });
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        projects: expect.arrayContaining([
          expect.objectContaining({ link: 'https://example.com' }),
        ]),
      })
    );
  });

  it('updates skills', () => {
    const onChange = jest.fn();
    render(<EditorPanel data={seedResumeData} onChange={onChange} />);
    fireEvent.change(screen.getAllByLabelText('Skills (comma separated)')[0], {
      target: { value: 'React, Go' },
    });
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        skills: expect.arrayContaining([
          expect.objectContaining({ items: 'React, Go' }),
        ]),
      })
    );
  });

  it('updates certifications', () => {
    const onChange = jest.fn();
    render(<EditorPanel data={seedResumeData} onChange={onChange} />);
    fireEvent.change(screen.getAllByLabelText('Issuer')[0], {
      target: { value: 'CNCF' },
    });
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        certifications: expect.arrayContaining([
          expect.objectContaining({ issuer: 'CNCF' }),
        ]),
      })
    );
  });

  it('updates languages', () => {
    const onChange = jest.fn();
    render(<EditorPanel data={seedResumeData} onChange={onChange} />);
    fireEvent.change(screen.getAllByLabelText('Proficiency')[0], {
      target: { value: 'Fluent' },
    });
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        languages: expect.arrayContaining([
          expect.objectContaining({ proficiency: 'Fluent' }),
        ]),
      })
    );
  });

  it('updates interests', () => {
    const onChange = jest.fn();
    render(<EditorPanel data={seedResumeData} onChange={onChange} />);
    fireEvent.change(screen.getByLabelText('Interests (comma separated)'), {
      target: { value: 'Hiking' },
    });
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ interests: 'Hiking' })
    );
  });
});
