import { fireEvent, render, screen, within } from '@testing-library/react';
import { AchievementsTemplate } from '../AchievementsTemplate';
import { CourseCatalogTemplate } from '../CourseCatalogTemplate';
import { CourseDetailTemplate } from '../CourseDetailTemplate';
import { InstructorsTemplate } from '../InstructorsTemplate';
import { LearningAnalyticsTemplate } from '../LearningAnalyticsTemplate';
import { LessonPlayerTemplate } from '../LessonPlayerTemplate';
import { MyCoursesTemplate } from '../MyCoursesTemplate';
import { QuizzesTemplate } from '../QuizzesTemplate';
import AchievementsPage from '@/app/(templates)/learning/achievements/page';
import AnalyticsPage from '@/app/(templates)/learning/analytics/page';
import CatalogPage from '@/app/(templates)/learning/catalog/page';
import CoursePage from '@/app/(templates)/learning/course/page';
import InstructorsPage from '@/app/(templates)/learning/instructors/page';
import LessonPage from '@/app/(templates)/learning/lesson/page';
import MyCoursesPage from '@/app/(templates)/learning/my-courses/page';
import QuizzesPage from '@/app/(templates)/learning/quizzes/page';

describe('CourseCatalogTemplate', () => {
  it('renders the catalog with a count summary and course details', () => {
    render(<CourseCatalogTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Course Catalog' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('Browse all available courses.')
    ).toBeInTheDocument();
    expect(screen.getByText('6 courses')).toBeInTheDocument();
    expect(screen.getByText('React Masterclass')).toBeInTheDocument();
    expect(screen.getAllByText('Development')).toHaveLength(3);
    expect(screen.getByText('6h 30m')).toBeInTheDocument();
    expect(screen.getAllByText(/lessons/)).toHaveLength(6);
  });

  it('filters courses by category tab', () => {
    render(<CourseCatalogTemplate />);
    const main = screen.getByRole('main');
    fireEvent.click(within(main).getByRole('button', { name: 'Design' }));
    expect(screen.getByText('2 courses')).toBeInTheDocument();
    expect(screen.getByText('UI Design Essentials')).toBeInTheDocument();
    expect(screen.queryByText('React Masterclass')).not.toBeInTheDocument();
    fireEvent.click(within(main).getByRole('button', { name: 'All' }));
    expect(screen.getByText('6 courses')).toBeInTheDocument();
  });

  it('searches courses and shows the empty state', () => {
    render(<CourseCatalogTemplate />);
    const input = screen.getByRole('textbox', { name: 'Search courses' });
    fireEvent.change(input, { target: { value: 'figma' } });
    expect(screen.getByText('1 courses')).toBeInTheDocument();
    expect(screen.getByText('Figma Advanced')).toBeInTheDocument();
    fireEvent.change(input, { target: { value: 'zzz' } });
    expect(screen.getByText('No courses found')).toBeInTheDocument();
    expect(screen.getByText('0 courses')).toBeInTheDocument();
  });
});

describe('CourseDetailTemplate', () => {
  it('renders the course overview and stats', () => {
    render(<CourseDetailTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Course Details' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('Course overview and curriculum.')
    ).toBeInTheDocument();
    expect(screen.getByText('React Masterclass')).toBeInTheDocument();
    expect(screen.getByText('by Sarah Chen')).toBeInTheDocument();
    expect(screen.getByText('4.8 rating')).toBeInTheDocument();
    expect(screen.getByText('1,240 students')).toBeInTheDocument();
    expect(screen.getByText('6h 30m')).toBeInTheDocument();
    expect(screen.getByText('8 lessons')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Enroll' })).toBeInTheDocument();
  });

  it('enrolls in the course and swaps the button for a badge', () => {
    render(<CourseDetailTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Enroll' }));
    expect(screen.getByText('Enrolled')).toHaveClass('badge-success');
    expect(
      screen.queryByRole('button', { name: 'Enroll' })
    ).not.toBeInTheDocument();
  });

  it('expands and collapses curriculum modules', () => {
    render(<CourseDetailTemplate />);
    expect(screen.getAllByRole('button', { name: 'Expand' })).toHaveLength(2);
    expect(screen.getByText('JSX Basics')).toBeInTheDocument();
    expect(screen.queryByText('Props')).not.toBeInTheDocument();
    fireEvent.click(screen.getAllByRole('button', { name: 'Expand' })[0]);
    expect(screen.getByText('Props')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Collapse' })).toHaveLength(2);
  });
});

describe('MyCoursesTemplate', () => {
  it('renders in-progress courses with progress bars', () => {
    render(<MyCoursesTemplate />);
    expect(
      screen.getByRole('heading', { name: 'My Courses' })
    ).toBeInTheDocument();
    expect(screen.getByText('Courses you are taking.')).toBeInTheDocument();
    expect(screen.getByText('2 courses in progress')).toBeInTheDocument();
    expect(screen.getByText('React Masterclass')).toBeInTheDocument();
    expect(
      screen.getByRole('progressbar', {
        name: 'Progress for React Masterclass',
      })
    ).toBeInTheDocument();
    expect(screen.getByText('65%')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Continue' })).toHaveLength(2);
  });

  it('switches between in-progress and completed tabs', () => {
    render(<MyCoursesTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Completed' }));
    expect(screen.getByText('UI Design Essentials')).toBeInTheDocument();
    expect(screen.queryByText('React Masterclass')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'In progress' }));
    expect(screen.getByText('React Masterclass')).toBeInTheDocument();
    expect(screen.queryByText('UI Design Essentials')).not.toBeInTheDocument();
  });

  it('shows the empty state once every course is completed', () => {
    render(<MyCoursesTemplate />);
    const continueButtons = () =>
      screen.getAllByRole('button', { name: 'Continue' });
    for (let i = 0; i < 4; i++) {
      fireEvent.click(continueButtons()[0]);
    }
    for (let i = 0; i < 7; i++) {
      fireEvent.click(continueButtons()[0]);
    }
    fireEvent.click(screen.getByRole('button', { name: 'In progress' }));
    expect(screen.getByText('No courses found')).toBeInTheDocument();
    expect(screen.getByText('0 courses in progress')).toBeInTheDocument();
  });
});

describe('LessonPlayerTemplate', () => {
  it('renders the lesson player with badges for the lesson list', () => {
    render(<LessonPlayerTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Lesson Player' })
    ).toBeInTheDocument();
    expect(screen.getByText('Watch and learn.')).toBeInTheDocument();
    expect(screen.getAllByText('Props and State')).toHaveLength(2);
    expect(screen.getByText('React Masterclass')).toBeInTheDocument();
    expect(screen.getByText('12:30')).toBeInTheDocument();
    expect(screen.getAllByText('Completed')).toHaveLength(2);
    expect(screen.getAllByText('Current lesson')).toHaveLength(1);
    expect(screen.getAllByText('Upcoming')).toHaveLength(2);
  });

  it('toggles between play and pause', () => {
    render(<LessonPlayerTemplate />);
    expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Play' }));
    expect(screen.getByRole('button', { name: 'Pause' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Pause' }));
    expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument();
  });

  it('marks the lesson complete and advances the lesson list', () => {
    render(<LessonPlayerTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Mark complete' }));
    expect(screen.getByText('Marked complete')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Mark complete' })
    ).not.toBeInTheDocument();
    expect(screen.getAllByText('Completed')).toHaveLength(4);
    expect(screen.getAllByText('Upcoming')).toHaveLength(1);
    expect(screen.getByText('Up next: Hooks Intro')).toBeInTheDocument();
  });
});

describe('QuizzesTemplate', () => {
  it('renders quizzes with statuses and best scores', () => {
    render(<QuizzesTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Quizzes' })
    ).toBeInTheDocument();
    expect(screen.getByText('Test your knowledge.')).toBeInTheDocument();
    expect(screen.getByText('4 quizzes')).toBeInTheDocument();
    expect(screen.getByText('React Hooks Quiz')).toBeInTheDocument();
    expect(screen.getByText('TypeScript Fundamentals')).toBeInTheDocument();
    expect(screen.getByText('10 questions')).toBeInTheDocument();
    expect(screen.getByText('Best score: 80%')).toBeInTheDocument();
    expect(screen.getAllByText('Passed')).toHaveLength(2);
    expect(screen.getAllByText('Not taken')).toHaveLength(1);
    expect(screen.getAllByText('Failed')).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: 'Start quiz' })).toHaveLength(
      4
    );
  });

  it('starts an untaken quiz and marks it passed with 100%', () => {
    render(<QuizzesTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Start quiz' })[1]);
    expect(screen.getAllByText('Passed')).toHaveLength(3);
    expect(screen.queryByText('Not taken')).not.toBeInTheDocument();
    expect(screen.getByText('Best score: 100%')).toBeInTheDocument();
  });

  it('starts a failed quiz and upgrades it to passed', () => {
    render(<QuizzesTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Start quiz' })[3]);
    expect(screen.getAllByText('Passed')).toHaveLength(3);
    expect(screen.queryByText('Failed')).not.toBeInTheDocument();
    expect(screen.getByText('Best score: 100%')).toBeInTheDocument();
  });
});

describe('AchievementsTemplate', () => {
  it('renders achievements with earned and locked badges', () => {
    render(<AchievementsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Achievements' })
    ).toBeInTheDocument();
    expect(screen.getByText('Badges you have earned.')).toBeInTheDocument();
    expect(screen.getByText('4 of 8 achievements earned')).toBeInTheDocument();
    expect(screen.getByText('First Steps')).toBeInTheDocument();
    expect(screen.getByText('Night Owl')).toBeInTheDocument();
    expect(screen.getAllByText('Earned')).toHaveLength(4);
    expect(screen.getAllByText('Locked')).toHaveLength(4);
  });

  it('hides locked achievements', () => {
    render(<AchievementsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Hide locked' }));
    expect(screen.getByText('First Steps')).toBeInTheDocument();
    expect(screen.queryByText('Night Owl')).not.toBeInTheDocument();
    expect(screen.getAllByText('Earned')).toHaveLength(4);
    expect(screen.queryByText('Locked')).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Show locked' })
    ).toBeInTheDocument();
  });

  it('shows locked achievements again after toggling', () => {
    render(<AchievementsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Hide locked' }));
    fireEvent.click(screen.getByRole('button', { name: 'Show locked' }));
    expect(screen.getByText('Night Owl')).toBeInTheDocument();
    expect(screen.getAllByText('Locked')).toHaveLength(4);
  });
});

describe('InstructorsTemplate', () => {
  it('renders instructors with their stats', () => {
    render(<InstructorsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Instructors' })
    ).toBeInTheDocument();
    expect(screen.getByText('Meet your teachers.')).toBeInTheDocument();
    expect(screen.getByText('4 instructors')).toBeInTheDocument();
    expect(screen.getByText('Sarah Chen')).toBeInTheDocument();
    expect(screen.getByText('Senior Frontend Engineer')).toBeInTheDocument();
    expect(screen.getByText('5 courses')).toBeInTheDocument();
    expect(screen.getAllByText('4.9 rating')).toHaveLength(2);
    expect(screen.getByText('8,200 students')).toBeInTheDocument();
  });

  it('filters instructors by search query', () => {
    render(<InstructorsTemplate />);
    const input = screen.getByRole('textbox', {
      name: 'Search instructors',
    });
    fireEvent.change(input, { target: { value: 'maya' } });
    expect(screen.getByText('1 instructors')).toBeInTheDocument();
    expect(screen.getByText('Maya Patel')).toBeInTheDocument();
    expect(screen.queryByText('Sarah Chen')).not.toBeInTheDocument();
  });

  it('shows the empty state when no instructor matches', () => {
    render(<InstructorsTemplate />);
    const input = screen.getByRole('textbox', {
      name: 'Search instructors',
    });
    fireEvent.change(input, { target: { value: 'zzz' } });
    expect(screen.getByText('No instructors found')).toBeInTheDocument();
    expect(screen.getByText('0 instructors')).toBeInTheDocument();
  });
});

describe('LearningAnalyticsTemplate', () => {
  it('renders the default week report with four stats', () => {
    render(<LearningAnalyticsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Learning Analytics' })
    ).toBeInTheDocument();
    expect(screen.getByText('Your progress at a glance.')).toBeInTheDocument();
    expect(screen.getAllByText('This week')).toHaveLength(2);
    expect(screen.getByText('This week report')).toBeInTheDocument();
    expect(screen.getByText('Study time')).toBeInTheDocument();
    expect(screen.getByText('8h 30m')).toBeInTheDocument();
    expect(screen.getByText('Courses completed')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('Lessons completed')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('Quiz average')).toBeInTheDocument();
    expect(screen.getByText('86%')).toBeInTheDocument();
  });

  it('switches to the month report', () => {
    render(<LearningAnalyticsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'This month' }));
    expect(screen.getByText('This month report')).toBeInTheDocument();
    expect(screen.getByText('30h 45m')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('48')).toBeInTheDocument();
    expect(screen.getByText('89%')).toBeInTheDocument();
    expect(screen.queryByText('8h 30m')).not.toBeInTheDocument();
  });

  it('switches to the year report', () => {
    render(<LearningAnalyticsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'This year' }));
    expect(screen.getByText('This year report')).toBeInTheDocument();
    expect(screen.getByText('180h 20m')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('156')).toBeInTheDocument();
    expect(screen.getByText('92%')).toBeInTheDocument();
  });
});

describe('Learning pages', () => {
  it('renders the CourseCatalogPage', () => {
    render(<CatalogPage />);
    expect(screen.getByText('6 courses')).toBeInTheDocument();
  });

  it('renders the CourseDetailPage', () => {
    render(<CoursePage />);
    expect(screen.getByText('1,240 students')).toBeInTheDocument();
  });

  it('renders the MyCoursesPage', () => {
    render(<MyCoursesPage />);
    expect(screen.getByText('2 courses in progress')).toBeInTheDocument();
  });

  it('renders the LessonPage', () => {
    render(<LessonPage />);
    expect(screen.getByText('12:30')).toBeInTheDocument();
  });

  it('renders the QuizzesPage', () => {
    render(<QuizzesPage />);
    expect(screen.getByText('4 quizzes')).toBeInTheDocument();
  });

  it('renders the AchievementsPage', () => {
    render(<AchievementsPage />);
    expect(screen.getByText('4 of 8 achievements earned')).toBeInTheDocument();
  });

  it('renders the InstructorsPage', () => {
    render(<InstructorsPage />);
    expect(screen.getByText('8,200 students')).toBeInTheDocument();
  });

  it('renders the AnalyticsPage', () => {
    render(<AnalyticsPage />);
    expect(screen.getByText('8h 30m')).toBeInTheDocument();
  });
});
