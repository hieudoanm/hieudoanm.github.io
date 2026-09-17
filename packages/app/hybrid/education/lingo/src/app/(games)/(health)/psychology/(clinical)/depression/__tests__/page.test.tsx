import { render, screen } from '@testing-library/react';

import DepressionClinicalPage from '@/app/(games)/(health)/psychology/(clinical)/depression/page';

describe('DepressionClinicalPage', () => {
  it('renders the heading and section headers', () => {
    render(<DepressionClinicalPage />);
    expect(
      screen.getByRole('heading', { name: 'Depression' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: 'Depression is a syndrome, not sadness',
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'How common and how disabling' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Screening is not diagnosis' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'What the evidence supports' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Risk and getting help' })
    ).toBeInTheDocument();
  });

  it('links back to the psychology hub and out to the screening instruments', () => {
    render(<DepressionClinicalPage />);
    expect(
      screen.getByRole('link', { name: /Back to Psychology/ })
    ).toHaveAttribute('href', '/psychology');
    expect(
      screen.getByRole('link', { name: /^Beck Depression Inventory/ })
    ).toHaveAttribute(
      'href',
      '/psychology/depression/beck-depression-inventory'
    );
    expect(
      screen.getByRole('link', { name: /^Patient Health Questionnaire/ })
    ).toHaveAttribute(
      'href',
      '/psychology/depression/patient-health-questionnaire'
    );
  });
});
