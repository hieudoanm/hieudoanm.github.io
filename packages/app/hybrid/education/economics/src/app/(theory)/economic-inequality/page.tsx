'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const InequalityPage: NextPage = () => (
  <TheoryTemplate
    title="Economic Inequality"
    subtitle="How wealth and income are distributed—and why the gap keeps widening."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            <strong>Economic inequality</strong> refers to how unevenly income
            and wealth are distributed across a population. It is measured with
            tools like the <strong>Gini coefficient</strong> (0 = perfect
            equality, 1 = total concentration) and the share of income held by
            the top 10% or 1%. Inequality shapes opportunity, social stability,
            and the effectiveness of policy—and it has risen sharply in many
            countries since the 1980s.
          </p>
        ),
      },
      {
        title: 'Measuring it',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Income vs wealth:</strong> Income is the flow earned each
              year; wealth is the accumulated stock of assets. Wealth inequality
              is usually much larger than income inequality because wealth
              compounds and concentrates across generations.
            </p>
            <p>
              <strong>Gini coefficient:</strong> A single number summarizing the
              concentration of a distribution—derived from the Lorenz curve by
              comparing actual distribution to a perfectly equal one.
            </p>
            <p>
              <strong>Top shares and percentiles:</strong> Banerjee and Piketty
              popularized tracking the income share of the top 1% or 0.1% to see
              where growth is really going.
            </p>
          </div>
        ),
      },
      {
        title: 'Causes',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Technology and skills:</strong> Skills-biased
              technological change rewards the highly educated while automating
              routine work, widening the pay gap between skilled and unskilled.
            </p>
            <p>
              <strong>Globalization and offshoring:</strong> Trade with low-wage
              countries puts downward pressure on wages for less-skilled workers
              in advanced economies.
            </p>
            <p>
              <strong>Capital income and returns:</strong> As economist Thomas
              Piketty emphasized, when the return on capital exceeds economic
              growth (r &gt; g), wealth accumulates faster than incomes, driving
              inherited inequality.
            </p>
            <p>
              <strong>Institutions and policy:</strong> Taxation, education
              access, union strength, and inheritance laws all shape how income
              and wealth are distributed.
            </p>
          </div>
        ),
      },
      {
        title: 'Consequences and responses',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Opportunity:</strong> High inequality can entrench unequal
              access to education, health, and opportunity, reducing social
              mobility for the next generation.
            </p>
            <p>
              <strong>Growth and stability:</strong> Moderate redistribution can
              support growth and social stability, while extreme inequality may
              fuel instability and reduce aggregate demand.
            </p>
            <p>
              <strong>Policy tools:</strong> Progressive taxation, social
              transfers, universal education, and inheritance taxes redistribute
              and equalize opportunity; the design of these is hotly debated.
            </p>
            <p>
              <strong>A rising global phenomenon:</strong> Within-country
              inequality is rising in many places even as global-between-country
              inequality falls—both trends matter for policy and political
              dynamics.
            </p>
          </div>
        ),
      },
    ]}
    references={[
      {
        href: 'https://en.wikipedia.org/wiki/Economic_inequality',
        label: 'Wikipedia: Economic Inequality',
        description:
          'Comprehensive overview of income and wealth inequality, measurement tools, and causes.',
      },
      {
        href: 'https://ourworldindata.org/economic-inequality',
        label: 'Our World in Data: Economic Inequality',
        description:
          'Data-driven exploration of global inequality trends, causes, and consequences.',
      },
      {
        href: 'https://www.investopedia.com/terms/g/gini-index.asp',
        label: 'Investopedia: Gini Index',
        description:
          'Entry defining the Gini coefficient and its use in measuring income distribution.',
      },
    ]}
  />
);

export default InequalityPage;
