'use client';

import type { NextPage } from 'next';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

const ProductionCostsPage: NextPage = () => (
  <TheoryTemplate
    title="Production & Costs"
    subtitle="How firms turn inputs into output—and how the shape of costs drives their supply decisions."
    sections={[
      {
        title: 'What is it?',
        body: (
          <p className="text-base-content/80 text-sm leading-relaxed">
            <strong>Production</strong> is the process of turning inputs (labor,
            capital, materials) into outputs (goods and services). A{' '}
            <strong>production function</strong> describes how much output
            results from given inputs. Costs follow from production: firms pay
            for inputs, and the structure of these costs—fixed versus variable,
            marginal versus average—determines how much they produce and at what
            price.
          </p>
        ),
      },
      {
        title: 'The production function',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Inputs to output:</strong> Adding inputs generally raises
              output, but at a decreasing rate—the{' '}
              <strong>law of diminishing marginal returns</strong>: each
              additional worker adds less output once other inputs are fixed.
            </p>
            <p>
              <strong>Marginal product:</strong> The extra output from one more
              unit of an input. It typically first rises, then falls as the
              input is overused relative to fixed factors.
            </p>
            <p>
              <strong>Returns to scale:</strong> Scaling up all inputs together
              can produce proportionally more (increasing), less (decreasing),
              or the same (constant) output—governing long-run size decisions.
            </p>
          </div>
        ),
      },
      {
        title: 'Cost curves',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Fixed vs variable costs:</strong> Fixed costs don&rsquo;t
              change with output (rent, equipment); variable costs do
              (materials, labor). Short-run decisions weigh variable and
              marginal costs.
            </p>
            <p>
              <strong>Marginal cost:</strong> The extra cost of producing one
              more unit. The U-shape—falling then rising—mirrors diminishing
              returns.
            </p>
            <p>
              <strong>Average costs:</strong> Average total cost falls while
              marginal cost is below it and rises once marginal cost exceeds it—
              so marginal cost crosses average cost at its minimum.
            </p>
          </div>
        ),
      },
      {
        title: 'Costs and supply',
        body: (
          <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
            <p>
              <strong>Profit-maximizing output:</strong> A firm produces up to
              the point where marginal cost equals marginal revenue. In
              competitive markets, price equals marginal revenue, so output is
              set where price equals marginal cost.
            </p>
            <p>
              <strong>The supply curve:</strong> A competitive firm&rsquo;s
              short-run supply curve is its marginal cost curve above the
              shutdown point—it supplies more when price rises.
            </p>
            <p>
              <strong>Entry and exit:</strong> In the long run, profits attract
              entry and losses trigger exit, pushing prices toward the minimum
              of average total cost—the benchmark of efficient production.
            </p>
          </div>
        ),
      },
    ]}
  />
);

export default ProductionCostsPage;
