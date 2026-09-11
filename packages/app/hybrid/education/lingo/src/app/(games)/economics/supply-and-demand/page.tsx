'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const SupplyDemandPage: NextPage = () => (
  <TheoryTemplate
    title="Supply & Demand"
    subtitle="The two forces that set almost every price in a market economy."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            <strong>Supply and demand</strong> is the foundational model of
            market prices. <strong>Demand</strong> captures how much of a good
            buyers want at each price (typically more at lower prices), while{' '}
            <strong>supply</strong> captures how much sellers are willing to
            provide (typically more at higher prices). The price where the two
            meet is the <strong>equilibrium</strong>—where the quantity buyers
            want exactly matches what sellers offer.
          </p>
        ),
      },
      {
        title: 'The demand side',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>The law of demand:</strong> As price rises, quantity
              demanded falls. Higher prices make a good less attractive and pull
              spending toward substitutes.
            </p>
            <p>
              <strong>Determinants beyond price:</strong> Income, tastes, the
              price of substitutes and complements, and expectations shift the
              whole demand curve—moving it left or right rather than along it.
            </p>
            <p>
              <strong>The demand curve:</strong> Slopes downward. A movement
              along it reflects a price change; a shift reflects a change in an
              underlying determinant.
            </p>
          </div>
        ),
      },
      {
        title: 'The supply side',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>The law of supply:</strong> As price rises, quantity
              supplied rises. Higher prices make production more profitable,
              drawing in more sellers and more output.
            </p>
            <p>
              <strong>Determinants beyond price:</strong> Input costs,
              technology, expectations, and the number of sellers shift the
              supply curve.
            </p>
            <p>
              <strong>The supply curve:</strong> Slopes upward. Costlier
              production at the margin means sellers need higher prices to
              supply more.
            </p>
          </div>
        ),
      },
      {
        title: 'Why it matters',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Market equilibrium:</strong> At the crossing point, there
              is no shortage or surplus. Prices naturally gravitate there:
              excess supply forces prices down, excess demand pushes them up.
            </p>
            <p>
              <strong>The invisible hand:</strong> Adam Smith observed that
              individuals seeking only their own gain are guided to produce what
              society wants, as if by an invisible hand—supply and demand is its
              mechanism.
            </p>
            <p>
              <strong>Policy tools:</strong> Price ceilings, floors, taxes, and
              subsidies all distort the market by moving prices away from
              equilibrium, producing shortages or surpluses.
            </p>
            <p>
              <strong>Allocation:</strong> Prices ration scarce goods to those
              who value them most and signal producers where to direct
              resources.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/economics/supply-and-demand/price-lab',
        label: 'Price Lab',
        description:
          'Drag the curves and see equilibrium, shortages, surpluses and elasticity live.',
      },
    ]}
    references={[
      {
        href: 'https://en.wikipedia.org/wiki/Supply_and_demand',
        label: 'Wikipedia: Supply and demand',
        description:
          'Foundational model of how supply and demand determine market prices and quantities.',
      },
      {
        href: 'https://www.investopedia.com/terms/s/supply.asp',
        label: 'Investopedia: Supply',
        description:
          'Definition of supply, the supply curve, and the factors that shift it.',
      },
      {
        href: 'https://www.investopedia.com/terms/l/law-of-supply-demand.asp',
        label: 'Investopedia: Law of Supply and Demand',
        description:
          'The law of supply and demand and its role in reaching market equilibrium.',
      },
    ]}
  />
);

export default SupplyDemandPage;
