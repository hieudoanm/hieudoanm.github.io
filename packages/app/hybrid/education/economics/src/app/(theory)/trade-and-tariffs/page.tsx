'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const TradeTariffsPage: NextPage = () => (
  <TheoryTemplate
    title="Trade & Tariffs"
    subtitle="Why countries benefit from trading—and what tariffs really cost."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            <strong>International trade</strong> is the exchange of goods and
            services across borders. The core economic insight—that trade makes
            both partners better off through specialization—extends the logic of
            comparative advantage to whole nations. A <strong>tariff</strong> is
            a tax on imported goods, designed to protect domestic industries.
            Tariffs have complex effects: they help some producers but raise
            prices for consumers and distort trade.
          </p>
        ),
      },
      {
        title: 'Why trade works',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Comparative advantage:</strong> Each country should
              specialize in what it produces at the lowest relative opportunity
              cost, then trade. Total global output rises, and both partners can
              consume more than they could produce alone.
            </p>
            <p>
              <strong>Economies of scale:</strong> Serving a global market lets
              producers reach larger scale and lower per-unit costs.
            </p>
            <p>
              <strong>Variety and inputs:</strong> Trade gives consumers more
              choices and firms access to cheaper or higher-quality inputs.
            </p>
            <p>
              <strong>It is positive-sum:</strong> Unlike zero-sum competition,
              voluntary trade creates value—both sides gain from the exchange.
            </p>
          </div>
        ),
      },
      {
        title: 'The costs of protection',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Consumers pay more:</strong> A tariff raises the price of
              the imported good and often of domestic substitutes too, so
              households bear the cost.
            </p>
            <p>
              <strong>Deadweight loss:</strong> Tariffs cause a net loss to
              society—consumers lose more than producers and the government
              gain. They distort choices away from efficient production.
            </p>
            <p>
              <strong>Retaliation:</strong> Tariffs invite tit-for-tat
              responses, shrinking trade for everyone and raising costs along
              entire supply chains.
            </p>
            <p>
              <strong>Who actually benefits:</strong> The gains concentrate in
              protected industries; the losses spread thinly to millions of
              consumers, making protection politically appealing despite its
              overall cost.
            </p>
          </div>
        ),
      },
      {
        title: 'Trade policy in practice',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Free trade agreements:</strong> Deals like the EU and
              USMCA reduce tariffs and other barriers, boosting trade among
              members while restructuring production and employment within them.
            </p>
            <p>
              <strong>Adjustment costs:</strong> Even when trade benefits a
              country overall, some workers and regions are hurt. Policies that
              retrain and support displaced workers are essential complements to
              free trade—this is a central debate.
            </p>
            <p>
              <strong>Strategic concerns:</strong> Governments sometimes
              restrict trade for national security, food security, or to nurture
              nascent industries—trading some efficiency for other objectives.
            </p>
            <p>
              <strong>The bottom line:</strong> Economists broadly agree that
              trade raises welfare on average, but the distribution of gains and
              losses and the best policy response remains contested.
            </p>
          </div>
        ),
      },
    ]}
    references={[
      {
        href: 'https://en.wikipedia.org/wiki/Comparative_advantage',
        label: 'Wikipedia: Comparative advantage',
        description:
          "Ricardo's theory of comparative advantage and gains from trade.",
      },
      {
        href: 'https://www.investopedia.com/terms/t/tariff.asp',
        label: 'Investopedia: Tariff',
        description:
          'Definition of tariffs, types, and their economic effects on trade.',
      },
      {
        href: 'https://www.investopedia.com/terms/c/comparativeadvantage.asp',
        label: 'Investopedia: Comparative Advantage',
        description:
          'Comparative advantage explained with examples of mutually beneficial trade.',
      },
    ]}
  />
);

export default TradeTariffsPage;
