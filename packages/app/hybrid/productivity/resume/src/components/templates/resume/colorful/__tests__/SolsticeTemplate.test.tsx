import { render, screen } from '@testing-library/react';
import { seedResumeData } from '../../../../../data/seed';
import { SolsticeTemplate } from '../SolsticeTemplate';

describe('SolsticeTemplate', () => {
  it('renders with seed data', () => {
    render(<SolsticeTemplate data={seedResumeData} />);
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
    const { container } = render(<SolsticeTemplate data={data} />);
    expect(container.textContent).toContain(data.personal.fullName);
  });
});
