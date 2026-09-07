'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const LaborMarketsPage: NextPage = () => (
  <TheoryTemplate
    title="Labor Markets & Minimum Wage"
    subtitle="How wages, jobs, and hours are set—and what forcing up the wage floor really does."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            The <strong>labor market</strong> matches workers&rsquo; supply of
            effort with firms&rsquo; demand for it, setting wages and
            employment. In a competitive model, a worker&rsquo;s pay reflects
            their marginal contribution to output. The{' '}
            <strong>minimum wage</strong> is a legally imposed floor on wages,
            designed to lift the earnings of the lowest-paid. Whether it helps
            or hurts depends on how firms and workers adjust—a question with
            some of the most fiercely debated evidence in economics.
          </p>
        ),
      },
      {
        title: 'How wages form',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Demand for labor:</strong> Firms hire up to the point
              where an additional worker&rsquo;s contribution (marginal product)
              equals the wage. Higher wages or lower productivity reduce hiring.
            </p>
            <p>
              <strong>Supply of labor:</strong> Workers offer more hours when
              wages rise—though beyond a point higher wages can reduce hours as
              people choose more leisure.
            </p>
            <p>
              <strong>Equilibrium wage:</strong> The wage clears the market
              where the quantity of labor supplied equals the quantity demanded.
              Deviations from it create unemployment or labor shortages.
            </p>
          </div>
        ),
      },
      {
        title: 'The minimum wage debate',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>The classic view:</strong> If the floor is set above the
              market wage, firms demand fewer workers and hire less—the
              canonical textbook prediction is some job loss, especially among
              the youngest and least-skilled workers.
            </p>
            <p>
              <strong>The monopsony view:</strong> When employers have market
              power (few firms hiring in a town), they pay below the competitive
              wage. A moderate minimum wage can then raise wages without
              reducing jobs—possibly even increasing employment.
            </p>
            <p>
              <strong>The evidence:</strong> Empirical studies, including the
              famous Card &amp; Krueger fast-food experiment (Nobel 2021), found
              little employment effect from modest minimum-wage increases. The
              consensus is that modest floors mostly raise pay with small
              employment effects, while very high floors can cause measurable
              job loss.
            </p>
          </div>
        ),
      },
      {
        title: 'Who it affects',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Low-wage workers:</strong> Minimum wages directly raise
              the earnings of those at the bottom, often reducing poverty—though
              many beneficiaries are teenagers and second earners in non-poor
              households.
            </p>
            <p>
              <strong>Teenagers and part-timers:</strong> The least-experienced
              workers face the highest risk of reduced hiring when the floor
              rises.
            </p>
            <p>
              <strong>Prices and employers:</strong> Firms may offset higher
              labor costs by raising prices, cutting hours, or substituting
              automation, shifting part of the burden to consumers.
            </p>
            <p>
              <strong>Spillovers:</strong> Raising the floor can compress the
              wage ladder, nudging up pay for workers just above the minimum and
              changing broader wage distributions.
            </p>
          </div>
        ),
      },
    ]}
  />
);

export default LaborMarketsPage;
