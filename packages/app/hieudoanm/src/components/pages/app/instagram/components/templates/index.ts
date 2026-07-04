import type { FC } from 'react';

import { Comparison } from './compare/Comparison';
import { MythVsFact } from './compare/MythVsFact';
import { ProsCons } from './compare/ProsCons';
import { RatingScale } from './compare/RatingScale';
import { SplitScreen } from './compare/SplitScreen';
import { Versus } from './compare/Versus';
import { Counter } from './data/Counter';
import { DataStats } from './data/DataStats';
import { FeatureGrid } from './data/FeatureGrid';
import { ProgressList } from './data/ProgressList';
import { StatRow } from './data/StatRow';
import { Timeline } from './data/Timeline';
import { CourseHighlight } from './education/CourseHighlight';
import { FlashCard } from './education/FlashCard';
import { LearningPath } from './education/LearningPath';
import { QuickQuiz } from './education/QuickQuiz';
import { StudyTips } from './education/StudyTips';
import { SubjectSummary } from './education/SubjectSummary';
import { BillReminder } from './finance/BillReminder';
import { BudgetTracker } from './finance/BudgetTracker';
import { ExpenseLog } from './finance/ExpenseLog';
import { FinancialPlan } from './finance/FinancialPlan';
import { InvestmentTip } from './finance/InvestmentTip';
import { SavingsGoal } from './finance/SavingsGoal';
import { ChallengeCalendar } from './fitness/ChallengeCalendar';
import { ExerciseGuide } from './fitness/ExerciseGuide';
import { FitnessGoal } from './fitness/FitnessGoal';
import { ProgressTracker } from './fitness/ProgressTracker';
import { WorkoutRoutine } from './fitness/WorkoutRoutine';
import { YogaPose } from './fitness/YogaPose';
import { CocktailRecipe } from './food/CocktailRecipe';
import { FoodReview } from './food/FoodReview';
import { IngredientSpotlight } from './food/IngredientSpotlight';
import { MenuHighlights } from './food/MenuHighlights';
import { NutritionFacts } from './food/NutritionFacts';
import { RecipeCard } from './food/RecipeCard';
import { MeditationGuide } from './health/MeditationGuide';
import { MoodTracker } from './health/MoodTracker';
import { SleepTips } from './health/SleepTips';
import { WaterTracker } from './health/WaterTracker';
import { WellnessTip } from './health/WellnessTip';
import { WorkoutCard } from './health/WorkoutCard';
import { Affirmation } from './inspirational/Affirmation';
import { BeliefCard } from './inspirational/BeliefCard';
import { DailyWisdom } from './inspirational/DailyWisdom';
import { Manifesto } from './inspirational/Manifesto';
import { MissionStatement } from './inspirational/MissionStatement';
import { VisionBoard } from './inspirational/VisionBoard';
import { ChallengeCard } from './interactive/ChallengeCard';
import { FillBlank } from './interactive/FillBlank';
import { PollVote } from './interactive/PollVote';
import { QandA } from './interactive/QandA';
import { QuizQuestion } from './interactive/QuizQuestion';
import { ThisOrThat } from './interactive/ThisOrThat';
import { BulletList } from './list/BulletList';
import { Checklist } from './list/Checklist';
import { Listicle } from './list/Listicle';
import { Ranking } from './list/Ranking';
import { StepByStep } from './list/StepByStep';
import { StepsHorizontal } from './list/StepsHorizontal';
import { Announcement } from './marketing/Announcement';
import { FAQ } from './marketing/FAQ';
import { Glossary } from './marketing/Glossary';
import { OfferBanner } from './marketing/OfferBanner';
import { PricingCard } from './marketing/PricingCard';
import { Question } from './marketing/Question';
import { CardOverlay } from './media/CardOverlay';
import { CinemaBanner } from './media/CinemaBanner';
import { Collage } from './media/Collage';
import { FullBleed } from './media/FullBleed';
import { Mosaic } from './media/Mosaic';
import { VideoStill } from './media/VideoStill';
import { EventCard } from './social/EventCard';
import { Mention } from './social/Mention';
import { ProfileCard } from './social/ProfileCard';
import { ShareCTA } from './social/ShareCTA';
import { TeamRow } from './social/TeamRow';
import { Testimonial } from './social/Testimonial';
import { BoldQuote } from './text/BoldQuote';
import { Haiku } from './text/Haiku';
import { Minimal } from './text/Minimal';
import { PullQuote } from './text/PullQuote';
import { Takeaway } from './text/Takeaway';
import { TipCard } from './text/TipCard';
import { BucketList } from './travel/BucketList';
import { DestinationGuide } from './travel/DestinationGuide';
import { LandmarkSpotlight } from './travel/LandmarkSpotlight';
import { PackingList } from './travel/PackingList';
import { TravelTip } from './travel/TravelTip';
import { TripItinerary } from './travel/TripItinerary';
import { Mobile } from './device/Mobile';
import { FileTree } from './device/FileTree';
import { SmartWatch } from './device/SmartWatch';
import { Terminal } from './device/Terminal';
import { Browser } from './device/Browser';
import { Code } from './device/Code';

import type { TemplateProps } from './common';

export const TEMPLATE_MAP: Record<string, FC<TemplateProps>> = {
  minimal: Minimal,
  'bold-quote': BoldQuote,
  'pull-quote': PullQuote,
  haiku: Haiku,
  takeaway: Takeaway,
  'tip-card': TipCard,
  'split-screen': SplitScreen,
  comparison: Comparison,
  'myth-vs-fact': MythVsFact,
  proscons: ProsCons,
  versus: Versus,
  'rating-scale': RatingScale,
  'card-overlay': CardOverlay,
  'full-bleed': FullBleed,
  mosaic: Mosaic,
  'video-still': VideoStill,
  'cinema-banner': CinemaBanner,
  collage: Collage,
  timeline: Timeline,
  'data-stats': DataStats,
  'feature-grid': FeatureGrid,
  'stat-row': StatRow,
  'progress-list': ProgressList,
  counter: Counter,
  listicle: Listicle,
  checklist: Checklist,
  'step-by-step': StepByStep,
  'steps-horizontal': StepsHorizontal,
  'bullet-list': BulletList,
  ranking: Ranking,
  announcement: Announcement,
  faq: FAQ,
  glossary: Glossary,
  'pricing-card': PricingCard,
  question: Question,
  'offer-banner': OfferBanner,
  'profile-card': ProfileCard,
  testimonial: Testimonial,
  'team-row': TeamRow,
  'event-card': EventCard,
  'share-cta': ShareCTA,
  mention: Mention,
  affirmation: Affirmation,
  manifesto: Manifesto,
  'vision-board': VisionBoard,
  'daily-wisdom': DailyWisdom,
  'mission-statement': MissionStatement,
  'belief-card': BeliefCard,
  'poll-vote': PollVote,
  'quiz-question': QuizQuestion,
  'this-or-that': ThisOrThat,
  'challenge-card': ChallengeCard,
  'fill-blank': FillBlank,
  'q-and-a': QandA,
  'study-tips': StudyTips,
  'flash-card': FlashCard,
  'subject-summary': SubjectSummary,
  'learning-path': LearningPath,
  'quick-quiz': QuickQuiz,
  'course-highlight': CourseHighlight,
  'budget-tracker': BudgetTracker,
  'savings-goal': SavingsGoal,
  'expense-log': ExpenseLog,
  'investment-tip': InvestmentTip,
  'financial-plan': FinancialPlan,
  'bill-reminder': BillReminder,
  'workout-routine': WorkoutRoutine,
  'exercise-guide': ExerciseGuide,
  'progress-tracker': ProgressTracker,
  'yoga-pose': YogaPose,
  'challenge-calendar': ChallengeCalendar,
  'fitness-goal': FitnessGoal,
  'recipe-card': RecipeCard,
  'menu-highlights': MenuHighlights,
  'nutrition-facts': NutritionFacts,
  'ingredient-spotlight': IngredientSpotlight,
  'cocktail-recipe': CocktailRecipe,
  'food-review': FoodReview,
  'meditation-guide': MeditationGuide,
  'workout-card': WorkoutCard,
  'water-tracker': WaterTracker,
  'sleep-tips': SleepTips,
  'mood-tracker': MoodTracker,
  'wellness-tip': WellnessTip,
  'destination-guide': DestinationGuide,
  'packing-list': PackingList,
  'trip-itinerary': TripItinerary,
  'bucket-list': BucketList,
  'travel-tip': TravelTip,
  'landmark-spotlight': LandmarkSpotlight,
  mobile: Mobile,
  desktop: FileTree,
  'smart-watch': SmartWatch,
  terminal: Terminal,
  browser: Browser,
  laptop: Code,
};
