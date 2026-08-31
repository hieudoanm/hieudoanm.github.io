import { render, screen } from '@testing-library/react';
import ExperiencesInCloseRelationshipsPage from '@/app/experiences-in-close-relationships/page';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

describe('ExperiencesInCloseRelationshipsPage', () => {
  it('renders its scale wizard', () => {
    render(<ExperiencesInCloseRelationshipsPage />);
    expect(screen.getAllByRole('button').length).toBeGreaterThan(0);
  });
});
