import { render, screen } from '@testing-library/react';
import { seedResumeData } from '../../../../../data/seed';
import { AzureTemplate } from '../AzureTemplate';

describe('AzureTemplate', () => {
  it('renders with seed data', () => {
    render(<AzureTemplate data={seedResumeData} />);
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
    const { container } = render(<AzureTemplate data={data} />);
    expect(container.textContent).toContain(data.personal.fullName);
  });
});
