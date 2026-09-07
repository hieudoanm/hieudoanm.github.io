import { render, screen } from '@testing-library/react';
import type { NextPage } from 'next';
import RepeatedGamesPage from '@/app/(theory)/repeated-games/page';
import BackwardInductionPage from '@/app/(theory)/backward-induction/page';
import BargainingTheoryPage from '@/app/(theory)/bargaining-theory/page';
import CoordinationGamesPage from '@/app/(theory)/coordination-games/page';
import EvolutionaryGameTheoryPage from '@/app/(theory)/evolutionary-game-theory/page';
import GameTheoryBasicsPage from '@/app/(theory)/game-theory-basics/page';
import ImperfectCompetitionPage from '@/app/(theory)/imperfect-competition/page';
import PriceDiscriminationPage from '@/app/(theory)/price-discrimination/page';
import ConsumerTheoryPage from '@/app/(theory)/consumer-theory/page';
import ProductionCostsPage from '@/app/(theory)/production-and-costs/page';
import PerfectCompetitionPage from '@/app/(theory)/perfect-competition/page';
import TimeValuePage from '@/app/(theory)/time-value-of-money/page';
import MarketFailuresPage from '@/app/(theory)/market-failures/page';
import GDPPage from '@/app/(theory)/gdp-and-national-accounts/page';
import AggregateDemandSupplyPage from '@/app/(theory)/aggregate-demand-supply/page';
import PhillipsCurvePage from '@/app/(theory)/phillips-curve/page';
import BusinessCyclesPage from '@/app/(theory)/business-cycles/page';
import FiscalPolicyPage from '@/app/(theory)/fiscal-policy/page';
import ISLMPage from '@/app/(theory)/is-lm-model/page';
import UnemploymentPage from '@/app/(theory)/unemployment-okuns-law/page';
import EMHPage from '@/app/(theory)/efficient-market-hypothesis/page';
import CAPMPage from '@/app/(theory)/capm-and-risk/page';
import BehavioralFinancePage from '@/app/(theory)/behavioral-finance/page';
import PortfolioTheoryPage from '@/app/(theory)/portfolio-theory/page';
import ArbitragePage from '@/app/(theory)/arbitrage/page';
import MentalAccountingPage from '@/app/(theory)/mental-accounting/page';
import EndowmentEffectPage from '@/app/(theory)/endowment-effect/page';
import SocialPreferencesPage from '@/app/(theory)/social-preferences/page';
import OverconfidencePage from '@/app/(theory)/overconfidence-bias/page';
import HumanCapitalPage from '@/app/(theory)/human-capital/page';
import PovertyTrapsPage from '@/app/(theory)/poverty-traps/page';
import MigrationPage from '@/app/(theory)/migration-economics/page';

const pages: Array<{ slug: string; Comp: NextPage }> = [
  { slug: 'repeated-games', Comp: RepeatedGamesPage },
  { slug: 'backward-induction', Comp: BackwardInductionPage },
  { slug: 'bargaining-theory', Comp: BargainingTheoryPage },
  { slug: 'coordination-games', Comp: CoordinationGamesPage },
  { slug: 'evolutionary-game-theory', Comp: EvolutionaryGameTheoryPage },
  { slug: 'game-theory-basics', Comp: GameTheoryBasicsPage },
  { slug: 'imperfect-competition', Comp: ImperfectCompetitionPage },
  { slug: 'price-discrimination', Comp: PriceDiscriminationPage },
  { slug: 'consumer-theory', Comp: ConsumerTheoryPage },
  { slug: 'production-and-costs', Comp: ProductionCostsPage },
  { slug: 'perfect-competition', Comp: PerfectCompetitionPage },
  { slug: 'time-value-of-money', Comp: TimeValuePage },
  { slug: 'market-failures', Comp: MarketFailuresPage },
  { slug: 'gdp-and-national-accounts', Comp: GDPPage },
  { slug: 'aggregate-demand-supply', Comp: AggregateDemandSupplyPage },
  { slug: 'phillips-curve', Comp: PhillipsCurvePage },
  { slug: 'business-cycles', Comp: BusinessCyclesPage },
  { slug: 'fiscal-policy', Comp: FiscalPolicyPage },
  { slug: 'is-lm-model', Comp: ISLMPage },
  { slug: 'unemployment-okuns-law', Comp: UnemploymentPage },
  { slug: 'efficient-market-hypothesis', Comp: EMHPage },
  { slug: 'capm-and-risk', Comp: CAPMPage },
  { slug: 'behavioral-finance', Comp: BehavioralFinancePage },
  { slug: 'portfolio-theory', Comp: PortfolioTheoryPage },
  { slug: 'arbitrage', Comp: ArbitragePage },
  { slug: 'mental-accounting', Comp: MentalAccountingPage },
  { slug: 'endowment-effect', Comp: EndowmentEffectPage },
  { slug: 'social-preferences', Comp: SocialPreferencesPage },
  { slug: 'overconfidence-bias', Comp: OverconfidencePage },
  { slug: 'human-capital', Comp: HumanCapitalPage },
  { slug: 'poverty-traps', Comp: PovertyTrapsPage },
  { slug: 'migration-economics', Comp: MigrationPage },
];

describe('theory pages', () => {
  it.each(pages.map((p) => [p.slug, p.Comp] as const))(
    '%s renders a title heading and section cards',
    (_slug, Comp) => {
      render(<Comp />);
      expect(
        screen.getAllByRole('heading', { level: 1 }).length
      ).toBeGreaterThan(0);
      expect(
        screen.getAllByRole('heading', { level: 2 }).length
      ).toBeGreaterThanOrEqual(4);
      screen.getAllByRole('heading', { level: 2 }).forEach((h) => {
        expect(h).toBeInTheDocument();
      });
    }
  );
});
