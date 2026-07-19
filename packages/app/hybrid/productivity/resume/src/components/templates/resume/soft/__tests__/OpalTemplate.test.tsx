import { render, screen } from '@testing-library/react';
import { seedResumeData } from '../../../../../data/seed';
import { OpalTemplate } from '../OpalTemplate';

describe('OpalTemplate', () => {
  it('renders with seed data', () => {
    render(<OpalTemplate data={seedResumeData} />);
    expect(
      screen.getByText(seedResumeData.personal.fullName)
    ).toBeInTheDocument();
    expect(screen.getAllByText(/experience/i).length).toBeGreaterThan(0);
  });

  it('renders empty sections gracefully', () => {
    const data = {
      ...seedResumeData,
      summary: '',
      experience: [],
      education: [],
      projects: [],
      skills: [],
      certifications: [],
      languages: [],
      interests: '',
    };
    const { container } = render(<OpalTemplate data={data} />);
    expect(container.textContent).toContain(data.personal.fullName);
  });
});
