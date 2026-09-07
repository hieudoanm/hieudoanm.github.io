'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const GDPPage: NextPage = () => (
  <TheoryTemplate
    title="GDP & National Accounts"
    subtitle="How economists measure the size and growth of an entire economy."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            <strong>Gross Domestic Product (GDP)</strong> is the total market
            value of all final goods and services produced within a country in a
            given period. It is the headline measure of economic size and
            growth. The <strong>national accounts</strong> are the system for
            tracking this, built so that production, income, and expenditure all
            measure the same economy from different angles.
          </p>
        ),
      },
      {
        title: 'Ways to measure it',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Expenditure approach:</strong> GDP = Consumption +
              Investment + Government spending + Net exports (C + I + G + NX).
              Everything produced is bought by someone.
            </p>
            <p>
              <strong>Income approach:</strong> Sum all incomes earned in
              production—wages, profits, rents, and interest. What is spent is
              ultimately someone&rsquo;s income.
            </p>
            <p>
              <strong>Production approach:</strong> Sum the value added at each
              stage of production, avoiding double-counting intermediate goods.
            </p>
            <p>
              <strong>They agree:</strong> In theory all three approaches give
              the same total, which is why national accounts are a coherent
              system.
            </p>
          </div>
        ),
      },
      {
        title: 'Nominal vs real GDP',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Nominal GDP:</strong> Valued at current-year prices, so it
              rises with both output and inflation.
            </p>
            <p>
              <strong>Real GDP:</strong> Valued at constant (base-year) prices,
              removing inflation to measure actual physical output growth.
            </p>
            <p>
              <strong>The GDP deflator:</strong> Nominal GDP divided by real
              GDP, giving a broad measure of the overall price level.
            </p>
            <p>
              <strong>Per capita growth:</strong> Real GDP per person is the key
              gauge of living standards and how fast an economy&rsquo;s average
              citizen is getting richer.
            </p>
          </div>
        ),
      },
      {
        title: 'Limits of GDP',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Ignores wellbeing:</strong> GDP counts market activity but
              not leisure, health, environmental damage, or income distribution.
            </p>
            <p>
              <strong>Excludes non-market work:</strong> Unpaid work like
              childcare and household labor is largely invisible to GDP.
            </p>
            <p>
              <strong>Measures flow, not stock:</strong> It tracks new
              production, not accumulated wealth or sustainability of future
              output.
            </p>
            <p>
              <strong>Alternatives:</strong> Indicators like the Human
              Development Index and Genuine Progress Indicator try to capture
              broader wellbeing, but GDP remains the standard headline measure.
            </p>
          </div>
        ),
      },
    ]}
  />
);

export default GDPPage;
