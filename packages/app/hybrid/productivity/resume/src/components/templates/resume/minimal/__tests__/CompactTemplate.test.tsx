import { render, screen } from '@testing-library/react';
import { seedResumeData } from '../../../../../data/seed';
import { CompactTemplate } from '../CompactTemplate';

describe('CompactTemplate', () => {
  it('renders with seed data', () => {
    render(<CompactTemplate data={seedResumeData} />);
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
    const { container } = render(<CompactTemplate data={data} />);
    expect(container.textContent).toContain(data.personal.fullName);
  });
});
