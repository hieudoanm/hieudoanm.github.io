import { fireEvent, render, screen, within } from '@testing-library/react';
import { HealthDashboardTemplate } from '../HealthDashboardTemplate';
import { WorkoutPlannerTemplate } from '../WorkoutPlannerTemplate';
import { NutritionTrackerTemplate } from '../NutritionTrackerTemplate';
import { SleepTrackerTemplate } from '../SleepTrackerTemplate';
import { ActivityTrackerTemplate } from '../ActivityTrackerTemplate';
import { WaterIntakeTemplate } from '../WaterIntakeTemplate';
import { GoalsTemplate } from '../GoalsTemplate';
import { HealthProfileTemplate } from '../HealthProfileTemplate';
import DashboardPage from '@/app/(templates)/health/dashboard/page';
import WorkoutPage from '@/app/(templates)/health/workout/page';
import NutritionPage from '@/app/(templates)/health/nutrition/page';
import SleepPage from '@/app/(templates)/health/sleep/page';
import ActivityPage from '@/app/(templates)/health/activity/page';
import WaterPage from '@/app/(templates)/health/water/page';
import GoalsPage from '@/app/(templates)/health/goals/page';
import ProfilePage from '@/app/(templates)/health/profile/page';

describe('HealthDashboardTemplate', () => {
  it('renders summary stats and the weekly activity table', () => {
    render(<HealthDashboardTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Health Dashboard' })
    ).toBeInTheDocument();
    expect(screen.getByText('7 days tracked')).toBeInTheDocument();
    expect(screen.getByText('8,940')).toBeInTheDocument();
    expect(screen.getByText('58 bpm')).toBeInTheDocument();
    expect(screen.getAllByText('Steps')).toHaveLength(2);
    const table = screen.getByRole('table');
    expect(within(table).getByText('Monday')).toBeInTheDocument();
    expect(within(table).getByText('14,560')).toBeInTheDocument();
    expect(screen.getByText("Today's Health")).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Check in' })
    ).toBeInTheDocument();
  });

  it('toggles the check-in badge', () => {
    render(<HealthDashboardTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Check in' }));
    expect(screen.getByText('Checked in')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Check in' })
    ).not.toBeInTheDocument();
  });
});

describe('WorkoutPlannerTemplate', () => {
  it('renders the workout plans with filters', () => {
    render(<WorkoutPlannerTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Workout Plans' })
    ).toBeInTheDocument();
    expect(screen.getByText('6 workouts')).toBeInTheDocument();
    expect(screen.getByText('Morning Yoga Flow')).toBeInTheDocument();
    expect(screen.getByText('30 min')).toBeInTheDocument();
    expect(screen.getByText('420 kcal')).toBeInTheDocument();
    expect(
      screen.getAllByRole('button', { name: 'Start workout' })
    ).toHaveLength(6);
  });

  it('filters by intensity and starts a workout', () => {
    render(<WorkoutPlannerTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'High' }));
    expect(screen.getByText('2 workouts')).toBeInTheDocument();
    expect(screen.getByText('HIIT Cardio Blast')).toBeInTheDocument();
    expect(screen.queryByText('Morning Yoga Flow')).not.toBeInTheDocument();
    fireEvent.click(
      screen.getAllByRole('button', { name: 'Start workout' })[0]
    );
    expect(screen.getAllByText('Workout started')).toHaveLength(1);
    expect(
      screen.getAllByRole('button', { name: 'Start workout' })
    ).toHaveLength(1);
  });
});

describe('NutritionTrackerTemplate', () => {
  it('renders the macros and the meal log total', () => {
    render(<NutritionTrackerTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Nutrition Tracker' })
    ).toBeInTheDocument();
    expect(screen.getByText('3 macros')).toBeInTheDocument();
    expect(screen.getByText('4 meals logged')).toBeInTheDocument();
    expect(screen.getByText('120 / 150 g')).toBeInTheDocument();
    expect(screen.getByText('Chicken quinoa bowl')).toBeInTheDocument();
    expect(screen.getByText('1790 kcal')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Log meal' })).toHaveLength(4);
  });

  it('logs a meal and shows the Logged badge', () => {
    render(<NutritionTrackerTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Log meal' })[0]);
    expect(screen.getAllByText('Logged')).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: 'Log meal' })).toHaveLength(3);
  });
});

describe('SleepTrackerTemplate', () => {
  it('renders the sleep stats and the weekly table', () => {
    render(<SleepTrackerTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Sleep Tracker' })
    ).toBeInTheDocument();
    expect(screen.getByText('7 nights tracked')).toBeInTheDocument();
    expect(screen.getByText('82')).toBeInTheDocument();
    expect(screen.getByText('1.8 h')).toBeInTheDocument();
    expect(screen.getAllByText('7.5 h')).toHaveLength(2);
    expect(screen.getAllByText('Good')).toHaveLength(5);
    expect(
      screen.getByRole('button', { name: 'Track tonight' })
    ).toBeInTheDocument();
  });

  it('starts tracking tonight', () => {
    render(<SleepTrackerTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Track tonight' }));
    expect(screen.getByText('Tracking tonight')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Track tonight' })
    ).not.toBeInTheDocument();
  });
});

describe('ActivityTrackerTemplate', () => {
  it('renders the activity stats and the daily timeline', () => {
    render(<ActivityTrackerTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Activity Tracker' })
    ).toBeInTheDocument();
    expect(screen.getByText('7 entries today')).toBeInTheDocument();
    expect(screen.getByText('8,940')).toBeInTheDocument();
    expect(screen.getByText('6.2 km')).toBeInTheDocument();
    expect(screen.getByText('45')).toBeInTheDocument();
    expect(screen.getByText('2,380')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sync' })).toBeInTheDocument();
  });

  it('syncs and shows the Synced just now badge', () => {
    render(<ActivityTrackerTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Sync' }));
    expect(screen.getByText('Synced just now')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Sync' })
    ).not.toBeInTheDocument();
  });
});

describe('WaterIntakeTemplate', () => {
  it('renders the water goal and the daily history', () => {
    render(<WaterIntakeTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Water Intake' })
    ).toBeInTheDocument();
    expect(screen.getByText('8 glasses/day')).toBeInTheDocument();
    expect(screen.getByText('5 of 8 glasses')).toBeInTheDocument();
    expect(screen.getByText('7 days recorded')).toBeInTheDocument();
    expect(screen.getAllByText('8 glasses')).toHaveLength(2);
    expect(
      screen.getByRole('button', { name: 'Add glass' })
    ).toBeInTheDocument();
  });

  it('adds glasses until the goal is reached', () => {
    render(<WaterIntakeTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Add glass' }));
    fireEvent.click(screen.getByRole('button', { name: 'Add glass' }));
    fireEvent.click(screen.getByRole('button', { name: 'Add glass' }));
    expect(screen.getByText('8 of 8 glasses')).toBeInTheDocument();
    expect(screen.getByText('Goal reached')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Add glass' })
    ).not.toBeInTheDocument();
  });
});

describe('GoalsTemplate', () => {
  it('renders the four daily goals', () => {
    render(<GoalsTemplate />);
    expect(screen.getByRole('heading', { name: 'Goals' })).toBeInTheDocument();
    expect(screen.getByText('4 goals')).toBeInTheDocument();
    expect(screen.getByText('10,000/day')).toBeInTheDocument();
    expect(screen.getByText('8h')).toBeInTheDocument();
    expect(screen.getByText('8 glasses')).toBeInTheDocument();
    expect(screen.getByText('30 min')).toBeInTheDocument();
    expect(
      screen.getAllByRole('button', { name: 'Mark complete' })
    ).toHaveLength(4);
  });

  it('marks a goal as complete', () => {
    render(<GoalsTemplate />);
    fireEvent.click(
      screen.getAllByRole('button', { name: 'Mark complete' })[0]
    );
    expect(screen.getAllByText('Completed')).toHaveLength(1);
    expect(
      screen.getAllByRole('button', { name: 'Mark complete' })
    ).toHaveLength(3);
  });
});

describe('HealthProfileTemplate', () => {
  it('renders the profile card and the health metrics', () => {
    render(<HealthProfileTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Health Profile' })
    ).toBeInTheDocument();
    expect(screen.getByText('3 health metrics')).toBeInTheDocument();
    expect(screen.getByText('Alex Nguyen')).toBeInTheDocument();
    expect(screen.getByText('29 years')).toBeInTheDocument();
    expect(screen.getByText('178 cm')).toBeInTheDocument();
    expect(screen.getByText('72 kg')).toBeInTheDocument();
    expect(screen.getByText('O+')).toBeInTheDocument();
    expect(screen.getByText('22.7')).toBeInTheDocument();
    expect(screen.getByText('58 bpm')).toBeInTheDocument();
    expect(screen.getByText('46 ml/kg/min')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Edit profile' })
    ).toBeInTheDocument();
  });

  it('starts saving the profile', () => {
    render(<HealthProfileTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Edit profile' }));
    expect(screen.getByText('Saving...')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Edit profile' })
    ).not.toBeInTheDocument();
  });
});

describe('HealthPages', () => {
  it('renders the dashboard page', () => {
    render(<DashboardPage />);
    expect(
      screen.getByRole('heading', { name: 'Health Dashboard' })
    ).toBeInTheDocument();
    expect(screen.getByText('7 days tracked')).toBeInTheDocument();
  });

  it('renders the workout page', () => {
    render(<WorkoutPage />);
    expect(
      screen.getByRole('heading', { name: 'Workout Plans' })
    ).toBeInTheDocument();
    expect(screen.getByText('6 workouts')).toBeInTheDocument();
  });

  it('renders the nutrition page', () => {
    render(<NutritionPage />);
    expect(
      screen.getByRole('heading', { name: 'Nutrition Tracker' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 meals logged')).toBeInTheDocument();
  });

  it('renders the sleep page', () => {
    render(<SleepPage />);
    expect(
      screen.getByRole('heading', { name: 'Sleep Tracker' })
    ).toBeInTheDocument();
    expect(screen.getByText('7 nights tracked')).toBeInTheDocument();
  });

  it('renders the activity page', () => {
    render(<ActivityPage />);
    expect(
      screen.getByRole('heading', { name: 'Activity Tracker' })
    ).toBeInTheDocument();
    expect(screen.getByText('7 entries today')).toBeInTheDocument();
  });

  it('renders the water page', () => {
    render(<WaterPage />);
    expect(
      screen.getByRole('heading', { name: 'Water Intake' })
    ).toBeInTheDocument();
    expect(screen.getByText('8 glasses/day')).toBeInTheDocument();
  });

  it('renders the goals page', () => {
    render(<GoalsPage />);
    expect(screen.getByRole('heading', { name: 'Goals' })).toBeInTheDocument();
    expect(screen.getByText('4 goals')).toBeInTheDocument();
  });

  it('renders the profile page', () => {
    render(<ProfilePage />);
    expect(
      screen.getByRole('heading', { name: 'Health Profile' })
    ).toBeInTheDocument();
    expect(screen.getByText('3 health metrics')).toBeInTheDocument();
  });
});
