import { render, screen } from '@testing-library/react';
import { seedResumeData } from '../../../../../data/seed';
import { TideTemplate } from '../TideTemplate';

describe('TideTemplate', () => {
  it('renders with seed data', () => {
    render(<TideTemplate data={seedResumeData} />);
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
    const { container } = render(<TideTemplate data={data} />);
    expect(container.textContent).toContain(data.personal.fullName);
  });
});
