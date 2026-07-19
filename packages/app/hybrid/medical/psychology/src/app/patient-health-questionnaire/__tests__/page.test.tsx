import { render, screen } from '@testing-library/react';
import PatientHealthQuestionnairePage from '@/app/patient-health-questionnaire/page';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

describe('PatientHealthQuestionnairePage', () => {
  it('renders its scale wizard', () => {
    render(<PatientHealthQuestionnairePage />);
    expect(screen.getAllByRole('button').length).toBeGreaterThan(0);
  });
});
