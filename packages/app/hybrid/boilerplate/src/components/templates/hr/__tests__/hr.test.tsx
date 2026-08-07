import { fireEvent, render, screen, within } from '@testing-library/react';
import { PeopleDirectoryTemplate } from '../PeopleDirectoryTemplate';
import { TimeOffTemplate } from '../TimeOffTemplate';
import { PerformanceReviewsTemplate } from '../PerformanceReviewsTemplate';
import { BenefitsTemplate } from '../BenefitsTemplate';
import { HiringPipelineTemplate } from '../HiringPipelineTemplate';
import { PoliciesTemplate } from '../PoliciesTemplate';
import { OrgChartTemplate } from '../OrgChartTemplate';
import { ShiftScheduleTemplate } from '../ShiftScheduleTemplate';
import PeopleDirectoryPage from '@/app/(main)/hr/people/page';
import TimeOffPage from '@/app/(main)/hr/time-off/page';
import PerformanceReviewsPage from '@/app/(main)/hr/reviews/page';
import BenefitsPage from '@/app/(main)/hr/benefits/page';
import HiringPipelinePage from '@/app/(main)/hr/hiring/page';
import PoliciesPage from '@/app/(main)/hr/policies/page';
import OrgChartPage from '@/app/(main)/hr/org-chart/page';
import ShiftSchedulePage from '@/app/(main)/hr/shifts/page';

describe('PeopleDirectoryTemplate', () => {
  it('renders all people and the summary', () => {
    render(<PeopleDirectoryTemplate />);
    expect(
      screen.getByRole('heading', { name: 'People Directory' })
    ).toBeInTheDocument();
    expect(screen.getByText('8 employees')).toBeInTheDocument();
    expect(screen.getByText('Priya Patel')).toBeInTheDocument();
    expect(screen.getByText('Engineering Lead')).toBeInTheDocument();
    expect(screen.getByText('Tom Baker')).toBeInTheDocument();
  });

  it('filters people by department', () => {
    render(<PeopleDirectoryTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Engineering' }));
    expect(screen.getByText('4 employees')).toBeInTheDocument();
    expect(screen.getByText('David Chen')).toBeInTheDocument();
    expect(screen.queryByText('Lena Kim')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Design' }));
    expect(screen.getByText('2 employees')).toBeInTheDocument();
    expect(screen.getByText('Maya Singh')).toBeInTheDocument();
    expect(screen.queryByText('Omar Haddad')).not.toBeInTheDocument();
  });

  it('searches people by name and shows the empty state', () => {
    render(<PeopleDirectoryTemplate />);
    fireEvent.change(screen.getByLabelText('Search people'), {
      target: { value: 'sofia' },
    });
    expect(screen.getByText('1 employees')).toBeInTheDocument();
    expect(screen.getByText('Sofia Rossi')).toBeInTheDocument();
    expect(screen.queryByText('Priya Patel')).not.toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Search people'), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('No employees found')).toBeInTheDocument();
    expect(screen.getByText('0 employees')).toBeInTheDocument();
  });
});

describe('TimeOffTemplate', () => {
  it('renders all requests and the summary', () => {
    render(<TimeOffTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Time Off' })
    ).toBeInTheDocument();
    expect(screen.getByText('6 requests')).toBeInTheDocument();
    expect(screen.getByText('Priya Patel')).toBeInTheDocument();
    expect(screen.getByText('Aug 12-16')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Pending')).toHaveLength(3);
    expect(within(table).getAllByText('Approved')).toHaveLength(2);
  });

  it('filters requests by status', () => {
    render(<TimeOffTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Rejected' }));
    expect(screen.getByText('1 requests')).toBeInTheDocument();
    expect(screen.getByText('David Chen')).toBeInTheDocument();
    expect(screen.queryByText('Priya Patel')).not.toBeInTheDocument();
  });

  it('approves a pending request', () => {
    render(<TimeOffTemplate />);
    const approveButtons = screen.getAllByRole('button', { name: 'Approve' });
    expect(approveButtons).toHaveLength(3);
    fireEvent.click(approveButtons[0]);
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Pending')).toHaveLength(2);
    expect(within(table).getAllByText('Approved')).toHaveLength(3);
    expect(screen.getAllByRole('button', { name: 'Approve' })).toHaveLength(2);
  });
});

describe('PerformanceReviewsTemplate', () => {
  it('renders all reviews and the summary', () => {
    render(<PerformanceReviewsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Performance Reviews' })
    ).toBeInTheDocument();
    expect(screen.getByText('5 reviews')).toBeInTheDocument();
    expect(screen.getByText('Sofia Rossi')).toBeInTheDocument();
    expect(screen.getByText('4/5')).toBeInTheDocument();
    expect(
      screen.getAllByRole('button', { name: 'Start review' })
    ).toHaveLength(2);
  });

  it('filters reviews by status', () => {
    render(<PerformanceReviewsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Pending' }));
    expect(screen.getByText('2 reviews')).toBeInTheDocument();
    expect(screen.getByText('Maya Singh')).toBeInTheDocument();
    expect(screen.getByText('Ana Garcia')).toBeInTheDocument();
    expect(screen.queryByText('Sofia Rossi')).not.toBeInTheDocument();
  });

  it('starts a review and marks it completed', () => {
    render(<PerformanceReviewsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Start review' })[0]);
    expect(
      screen.getAllByRole('button', { name: 'Start review' })
    ).toHaveLength(1);
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Completed')).toHaveLength(4);
    expect(within(table).getAllByText('Pending')).toHaveLength(1);
    expect(within(table).getAllByText('4/5')).toHaveLength(2);
  });
});

describe('BenefitsTemplate', () => {
  it('renders benefits and the summary', () => {
    render(<BenefitsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Benefits' })
    ).toBeInTheDocument();
    expect(screen.getByText('3 benefits enrolled')).toBeInTheDocument();
    expect(screen.getByText('Health insurance')).toBeInTheDocument();
    expect(screen.getByText('Dental')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Leave' })).toHaveLength(3);
    expect(screen.getAllByRole('button', { name: 'Enroll' })).toHaveLength(3);
  });

  it('enrolls in a benefit', () => {
    render(<BenefitsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Enroll' })[0]);
    expect(screen.getByText('4 benefits enrolled')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Leave' })).toHaveLength(4);
    expect(screen.getAllByRole('button', { name: 'Enroll' })).toHaveLength(2);
  });

  it('leaves a benefit', () => {
    render(<BenefitsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Leave' })[0]);
    expect(screen.getByText('2 benefits enrolled')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Enroll' })).toHaveLength(4);
  });
});

describe('HiringPipelineTemplate', () => {
  it('renders candidates grouped by stage and the summary', () => {
    render(<HiringPipelineTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Hiring Pipeline' })
    ).toBeInTheDocument();
    expect(screen.getByText('6 candidates')).toBeInTheDocument();
    expect(screen.getByText('Ava Turner')).toBeInTheDocument();
    expect(screen.getByText('Lucas Meyer')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Advance' })).toHaveLength(5);
  });

  it('advances a candidate to the next stage', () => {
    render(<HiringPipelineTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Advance' })[0]);
    expect(screen.getByText('6 candidates')).toBeInTheDocument();
    const interview = screen.getByText('Interview');
    expect(interview).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Advance' })).toHaveLength(5);
  });
});

describe('PoliciesTemplate', () => {
  it('renders all policies and the summary', () => {
    render(<PoliciesTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Policies' })
    ).toBeInTheDocument();
    expect(screen.getByText('6 policies')).toBeInTheDocument();
    expect(screen.getByText('Code of conduct')).toBeInTheDocument();
    expect(screen.getByText('Parental leave')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Read' })).toHaveLength(6);
  });

  it('expands and collapses a policy summary', () => {
    render(<PoliciesTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Read' })[0]);
    expect(
      screen.getByText('Outlines expected behavior and reporting channels.')
    ).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Close' })).toHaveLength(1);
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(
      screen.queryByText('Outlines expected behavior and reporting channels.')
    ).not.toBeInTheDocument();
  });

  it('searches policies and shows the empty state', () => {
    render(<PoliciesTemplate />);
    fireEvent.change(screen.getByLabelText('Search policies'), {
      target: { value: 'PTO' },
    });
    expect(screen.getByText('1 policies')).toBeInTheDocument();
    expect(screen.getByText('PTO policy')).toBeInTheDocument();
    expect(screen.queryByText('Code of conduct')).not.toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Search policies'), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('No policies found')).toBeInTheDocument();
    expect(screen.getByText('0 policies')).toBeInTheDocument();
  });
});

describe('OrgChartTemplate', () => {
  it('renders departments and the summary', () => {
    render(<OrgChartTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Org Chart' })
    ).toBeInTheDocument();
    expect(screen.getByText('3 departments')).toBeInTheDocument();
    expect(screen.getByText('Engineering')).toBeInTheDocument();
    expect(screen.getByText('Head: Priya Patel')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Show team' })).toHaveLength(
      3
    );
  });

  it('shows and hides a department team', () => {
    render(<OrgChartTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Show team' })[0]);
    expect(screen.getByText('Sofia Rossi')).toBeInTheDocument();
    expect(screen.getByText('David Chen')).toBeInTheDocument();
    expect(screen.getByText('Ana Garcia')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Hide team' }));
    expect(screen.queryByText('Sofia Rossi')).not.toBeInTheDocument();
  });
});

describe('ShiftScheduleTemplate', () => {
  it('renders all shifts and the summary', () => {
    render(<ShiftScheduleTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Shift Schedule' })
    ).toBeInTheDocument();
    expect(screen.getByText('7 shifts this week')).toBeInTheDocument();
    expect(screen.getByText('Priya')).toBeInTheDocument();
    expect(screen.getAllByText('9:00-17:00')).toHaveLength(3);
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Morning')).toHaveLength(3);
    expect(within(table).getAllByText('Evening')).toHaveLength(2);
  });

  it('filters shifts by day', () => {
    render(<ShiftScheduleTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Mon' }));
    expect(screen.getByText('2 shifts this week')).toBeInTheDocument();
    expect(screen.getByText('Omar')).toBeInTheDocument();
    expect(screen.queryByText('Lena')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Fri' }));
    expect(screen.getByText('2 shifts this week')).toBeInTheDocument();
    expect(screen.getByText('Tom')).toBeInTheDocument();
    expect(screen.queryByText('Priya')).not.toBeInTheDocument();
  });
});

describe('HR pages', () => {
  it('renders the PeopleDirectoryPage', () => {
    render(<PeopleDirectoryPage />);
    expect(screen.getByText('8 employees')).toBeInTheDocument();
  });

  it('renders the TimeOffPage', () => {
    render(<TimeOffPage />);
    expect(screen.getByText('6 requests')).toBeInTheDocument();
  });

  it('renders the PerformanceReviewsPage', () => {
    render(<PerformanceReviewsPage />);
    expect(screen.getByText('5 reviews')).toBeInTheDocument();
  });

  it('renders the BenefitsPage', () => {
    render(<BenefitsPage />);
    expect(screen.getByText('3 benefits enrolled')).toBeInTheDocument();
  });

  it('renders the HiringPipelinePage', () => {
    render(<HiringPipelinePage />);
    expect(screen.getByText('6 candidates')).toBeInTheDocument();
  });

  it('renders the PoliciesPage', () => {
    render(<PoliciesPage />);
    expect(screen.getByText('6 policies')).toBeInTheDocument();
  });

  it('renders the OrgChartPage', () => {
    render(<OrgChartPage />);
    expect(screen.getByText('3 departments')).toBeInTheDocument();
  });

  it('renders the ShiftSchedulePage', () => {
    render(<ShiftSchedulePage />);
    expect(screen.getByText('7 shifts this week')).toBeInTheDocument();
  });
});
