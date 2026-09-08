'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const ElasticityPage: NextPage = () => (
  <TheoryTemplate
    title="Elasticity"
    subtitle="How much do buyers and sellers really respond when prices change?"
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            <strong>Elasticity</strong> measures how strongly quantity demanded
            or supplied responds to a change in price (or income). It answers
            the question &ldquo;by what percentage does quantity change when
            price changes by one percent?&rdquo; Goods that react a lot are{' '}
            <strong>elastic</strong>; those that barely budge are{' '}
            <strong>inelastic</strong>. Knowing elasticity tells businesses and
            governments how price changes will ripple through a market.
          </p>
        ),
      },
      {
        title: 'Price elasticity of demand',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Elastic demand:</strong> Quantity changes more than
              proportionally to price. Luxury goods, items with close
              substitutes, and big-ticket purchases are typically elastic—a
              small hike in price sharply cuts purchases.
            </p>
            <p>
              <strong>Inelastic demand:</strong> Quantity barely changes with
              price. Essentials like insulin, salt, and gasoline are inelastic
              because buyers cannot easily switch or go without.
            </p>
            <p>
              <strong>What drives it:</strong> Availability of substitutes is
              the biggest factor. Fewer substitutes, smaller budget share, and
              short time horizons all make demand more inelastic.
            </p>
          </div>
        ),
      },
      {
        title: 'Elasticity and revenue',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>The key business insight:</strong> If demand is elastic,
              raising price lowers total revenue (quantity falls faster than
              price rises). If demand is inelastic, raising price raises
              revenue.
            </p>
            <p>
              <strong>Unit elastic:</strong> At the point where elasticity
              equals one, total revenue is maximized—further price moves in
              either direction reduce it.
            </p>
            <p>
              <strong>Strategic use:</strong> Airlines, streaming services, and
              tax authorities exploit differences in elasticity to price
              discriminate and optimize revenue.
            </p>
          </div>
        ),
      },
      {
        title: 'Why it matters',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Tax incidence:</strong> Whether a tax lands on buyers or
              sellers depends on relative elasticities. The more inelastic side
              bears more of the burden—regardless of who legally pays it.
            </p>
            <p>
              <strong>Opioid and tobacco policy:</strong> Taxes on cigarettes
              reduce consumption more among price-sensitive young people,
              because their demand is more elastic.
            </p>
            <p>
              <strong>Supply elasticity:</strong> Over time supply becomes more
              elastic as producers find alternatives, which is why long-run
              responses often differ sharply from short-run reactions.
            </p>
            <p>
              <strong>Income elasticity:</strong> It separates necessities from
              luxuries—necessities have low income elasticity, luxuries
              high—shaping how spending shifts as nations grow richer.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/elasticity/pricing',
        label: 'Revenue Explorer',
        description:
          'Pick prices under different demand elasticities and find the revenue-maximizing spot where |elasticity| equals one.',
      },
    ]}
    references={[
      {
        href: 'https://en.wikipedia.org/wiki/Price_elasticity_of_demand',
        label: 'Wikipedia: Price Elasticity of Demand',
        description:
          'Detailed explanation of demand elasticity, determinants, and measurement.',
      },
      {
        href: 'https://www.khanacademy.org/economics-finance-domain/microeconomics/price-consumer-producer-surplus/elasticity-tutorial/a/price-elasticity-of-demand',
        label: 'Khan Academy: Price Elasticity of Demand',
        description:
          'Tutorial covering elasticity concepts, calculation, and real-world applications.',
      },
      {
        href: 'https://www.investopedia.com/terms/e/elasticity.asp',
        label: 'Investopedia: Elasticity',
        description:
          'Entry defining elasticity and its types in economics and finance.',
      },
    ]}
  />
);

export default ElasticityPage;
