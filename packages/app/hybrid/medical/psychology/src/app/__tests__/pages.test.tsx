import { fireEvent, render, screen } from '@testing-library/react';
import ErrorPage from '@/app/error';
import GlobalError from '@/app/global-error';
import HomePage from '@/app/page';
import LoadingPage from '@/app/loading';
import BeckDepressionInventoryPage from '@/app/beck-depression-inventory/page';
import BigFiveInventoryPage from '@/app/big-five-inventory/page';
import DyadicAdjustmentScalePage from '@/app/dyadic-adjustment-scale/page';
import ExperiencesInCloseRelationshipsPage from '@/app/experiences-in-close-relationships/page';
import ForbiddenPage from '@/app/forbidden';
import GeneralizedAnxietyDisorderPage from '@/app/generalized-anxiety-disorder/page';
import NotFoundPage from '@/app/not-found';
import PatientHealthQuestionnairePage from '@/app/patient-health-questionnaire/page';
import RelationshipClosenessInventoryPage from '@/app/relationship-closeness-inventory/page';
import SatisfactionWithLifePage from '@/app/satisfaction-with-life/page';
import UnauthorizedPage from '@/app/unauthorized';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

describe('HomePage', () => {
  it('renders the app heading and tool cards', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Psychology'
    );
    const slugs = [
      'beck-depression-inventory',
      'big-five-inventory',
      'dyadic-adjustment-scale',
      'experiences-in-close-relationships',
      'generalized-anxiety-disorder',
      'patient-health-questionnaire',
      'relationship-closeness-inventory',
      'satisfaction-with-life',
    ];
    slugs.forEach((slug) => {
      expect(screen.getByTestId(`tool-card-${slug}`)).toBeInTheDocument();
    });
  });
});

describe('Scale pages', () => {
  it.each([
    ['beck-depression-inventory', BeckDepressionInventoryPage],
    ['big-five-inventory', BigFiveInventoryPage],
    ['dyadic-adjustment-scale', DyadicAdjustmentScalePage],
    ['experiences-in-close-relationships', ExperiencesInCloseRelationshipsPage],
    ['generalized-anxiety-disorder', GeneralizedAnxietyDisorderPage],
    ['patient-health-questionnaire', PatientHealthQuestionnairePage],
    ['relationship-closeness-inventory', RelationshipClosenessInventoryPage],
    ['satisfaction-with-life', SatisfactionWithLifePage],
  ])('%s page renders its scale wizard', (_slug, Page) => {
    render(<Page />);
    expect(screen.getAllByRole('button').length).toBeGreaterThan(0);
  });
});

describe('ErrorPage', () => {
  it('renders the 500 template and resets', () => {
    const reset = jest.fn();
    render(<ErrorPage error={new Error('boom')} reset={reset} />);
    expect(screen.getByText('500')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Try again'));
    expect(reset).toHaveBeenCalled();
  });
});

describe('GlobalError', () => {
  it('renders the 500 template inside an html document', () => {
    const reset = jest.fn();
    render(<GlobalError error={new Error('boom')} reset={reset} />);
    expect(screen.getByText('500')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Try again'));
    expect(reset).toHaveBeenCalled();
  });
});

describe('NotFoundPage', () => {
  it('renders the 404 template with a home link', () => {
    render(<NotFoundPage />);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Go home' })).toHaveAttribute(
      'href',
      '/'
    );
  });
});

describe('Forbidden and unauthorized pages', () => {
  it('renders the 403 template', () => {
    render(<ForbiddenPage />);
    expect(screen.getByText('403')).toBeInTheDocument();
  });

  it('renders the 401 template', () => {
    render(<UnauthorizedPage />);
    expect(screen.getByText('401')).toBeInTheDocument();
  });
});

describe('LoadingPage', () => {
  it('renders a spinner', () => {
    const { container } = render(<LoadingPage />);
    expect(container.querySelector('.loading-spinner')).not.toBeNull();
  });
});
