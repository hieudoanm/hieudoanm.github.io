'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const HumanCapitalPage: NextPage = () => (
  <TheoryTemplate
    title="Human Capital"
    subtitle="Investing in people—education, skills, and health—as a driver of productivity and growth."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            <strong>Human capital</strong> is the stock of knowledge, skills,
            health, and abilities that people accumulate through education,
            training, and experience, which makes them more productive. The
            economist Gary Becker modeled it as an investment: people give up
            time and money today to build skills that pay higher earnings in the
            future—much like investing in physical capital.
          </p>
        ),
      },
      {
        title: 'Investing in people',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Education:</strong> Formal schooling raises earnings and
              productivity; the return to schooling is consistently high across
              countries.
            </p>
            <p>
              <strong>On-the-job training:</strong> Firms and workers invest in
              skills through training that boosts productivity and wages.
            </p>
            <p>
              <strong>Health and nutrition:</strong> Healthier, well-nourished
              workers are more productive and can work more—health is a vital
              form of human capital, especially in developing economies.
            </p>
          </div>
        ),
      },
      {
        title: 'The returns',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Individual returns:</strong> More education and skill are
              strongly associated with higher lifetime earnings—one of the most
              reliable regularities in economics.
            </p>
            <p>
              <strong>Growth returns:</strong> A better-educated workforce
              raises productivity and innovation, helping explain why some
              countries grow faster than others (see Development Economics).
            </p>
            <p>
              <strong>Spillovers:</strong> Education benefits society beyond the
              individual through ideas, innovation, and healthier, more engaged
              citizens—justifying public investment.
            </p>
          </div>
        ),
      },
      {
        title: 'Limits and policy',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Financing constraints:</strong> Credit-constrained
              families under-invest in education even when returns are high,
              because they can&rsquo;t borrow against future earnings—a source
              of poverty traps.
            </p>
            <p>
              <strong>Match matters:</strong> Formal schooling alone isn&rsquo;t
              enough; skills must match labor-market needs for returns to
              materialize.
            </p>
            <p>
              <strong>Policy role:</strong> Public schooling, scholarships, and
              job-training programs address under-investment and spread the
              gains of human capital more broadly.
            </p>
          </div>
        ),
      },
    ]}
    links={[
      {
        href: '/human-capital/decision',
        label: 'Human Capital Decision',
        description:
          'Interactive simulator: choose years of schooling and weigh discounted lifetime earnings against tuition costs.',
      },
    ]}
    references={[
      {
        href: 'https://en.wikipedia.org/wiki/Human_capital',
        label: 'Wikipedia: Human Capital',
        description:
          'Overview of human capital theory, investment in education, and economic returns.',
      },
      {
        href: 'https://www.nobelprize.org/prizes/economic-sciences/1992/summary/',
        label: 'Nobel Prize: 1992 Economic Sciences',
        description:
          'Nobel citation for Gary Becker for extending microeconomic analysis to human behavior.',
      },
      {
        href: 'https://www.investopedia.com/terms/h/humancapital.asp',
        label: 'Investopedia: Human Capital',
        description:
          'Entry defining human capital and its role in productivity and economic growth.',
      },
    ]}
  />
);

export default HumanCapitalPage;
