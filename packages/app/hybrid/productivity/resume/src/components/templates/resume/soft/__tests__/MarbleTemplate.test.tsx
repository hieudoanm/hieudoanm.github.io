import { render, screen } from '@testing-library/react';
import { seedResumeData } from '../../../../../data/seed';
import { MarbleTemplate } from '../MarbleTemplate';

describe('MarbleTemplate', () => {
  it('renders with seed data', () => {
    render(<MarbleTemplate data={seedResumeData} />);
    expect(
      screen.getByText(seedResumeData.personal.fullName.toUpperCase())
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
    const { container } = render(<MarbleTemplate data={data} />);
    expect(container.textContent).toContain(
      data.personal.fullName.toUpperCase()
    );
  });
});
